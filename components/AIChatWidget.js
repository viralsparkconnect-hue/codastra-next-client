// components/AIChatWidget.js - Fixed Lead Saving Issues
import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'

// Simple icons as components (unchanged)
const MessageCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.985L3 21l1.985-5.874A8.955 8.955 0 013 12a8 8 0 1118 0z" />
  </svg>
)

const X = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const Send = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
)

const User = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const Check = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const AlertCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm Pratik Rajput, Sales Manager at Codastra. 👋 With 5+ years in international sales, I help businesses transform digitally. I've personally handled 200+ successful projects across 15 countries. What brings you here today?",
      isBot: true,
      timestamp: new Date()
    }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [conversationStage, setConversationStage] = useState('greeting')
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    timeline: '',
    company: '',
    message: ''
  })
  const [awaitingInfo, setAwaitingInfo] = useState('')
  const [hasProvidedContact, setHasProvidedContact] = useState(false)
  const [leadSaved, setLeadSaved] = useState(false)
  const [leadSaveError, setLeadSaveError] = useState(false)
  const [saveAttempts, setSaveAttempts] = useState(0)
  
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [message])

  // Save lead to Google Sheets - FIXED VERSION
  const saveLead = async () => {
    // Don't save if already saved or not enough data
    if (leadSaved || saveAttempts >= 3) return
    
    // Require at least name or email
    if (!leadData.name && !leadData.email) {
      console.log('Not enough lead data to save yet')
      return
    }

    setSaveAttempts(prev => prev + 1)
    setLeadSaveError(false)

    try {
      console.log('Attempting to save lead:', {
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        service: leadData.service,
        attempt: saveAttempts + 1
      })

      // Create conversation history
      const conversationHistory = messages
        .map(msg => `${msg.isBot ? 'Pratik' : 'User'}: ${msg.text}`)
        .join('\n\n')

      // Prepare lead payload with all available data
      const leadPayload = {
        name: leadData.name.trim() || 'AI Chat Lead',
        email: leadData.email.trim() || '',
        phone: leadData.phone.trim() || '',
        service: leadData.service || 'General Inquiry',
        message: leadData.message || conversationHistory || 'AI Chat conversation',
        budget: leadData.budget || '',
        timeline: leadData.timeline || '',
        company: leadData.company || '',
        source: 'AI Chat Widget - Pratik Rajput',
        timestamp: new Date().toISOString(),
        salesManager: 'Pratik Rajput',
        conversationHistory: conversationHistory
      }

      console.log('Sending lead payload to API:', leadPayload)

      // Save to Google Sheets via API
      const response = await fetch('/api/save-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadPayload)
      })

      console.log('API Response status:', response.status)
      const result = await response.json()
      console.log('API Response data:', result)
      
      if (result.success) {
        setLeadSaved(true)
        setLeadSaveError(false)
        console.log('✅ Lead saved successfully:', result.leadId)
        
        // Send email notification
        await sendEmailNotification(leadPayload, conversationHistory)
        
        // Show success message to user
        setTimeout(() => {
          addMessage("Great! I've saved your information and our team will contact you soon. You should receive a confirmation email shortly. 🎉", true)
        }, 500)
        
      } else {
        throw new Error(result.error || 'API returned failure status')
      }

    } catch (error) {
      console.error('❌ Error saving lead:', error)
      setLeadSaveError(true)
      
      // Retry logic - try again in 2 seconds if not max attempts
      if (saveAttempts < 2) {
        console.log(`Retrying lead save in 2 seconds... (attempt ${saveAttempts + 1}/3)`)
        setTimeout(() => {
          saveLead()
        }, 2000)
      } else {
        console.error('Max save attempts reached. Lead save failed.')
        // Still try to send email notification
        try {
          const conversationHistory = messages
            .map(msg => `${msg.isBot ? 'Pratik' : 'User'}: ${msg.text}`)
            .join('\n\n')
          await sendEmailNotification(leadData, conversationHistory)
        } catch (emailError) {
          console.error('Email notification also failed:', emailError)
        }
      }
    }
  }

  // Send email notification
  const sendEmailNotification = async (data, conversationHistory) => {
    try {
      console.log('Sending email notification...')
      
      const emailResult = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_5dpu0tn',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_qteujwt',
        {
          to_name: 'Codastra Team',
          from_name: data.name || 'AI Chat Lead',
          from_email: data.email || 'No email provided',
          phone: data.phone || 'No phone provided',
          service: data.service || 'General Inquiry',
          message: conversationHistory || data.message || 'No message provided',
          lead_source: 'AI Chat Widget - Pratik Rajput',
          sales_manager: 'Pratik Rajput',
          budget: data.budget || 'Not specified',
          timeline: data.timeline || 'Not specified',
          company: data.company || 'Not specified'
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'AlryU3umMzVGedPYh'
      )
      
      console.log('✅ Email notification sent successfully:', emailResult.text)
    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError)
    }
  }

  // Enhanced AI responses with better lead data collection
  const getBotResponse = (userMessage, stage) => {
    const msg = userMessage.toLowerCase()
    
    // Extract contact information more aggressively
    const emailRegex = /[\w\.-]+@[\w\.-]+\.\w+/g
    const phoneRegex = /(\+?\d{1,4}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3,4}[\s-]?\d{3,4}/g
    const namePatterns = [
      /(?:i'm|i am|my name is|call me|this is)\s+([a-zA-Z\s]+)/i,
      /^([a-zA-Z\s]{2,30})(?:\s|$)/i  // First few words might be a name
    ]
    
    const foundEmail = userMessage.match(emailRegex)
    const foundPhone = userMessage.match(phoneRegex)
    
    // Try multiple name patterns
    let foundName = null
    for (const pattern of namePatterns) {
      const match = userMessage.match(pattern)
      if (match) {
        foundName = match[1].trim()
        break
      }
    }

    // Update lead data when contact info is found
    let dataUpdated = false
    if (foundEmail && !leadData.email) {
      setLeadData(prev => ({ ...prev, email: foundEmail[0] }))
      dataUpdated = true
    }
    if (foundPhone && !leadData.phone) {
      setLeadData(prev => ({ ...prev, phone: foundPhone[0] }))
      dataUpdated = true
    }
    if (foundName && !leadData.name && foundName.length > 1) {
      setLeadData(prev => ({ ...prev, name: foundName }))
      dataUpdated = true
    }

    // Auto-save when we get contact info
    if (dataUpdated && (foundName || foundEmail)) {
      console.log('Contact info detected, attempting auto-save...')
      setTimeout(() => saveLead(), 1000)
    }

    // Service detection and data collection
    if (msg.includes('web') || msg.includes('website') || msg.includes('site')) {
      setLeadData(prev => ({ ...prev, service: 'Web Development' }))
      return "Excellent choice! I've personally overseen 80+ website projects that averaged 250% ROI within 6 months. Our React/Next.js websites typically see 40% faster load times and 60% higher conversion rates. What's your current website challenge - outdated design, poor performance, or starting fresh? Also, what's your name so I can personalize our conversation?"
    }
    
    if (msg.includes('mobile') || msg.includes('app') || msg.includes('ios') || msg.includes('android')) {
      setLeadData(prev => ({ ...prev, service: 'Mobile App Development' }))
      return "Perfect timing! Mobile apps are my specialty - I've launched 45+ apps with an average 4.8-star rating. Our clients typically see 300% user engagement increase. Are you thinking native iOS/Android or cross-platform React Native? By the way, I'd love to know your name and email so I can send you some relevant case studies!"
    }
    
    if (msg.includes('marketing') || msg.includes('seo') || msg.includes('social media') || msg.includes('ads')) {
      setLeadData(prev => ({ ...prev, service: 'Digital Marketing' }))
      return "Smart investment! Our marketing campaigns have generated $2.5M+ in client revenue this year alone. I personally manage accounts that average 180% ROAS. Are you looking to increase leads, improve brand awareness, or boost online sales? What's your name and email so I can share some specific results from your industry?"
    }

    // Handle contact info collection based on stage
    if (awaitingInfo === 'name') {
      const extractedName = foundName || userMessage.trim().split(' ').slice(0, 2).join(' ')
      if (extractedName && extractedName.length > 1) {
        setLeadData(prev => ({ ...prev, name: extractedName }))
        setAwaitingInfo('email')
        return `${extractedName}, great to meet you! I'm excited to learn about your project. What's your email? I'll send you our exclusive client success stories and a custom strategy blueprint for your industry.`
      } else {
        return "I'd love to know your name so I can personalize our conversation better. What should I call you?"
      }
    }

    if (awaitingInfo === 'email') {
      if (foundEmail) {
        setLeadData(prev => ({ ...prev, email: foundEmail[0] }))
        setAwaitingInfo('phone')
        return "Perfect! I'm preparing a custom proposal for you right now. What's your phone number? I guarantee a call with me will give you at least 3 actionable strategies to grow your business, whether you work with us or not. That's my commitment to every entrepreneur."
      } else if (msg.includes('@') || msg.includes('email')) {
        const possibleEmail = userMessage.match(/\S+@\S+\.\S+/)
        if (possibleEmail) {
          setLeadData(prev => ({ ...prev, email: possibleEmail[0] }))
          setAwaitingInfo('phone')
          return "Great! Got your email. And your phone number? I prefer quick 10-15 minute strategy calls - they're way more effective than long email chains."
        }
      }
      return "I need your email address to send you our portfolio and case studies. What's your email?"
    }

    if (awaitingInfo === 'phone') {
      if (foundPhone) {
        setLeadData(prev => ({ ...prev, phone: foundPhone[0] }))
        setAwaitingInfo('')
        setHasProvidedContact(true)
        setConversationStage('closing')
        
        // Trigger lead save
        setTimeout(() => saveLead(), 500)
        
        return `Outstanding! ${leadData.name}, I have all your details. Here's what happens next:\n\n✅ I'm sending your info to our project team RIGHT NOW\n✅ You'll get a detailed proposal within 2 hours\n✅ I'll call you personally tomorrow to discuss strategy\n✅ I'll share 3 growth hacks specific to your industry\n\nThis project sounds exciting! Any specific features or concerns I should highlight to our technical team?`
      } else {
        const phoneMatch = userMessage.match(/[\d\s\-\+\(\)]+/)
        if (phoneMatch && phoneMatch[0].replace(/\D/g, '').length >= 10) {
          setLeadData(prev => ({ ...prev, phone: phoneMatch[0].trim() }))
          setAwaitingInfo('')
          setHasProvidedContact(true)
          setConversationStage('closing')
          
          setTimeout(() => saveLead(), 500)
          
          return `Perfect! I have your contact details. I'm processing your information now and you'll hear from us soon with a custom proposal tailored to your needs. 🚀`
        }
      }
      return "What's your phone number? I'd love to schedule a quick strategy call to discuss your project in detail."
    }

    // If no contact info yet, start collecting
    if (!leadData.name && !leadData.email && conversationStage !== 'collecting_info') {
      setConversationStage('collecting_info')
      setAwaitingInfo('name')
      return "I'd love to personalize our conversation and send you some relevant resources! What's your name?"
    }

    // Default professional responses
    const responses = [
      "That's a great point! Based on my experience with similar projects, I can definitely help you with that. What's your name and email so I can send you some specific examples?",
      "Interesting! I've helped many clients with similar challenges. The key is finding the right strategy for your specific situation. What's your contact information so I can share some relevant case studies?",
      "Excellent question! This shows you're thinking strategically about your business. I'd love to discuss this further - what's your name and email so I can follow up with detailed information?",
      "I appreciate your interest! Based on what you're telling me, I can see several opportunities for growth. What's your name so I can personalize my recommendations?"
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const addMessage = (text, isBot = false) => {
    const newMessage = {
      id: Date.now(),
      text,
      isBot,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
  }

  const handleSendMessage = async () => {
    if (!message.trim()) return
    
    const userMessage = message.trim()
    addMessage(userMessage)
    setMessage('')
    setIsTyping(true)

    // Store user message in lead data
    setLeadData(prev => ({ ...prev, message: prev.message + '\nUser: ' + userMessage }))
    
    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(userMessage, conversationStage)
      addMessage(botResponse, true)
      setIsTyping(false)
    }, 1200 + Math.random() * 800)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300 flex items-center justify-center ${
          isOpen ? 'rotate-180' : 'animate-bounce'
        }`}
        aria-label="Chat with Pratik"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        
        {/* Notification dot */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">1</span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[500px] bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-4 border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-sm">
                  PR
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900"></div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">Pratik Rajput</h3>
                <p className="text-sm text-blue-300">Sales Manager • Online now</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-80">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2 ${msg.isBot ? '' : 'justify-end'}`}
              >
                {msg.isBot && (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    PR
                  </div>
                )}
                
                <div
                  className={`max-w-xs p-3 rounded-2xl ${
                    msg.isBot
                      ? 'bg-gray-800 text-white border border-gray-700/50'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white ml-auto'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  <p className="text-xs opacity-60 mt-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {!msg.isBot && (
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  PR
                </div>
                <div className="bg-gray-800 p-3 rounded-2xl border border-gray-700/50">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700/50">
            <div className="flex gap-2">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Pratik about your project..."
                className="flex-1 bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-24 min-h-[48px]"
                disabled={isTyping}
                rows={1}
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim() || isTyping}
                className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            {/* Powered by */}
            <p className="text-xs text-gray-500 text-center mt-2">
              Powered by <span className="text-blue-400">Codastra AI</span> • Sales Manager: Pratik Rajput
            </p>
          </div>

          {/* Status indicators */}
          {leadSaved && (
            <div className="absolute top-20 left-4 right-4 bg-green-600/20 border border-green-500/30 rounded-xl p-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <Check className="w-4 h-4" />
                <span>Lead saved! Pratik will contact you soon.</span>
              </div>
            </div>
          )}

          {leadSaveError && saveAttempts >= 3 && (
            <div className="absolute top-20 left-4 right-4 bg-yellow-600/20 border border-yellow-500/30 rounded-xl p-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-yellow-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>Having trouble saving data, but Pratik got your message!</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
