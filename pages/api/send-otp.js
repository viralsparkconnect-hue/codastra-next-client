// pages/api/send-otp.js
// This API endpoint sends OTP to the admin email using EmailJS

import emailjs from '@emailjs/browser'

// In-memory OTP storage (for demo - use Redis/Database in production)
// This stores OTPs temporarily with email as key
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

    // Security: Only allow specific admin email
    if (normalizedEmail !== 'codastra.conect@gmail.com') {
      console.log('❌ Unauthorized email attempt:', normalizedEmail)
      return res.status(403).json({
        success: false,
        error: 'Access denied. Only authorized admin email can login.'
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

    console.log('🔑 Generated OTP for', normalizedEmail, ':', otp) // Remove in production for security

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

    // Send OTP via EmailJS
    try {
      const emailJSServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_5dpu0tn'
      const emailJSTemplateId = process.env.NEXT_PUBLIC_EMAILJS_OTP_TEMPLATE_ID || 'template_otp_login'
      const emailJSPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'AlryU3umMzVGedPYh'

      await emailjs.send(
        emailJSServiceId,
        emailJSTemplateId,
        {
          to_email: normalizedEmail,
          to_name: 'Codastra Admin',
          otp_code: otp,
          validity_minutes: '5',
          timestamp: formattedTime,
          ip_address: userIP
        },
        emailJSPublicKey
      )

      console.log('✅ OTP email sent successfully to', normalizedEmail)

      return res.status(200).json({
        success: true,
        message: 'OTP sent successfully to your email',
        expiresIn: 300, // 5 minutes in seconds
        email: normalizedEmail,
        timestamp: now.toISOString()
      })

    } catch (emailError) {
      console.error('❌ EmailJS error:', emailError)
      
      // For development: Still return success with OTP in console
      // Remove this in production!
      if (process.env.NODE_ENV === 'development') {
        console.log('⚠️ EMAIL FAILED - OTP for development:', otp)
        return res.status(200).json({
          success: true,
          message: 'OTP generated (email service unavailable - check console)',
          otp: otp, // Only for development
          expiresIn: 300
        })
      }
      
      // In production, fail if email doesn't send
      throw new Error('Failed to send OTP email')
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
