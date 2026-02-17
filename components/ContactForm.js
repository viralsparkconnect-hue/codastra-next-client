// components/ContactForm.js - Enhanced with Reliable Lead Saving
"use client"
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

// Simple icons
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

const Phone = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const MessageSquare = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.985L3 21l1.985-5.874A8.955 8.955 0 013 12a8 8 0 1118 0z" />
  </svg>
)

export default function ContactForm() {
  const formRef = useRef()
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    service: '',
    budget: '',
    timeline: '',
    company: '',
    message: '' 
  })
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [errors, setErrors] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const [leadSaved, setLeadSaved] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  // EmailJS Configuration - Use environment variables with fallbacks
  const EMAILJS_CONFIG = {
    SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_5dpu0tn',
    TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_qteujwt',
    PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'AlryU3umMzVGedPYh'
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Name validation
    if (!form.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    } else if (form.name.trim().length > 100) {
      newErrors.name = 'Name must be less than 100 characters'
    }
    
    // Email validation - improved regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(form.email.trim())) {
      newErrors.email = 'Please enter a valid email address'
    } else if (form.email.trim().length > 200) {
      newErrors.email = 'Email must be less than 200 characters'
    }
    
    // Phone validation (optional but if provided, should be valid)
    if (form.phone.trim()) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
      const cleanPhone = form.phone.replace(/[\s\-\(\)\.]/g, '')
      if (!phoneRegex.test(cleanPhone)) {
        newErrors.phone = 'Please enter a valid phone number'
      } else if (cleanPhone.length < 10) {
        newErrors.phone = 'Phone number must be at least 10 digits'
      }
    }
    
    // Message validation
    if (!form.message.trim()) {
      newErrors.message = 'Project details are required'
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Please provide at least 10 characters'
    } else if (form.message.trim().length > 2000) {
      newErrors.message = 'Message must be less than 2000 characters'
    }

    // Budget validation (optional)
    if (form.budget && !['under-5k', '5k-15k', '15k-30k', '30k-50k', '50k+', 'discuss'].includes(form.budget)) {
      newErrors.budget = 'Please select a valid budget range'
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

  // Save lead to Google Sheets
  const saveToGoogleSheets = async () => {
    console.log('Attempting to save lead to Google Sheets...')
    
    try {
      const leadPayload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        service: form.service || 'General Inquiry',
        budget: form.budget || 'Not specified',
        timeline: form.timeline || 'Not specified',
        company: form.company.trim(),
        message: form.message.trim(),
        source: 'Website Contact Form',
        timestamp: new Date().toISOString(),
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Unknown'
      }

      console.log('Sending lead payload:', leadPayload)

      const response = await fetch('/api/save-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadPayload)
      })

      console.log('Google Sheets API response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const result = await response.json()
      console.log('Google Sheets API response:', result)

      if (result.success) {
        setLeadSaved(true)
        console.log('✅ Lead saved to Google Sheets:', result.leadId)
        return { success: true, leadId: result.leadId }
      } else {
        throw new Error(result.error || 'Unknown error from Google Sheets API')
      }

    } catch (error) {
      console.error('❌ Google Sheets save failed:', error)
      return { success: false, error: error.message }
    }
  }

  // Send email via EmailJS
  const sendEmailNotification = async () => {
    console.log('Attempting to send email via EmailJS...')
    
    try {
      // Initialize EmailJS if not already done
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)

      const templateParams = {
        to_name: 'Codastra Team',
        from_name: form.name.trim(),
        from_email: form.email.trim(), 
        phone: form.phone.trim() || 'Not provided',
        service: form.service || 'General Inquiry',
        budget: form.budget || 'Not specified',
        timeline: form.timeline || 'Not specified',
        company: form.company.trim() || 'Not specified',
        message: form.message.trim(),
        reply_to: form.email.trim(),
        contact_source: 'Website Contact Form',
        timestamp: new Date().toLocaleString('en-US', {
          timeZone: 'Asia/Kolkata',
          timeZoneName: 'short'
        })
      }

      console.log('EmailJS template params:', templateParams)

      const emailResult = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      )

      console.log('✅ Email sent successfully:', emailResult.text)
      setEmailSent(true)
      return { success: true, result: emailResult }

    } catch (emailError) {
      console.error('❌ EmailJS error:', emailError)
      return { success: false, error: emailError.message || emailError.text }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      console.log('Form validation failed:', errors)
      return
    }
    
    setStatus('loading')
    setErrorMessage('')
    setLeadSaved(false)
    setEmailSent(false)

    console.log('Starting form submission process...')

    try {
      // Step 1: Save to Google Sheets (primary)
      const sheetsResult = await saveToGoogleSheets()
      
      // Step 2: Send email notification (secondary)
      const emailResult = await sendEmailNotification()

      // Determine overall success
      if (sheetsResult.success || emailResult.success) {
        setStatus('success')
        setForm({ 
          name: '', 
          email: '', 
          phone: '', 
          service: '', 
          budget: '', 
          timeline: '', 
          company: '', 
          message: '' 
        })
        
        console.log('✅ Form submission successful!')
        
        // Reset to idle after 8 seconds
        setTimeout(() => setStatus('idle'), 8000)

      } else {
        // Both failed - show error
        throw new Error('Both Google Sheets and email delivery failed')
      }

    } catch (error) {
      console.error("❌ Form submission error:", error)
      setStatus('error')
      
      if (error.message.includes('Google Sheets') && error.message.includes('email')) {
        setErrorMessage('Unable to submit your message. Please try again or contact us directly at codastra.conect@gmail.com')
      } else {
        setErrorMessage('There was an issue submitting your form. Please try again in a moment.')
      }
      
      // Reset to idle after 5 seconds
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
    'CRM Systems',
    'Custom Software',
    'Consulting',
    'Other'
  ]

  const budgetRanges = [
    { value: 'under-5k', label: 'Under $5,000' },
    { value: '5k-15k', label: '$5,000 - $15,000' },
    { value: '15k-30k', label: '$15,000 - $30,000' },
    { value: '30k-50k', label: '$30,000 - $50,000' },
    { value: '50k+', label: '$50,000+' },
    { value: 'discuss', label: 'Let\'s Discuss' }
  ]

  const timelineOptions = [
    'ASAP (Rush Job)',
    '1-2 weeks',
    '1 month',
    '2-3 months', 
    '3-6 months',
    '6+ months',
    'Flexible timing'
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
          Thank you for contacting us! We've received your message and will get back to you within 2 hours during business hours (IST).
        </p>
        <div className="text-sm text-green-400 bg-green-900/20 rounded-lg p-3 border border-green-600/20 space-y-1">
          <p className="flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            {leadSaved ? 'Lead saved to our system' : 'Message recorded'}
          </p>
          <p className="flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            {emailSent ? 'Email notification sent to our team' : 'Team notified'}
          </p>
          <p className="flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            You'll receive a confirmation email shortly
          </p>
        </div>
        
        {/* Quick contact options */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <button 
            onClick={() => window.open('https://wa.me/+917709333640', '_blank')}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300 text-sm"
          >
            <MessageSquare className="w-4 h-4" />
            WhatsApp Us
          </button>
          <button 
            onClick={() => window.location.href = 'tel:+917709333640'}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 text-sm"
          >
            <Phone className="w-4 h-4" />
            Call India
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Name and Email Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>

      {/* Phone and Company Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Company (Optional)
          </label>
          <input
            type="text"
            name="company"
            placeholder="Your company name"
            value={form.company}
            onChange={handleChange}
            className={inputClasses('company')}
            disabled={status === 'loading'}
            maxLength={100}
            autoComplete="organization"
          />
        </div>
      </div>
      
      {/* Service Selection */}
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

      {/* Budget and Timeline Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Budget Range (Optional)
          </label>
          <select
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className={inputClasses('budget')}
            disabled={status === 'loading'}
          >
            <option value="">Select budget range...</option>
            {budgetRanges.map((budget) => (
              <option key={budget.value} value={budget.value} className="bg-gray-800">
                {budget.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Timeline (Optional)
          </label>
          <select
            name="timeline"
            value={form.timeline}
            onChange={handleChange}
            className={inputClasses('timeline')}
            disabled={status === 'loading'}
          >
            <option value="">Select timeline...</option>
            {timelineOptions.map((timeline) => (
              <option key={timeline} value={timeline} className="bg-gray-800">
                {timeline}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Project Details */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Project Details *
        </label>
        <textarea
          name="message"
          placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
          value={form.message}
          onChange={handleChange}
          rows={6}
          className={inputClasses('message')}
          disabled={status === 'loading'}
          maxLength={2000}
          style={{ resize: 'vertical', minHeight: '150px' }}
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
            form.message.length > 2000 ? 'text-red-400' : 
            form.message.length > 1600 ? 'text-yellow-400' : 'text-gray-500'
          }`}>
            {form.message.length}/2000
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

      {/* Privacy Notice */}
      <div className="flex items-start gap-3">
        <input 
          type="checkbox" 
          id="privacy" 
          required
          disabled={status === 'loading'}
          className="mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label htmlFor="privacy" className="text-gray-300 text-sm">
          I agree to the Privacy Policy and consent to being contacted by the Codastra team regarding my project inquiry. *
        </label>
      </div>

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

      {/* Alternative Contact Methods */}
      <div className="text-center pt-4 border-t border-gray-700/50">
        <p className="text-gray-400 text-sm mb-3">Or connect with us directly:</p>
        <div className="flex justify-center gap-4">
          <button 
            type="button"
            onClick={() => window.open('https://wa.me/+917709333640', '_blank')}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300 text-sm"
          >
            <MessageSquare className="w-4 h-4" />
            WhatsApp
          </button>
          <button 
            type="button"
            onClick={() => window.location.href = 'tel:+917709333640'}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 text-sm"
          >
            <Phone className="w-4 h-4" />
            Call India
          </button>
        </div>
      </div>
    </motion.form>
  )
}
