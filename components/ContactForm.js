import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    if (!form.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!form.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
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
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setStatus('loading')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Replace with actual API call
      console.log('Form submitted:', form)
      
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      
      // Reset success state after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
      
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const inputClasses = (fieldName) => `
    w-full px-6 py-4 rounded-xl border transition-all duration-300 
    ${errors[fieldName] 
      ? 'bg-red-900/20 border-red-500 text-white placeholder-red-300 focus:ring-red-500' 
      : 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500'
    }
    focus:outline-none focus:ring-2 focus:border-transparent
    hover:border-gray-500
  `

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 bg-green-900/20 border border-green-600/30 rounded-2xl"
      >
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-400 mb-2">Message Sent!</h3>
        <p className="text-green-300">
          Thank you for your message. We'll get back to you within 24 hours.
        </p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className={inputClasses('name')}
            disabled={status === 'loading'}
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4" />
              {errors.name}
            </motion.p>
          )}
        </div>
        
        <div className="space-y-2">
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className={inputClasses('email')}
            disabled={status === 'loading'}
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4" />
              {errors.email}
            </motion.p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <textarea
          name="message"
          placeholder="Tell us about your project..."
          value={form.message}
          onChange={handleChange}
          rows="5"
          className={inputClasses('message') + ' resize-none'}
          disabled={status === 'loading'}
        />
        {errors.message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm flex items-center gap-1"
          >
            <AlertCircle className="w-4 h-4" />
            {errors.message}
          </motion.p>
        )}
      </div>
      
      <motion.button
        type="submit"
        disabled={status === 'loading'}
        className={`
          w-full py-5 rounded-xl font-bold text-lg transition-all duration-300 
          flex items-center justify-center gap-2 relative overflow-hidden
          ${status === 'loading'
            ? 'bg-gray-600 cursor-not-allowed'
            : status === 'error'
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-500/25'
          }
          text-white
        `}
        whileHover={status !== 'loading' ? { scale: 1.02 } : {}}
        whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
      >
        {status === 'loading' ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : status === 'error' ? (
          <>
            <AlertCircle className="w-5 h-5" />
            Try Again
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
        
        {/* Button shine effect */}
        {status !== 'loading' && (
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
        )}
      </motion.button>
      
      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-center text-sm"
        >
          Something went wrong. Please try again.
        </motion.p>
      )}
    </motion.form>
  )
}
