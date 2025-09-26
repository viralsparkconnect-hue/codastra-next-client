import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, ArrowRight, Star, Users, CheckCircle, Globe, Calendar, Heart, MessageSquare, AlertCircle, Loader } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function Contact() {
  const [selectedOffice, setSelectedOffice] = useState('main')
  
  // Form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    message: ''
  })
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [errors, setErrors] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      info: 'codastra.conect@gmail.com',
      desc: 'Send us an email anytime!',
      color: 'from-blue-500 to-blue-700',
      action: () => window.location.href = 'mailto:codastra.conect@gmail.com'
    },
    {
      icon: Phone,
      title: 'Call India',
      info: '+91 98346 83297',
      desc: 'Mon-Fri from 9am to 6pm IST',
      color: 'from-green-500 to-green-700',
      action: () => window.location.href = 'tel:+919834683297'
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      info: '+91 98346 83297',
      desc: 'Chat with us on WhatsApp',
      color: 'from-emerald-500 to-emerald-700',
      action: () => window.open('https://wa.me/919834683297', '_blank')
    },
    {
      icon: Phone,
      title: 'Call USA',
      info: '+1 (555) 123-4567',
      desc: 'USA clients support line',
      color: 'from-purple-500 to-purple-700',
      action: () => window.location.href = 'tel:+15551234567'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      info: 'Nashik, Maharashtra, India',
      desc: 'Come say hello at our office',
      color: 'from-orange-500 to-orange-700',
      action: () => window.open('https://maps.google.com/?q=Nashik+Maharashtra+India', '_blank')
    },
    {
      icon: Clock,
      title: 'Working Hours',
      info: 'Mon - Fri: 9am - 6pm IST',
      desc: 'Weekend support available',
      color: 'from-indigo-500 to-indigo-700',
      action: () => {}
    }
  ]

  const offices = [
    {
      id: 'main',
      city: 'Nashik',
      address: 'Maharashtra, India',
      phone: '+91 98346 83297',
      whatsapp: '+91 98346 83297',
      email: 'codastra.conect@gmail.com',
      timezone: 'IST (GMT+5:30)',
      team: 50,
      specialties: ['Web Development', 'Mobile Apps', 'International Sales']
    },
    {
      id: 'usa',
      city: 'USA Support',
      address: 'North America',
      phone: '+1 (555) 123-4567',
      whatsapp: '+91 98346 83297',
      email: 'codastra.conect@gmail.com',
      timezone: 'EST/PST',
      team: 50,
      specialties: ['Client Support', 'Sales', 'Consulting']
    },
    {
      id: 'remote',
      city: 'Remote Services',
      address: 'Global Remote Support',
      phone: '+91 98346 83297',
      whatsapp: '+91 98346 83297',
      email: 'remote@codastra.com',
      timezone: 'Multiple Timezones',
      team: 50,
      specialties: ['Cloud Solutions', 'DevOps', 'Digital Marketing']
    }
  ]

  const whyChooseUs = [
    { 
      icon: Star, 
      title: '4.9/5 Rating', 
      desc: 'Consistently high client satisfaction across all projects',
      stat: '200+ Reviews'
    },
    { 
      icon: Users, 
      title: 'Expert Team', 
      desc: 'Specialized team with international sales and technical expertise',
      stat: '50+ Team Members'
    },
    { 
      icon: CheckCircle, 
      title: '99% On-Time', 
      desc: 'Reliable delivery with rigorous project management',
      stat: '150+ Projects'
    },
    { 
      icon: Globe, 
      title: 'Global Reach', 
      desc: 'Serving international clients with 24/7 support from Nashik',
      stat: '15+ Countries'
    },
  ]

  const faqs = [
    {
      q: "How do you handle international clients from Nashik?",
      a: "Our team has 5+ years of international sales experience. We work across multiple time zones and provide 24/7 support for global clients. Our English communication is excellent and we understand international business practices."
    },
    {
      q: "What makes your Nashik team special?",
      a: "We combine the best of both worlds - cost-effective Indian talent with international business expertise. Our team includes MCA graduates, engineers, and international sales specialists who understand global market needs."
    },
    {
      q: "Do you offer ongoing support and maintenance?",
      a: "Yes! We provide comprehensive support packages including 24/7 monitoring, security updates, performance optimization, and feature enhancements. Our team works around the clock to ensure your systems run smoothly."
    },
    {
      q: "What's your development process like?",
      a: "We follow agile methodology with regular client updates. Despite being in India, we maintain constant communication through video calls, project management tools, and daily progress reports to keep you informed."
    },
    {
      q: "How do you ensure quality from a remote location?",
      a: "Quality is our top priority. Our CTO Shubham oversees all coding production, while our founders with international experience ensure projects meet global standards. We use industry best practices and rigorous testing."
    },
    {
      q: "What are your payment terms for international projects?",
      a: "We offer flexible payment terms suitable for international clients including milestone-based payments, bank transfers, and secure online payment gateways. We work with clients to find mutually beneficial arrangements."
    }
  ]

  const testimonials = [
    {
      name: 'John Peterson',
      company: 'TechStart USA',
      role: 'CEO',
      text: 'Working with the Codastra team in Nashik has been exceptional. Their international sales experience combined with technical expertise delivered exactly what we needed.',
      rating: 5,
      avatar: '👨‍💼',
      project: 'E-commerce Platform'
    },
    {
      name: 'Maria González',
      company: 'Digital Solutions EU',
      role: 'CTO',
      text: 'Despite the distance, communication was seamless. Amol and Pratik\'s international background made working across time zones effortless. Outstanding results!',
      rating: 5,
      avatar: '👩‍💻',
      project: 'Mobile Application'
    },
    {
      name: 'David Kim',
      company: 'StartupCorp',
      role: 'Founder',
      text: 'The Nashik team delivered a world-class solution at competitive pricing. Shubham\'s coding expertise and the team\'s project management were impressive.',
      rating: 5,
      avatar: '👨‍🎨',
      project: 'Web Development'
    }
  ]

  // Form validation
  const validateForm = () => {
    const newErrors = {}
    
    if (!form.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!form.message.trim()) {
      newErrors.message = 'Project details are required'
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Please provide at least 10 characters'
    } else if (form.message.trim().length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    
    // Clear errors as user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
    if (errorMessage) {
      setErrorMessage('')
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setStatus('loading')
    setErrorMessage('')

    // Create enhanced message for API
    const enhancedMessage = `
PROJECT DETAILS:
${form.message}

ADDITIONAL INFORMATION:
${form.phone ? `Phone: ${form.phone}` : ''}
${form.company ? `Company: ${form.company}` : ''}
${form.projectType ? `Project Type: ${form.projectType}` : ''}
${form.budget ? `Budget Range: ${form.budget}` : ''}

CONTACT SOURCE: Contact Page Form
    `.trim()

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: enhancedMessage,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setForm({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          budget: '',
          message: ''
        })
        
        // Reset to idle after 8 seconds
        setTimeout(() => setStatus('idle'), 8000)
      } else {
        throw new Error(data.error || 'Failed to send message')
      }

    } catch (error) {
      console.error('Contact form error:', error)
      setStatus('error')
      setErrorMessage(error.message || 'Failed to send message. Please try again.')
      
      // Reset to idle after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const inputClasses = (fieldName) => `
    w-full px-4 py-3 rounded-xl border transition-all duration-300 
    ${errors[fieldName] 
      ? 'bg-red-900/20 border-red-500 text-white placeholder-red-300 focus:ring-red-500' 
      : 'bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:ring-blue-500'
    }
    focus:outline-none focus:ring-2 focus:border-transparent
    hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed
  `

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Navigation />

      {/* Enhanced Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center relative overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-orb w-32 h-32 bg-blue-500/20 top-20 left-10"></div>
          <div className="floating-orb w-48 h-48 bg-purple-500/15 top-40 right-20"></div>
          <div className="floating-orb w-24 h-24 bg-pink-500/25 bottom-32 left-1/4"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Connect With Our <br />
            <span className="gradient-text">Nashik Team</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Ready to work with India's premier digital team? We bring international expertise and local value to transform your business globally.
          </motion.p>
          
          {/* Quick Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <button 
              onClick={() => document.querySelector('#contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 relative overflow-hidden"
            >
              <span className="relative z-10">Start Your Project</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
            <button 
              onClick={() => window.open('https://wa.me/919834683297', '_blank')}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              WhatsApp India
            </button>
            <button 
              onClick={() => window.location.href = 'tel:+15551234567'}
              className="px-8 py-4 border-2 border-gray-600 text-white rounded-full font-semibold hover:border-blue-500 hover:text-blue-400 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call USA
            </button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {whyChooseUs.map(({ icon: Icon, title, desc, stat }, i) => (
              <motion.div
                key={i}
                className="text-center p-4 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
                whileHover={{ y: -5 }}
              >
                <Icon className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                <div className="text-lg font-bold text-white mb-1">{title}</div>
                <div className="text-blue-400 font-semibold text-sm mb-1">{stat}</div>
                <div className="text-gray-400 text-xs">{desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Contact Info Cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Multiple Ways to <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-xl text-gray-300">Reach our Nashik team through your preferred method</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {contactInfo.map(({ icon: Icon, title, info, desc, color, action }, i) => (
              <motion.div
                key={i}
                className="group text-center p-8 bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-700/50 hover:border-gray-600/70 transition-all duration-500 cursor-pointer hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                onClick={action}
                whileHover={{ y: -10 }}
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">{title}</h3>
                <p className="text-blue-400 font-semibold mb-2">{info}</p>
                <p className="text-gray-400 text-sm mb-4">{desc}</p>
                <div className="flex items-center justify-center gap-2 text-blue-400 font-medium text-sm">
                  <span>Click to {title.split(' ')[0].toLowerCase()}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Enhanced Contact Form */}
            <motion.div
              id="contact-form"
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-8 border border-gray-700/50 backdrop-blur-sm relative overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10 rounded-3xl"></div>
              <div className="relative z-10">
                {status === 'success' ? (
                  // Success State
                  <div className="text-center p-8 bg-green-900/20 border border-green-600/30 rounded-2xl backdrop-blur-sm">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
                      <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>
                    <h3 className="text-3xl font-bold text-green-400 mb-4">Message Sent Successfully!</h3>
                    <p className="text-green-300 text-lg mb-4">
                      Thank you for reaching out to our Nashik team. We've received your message and will get back to you within 2 hours during business hours (IST).
                    </p>
                    <div className="flex items-center justify-center gap-2 text-green-400 text-sm mb-6">
                      <Mail className="w-4 h-4" />
                      <span>Check your email for a confirmation</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button 
                        onClick={() => window.open('https://wa.me/919834683297', '_blank')}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300 text-sm"
                      >
                        <MessageSquare className="w-4 h-4" />
                        WhatsApp Us
                      </button>
                      <button 
                        onClick={() => window.location.href = 'tel:+919834683297'}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 text-sm"
                      >
                        <Phone className="w-4 h-4" />
                        Call India
                      </button>
                    </div>
                  </div>
                ) : (
                  // Form State
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-white">Send us a Message</h2>
                        <p className="text-blue-400 text-sm">We'll respond within 2 hours (IST)</p>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-8">
                      Tell us about your project and our Nashik team will get back to you with a detailed proposal and timeline.
                    </p>
                    
                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white text-sm font-semibold mb-2">Full Name *</label>
                          <input 
                            type="text" 
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            disabled={status === 'loading'}
                            className={inputClasses('name')}
                            placeholder="Enter your full name"
                            maxLength={100}
                          />
                          {errors.name && (
                            <p className="mt-2 text-red-400 text-sm flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 flex-shrink-0" />
                              {errors.name}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-white text-sm font-semibold mb-2">Email Address *</label>
                          <input 
                            type="email" 
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            disabled={status === 'loading'}
                            className={inputClasses('email')}
                            placeholder="Enter your email"
                            maxLength={200}
                          />
                          {errors.email && (
                            <p className="mt-2 text-red-400 text-sm flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 flex-shrink-0" />
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white text-sm font-semibold mb-2">Phone Number</label>
                          <input 
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            disabled={status === 'loading'}
                            className={inputClasses('phone')}
                            placeholder="+1 (555) 123-4567"
                            maxLength={20}
                          />
                        </div>
                        <div>
                          <label className="block text-white text-sm font-semibold mb-2">Company</label>
                          <input 
                            type="text"
                            name="company"
                            value={form.company}
                            onChange={handleChange}
                            disabled={status === 'loading'}
                            className={inputClasses('company')}
                            placeholder="Your company name"
                            maxLength={100}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-white text-sm font-semibold mb-2">Project Type</label>
                        <select 
                          name="projectType"
                          value={form.projectType}
                          onChange={handleChange}
                          disabled={status === 'loading'}
                          className={inputClasses('projectType')}
                        >
                          <option value="">Select project type</option>
                          <option value="web-development">Web Development</option>
                          <option value="mobile-app">Mobile App Development</option>
                          <option value="ecommerce">E-commerce Solution</option>
                          <option value="crm">CRM System</option>
                          <option value="custom-software">Custom Software</option>
                          <option value="consulting">Consulting</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-white text-sm font-semibold mb-2">Budget Range</label>
                        <select 
                          name="budget"
                          value={form.budget}
                          onChange={handleChange}
                          disabled={status === 'loading'}
                          className={inputClasses('budget')}
                        >
                          <option value="">Select budget range</option>
                          <option value="5k-10k">$5,000 - $10,000</option>
                          <option value="10k-25k">$10,000 - $25,000</option>
                          <option value="25k-50k">$25,000 - $50,000</option>
                          <option value="50k-100k">$50,000 - $100,000</option>
                          <option value="100k+">$100,000+</option>
                          <option value="discuss">Let's Discuss</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-white text-sm font-semibold mb-2">Project Details *</label>
                        <textarea 
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          required
                          rows="5"
                          disabled={status === 'loading'}
                          className={inputClasses('message') + ' resize-vertical'}
                          placeholder="Tell us about your project requirements, timeline, and any specific features you need..."
                          maxLength={1000}
                        />
                        <div className="flex justify-between items-center mt-2">
                          {errors.message ? (
                            <p className="text-red-400 text-sm flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 flex-shrink-0" />
                              {errors.message}
                            </p>
                          ) : (
                            <div />
                          )}
                          <span className="text-gray-500 text-xs">
                            {form.message.length}/1000
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <input 
                          type="checkbox" 
                          id="privacy" 
                          required
                          disabled={status === 'loading'}
                          className="mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <label htmlFor="privacy" className="text-gray-300 text-sm">
                          I agree to the <span className="text-blue-400 hover:underline cursor-pointer">Privacy Policy</span> and consent to being contacted by the Codastra team regarding my project inquiry.
                        </label>
                      </div>
                      
                      <button 
                        type="submit"
                        disabled={status === 'loading'}
                        className={`
                          w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 
                          flex items-center justify-center gap-2 group relative overflow-hidden
                          ${status === 'loading'
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/25'
                          }
                          text-white shadow-lg
                        `}
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader className="w-5 h-5 animate-spin" />
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            <span>Send Message</span>
                          </>
                        )}
                        
                        {/* Button shine effect */}
                        {status !== 'loading' && (
                          <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        )}
                      </button>

                      {/* Error Message */}
                      {status === 'error' && errorMessage && (
                        <div className="text-center p-4 bg-red-900/20 border border-red-600/30 rounded-xl backdrop-blur-sm">
                          <div className="flex items-center justify-center gap-2 text-red-300">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p className="font-medium">{errorMessage}</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="text-center pt-4 border-t border-gray-700/50">
                        <p className="text-gray-400 text-sm mb-3">Or connect with us directly:</p>
                        <div className="flex justify-center gap-4">
                          <button 
                            type="button"
                            onClick={() => window.open('https://wa.me/919834683297', '_blank')}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300 text-sm"
                          >
                            <MessageSquare className="w-4 h-4" />
                            WhatsApp
                          </button>
                          <button 
                            type="button"
                            onClick={() => window.location.href = 'tel:+919834683297'}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 text-sm"
                          >
                            <Phone className="w-4 h-4" />
                            Call India
                          </button>
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </motion.div>

            {/* Enhanced Info Sidebar */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Office Locations */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Globe className="w-6 h-6 text-blue-400" />
                  Our Services
                </h3>
                <div className="space-y-4">
                  {offices.map((office, i) => (
                    <div
                      key={office.id}
                      className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                        selectedOffice === office.id
                          ? 'bg-blue-900/30 border border-blue-500/50'
                          : 'bg-gray-700/30 hover:bg-gray-700/50 border border-gray-600/30'
                      }`}
                      onClick={() => setSelectedOffice(office.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-semibold">{office.city}</h4>
                        <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded-full">
                          {office.timezone}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{office.address}</p>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Phone:</span>
                          <span className="text-blue-400">{office.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">WhatsApp:</span>
                          <span className="text-green-400">{office.whatsapp}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Team:</span>
                          <span className="text-yellow-400">{office.team}+ members</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response Time Guarantee */}
              <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-3xl p-8 border border-green-700/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Fast Response</h3>
                    <p className="text-green-400 text-sm">From Nashik to Global</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-green-900/20 rounded-lg">
                    <div className="text-green-400 font-bold">&lt; 2 hrs</div>
                    <div className="text-gray-300">Initial Response</div>
                  </div>
                  <div className="text-center p-3 bg-green-900/20 rounded-lg">
                    <div className="text-green-400 font-bold">&lt; 24 hrs</div>
                    <div className="text-gray-300">Detailed Proposal</div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Connect */}
              <div className="bg-gradient-to-r from-emerald-900/20 to-green-900/20 rounded-3xl p-8 border border-emerald-700/30">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-emerald-400" />
                  WhatsApp Support
                </h3>
                <p className="text-gray-300 mb-4 text-sm">
                  Get instant support on WhatsApp. Our team is available for quick queries and project discussions.
                </p>
                <button 
                  onClick={() => window.open('https://wa.me/919834683297', '_blank')}
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 px-4 rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  Chat on WhatsApp
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-20 px-4 bg-gray-800/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-xl text-gray-300">Everything you need to know about working with our Nashik team</p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map(({ q, a }, i) => (
              <motion.div
                key={i}
                className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-start gap-3">
                  <span className="text-blue-400 text-lg">Q{i + 1}.</span>
                  {q}
                </h3>
                <p className="text-gray-300 leading-relaxed pl-8">{a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              What Our <span className="gradient-text">Global Clients Say</span>
            </h2>
            <p className="text-xl text-gray-300">Real testimonials from international projects</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                className="p-8 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-3xl hover:border-gray-600/70 transition-all duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <div className="text-white font-bold">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                    <div className="text-gray-500 text-sm">{testimonial.company}</div>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-700">
                  <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-400 text-xs rounded-full">
                    {testimonial.project}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Map Section */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Visit Our Nashik Office</h2>
            <p className="text-xl text-gray-300">Located in Maharashtra's growing tech hub</p>
          </motion.div>

          <motion.div
            className="relative h-96 bg-gradient-to-br from-gray-700 to-gray-800 rounded-3xl flex items-center justify-center border border-gray-600 cursor-pointer hover:from-gray-600 hover:to-gray-700 transition-all duration-300 overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            onClick={() => window.open('https://maps.google.com/?q=Nashik+Maharashtra+India', '_blank')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 group-hover:from-blue-900/30 group-hover:to-purple-900/30 transition-all duration-300"></div>
            <div className="text-center relative z-10">
              <MapPin className="w-20 h-20 text-blue-400 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-3xl font-bold text-white mb-4">Interactive Map</h3>
              <p className="text-gray-300 mb-2 text-lg">Nashik, Maharashtra</p>
              <p className="text-gray-300 mb-4">India 🇮🇳</p>
              <div className="flex items-center justify-center gap-2 text-blue-400 font-medium">
                <span>Click to open in Google Maps</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>

          {/* Office Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
            <div className="text-center p-6 bg-gray-800/50 rounded-2xl backdrop-blur-sm">
              <MapPin className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Location</h4>
              <p className="text-gray-300">Nashik, Maharashtra, India</p>
            </div>
            <div className="text-center p-6 bg-gray-800/50 rounded-2xl backdrop-blur-sm">
              <Phone className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Phone</h4>
              <p className="text-gray-300">+91 98346 83297</p>
            </div>
            <div className="text-center p-6 bg-gray-800/50 rounded-2xl backdrop-blur-sm">
              <MessageSquare className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">WhatsApp</h4>
              <p className="text-gray-300">+91 98346 83297</p>
            </div>
            <div className="text-center p-6 bg-gray-800/50 rounded-2xl backdrop-blur-sm">
              <Mail className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Email</h4>
              <p className="text-gray-300">hello@codastra.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="p-12 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-3xl border border-gray-700/50 backdrop-blur-sm relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Work With <br />
                <span className="gradient-text">India's Best Team?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join 200+ satisfied international clients who have transformed their businesses with our Nashik-based expertise
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => document.querySelector('#contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    Get Free Consultation
                  </span>
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
                <button 
                  onClick={() => window.open('https://wa.me/919834683297', '_blank')}
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  WhatsApp Now
                </button>
                <button 
                  onClick={() => window.location.href = 'tel:+15551234567'}
                  className="px-8 py-4 border-2 border-gray-600 text-white rounded-full font-semibold hover:border-blue-500 hover:text-blue-400 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call USA
                </button>
              </div>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center items-center gap-8 mt-8 pt-8 border-t border-gray-700/50">
                <div className="flex items-center gap-2 text-gray-400">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>International Experience</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>24/7 Global Support</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>WhatsApp Support</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .floating-orb {
          border-radius: 50%;
          filter: blur(40px);
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .gradient-text {
          background: linear-gradient(135deg, #60A5FA, #A855F7, #EC4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  )
}
