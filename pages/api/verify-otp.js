// pages/api/verify-otp.js - FIXED VERSION with shared OTP storage

// ✅ Use the same global storage as send-otp.js
if (!global.otpStore) {
  global.otpStore = new Map()
}

export default async function handler(req, res) {
  console.log('\n🔍 ===== OTP VERIFICATION REQUEST =====')
  
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    console.log('✅ OPTIONS request handled')
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    console.log('❌ Invalid method:', req.method)
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed. Use POST.' 
    })
  }

  try {
    const { email, otp } = req.body

    console.log('📥 Verification request received')
    console.log('  Email:', email)
    console.log('  OTP:', otp ? '******' : 'missing')

    // Validate inputs
    if (!email || !otp) {
      console.log('❌ Missing email or OTP in request')
      return res.status(400).json({
        success: false,
        error: 'Email and OTP are required'
      })
    }

    const normalizedEmail = email.toLowerCase().trim()
    const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'viralspark.connect@gmail.com').toLowerCase()

    console.log('\n📧 Email Validation:')
    console.log('  Received:', normalizedEmail)
    console.log('  Expected:', ADMIN_EMAIL)
    console.log('  Match:', normalizedEmail === ADMIN_EMAIL)

    // Security check - only allow admin email
    if (normalizedEmail !== ADMIN_EMAIL) {
      console.log('❌ Unauthorized email attempt:', normalizedEmail)
      return res.status(403).json({
        success: false,
        error: 'Access denied. Only authorized admin can login.'
      })
    }

    // ✅ Check global OTP store
    console.log('\n💾 Checking global.otpStore...')
    console.log('  Store exists:', !!global.otpStore)
    console.log('  Store size:', global.otpStore.size)
    console.log('  Has email key:', global.otpStore.has(normalizedEmail))
    
    if (global.otpStore.size > 0) {
      console.log('  Available emails in store:', Array.from(global.otpStore.keys()))
    }
    
    const storedData = global.otpStore.get(normalizedEmail)

    if (!storedData) {
      console.log('\n❌ No OTP found for:', normalizedEmail)
      console.log('  This could mean:')
      console.log('  1. OTP was never generated')
      console.log('  2. OTP already expired (>10 min old)')
      console.log('  3. OTP was already used')
      return res.status(400).json({
        success: false,
        error: 'OTP not found or expired. Please request a new one.'
      })
    }

    console.log('\n✅ Found stored OTP data:')
    console.log('  Has OTP:', !!storedData.otp)
    console.log('  Generated at:', new Date(storedData.timestamp).toISOString())
    console.log('  Current attempts:', storedData.attempts)
    console.log('  Request IP:', storedData.ip)

    // Check expiry (5 minutes)
    const now = Date.now()
    const otpAge = now - storedData.timestamp
    const fiveMinutes = 5 * 60 * 1000

    const ageInSeconds = Math.floor(otpAge / 1000)
    const ageInMinutes = Math.floor(ageInSeconds / 60)

    console.log('\n⏰ OTP Age Check:')
    console.log('  Age:', ageInSeconds, 'seconds (', ageInMinutes, 'minutes )')
    console.log('  Limit: 300 seconds ( 5 minutes )')
    console.log('  Expired:', otpAge > fiveMinutes)

    if (otpAge > fiveMinutes) {
      console.log('❌ OTP EXPIRED - Deleting from store')
      global.otpStore.delete(normalizedEmail)
      return res.status(400).json({
        success: false,
        error: 'OTP expired. Please request a new one.'
      })
    }

    // Check attempt limit (max 5 attempts)
    console.log('\n🔢 Attempt Check:')
    console.log('  Current attempts:', storedData.attempts)
    console.log('  Max allowed: 5')
    console.log('  Remaining:', 5 - storedData.attempts)

    if (storedData.attempts >= 5) {
      console.log('❌ TOO MANY ATTEMPTS - Deleting OTP')
      global.otpStore.delete(normalizedEmail)
      return res.status(429).json({
        success: false,
        error: 'Too many failed attempts. Please request a new OTP.'
      })
    }

    // Verify OTP
    const enteredOTP = otp.trim()
    const storedOTP = storedData.otp
    
    console.log('\n🔐 OTP Comparison:')
    console.log('  Entered OTP:', enteredOTP)
    console.log('  Stored OTP:', storedOTP)
    console.log('  Length match:', enteredOTP.length === storedOTP.length)
    console.log('  Exact match:', enteredOTP === storedOTP)
    
    if (storedOTP === enteredOTP) {
      // ✅ SUCCESS! OTP is correct
      global.otpStore.delete(normalizedEmail)
      
      console.log('\n✅✅✅ OTP VERIFIED SUCCESSFULLY! ✅✅✅')
      console.log('🎉 Login granted for:', normalizedEmail)
      console.log('🗑️  OTP removed from store')

      // Create login audit log
      const loginLog = {
        email: normalizedEmail,
        service: 'Codastra CRM',
        timestamp: new Date().toISOString(),
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'Unknown',
        userAgent: req.headers['user-agent'] || 'Unknown'
      }

      console.log('\n🔐 Login Audit Log:', JSON.stringify(loginLog, null, 2))

      return res.status(200).json({
        success: true,
        message: 'OTP verified successfully',
        email: normalizedEmail,
        timestamp: new Date().toISOString()
      })
    } else {
      // ❌ INCORRECT OTP
      storedData.attempts += 1
      global.otpStore.set(normalizedEmail, storedData)

      const remainingAttempts = 5 - storedData.attempts

      console.log('\n❌ INVALID OTP!')
      console.log('  Attempt:', storedData.attempts, 'of 5')
      console.log('  Remaining attempts:', remainingAttempts)

      if (remainingAttempts === 0) {
        console.log('  ⚠️  This was the last attempt - OTP will be deleted on next request')
      }

      return res.status(400).json({
        success: false,
        error: `Invalid OTP. ${remainingAttempts} attempt${remainingAttempts !== 1 ? 's' : ''} remaining.`,
        remainingAttempts: remainingAttempts
      })
    }

  } catch (error) {
    console.error('\n❌ FATAL VERIFICATION ERROR:')
    console.error('  Error type:', error.name)
    console.error('  Error message:', error.message)
    console.error('  Stack trace:', error.stack)
    
    return res.status(500).json({
      success: false,
      error: 'Failed to verify OTP',
      details: error.message,
      timestamp: new Date().toISOString()
    })
  } finally {
    console.log('\n===== VERIFICATION COMPLETED =====\n')
  }
}
