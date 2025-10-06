// pages/api/send-otp.js - FIXED VERSION
// This API endpoint sends OTP to viralspark.connect@gmail.com using Viral Spark EmailJS

// In-memory OTP storage (for demo - use Redis/Database in production)
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
    const { email } = req.body

    // Validate email is provided
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      })
    }

    const normalizedEmail = email.toLowerCase().trim()
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'viralspark.connect@gmail.com'

    // Security: Only allow Viral Spark admin email
    if (normalizedEmail !== ADMIN_EMAIL.toLowerCase()) {
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

    // Clean up old OTPs (older than 10 minutes)
    for (const [key, value] of otpStore.entries()) {
      if (Date.now() - value.timestamp > 10 * 60 * 1000) {
        otpStore.delete(key)
        console.log('🧹 Cleaned up expired OTP for:', key)
      }
    }

    console.log('🔑 Generated OTP for', normalizedEmail, ':', otp)

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

    // Send OTP via EmailJS using REST API (server-side compatible)
    try {
      const emailJSServiceId = process.env.NEXT_PUBLIC_VIRAL_SPARK_SERVICE_ID
      const emailJSTemplateId = process.env.NEXT_PUBLIC_VIRAL_SPARK_OTP_TEMPLATE_ID
      const emailJSPublicKey = process.env.NEXT_PUBLIC_VIRAL_SPARK_PUBLIC_KEY
      const emailJSPrivateKey = process.env.VIRAL_SPARK_PRIVATE_KEY

      // Validate that all credentials are present
      if (!emailJSServiceId || !emailJSTemplateId || !emailJSPublicKey || !emailJSPrivateKey) {
        console.error('Missing EmailJS credentials:', {
          serviceId: !!emailJSServiceId,
          templateId: !!emailJSTemplateId,
          publicKey: !!emailJSPublicKey,
          privateKey: !!emailJSPrivateKey
        })
        throw new Error('Viral Spark EmailJS credentials not configured properly')
      }

      // Use EmailJS REST API for server-side sending
      const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
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
        })
      })

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text()
        console.error('❌ EmailJS API error:', emailResponse.status, errorText)
        throw new Error(`EmailJS API error: ${emailResponse.status} - ${errorText}`)
      }

      console.log('✅ OTP email sent successfully via Viral Spark to', normalizedEmail)

      return res.status(200).json({
        success: true,
        message: 'OTP sent successfully to your Viral Spark email',
        expiresIn: 300, // 5 minutes in seconds
        email: normalizedEmail,
        timestamp: now.toISOString()
      })

    } catch (emailError) {
      console.error('❌ Viral Spark EmailJS error:', emailError)
      
      // For development: Still return success with OTP in console
      if (process.env.NODE_ENV === 'development') {
        console.log('⚠️ EMAIL FAILED - OTP for development:', otp)
        return res.status(200).json({
          success: true,
          message: 'OTP generated (email service unavailable - check console)',
          developmentOtp: otp, // Only visible in development
          expiresIn: 300
        })
      }
      
      // In production, fail if email doesn't send
      throw new Error('Failed to send OTP email via Viral Spark')
    }

  } catch (error) {
    console.error('❌ Error sending OTP:', error)
    return res.status(500).json({
      success: false,
      error: 'Failed to send OTP',
      details: error.message,
      timestamp: new Date().toISOString()
    })
  }
}

// Periodic cleanup of expired OTPs (runs every 10 minutes)
if (typeof global.otpCleanupInterval === 'undefined') {
  global.otpCleanupInterval = setInterval(() => {
    const now = Date.now()
    const tenMinutes = 10 * 60 * 1000
    
    let cleanedCount = 0
    for (const [email, data] of otpStore.entries()) {
      if (now - data.timestamp > tenMinutes) {
        otpStore.delete(email)
        cleanedCount++
      }
    }
    
    if (cleanedCount > 0) {
      console.log(`🧹 Cleaned up ${cleanedCount} expired OTP(s)`)
    }
  }, 10 * 60 * 1000) // Run every 10 minutes
}
