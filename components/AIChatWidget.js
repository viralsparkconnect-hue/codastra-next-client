// components/AIChatWidget.js - Complete Enhanced with Google Sheets Integration
import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'

// Simple icons as components to avoid external dependencies
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

const Bot = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! 👋 I'm Alex from Codastra's sales team. I'm here to help you transform your business with our digital solutions. What brings you here today?",
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

  // Save lead to Google Sheets
  const saveLead = async () => {
    try {
      const conversationHistory = messages
        .map(msg => `${msg.isBot ? 'Bot' : 'User'}: ${msg.text}`)
        .join('\n')

      const leadPayload = {
        ...leadData,
        conversationHistory,
        source: 'AI Chat Widget',
        timestamp: new Date().toISOString()
      }

      const response = await fetch('/api/save-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadPayload)
      })

      const result = await response.json()
      
      if (result.success) {
        setLeadSaved(true)
        console.log('Lead saved successfully:', result.leadId)
        
        // Also send email notification
        try {
          await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_5dpu0tn',
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_8w0jacd',
            {
              to_name: 'Codastra Team',
              from_name: leadData.name || 'Chat Lead',
              from_email: leadData.email || 'No email provided',
              phone: leadData.phone || 'No phone provided',
              service: leadData.service || 'General Inquiry',
              message: conversationHistory,
              lead_source: 'AI Chat Widget'
            },
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'AlryU3umMzVGedPYh'
          )
          console.log('Email notification sent')
        } catch (emailError) {
          console.error('Email sending failed:', emailError)
        }
      } else {
        console.error('Failed to save lead:', result.error)
      }
    } catch (error) {
      console.error('Error saving lead:', error)
    }
  }

  // Enhanced AI responses with sales conversation logic
  const getBotResponse = (userMessage, stage) => {
    const msg = userMessage.toLowerCase()
    
    // Extract potential contact information from message
    const emailRegex = /[\w\.-]+@[\w\.-]+\.\w+/g
    const phoneRegex = /(\+?\d{1,4}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/g
    const namePattern = /(?:i'm|i am|my name is|call me|this is)\s+([a-zA-Z\s]+)/i
    
    const foundEmail = userMessage.match(emailRegex)
    const foundPhone = userMessage.match(phoneRegex)
    const foundName = userMessage.match(namePattern)

    // Update lead data if contact info is found
    if (foundEmail && !leadData.email) {
      setLeadData(prev => ({ ...prev, email: foundEmail[0] }))
    }
    if (foundPhone && !leadData.phone) {
      setLeadData(prev => ({ ...prev, phone: foundPhone[0] }))
    }
    if (foundName && !leadData.name) {
      setLeadData(prev => ({ ...prev, name: foundName[1].trim() }))
    }

    // Service-specific responses
    if (msg.includes('web') || msg.includes('website') || msg.includes('site')) {
      setLeadData(prev => ({ ...prev, service: 'Web Development' }))
      return "Excellent! Web development is one of our specialties. We've built 200+ websites using React, Next.js, and modern technologies. Are you looking to create a new website or redesign an existing one?"
    }
    
    if (msg.includes('mobile') || msg.includes('app') || msg.includes('ios') || msg.includes('android')) {
      setLeadData(prev => ({ ...prev, service: 'Mobile App Development' }))
      return "Perfect! We've developed 89+ mobile apps for iOS and Android. Our apps have generated amazing results for our clients. What type of app do you have in mind? E-commerce, business app, or something else?"
    }
    
    if (msg.includes('marketing') || msg.includes('seo') || msg.includes('social media') || msg.includes('ads')) {
      setLeadData(prev => ({ ...prev, service: 'Digital Marketing' }))
      return "Great choice! Our digital marketing campaigns have helped 234+ clients increase their ROI by an average of 250%. Are you looking to increase leads, improve brand awareness, or boost sales?"
    }
    
    if (msg.includes('design') || msg.includes('logo') || msg.includes('brand') || msg.includes('graphics')) {
      setLeadData(prev => ({ ...prev, service: 'Branding & Design' }))
      return "Wonderful! We've created stunning brand identities for 267+ companies. A strong brand can increase business value by 20-30%. Do you need a complete rebrand or specific design work?"
    }

    // Budget discussion
    if (msg.includes('cost') || msg.includes('price') || msg.includes('budget') || msg.includes('$')) {
      const budgetMatch = msg.match(/(\$?\d+(?:,\d{3})*(?:k|thousand|million)?)/i)
      if (budgetMatch) {
        setLeadData(prev => ({ ...prev, budget: budgetMatch[0] }))
      }
      return "I understand budget is important. Our projects typically range from $999 to $10,000+ depending on complexity. What's your ideal investment range for this project? This helps me recommend the perfect solution for you."
    }

    // Timeline discussion
    if (msg.includes('when') || msg.includes('timeline') || msg.includes('urgent') || msg.includes('asap') || msg.includes('deadline')) {
      return "Great question! Most of our projects complete within 2-12 weeks depending on scope. Do you have a specific deadline in mind? Understanding your timeline helps us prioritize your project appropriately."
    }

    // Contact information requests
    if (stage === 'collecting_info' || msg.includes('contact') || (!leadData.name && !leadData.email && awaitingInfo !== 'name' && awaitingInfo !== 'email' && awaitingInfo !== 'phone')) {
      if (!leadData.name && awaitingInfo !== 'name') {
        setAwaitingInfo('name')
        return "I'd love to personalize our conversation! What's your name? 😊"
      } else if (!leadData.email && awaitingInfo !== 'email') {
        setAwaitingInfo('email')
        return `Nice to meet you, ${leadData.name}! Could you share your email address? I'll send you a detailed proposal with pricing and next steps.`
      } else if (!leadData.phone && awaitingInfo !== 'phone') {
        setAwaitingInfo('phone')
        return "Perfect! And your phone number? Sometimes it's easier to discuss project details over a quick call."
      }
    }

    // Handle awaiting specific information
    if (awaitingInfo === 'name') {
      const extractedName = foundName ? foundName[1].trim() : userMessage.trim()
      setLeadData(prev => ({ ...prev, name: extractedName }))
      setAwaitingInfo('email')
      return `Great to meet you, ${extractedName}! What's your email address? I'll send you a customized proposal with our best recommendations.`
    }

    if (awaitingInfo === 'email' && (foundEmail || msg.includes('@'))) {
      if (foundEmail) {
        setLeadData(prev => ({ ...prev, email: foundEmail[0] }))
      } else {
        const emailMatch = userMessage.match(/\S+@\S+\.\S+/)
        if (emailMatch) {
          setLeadData(prev => ({ ...prev, email: emailMatch[0] }))
        }
      }
      setAwaitingInfo('phone')
      return "Perfect! And could I get your phone number? Sometimes a quick 10-minute call can save hours of back-and-forth messaging. 📞"
    }

    if (awaitingInfo === 'phone' && (foundPhone || msg.match(/\d{3}/) || msg.includes('phone') || msg.includes('number'))) {
      if (foundPhone) {
        setLeadData(prev => ({ ...prev, phone: foundPhone[0] }))
      } else {
        const phoneMatch = userMessage.match(/[\d\s\-\+\(\)]+/)
        if (phoneMatch) {
          setLeadData(prev => ({ ...prev, phone: phoneMatch[0].trim() }))
        } else {
          setLeadData(prev => ({ ...prev, phone: userMessage.trim() }))
        }
      }
      setAwaitingInfo('')
      setHasProvidedContact(true)
      setConversationStage('closing')
      
      // Save lead info to Google Sheets and send email
      setTimeout(() => saveLead(), 1000)
      
      return `Excellent! I have all your details. I'm sending this conversation and your requirements to our project manager right now. You'll receive a detailed proposal within 2 hours, and I'll call you tomorrow to discuss next steps. Is there anything else about your project I should mention to the team?`
    }

    // Qualification questions
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      setConversationStage('qualifying')
      return "Hello! 👋 I'm excited to learn about your project. What type of digital solution are you looking for? We specialize in:\n\n• Web Development\n• Mobile Apps  \n• Digital Marketing\n• Branding & Design\n• Cloud Solutions"
    }

    // Objection handling
    if (msg.includes('expensive') || msg.includes('too much') || msg.includes('high price')) {
      return "I completely understand your concern about investment. Here's the thing - our clients typically see 250% ROI within 6 months. We're not the cheapest, but we deliver results that pay for themselves. Would you like to see some client case studies showing actual returns?"
    }

    if (msg.includes('think about') || msg.includes('consider') || msg.includes('not sure')) {
      return "Absolutely, this is an important decision! While you're thinking, would you like me to send you our portfolio and client testimonials? No pressure - just so you can see the quality of work we deliver. What's your email address?"
    }

    // Closing responses
    if (hasProvidedContact) {
      return "Perfect! I've noted that down. Your dedicated project manager will include this in your custom proposal. You can expect to hear from us within 2 hours with a detailed plan and pricing. Thank you for choosing Codastra! 🚀"
    }

    // Default responses based on stage
    if (stage === 'greeting') {
      setConversationStage('qualifying')
      return "Thanks for reaching out! I'd love to help you with your digital transformation. What specific challenge are you looking to solve, or what goal are you trying to achieve with your project?"
    }

    if (stage === 'qualifying') {
      setConversationStage('collecting_info')
      return "That sounds like an exciting project! To provide you with the most accurate proposal and timeline, I'd like to get a few details. What's your name?"
    }

    // Fallback responses
    const fallbackResponses = [
      "That's interesting! Tell me more about what you have in mind for your project.",
      "I see! What's the main goal you're trying to achieve with this project?",
      "Great question! To give you the best recommendation, could you tell me more about your specific needs?",
      "I'd love to help with that! What's your timeline for getting this project started?",
      "Excellent! What's driving this project for your business right now?"
    ]

    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
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
    setLeadData(prev => ({ ...prev, message: prev.message + '\n' + userMessage }))
    
    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(userMessage, conversationStage)
      addMessage(botResponse, true)
      setIsTyping(false)
    }, 1000 + Math.random() * 1000) // 1-2 second delay
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
        aria-label="Open chat"
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
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900"></div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">Alex - Sales Assistant</h3>
                <p className="text-sm text-gray-400">Usually replies instantly</p>
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
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
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
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-800 p-3 rounded-2xl border border-gray-700/50">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
                placeholder="Type your message..."
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
              Powered by <span className="text-blue-400">Codastra AI</span>
            </p>
          </div>

          {/* Success indicator */}
          {leadSaved && (
            <div className="absolute top-20 left-4 right-4 bg-green-600/20 border border-green-500/30 rounded-xl p-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <Check className="w-4 h-4" />
                <span>Lead saved successfully!</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
