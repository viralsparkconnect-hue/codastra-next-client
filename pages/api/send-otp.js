// pages/api/send-otp.js - FIXED VERSION with shared OTP storage

// ✅ Use global storage to share OTP data between API routes
if (!global.otpStore) {
  global.otpStore = new Map()
}

export default async function handler(req, res) {
  console.log('\n🔍 ===== OTP REQUEST RECEIVED =====')
  console.log('Method:', req.method)
  console.log('Body:', req.body)
  
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
    const { email } = req.body

    if (!email) {
      console.log('❌ Email missing in request body')
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      })
    }

    const normalizedEmail = email.toLowerCase().trim()
    const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'viralspark.connect@gmail.com').toLowerCase()

    console.log('📧 Email Validation:')
    console.log('  Received:', normalizedEmail)
    console.log('  Expected:', ADMIN_EMAIL)
    console.log('  Match:', normalizedEmail === ADMIN_EMAIL)

    if (normalizedEmail !== ADMIN_EMAIL) {
      console.log('❌ Unauthorized email attempt:', normalizedEmail)
      return res.status(403).json({
        success: false,
        error: 'Access denied. Only authorized admin email can login.'
      })
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const timestamp = Date.now()

    // ✅ Store OTP in global storage (shared between API routes)
    global.otpStore.set(normalizedEmail, {
      otp: otp,
      timestamp: timestamp,
      attempts: 0,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'Unknown'
    })

    console.log('🔑 OTP Generated:', otp)
    console.log('💾 OTP Stored in global.otpStore for:', normalizedEmail)
    console.log('📊 Current OTP store size:', global.otpStore.size)

    // Clean up old OTPs
    cleanupExpiredOTPs()

    const now = new Date()
    const formattedTime = now.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    })

    const userIP = req.headers['x-forwarded-for'] || 
                   req.headers['x-real-ip'] || 
                   req.connection.remoteAddress || 
                   'Unknown'

    console.log('🌐 Request Info:')
    console.log('  IP:', userIP)
    console.log('  Time:', formattedTime)

    // Try to send OTP via EmailJS
    try {
      const emailJSServiceId = process.env.NEXT_PUBLIC_VIRAL_SPARK_SERVICE_ID
      const emailJSTemplateId = process.env.NEXT_PUBLIC_VIRAL_SPARK_OTP_TEMPLATE_ID
      const emailJSPublicKey = process.env.NEXT_PUBLIC_VIRAL_SPARK_PUBLIC_KEY
      const emailJSPrivateKey = process.env.VIRAL_SPARK_PRIVATE_KEY

      console.log('\n📮 EmailJS Configuration Check:')
      console.log('  Service ID:', emailJSServiceId ? '✅ ' + emailJSServiceId : '❌ Missing')
      console.log('  Template ID:', emailJSTemplateId ? '✅ ' + emailJSTemplateId : '❌ Missing')
      console.log('  Public Key:', emailJSPublicKey ? '✅ ' + emailJSPublicKey.substring(0, 10) + '...' : '❌ Missing')
      console.log('  Private Key:', emailJSPrivateKey ? '✅ ' + emailJSPrivateKey.substring(0, 10) + '...' : '❌ Missing')

      if (!emailJSServiceId || !emailJSTemplateId || !emailJSPublicKey || !emailJSPrivateKey) {
        throw new Error('EmailJS credentials not configured')
      }

      const emailPayload = {
        service_id: emailJSServiceId,
        template_id: emailJSTemplateId,
        user_id: emailJSPublicKey,
        accessToken: emailJSPrivateKey,
        template_params: {
          to_email: normalizedEmail,
          to_name: 'Admin',
          otp_code: otp,
          validity_minutes: '5',
          timestamp: formattedTime,
          ip_address: userIP,
          service_name: 'Codastra CRM',
          from_name: 'Codastra Security'
        }
      }

      console.log('\n📤 Sending Email via EmailJS REST API...')

      const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailPayload)
      })

      console.log('📬 EmailJS Response Status:', emailResponse.status, emailResponse.statusText)

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text()
        console.error('❌ EmailJS error:', errorText)
        throw new Error(`EmailJS API error: ${emailResponse.status}`)
      }

      const emailResult = await emailResponse.text()
      console.log('✅ Email sent successfully:', emailResult)

      return res.status(200).json({
        success: true,
        message: 'OTP sent successfully to your email',
        expiresIn: 300,
        email: normalizedEmail,
        timestamp: now.toISOString()
      })

    } catch (emailError) {
      console.error('\n❌ EMAIL SENDING ERROR:', emailError.message)
      
      // ✅ Development fallback - show OTP in console
      console.log('\n⚠️  EMAIL FAILED - USING CONSOLE OTP')
      console.log('═══════════════════════════════════════')
      console.log('🔑 YOUR OTP CODE:', otp)
      console.log('📧 For email:', normalizedEmail)
      console.log('⏰ Valid for 5 minutes')
      console.log('═══════════════════════════════════════\n')
      
      return res.status(200).json({
        success: true,
        message: 'OTP generated (Email service unavailable - check server console)',
        developmentMode: true,
        expiresIn: 300,
        warning: 'Email failed. OTP shown in server console.',
        // ⚠️ Only show OTP in response for development
        ...(process.env.NODE_ENV === 'development' && { otp: otp })
      })
    }

  } catch (error) {
    console.error('\n❌ FATAL ERROR:', error.message)
    console.error('Stack:', error.stack)
    
    return res.status(500).json({
      success: false,
      error: 'Failed to process OTP request',
      details: error.message,
      timestamp: new Date().toISOString()
    })
  } finally {
    console.log('===== OTP REQUEST COMPLETED =====\n')
  }
}

function cleanupExpiredOTPs() {
  if (!global.otpStore) return 0
  
  const now = Date.now()
  const tenMinutes = 10 * 60 * 1000
  let cleanedCount = 0
  
  for (const [key, value] of global.otpStore.entries()) {
    if (now - value.timestamp > tenMinutes) {
      global.otpStore.delete(key)
      cleanedCount++
    }
  }
  
  if (cleanedCount > 0) {
    console.log('🧹 Cleaned', cleanedCount, 'expired OTP(s)')
  }
  
  return cleanedCount
}

// Periodic cleanup
if (!global.otpCleanupInterval) {
  global.otpCleanupInterval = setInterval(() => {
    cleanupExpiredOTPs()
  }, 10 * 60 * 1000)
  console.log('✅ OTP cleanup interval started')
}
