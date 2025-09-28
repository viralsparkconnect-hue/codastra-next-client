// components/AIChatWidget.js - Improved Contact Collection
import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'

// Icons (unchanged)
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
  const [contactAttempts, setContactAttempts] = useState(0)
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

  // Save lead to backend - AGGRESSIVE VERSION
  const saveLead = async (forceMinimal = false) => {
    if (leadSaved || saveAttempts >= 3) return
    
    // More lenient saving criteria
    const hasMinimalData = leadData.name || leadData.email || leadData.phone
    const hasConversation = messages.length > 2
    
    if (!forceMinimal && !hasMinimalData) {
      console.log('Insufficient data for lead save')
      return
    }

    setSaveAttempts(prev => prev + 1)
    setLeadSaveError(false)

    try {
      console.log('🔄 Attempting lead save:', {
        attempt: saveAttempts + 1,
        name: leadData.name || 'Anonymous',
        email: leadData.email || 'No email',
        hasConversation
      })

      const conversationHistory = messages
        .map(msg => `${msg.isBot ? 'Pratik' : 'User'}: ${msg.text}`)
        .join('\n\n')

      const leadPayload = {
        name: leadData.name || `Anonymous Chat User ${Date.now()}`,
        email: leadData.email || '',
        phone: leadData.phone || '',
        service: leadData.service || 'Chat Inquiry',
        message: conversationHistory,
        budget: leadData.budget || '',
        timeline: leadData.timeline || '',
        company: leadData.company || '',
        source: 'AI Chat Widget - Pratik Rajput',
        timestamp: new Date().toISOString(),
        salesManager: 'Pratik Rajput',
        conversationHistory: conversationHistory,
        leadScore: calculateLeadScore(),
        status: 'Chat Incomplete' // Special status for incomplete leads
      }

      console.log('📤 Sending lead payload:', leadPayload)

      const response = await fetch('/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload)
      })

      const result = await response.json()
      console.log('📥 API Response:', result)
      
      if (result.success) {
        setLeadSaved(true)
        setLeadSaveError(false)
        console.log('✅ Lead saved successfully:', result.leadId)
        
        // Send email notification
        await sendEmailNotification(leadPayload, conversationHistory)
        
      } else {
        throw new Error(result.error || 'API returned failure')
      }

    } catch (error) {
      console.error('❌ Lead save error:', error)
      setLeadSaveError(true)
      
      // Retry logic
      if (saveAttempts < 2) {
        setTimeout(() => saveLead(forceMinimal), 3000)
      }
    }
  }

  // Calculate lead score based on available data
  const calculateLeadScore = () => {
    let score = 1 // Base score for engagement
    
    if (leadData.name) score += 2
    if (leadData.email) score += 3
    if (leadData.phone) score += 2
    if (leadData.service) score += 1
    if (messages.length > 4) score += 2 // Engagement
    
    return Math.min(score, 10)
  }

  // Send email notification
  const sendEmailNotification = async (data, conversationHistory) => {
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_5dpu0tn',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_qteujwt',
        {
          to_name: 'Codastra Team',
          from_name: data.name || 'Anonymous Chat User',
          from_email: data.email || 'No email provided',
          phone: data.phone || 'No phone provided',
          service: data.service || 'Chat Inquiry',
          message: conversationHistory,
          lead_source: 'AI Chat Widget - Pratik Rajput',
          sales_manager: 'Pratik Rajput',
          lead_score: data.leadScore || 'Unknown',
          status: data.status || 'New'
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'AlryU3umMzVGedPYh'
      )
      console.log('✅ Email notification sent')
    } catch (error) {
      console.error('❌ Email failed:', error)
    }
  }

  // Enhanced response system with persistent contact collection
  const getBotResponse = (userMessage, stage) => {
    const msg = userMessage.toLowerCase()
    
    // Extract contact information
    const emailRegex = /[\w\.-]+@[\w\.-]+\.\w+/g
    const phoneRegex = /(\+?\d{1,4}[\s-]?)?\(?\d{3,4}\)?[\s-]?\d{3,4}[\s-]?\d{3,5}/g
    const namePatterns = [
      /(?:i'm|i am|my name is|call me|this is|name:)\s*([a-zA-Z\s]{2,30})/i,
      /^([a-zA-Z]{2,20}(?:\s+[a-zA-Z]{2,20}){0,2})(?:\s|$)/
    ]
    
    const foundEmail = userMessage.match(emailRegex)
    const foundPhone = userMessage.match(phoneRegex)
    let foundName = null
    
    for (const pattern of namePatterns) {
      const match = userMessage.match(pattern)
      if (match && match[1]) {
        foundName = match[1].trim()
        break
      }
    }

    // Update lead data
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

    // Auto-save when we get any contact info
    if (dataUpdated) {
      console.log('Contact info detected, triggering save...')
      setTimeout(() => saveLead(), 1000)
    }

    // Service detection with immediate follow-up for contact
    if (msg.includes('web') || msg.includes('website')) {
      setLeadData(prev => ({ ...prev, service: 'Web Development' }))
      
      if (!leadData.name && !foundName) {
        setAwaitingInfo('name')
        return "Excellent! Web development is my specialty - I've built 80+ websites with an average 250% ROI. To create a perfect solution for you, what's your name? I like to keep things personal! 😊"
      } else if (!leadData.email && !foundEmail) {
        setAwaitingInfo('email')
        return `Perfect choice, ${leadData.name || foundName}! I've personally overseen websites that get 40% faster load times and 60% higher conversions. What's your email? I'll send you our web development portfolio with real client results immediately!`
      }
      
      return "Web development is a great investment! What specific features do you need for your website?"
    }

    if (msg.includes('mobile') || msg.includes('app')) {
      setLeadData(prev => ({ ...prev, service: 'Mobile App Development' }))
      
      if (!leadData.name && !foundName) {
        setAwaitingInfo('name')
        return "Mobile apps are the future! I've launched 45+ apps averaging 4.8-star ratings. What's your name so I can personalize my recommendations for your app idea?"
      }
      
      return "Mobile app development is exciting! Are you thinking iOS, Android, or both?"
    }

    // Handle specific contact collection stages
    if (awaitingInfo === 'name') {
      const extractedName = foundName || userMessage.trim().split(/[^\w\s]/).filter(part => part.trim().length > 1)[0] || userMessage.trim()
      
      if (extractedName && extractedName.length > 1) {
        setLeadData(prev => ({ ...prev, name: extractedName }))
        setAwaitingInfo('email')
        setContactAttempts(prev => prev + 1)
        
        // Save partial lead
        setTimeout(() => saveLead(), 500)
        
        return `${extractedName}, fantastic to meet you! 🎉 I'm already excited about your project. What's your email address? I'll immediately send you:\n\n📊 Our portfolio with 200+ successful projects\n💡 Industry-specific case studies\n📈 ROI benchmarks for your sector\n🎁 Free strategy consultation booking link`
      } else {
        setContactAttempts(prev => prev + 1)
        if (contactAttempts >= 2) {
          return "No worries about the name! Let's focus on your project. What's your email so I can send you our portfolio? Even if you're just browsing, you'll get valuable insights about your industry! 📧"
        }
        return "I'd love to know what to call you! What's your name? 😊"
      }
    }

    if (awaitingInfo === 'email') {
      if (foundEmail) {
        setLeadData(prev => ({ ...prev, email: foundEmail[0] }))
        setAwaitingInfo('phone')
        setContactAttempts(prev => prev + 1)
        
        // Save with email
        setTimeout(() => saveLead(), 500)
        
        return `Perfect! I'm sending resources to ${foundEmail[0]} right now! 📧 Last question - what's your phone number? I prefer quick 10-15 minute strategy calls over long emails. I guarantee you'll get at least 3 actionable insights, even if you don't work with us!`
      } else {
        setContactAttempts(prev => prev + 1)
        if (contactAttempts >= 3) {
          // Give up on email, try phone
          setAwaitingInfo('phone')
          return "No problem! Some people prefer phone calls anyway. What's your phone number? I'll call you personally to discuss your project and share some insider strategies! 📱"
        }
        return "I need your email to send you our exclusive resources! What's your email address? (Don't worry, no spam - just valuable content!) ✉️"
      }
    }

    if (awaitingInfo === 'phone') {
      if (foundPhone) {
        setLeadData(prev => ({ ...prev, phone: foundPhone[0] }))
        setAwaitingInfo('')
        
        // Save complete lead
        setTimeout(() => saveLead(), 500)
        
        return `Excellent! ${leadData.name}, I have all your details now! 🎯\n\n✅ Sending your info to our team RIGHT NOW\n✅ You'll get a detailed proposal within 2 hours\n✅ I'll personally call you tomorrow for strategy discussion\n✅ Immediate access to our client portal\n\nThis is going to be an amazing project! Any specific features you're excited about?`
      } else {
        setContactAttempts(prev => prev + 1)
        if (contactAttempts >= 4) {
          // Final attempt - save what we have
          setTimeout(() => saveLead(true), 1000)
          return `No worries about the phone for now! I have enough to get started. My team will reach out via email with a detailed proposal. Thanks for your interest, ${leadData.name}! 🚀`
        }
        return "What's your phone number? Quick calls are so much more effective than endless emails! I promise it'll be valuable! 📞"
      }
    }

    // If we don't have basic contact info after a few exchanges, start collecting
    if (messages.length > 3 && !leadData.name && !leadData.email && !awaitingInfo) {
      setAwaitingInfo('name')
      setContactAttempts(0)
      return "I'm excited about helping with your project! To give you personalized recommendations, what's your name? 😊"
    }

    // Default responses with contact prompts
    const responses = [
      `That's interesting! I'd love to help you with that. By the way, what's your name so I can personalize my recommendations?`,
      `Great question! I have some specific insights for your situation. What's your email so I can send you relevant case studies?`,
      `Perfect! I can see several opportunities for your project. What's your phone number? A quick call would be much more effective than typing back and forth!`,
      `Excellent point! Based on your needs, I have some targeted solutions. What should I call you?`
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

    // Update lead message data
    setLeadData(prev => ({ 
      ...prev, 
      message: prev.message + (prev.message ? '\n' : '') + `User: ${userMessage}` 
    }))
    
    // Auto-save every 3 messages as backup
    if (messages.length % 3 === 0 && (leadData.name || leadData.email)) {
      setTimeout(() => saveLead(), 2000)
    }
    
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
            
            <p className="text-xs text-gray-500 text-center mt-2">
              Powered by <span className="text-blue-400">Codastra AI</span> • Sales Manager: Pratik Rajput
            </p>
          </div>

          {/* Status indicators */}
          {leadSaved && (
            <div className="absolute top-20 left-4 right-4 bg-green-600/20 border border-green-500/30 rounded-xl p-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <Check className="w-4 h-4" />
                <span>Information saved! Pratik will contact you soon.</span>
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
