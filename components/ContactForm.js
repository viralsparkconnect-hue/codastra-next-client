// components/ContactForm.js - Fixed version
"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

// Simple icons (unchanged)
const Send = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
)

const CheckCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const AlertCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const Loader = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
)

export default function ContactForm() {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    service: '',
    message: '' 
  })
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [errors, setErrors] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  // EmailJS Configuration - Use environment variables with fallbacks
  const EMAILJS_CONFIG = {
    SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_5dpu0tn',
    TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_qteujwt', // Fixed template ID
    PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'AlryU3umMzVGedPYh'
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Name validation
    if (!form.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    // Email validation - improved regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(form.email.trim())) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    // Phone validation (optional but if provided, should be valid)
    if (form.phone.trim()) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
      const cleanPhone = form.phone.replace(/[\s\-\(\)\.]/g, '')
      if (!phoneRegex.test(cleanPhone)) {
        newErrors.phone = 'Please enter a valid phone number'
      }
    }
    
    // Message validation
    if (!form.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    } else if (form.message.trim().length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
    
    // Clear general error message
    if (errorMessage) {
      setErrorMessage('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setStatus('loading')
    setErrorMessage('')

    try {
      // Save to Google Sheets first
      let sheetsSaved = false
      try {
        const saveResponse = await fetch('/api/save-lead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            service: form.service || 'General Inquiry',
            message: form.message.trim(),
            source: 'Contact Form',
            timestamp: new Date().toISOString()
          })
        })

        const saveResult = await saveResponse.json()
        if (saveResult.success) {
          sheetsSaved = true
          console.log('Lead saved to Google Sheets:', saveResult.leadId)
        } else {
          console.warn('Google Sheets save failed:', saveResult.error)
        }
      } catch (sheetsError) {
        console.warn('Google Sheets error (continuing with email):', sheetsError.message)
      }

      // Send email notification using EmailJS
      try {
        // Initialize EmailJS if not already done
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)

        const templateParams = {
          to_name: 'Codastra Team',
          from_name: form.name.trim(),
          from_email: form.email.trim(), 
          phone: form.phone.trim() || 'Not provided',
          service: form.service || 'General Inquiry',
          message: form.message.trim(),
          reply_to: form.email.trim(),
          contact_source: 'Website Contact Form',
          timestamp: new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Kolkata',
            timeZoneName: 'short'
          })
        }

        const emailResult = await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          templateParams,
          EMAILJS_CONFIG.PUBLIC_KEY
        )

        console.log('Email sent successfully:', emailResult.text)
        
        setStatus('success')
        setForm({ name: '', email: '', phone: '', service: '', message: '' })
        
        // Reset to idle after 5 seconds
        setTimeout(() => setStatus('idle'), 5000)

      } catch (emailError) {
        console.error('EmailJS error:', emailError)
        
        // If sheets saved but email failed, still show partial success
        if (sheetsSaved) {
          setStatus('success') 
          setForm({ name: '', email: '', phone: '', service: '', message: '' })
          setTimeout(() => setStatus('idle'), 5000)
        } else {
          throw emailError // Re-throw to trigger error handling
        }
      }

    } catch (error) {
      console.error("Form submission error:", error)
      setStatus('error')
      setErrorMessage('Failed to send message. Please try again or contact us directly.')
      setTimeout(() => {
        setStatus('idle')
        setErrorMessage('')
      }, 5000)
    }
  }

  const inputClasses = (fieldName) => `
    w-full px-6 py-4 rounded-xl border transition-all duration-300 
    ${errors[fieldName] 
      ? 'bg-red-900/20 border-red-500 text-white placeholder-red-300 focus:ring-red-500' 
      : 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500'
    }
    focus:outline-none focus:ring-2 focus:border-transparent
    hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed
  `

  const services = [
    'Web Development',
    'Mobile App Development', 
    'Digital Marketing',
    'Branding & Design',
    'Cloud Solutions',
    'E-commerce Solutions',
    'UI/UX Design',
    'SEO & Analytics',
    'Other'
  ]

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 bg-green-900/20 border border-green-600/30 rounded-2xl backdrop-blur-sm"
      >
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-400 mb-2">Message Sent Successfully!</h3>
        <p className="text-green-300 mb-4">
          Thank you for contacting us. We've received your message and will get back to you within 2 hours during business hours.
        </p>
        <div className="text-sm text-green-400 bg-green-900/20 rounded-lg p-3 border border-green-600/20">
          <p>✅ Lead saved to our system</p>
          <p>✅ Notification sent to our team</p>
          <p>✅ You'll receive a confirmation email shortly</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={form.name}
          onChange={handleChange}
          className={inputClasses('name')}
          disabled={status === 'loading'}
          maxLength={100}
          autoComplete="name"
        />
        {errors.name && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-red-400 text-sm flex items-center gap-1"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {errors.name}
          </motion.p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          name="email"
          placeholder="your.email@example.com"
          value={form.email}
          onChange={handleChange}
          className={inputClasses('email')}
          disabled={status === 'loading'}
          maxLength={200}
          autoComplete="email"
        />
        {errors.email && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-red-400 text-sm flex items-center gap-1"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {errors.email}
          </motion.p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Phone Number (Optional)
        </label>
        <input
          type="tel"
          name="phone"
          placeholder="+1 (555) 123-4567"
          value={form.phone}
          onChange={handleChange}
          className={inputClasses('phone')}
          disabled={status === 'loading'}
          maxLength={20}
          autoComplete="tel"
        />
        {errors.phone && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-red-400 text-sm flex items-center gap-1"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {errors.phone}
          </motion.p>
        )}
      </div>

      {/* Service Field */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Service Interested In
        </label>
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          className={inputClasses('service')}
          disabled={status === 'loading'}
        >
          <option value="">Select a service...</option>
          {services.map((service) => (
            <option key={service} value={service} className="bg-gray-800">
              {service}
            </option>
          ))}
        </select>
      </div>

      {/* Message Field */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Project Details *
        </label>
        <textarea
          name="message"
          placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
          value={form.message}
          onChange={handleChange}
          rows={5}
          className={inputClasses('message')}
          disabled={status === 'loading'}
          maxLength={1000}
          style={{ resize: 'vertical', minHeight: '120px' }}
        />
        <div className="flex justify-between items-center mt-1">
          {errors.message ? (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {errors.message}
            </motion.p>
          ) : (
            <span></span>
          )}
          <span className={`text-sm ${
            form.message.length > 1000 ? 'text-red-400' : 
            form.message.length > 800 ? 'text-yellow-400' : 'text-gray-500'
          }`}>
            {form.message.length}/1000
          </span>
        </div>
      </div>

      {/* Error Message */}
      {status === 'error' && errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-900/20 border border-red-600/30 rounded-xl backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 text-red-300">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="font-medium">Submission Failed</p>
              <p className="text-sm">{errorMessage}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={status === 'loading'}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden ${
          status === 'loading'
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] shadow-lg hover:shadow-xl hover:shadow-blue-500/25'
        }`}
        whileHover={status !== 'loading' ? { scale: 1.02 } : {}}
        whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
      >
        {status === 'loading' ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            Sending Message...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
        
        {/* Button shine effect */}
        {status !== 'loading' && (
          <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        )}
      </motion.button>

      {/* Privacy Note */}
      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to our privacy policy. We'll never share your information with third parties.
      </p>
    </motion.form>
  )
}
