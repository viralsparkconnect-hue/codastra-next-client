// pages/api/verify-otp.js
// This API endpoint verifies the OTP entered by the user

// In-memory OTP storage (shared with send-otp.js)
// Note: In production, use Redis or a database for better persistence
const otpStore = new Map()

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed. Use POST.' 
    })
  }

  try {
    const { email, otp } = req.body

    // Validate inputs
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        error: 'Email and OTP are required'
      })
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Validate that only admin email can access
    if (normalizedEmail !== 'codastra.conect@gmail.com') {
      console.log('❌ Unauthorized email verification attempt:', normalizedEmail)
      return res.status(403).json({
        success: false,
        error: 'Access denied. Only authorized admin email can login.'
      })
    }

    // Check if OTP exists in store
    const storedData = otpStore.get(normalizedEmail)

    if (!storedData) {
      console.log('❌ OTP not found for:', normalizedEmail)
      return res.status(400).json({
        success: false,
        error: 'OTP not found or expired. Please request a new one.'
      })
    }

    // Check if OTP is expired (5 minutes = 300000ms)
    const now = Date.now()
    const otpAge = now - storedData.timestamp
    const fiveMinutes = 5 * 60 * 1000

    if (otpAge > fiveMinutes) {
      console.log('❌ OTP expired for:', normalizedEmail)
      otpStore.delete(normalizedEmail)
      return res.status(400).json({
        success: false,
        error: 'OTP expired. Please request a new one.'
      })
    }

    // Check attempt limit (max 5 attempts per OTP)
    if (storedData.attempts >= 5) {
      console.log('❌ Too many attempts for:', normalizedEmail)
      otpStore.delete(normalizedEmail)
      return res.status(429).json({
        success: false,
        error: 'Too many failed attempts. Please request a new OTP.'
      })
    }

    // Verify OTP
    const enteredOTP = otp.trim()
    
    if (storedData.otp === enteredOTP) {
      // ✅ OTP is correct - delete it and allow login
      otpStore.delete(normalizedEmail)
      
      console.log('✅ OTP verified successfully for:', normalizedEmail)

      // Log successful login for security audit
      const loginLog = {
        email: normalizedEmail,
        timestamp: new Date().toISOString(),
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'Unknown',
        userAgent: req.headers['user-agent'] || 'Unknown'
      }

      console.log('🔐 Successful login:', loginLog)

      return res.status(200).json({
        success: true,
        message: 'OTP verified successfully',
        email: normalizedEmail,
        timestamp: new Date().toISOString()
      })
    } else {
      // ❌ Incorrect OTP - increment attempt counter
      storedData.attempts += 1
      otpStore.set(normalizedEmail, storedData)

      const remainingAttempts = 5 - storedData.attempts

      console.log('❌ Invalid OTP attempt for:', normalizedEmail, '- Attempt', storedData.attempts, 'of 5')

      return res.status(400).json({
        success: false,
        error: `Invalid OTP. ${remainingAttempts} attempt${remainingAttempts !== 1 ? 's' : ''} remaining.`,
        remainingAttempts: remainingAttempts
      })
    }

  } catch (error) {
    console.error('❌ Error verifying OTP:', error)
    return res.status(500).json({
      success: false,
      error: 'Failed to verify OTP',
      details: error.message,
      timestamp: new Date().toISOString()
    })
  }
}

// Clean up expired OTPs periodically (runs every 10 minutes)
if (typeof global.otpCleanupInterval === 'undefined') {
  global.otpCleanupInterval = setInterval(() => {
    const now = Date.now()
    const tenMinutes = 10 * 60 * 1000
    
    for (const [email, data] of otpStore.entries()) {
      if (now - data.timestamp > tenMinutes) {
        otpStore.delete(email)
        console.log('🧹 Cleaned up expired OTP for:', email)
      }
    }
  }, 10 * 60 * 1000) // Run every 10 minutes
}
