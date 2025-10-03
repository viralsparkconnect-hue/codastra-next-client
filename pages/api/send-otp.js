// pages/api/send-otp.js
// This API endpoint sends OTP to the admin email using EmailJS

import emailjs from '@emailjs/browser'

// In-memory OTP storage (for demo - use Redis/Database in production)
const otpStore = new Map()

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

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

    // Validate email
    if (!email || email.toLowerCase().trim() !== 'codastra.conect@gmail.com') {
      console.log('Unauthorized email attempt:', email)
      return res.status(403).json({
        success: false,
        error: 'Access denied. Only authorized admin email can login.'
      })
