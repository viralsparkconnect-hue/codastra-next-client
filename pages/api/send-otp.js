// pages/api/send-otp.js - ENHANCED DEBUG VERSION
// This API endpoint sends OTP to viralspark.connect@gmail.com using Viral Spark EmailJS

// In-memory OTP storage (for demo - use Redis/Database in production)
const otpStore = new Map()

export default async function handler(req, res) {
  console.log('\n🔍 ===== OTP REQUEST RECEIVED =====')
  console.log('Method:', req.method)
  console.log('Body:', req.body)
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight OPTIONS request
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

    // Validate email is provided
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

    // Security: Only allow Viral Spark admin email
    if (normalizedEmail !== ADMIN_EMAIL) {
      console.log('❌ Unauthorized email attempt:', normalizedEmail)
      return res.status(403).json({
        success: false,
        error: 'Access denied. Only authorized Viral Spark admin email can login.'
      })
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const timestamp = Date.now()

    // Store OTP with metadata
    otpStore.set(normalizedEmail, {
      otp: otp,
      timestamp: timestamp,
      attempts: 0,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'Unknown'
    })

    console.log('🔑 OTP Generated:', otp)
    console.log('💾 OTP Stored in memory for:', normalizedEmail)

    // Clean up old OTPs (older than 10 minutes)
    const cleanedCount = cleanupExpiredOTPs()
    if (cleanedCount > 0) {
      console.log('🧹 Cleaned up', cleanedCount, 'expired OTP(s)')
    }

    // Get current date/time for email
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

    // Get user IP for security logging
    const userIP = req.headers['x-forwarded-for'] || 
                   req.headers['x-real-ip'] || 
                   req.connection.remoteAddress || 
                   'Unknown'

    console.log('🌐 Request Info:')
    console.log('  IP:', userIP)
    console.log('  Time:', formattedTime)

    // Send OTP via EmailJS using REST API (server-side compatible)
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

      // Validate that all credentials are present
      if (!emailJSServiceId || !emailJSTemplateId || !emailJSPublicKey || !emailJSPrivateKey) {
        console.error('❌ Missing EmailJS credentials!')
        throw new Error('Viral Spark EmailJS credentials not configured properly. Check your .env.local file.')
      }

      const emailPayload = {
        service_id: emailJSServiceId,
        template_id: emailJSTemplateId,
        user_id: emailJSPublicKey,
        accessToken: emailJSPrivateKey,
        template_params: {
          to_email: normalizedEmail,
          to_name: 'Viral Spark Admin',
          otp_code: otp,
          validity_minutes: '5',
          timestamp: formattedTime,
          ip_address: userIP,
          service_name: 'Codastra Leads CRM',
          from_name: 'Codastra Security'
        }
      }

      console.log('\n📤 Sending Email via EmailJS REST API...')
      console.log('  Endpoint: https://api.emailjs.com/api/v1.0/email/send')
      console.log('  To:', normalizedEmail)

      // Use EmailJS REST API for server-side sending
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
        console.error('❌ EmailJS API error response:', errorText)
        throw new Error(`EmailJS API error: ${emailResponse.status} - ${errorText}`)
      }

      const emailResult = await emailResponse.text()
      console.log('✅ EmailJS Response:', emailResult)
      console.log('✅ OTP email sent successfully via Viral Spark to', normalizedEmail)

      return res.status(200).json({
        success: true,
        message: 'OTP sent successfully to your Viral Spark email',
        expiresIn: 300, // 5 minutes in seconds
        email: normalizedEmail,
        timestamp: now.toISOString()
      })

    } catch (emailError) {
      console.error('\n❌ EMAIL SENDING ERROR:')
      console.error('  Error Type:', emailError.name)
      console.error('  Error Message:', emailError.message)
      console.error('  Stack:', emailError.stack)
      
      // For development: Still return success with OTP in console
      if (process.env.NODE_ENV === 'development') {
        console.log('\n⚠️  DEVELOPMENT MODE - Email failed but OTP generated')
        console.log('🔑 USE THIS OTP FOR TESTING:', otp)
        console.log('⏰ Valid for 5 minutes')
        
        return res.status(200).json({
          success: true,
          message: 'OTP generated (email service unavailable - check server console for OTP)',
          developmentMode: true,
          developmentOtp: otp, // Only visible in development
          expiresIn: 300,
          warning: 'Email service failed. OTP logged to server console.'
        })
      }
      
      // In production, fail if email doesn't send
      throw new Error('Failed to send OTP email via Viral Spark: ' + emailError.message)
    }

  } catch (error) {
    console.error('\n❌ FATAL ERROR in send-otp API:')
    console.error('  Error:', error.message)
    console.error('  Stack:', error.stack)
    
    return res.status(500).json({
      success: false,
      error: 'Failed to send OTP',
      details: error.message,
      timestamp: new Date().toISOString()
    })
  } finally {
    console.log('===== OTP REQUEST COMPLETED =====\n')
  }
}

// Helper function to clean up expired OTPs
function cleanupExpiredOTPs() {
  const now = Date.now()
  const tenMinutes = 10 * 60 * 1000
  let cleanedCount = 0
  
  for (const [key, value] of otpStore.entries()) {
    if (now - value.timestamp > tenMinutes) {
      otpStore.delete(key)
      cleanedCount++
    }
  }
  
  return cleanedCount
}

// Periodic cleanup of expired OTPs (runs every 10 minutes)
if (typeof global.otpCleanupInterval === 'undefined') {
  global.otpCleanupInterval = setInterval(() => {
    const cleanedCount = cleanupExpiredOTPs()
    if (cleanedCount > 0) {
      console.log(`🧹 Periodic cleanup: Removed ${cleanedCount} expired OTP(s)`)
    }
  }, 10 * 60 * 1000) // Run every 10 minutes
  
  console.log('✅ OTP cleanup interval started')
}
