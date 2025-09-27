// components/AIChatWidget.js - Enhanced with AI Sales Agent & Lead Capture
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
  const [conversationStage, setConversationStage] = useState('greeting') // greeting, qualifying, collecting_info, closing
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
    if (stage === 'collecting_info' || msg.includes('contact') || (!leadData.name && !leadData.email)) {
      if (!leadData.name) {
        setAwaitingInfo('name')
        return "I'd love to personalize our conversation! What's your name? 😊"
      } else if (!leadData.email) {
        setAwaitingInfo('email')
        return `Nice to meet you, ${leadData.name}! Could you share your email address? I'll send you a detailed proposal with pricing and next steps.`
      } else if (!leadData.phone) {
        setAwaitingInfo('phone')
        return "Perfect! And your phone number? Sometimes it's easier to discuss project details over a quick call."
      }
    }

    // Handle awaiting specific information
    if (awaitingInfo === 'name' && !foundName) {
      setLeadData(prev => ({ ...prev, name: userMessage.trim() }))
      setAwaitingInfo('email')
      return `Great to meet you, ${userMessage.trim()}! What's your email address? I'll send you a customized proposal with our best recommendations.`
    }

    if (awaitingInfo === 'email' && foundEmail) {
      setAwaitingInfo('phone')
      return "Perfect! And could I get your phone number? Sometimes a quick 10-minute call can save hours of back-and-forth messaging. 📞"
    }

    if (awaitingInfo === 'phone' && foundPhone) {
      setAwaitingInfo('')
      setHasProvidedContact(true)
      setConversationStage('closing')
      
      // Send lead info to email
      setTimeout(() => sendLeadToEmail(), 1000)
      
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
      return "Perfect! I've noted that down. Your dedicated project manager will include this in your custom proposal. You can expect to hear from us within 2 hours via email, and I'll personally follow up with a call tomorrow. Thanks for choosing Codastra! 🚀"
    }

    // Default responses based on conversation stage
    const responses = {
      greeting: [
        "That sounds interesting! Tell me more about your business and what challenges you're facing. Understanding your goals helps me recommend the perfect solution.",
        "I'd love to help you with that! We've successfully completed 200+ similar projects. What's the main goal you want to achieve with this project?",
        "Excellent! You've come to the right place. We've helped 300+ businesses just like yours achieve incredible results. What's your biggest challenge right now?"
      ],
      qualifying: [
        "That makes sense! Based on what you've told me, I can already see a few ways we could help. To give you the best recommendation, what's your target timeline for this project?",
        "Great insight! We've solved similar challenges for many clients with fantastic results. What would success look like for you in 6 months?",
        "I love your vision! We specialize in exactly what you're describing. What's your estimated budget range for this investment?"
      ],
      collecting_info: [
        "This sounds like an amazing project! I'd love to connect you with our specialist team. Could you share your contact details so I can send you a detailed proposal?",
        "Perfect! Let me get your information so our team can prepare a custom solution for you. What's the best email to reach you at?",
        "I'm excited about this opportunity! To move forward quickly, I'll need your contact details. What's your name and email address?"
      ]
    }

    const stageResponses = responses[stage] || responses.greeting
    return stageResponses[Math.floor(Math.random() * stageResponses.length)]
  }

  // Send lead information to email using EmailJS
  const sendLeadToEmail = async () => {
    try {
      const conversationHistory = messages.map(msg => 
        `${msg.isBot ? 'AI Agent' : 'Customer'} (${msg.timestamp.toLocaleTimeString()}): ${msg.text}`
      ).join('\n\n')

      const templateParams = {
        customer_name: leadData.name || 'Unknown',
        customer_email: leadData.email || 'Not provided',
        customer_phone: leadData.phone || 'Not provided',
        service_interest: leadData.service || 'General Inquiry',
        budget_range: leadData.budget || 'Not specified',
        company_name: leadData.company || 'Not provided',
        conversation_history: conversationHistory,
        lead_source: 'Website AI Chat',
        timestamp: new Date().toLocaleString(),
        to_email: 'codastra.conect@gmail.com'
      }

      await emailjs.send(
        'service_5dpu0tn',     // Your service ID
        'template_8w0jacd',    // Your template ID  
        templateParams,
        'AlryU3umMzVGedPYh'    // Your public key
      )

      console.log('Lead successfully sent to email!')
      
      // Add a system message
      setTimeout(() => {
        const confirmationMessage = {
          id: Date.now(),
          text: "✅ Perfect! I've sent your information to our team. You'll receive a detailed proposal at " + leadData.email + " within 2 hours!",
          isBot: true,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, confirmationMessage])
      }, 2000)

    } catch (error) {
      console.error('Failed to send lead:', error)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    const userMessage = {
      id: Date.now(),
      text: message,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentMessage = message
    setMessage('')
    setIsTyping(true)

    // Update conversation stage logic
    if (!hasProvidedContact && (leadData.name && leadData.email && leadData.phone)) {
      setHasProvidedContact(true)
      setConversationStage('closing')
    }

    // Add slight delay for more natural feel
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(currentMessage, conversationStage),
        isBot: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
      
      // Update conversation stage
      if (conversationStage === 'greeting' && messages.length > 2) {
        setConversationStage('qualifying')
      } else if (conversationStage === 'qualifying' && messages.length > 6) {
        setConversationStage('collecting_info')
      }
    }, 1000 + Math.random() * 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="relative w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center group"
          aria-label="Chat with Sales Agent"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
        </button>
        
        {/* Attention-grabbing popup */}
        <div className="absolute bottom-20 right-0 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-gray-200 max-w-xs transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-bottom-right">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-gray-800 font-semibold text-sm">Hi! I'm Alex 👋</p>
              <p className="text-gray-600 text-xs">Ready to discuss your project? Click to chat!</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[32rem] bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h3 className="text-white font-semibold">Alex - Sales Agent</h3>
            <p className="text-gray-300 text-xs">
              {isTyping ? 'Typing...' : 'Online • Ready to help!'}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-white transition-colors p-1"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`flex gap-2 max-w-[85%] ${msg.isBot ? '' : 'flex-row-reverse'}`}>
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.isBot 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                  : 'bg-gradient-to-r from-gray-600 to-gray-700'
              }`}>
                {msg.isBot ? (
                  <Bot className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>
              
              {/* Message Bubble */}
              <div
                className={`p-3 rounded-2xl ${
                  msg.isBot
                    ? 'bg-white/10 text-white rounded-bl-sm'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-sm'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/10 text-white p-3 rounded-2xl rounded-bl-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Lead Progress Indicator */}
      {(leadData.name || leadData.email || leadData.service) && (
        <div className="px-4 py-2 bg-blue-900/20 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-green-300">
              {leadData.name && leadData.email && leadData.phone 
                ? "✅ Contact details collected!" 
                : "Gathering your information..."}
            </span>
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={awaitingInfo === 'name' ? "Your name..." : awaitingInfo === 'email' ? "Your email address..." : awaitingInfo === 'phone' ? "Your phone number..." : "Type your message..."}
            className="flex-1 bg-white/10 text-white placeholder-gray-400 rounded-xl px-4 py-2 border border-white/20 focus:border-blue-400 focus:outline-none resize-none min-h-[40px] max-h-[80px]"
            rows={1}
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  )
}
