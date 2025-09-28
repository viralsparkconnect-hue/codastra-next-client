// components/AIChatWidget.js - Complete Fixed Version with Pratik Sales Manager
import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'

// Simple icons as components
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

const AlertTriangle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>
)

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm Pratik Rajput, Sales Manager at Codastra. With 5+ years in international sales, I help businesses transform digitally. I've personally handled 200+ successful projects across 15 countries. What brings you here today?",
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
  const [saveAttempted, setSaveAttempted] = useState(false)
  
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  // EmailJS Configuration
  const EMAILJS_CONFIG = {
    SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_5dpu0tn',
    TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_qteujwt',
    PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'AlryU3umMzVGedPYh'
  }

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

  // Initialize EmailJS when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
      console.log('EmailJS initialized with public key:', EMAILJS_CONFIG.PUBLIC_KEY)
    }
  }, [])

  // Save lead to Google Sheets and send email
  const saveLead = async () => {
    if (saveAttempted) {
      console.log('Save already attempted, skipping...')
      return
    }
    
    setSaveAttempted(true)
    console.log('Starting to save lead from Pratik chat...')
    console.log('Lead data:', leadData)

    try {
      // Prepare conversation history
      const conversationHistory = messages
        .map(msg => `${msg.isBot ? 'Pratik' : 'User'}: ${msg.text}`)
        .join('\n')

      console.log('Conversation history length:', conversationHistory.length)

      // Prepare lead payload for Google Sheets
      const leadPayload = {
        name: leadData.name || 'Unknown',
        email: leadData.email || '',
        phone: leadData.phone || '',
        service: leadData.service || 'General Inquiry',
        budget: leadData.budget || '',
        timeline: leadData.timeline || '',
        company: leadData.company || '',
        message: leadData.message || conversationHistory,
        conversationHistory: conversationHistory,
        source: 'AI Chat Widget - Pratik',
        timestamp: new Date().toISOString(),
        salesManager: 'Pratik Rajput'
      }

      console.log('Sending POST request to /api/save-lead with payload:', leadPayload)

      // Save to Google Sheets via API
      const response = await fetch('/api/save-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadPayload)
      })

      console.log('API Response status:', response.status)
      console.log('API Response headers:', response.headers)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log('API Response data:', result)
      
      if (result.success) {
        setLeadSaved(true)
        console.log('Lead saved successfully to Google Sheets:', result.leadId)
        
        // Send email notification using EmailJS
        console.log('Attempting to send email via EmailJS...')
        try {
          const templateParams = {
            to_name: 'Codastra Team',
            from_name: leadData.name || 'Chat Lead',
            from_email: leadData.email || 'No email provided',
            phone: leadData.phone || 'No phone provided',
            service: leadData.service || 'General Inquiry',
            budget: leadData.budget || 'Not specified',
            timeline: leadData.timeline || 'Not specified',
            company: leadData.company || 'Not specified',
            message: conversationHistory,
            lead_source: 'AI Chat Widget - Pratik Rajput',
            sales_manager: 'Pratik Rajput',
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

          console.log('Email sent successfully via EmailJS:', emailResult.text)
          
        } catch (emailError) {
          console.error('EmailJS error:', emailError)
          // Don't fail the whole process if email fails
        }
      } else {
        console.error('Failed to save lead to Google Sheets:', result.error)
        throw new Error(result.error || 'Unknown error from Google Sheets API')
      }

    } catch (error) {
      console.error('Error in saveLead function:', error)
      // Show error message to user
      addMessage("I apologize, there was a technical issue saving your information. Please try contacting us directly at codastra.conect@gmail.com or +91 98346 83297.", true)
    }
  }

  // Enhanced AI responses with professional sales approach
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

    // Service-specific responses with ROI focus
    if (msg.includes('web') || msg.includes('website') || msg.includes('site')) {
      setLeadData(prev => ({ ...prev, service: 'Web Development' }))
      return "Excellent choice! I've personally overseen 80+ website projects that averaged 250% ROI within 6 months. Our React/Next.js websites typically see 40% faster load times and 60% higher conversion rates. What's your current website challenge - outdated design, poor performance, or starting fresh?"
    }
    
    if (msg.includes('mobile') || msg.includes('app') || msg.includes('ios') || msg.includes('android')) {
      setLeadData(prev => ({ ...prev, service: 'Mobile App Development' }))
      return "Perfect timing! Mobile apps are my specialty - I've launched 45+ apps with an average 4.8-star rating. Our clients typically see 300% user engagement increase. Are you thinking native iOS/Android or cross-platform React Native? What's the core functionality you need?"
    }
    
    if (msg.includes('marketing') || msg.includes('seo') || msg.includes('social media') || msg.includes('ads')) {
      setLeadData(prev => ({ ...prev, service: 'Digital Marketing' }))
      return "Smart investment! Our marketing campaigns have generated $2.5M+ in client revenue this year alone. I personally manage accounts that average 180% ROAS. Are you looking to increase leads, improve brand awareness, or boost online sales? What's your current biggest marketing challenge?"
    }
    
    if (msg.includes('design') || msg.includes('logo') || msg.includes('brand') || msg.includes('graphics')) {
      setLeadData(prev => ({ ...prev, service: 'Branding & Design' }))
      return "Great decision! Strong branding increases business value by 20-25%. I've worked with 150+ companies on brand transformation - from startups to Fortune 500s. Do you need a complete rebrand, logo refresh, or specific marketing materials? What industry are you in?"
    }

    if (msg.includes('ecommerce') || msg.includes('e-commerce') || msg.includes('online store') || msg.includes('shop')) {
      setLeadData(prev => ({ ...prev, service: 'E-commerce Development' }))
      return "Fantastic opportunity! E-commerce is booming - I've built stores that hit $100K+ monthly revenue within 6 months. Our Shopify/WooCommerce solutions average 25% higher conversion rates than industry standard. What products are you selling, and what's your target market?"
    }

    // Budget and ROI discussion
    if (msg.includes('cost') || msg.includes('price') || msg.includes('budget') || msg.includes('$') || msg.includes('investment')) {
      const budgetMatch = msg.match(/(\$?\d+(?:,\d{3})*(?:k|thousand|million)?)/i)
      if (budgetMatch) {
        setLeadData(prev => ({ ...prev, budget: budgetMatch[0] }))
      }
      return "I appreciate you thinking about investment wisely. Our projects range from $2,000 to $50,000+ depending on scope and complexity. Here's what matters most - ROI. Our average client sees 250% return within 8 months. What's your ideal budget range? I'll show you exactly how we can maximize your returns."
    }

    // Timeline and urgency
    if (msg.includes('when') || msg.includes('timeline') || msg.includes('urgent') || msg.includes('asap') || msg.includes('deadline') || msg.includes('launch')) {
      setLeadData(prev => ({ ...prev, timeline: userMessage }))
      return "Great question! Speed matters in business. Our typical timelines: Simple websites (2-3 weeks), Complex web apps (6-8 weeks), Mobile apps (8-12 weeks). I can fast-track urgent projects with my priority team. What's driving your timeline - market opportunity, competitor pressure, or business launch?"
    }

    // Contact information collection with urgency
    if (stage === 'collecting_info' || msg.includes('contact') || (!leadData.name && !leadData.email && awaitingInfo !== 'name' && awaitingInfo !== 'email' && awaitingInfo !== 'phone')) {
      if (!leadData.name && awaitingInfo !== 'name') {
        setAwaitingInfo('name')
        return "I'd love to personalize our conversation! What's your name? As a sales manager, I believe in building real relationships, not just transactions."
      } else if (!leadData.email && awaitingInfo !== 'email') {
        setAwaitingInfo('email')
        return `Perfect to meet you, ${leadData.name}! What's your email address? I'll send you our portfolio with case studies showing exactly how we've helped businesses like yours achieve 200-300% growth. Plus, you'll get my direct contact for priority support.`
      } else if (!leadData.phone && awaitingInfo !== 'phone') {
        setAwaitingInfo('phone')
        return "Excellent! And your phone number? I prefer quick 10-15 minute strategy calls - they're way more effective than long email chains. I'll call you personally to discuss your project and share some insider tips that could save you thousands."
      }
    }

    // Handle awaiting specific information
    if (awaitingInfo === 'name') {
      const extractedName = foundName ? foundName[1].trim() : userMessage.trim()
      setLeadData(prev => ({ ...prev, name: extractedName }))
      setAwaitingInfo('email')
      return `${extractedName}, great to meet you! I'm excited to learn about your project. What's your email? I'll send you our exclusive client success stories and a custom strategy blueprint for your industry.`
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
      return "Perfect! I'm preparing a custom proposal for you right now. What's your phone number? I guarantee a call with me will give you at least 3 actionable strategies to grow your business, whether you work with us or not. That's my commitment to every entrepreneur."
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
      
      return `Outstanding! ${leadData.name}, I have all your details. Here's what happens next:\n\n✅ I'm sending your info to our project team RIGHT NOW\n✅ You'll get a detailed proposal within 2 hours\n✅ I'll call you personally tomorrow to discuss strategy\n✅ I'll share 3 growth hacks specific to your industry\n\nThis project sounds exciting! Any specific features or concerns I should highlight to our technical team?`
    }

    // Objection handling with social proof
    if (msg.includes('expensive') || msg.includes('too much') || msg.includes('high price') || msg.includes('cost too much')) {
      return "I totally understand - smart business owners question every investment. Here's the reality: Our cheapest client made $85K additional revenue in 8 months from a $5K investment. Our most expensive client ($40K project) generated $500K+ in the first year. Price isn't the issue - it's ROI. Want to see specific case studies in your industry?"
    }

    if (msg.includes('think about') || msg.includes('consider') || msg.includes('not sure') || msg.includes('maybe later')) {
      return "Absolutely, this is a big decision! Here's what I tell all my clients: while you're thinking, your competitors are acting. I've seen businesses lose market opportunities by waiting 6 months. How about this - let me send you our client results portfolio? No pressure, just proof. What's your email again?"
    }

    // Closing responses with urgency
    if (hasProvidedContact) {
      return "Perfect! I've noted that for our technical team. Your project is now in our priority queue. Expect my call within 24 hours with a detailed roadmap and pricing. Pro tip: We're offering 15% off for projects starting this month. Ready to dominate your market?"
    }

    // Greeting and qualification responses
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('good morning') || msg.includes('good afternoon')) {
      setConversationStage('qualifying')
      return "Hello! Fantastic to connect with you. I'm here to help transform your business digitally. In my 5+ years managing international projects, I've seen businesses 3X their revenue with the right strategy. What's your biggest business challenge right now? Here's what we excel at:\n\n🌐 Web Development (avg 250% ROI)\n📱 Mobile Apps (avg 300% engagement boost)\n📈 Digital Marketing (avg 180% ROAS)\n🎨 Branding & Design\n☁️ Cloud Solutions"
    }

    // Default responses based on stage
    if (stage === 'greeting') {
      setConversationStage('qualifying')
      return "Thanks for reaching out! As someone who's helped 200+ businesses scale internationally, I'm excited to learn about your vision. What specific business goal are you trying to achieve? More customers, better efficiency, or entering new markets?"
    }

    if (stage === 'qualifying') {
      setConversationStage('collecting_info')
      return "That sounds like an amazing opportunity! I can already see 3-4 strategies that could work perfectly for you. To create a winning proposal, I need a few details. First, what's your name? I prefer personal conversations - it's how I've built lasting partnerships with clients across 15 countries."
    }

    // Professional fallback responses
    const professionalResponses = [
      "That's a great point! Based on my experience with similar projects, here's what I'd recommend... But first, help me understand your specific situation better. What's your main business objective with this project?",
      "Interesting perspective! I've seen this challenge before with other clients. The solution usually involves a strategic approach combining technology and marketing. What's your target audience looking for?",
      "I love your thinking! In my 5+ years managing international projects, the most successful clients are those who ask detailed questions like this. What's driving this project - growth opportunity, competitive pressure, or operational efficiency?",
      "Excellent question! This tells me you're serious about results, not just features. The best ROI comes from aligning technology with business strategy. What's your biggest business bottleneck right now?",
      "Smart approach! I appreciate clients who think strategically. Based on your needs, I can recommend the perfect solution. What industry are you in, and who's your target customer?"
    ]

    return professionalResponses[Math.floor(Math.random() * professionalResponses.length)]
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
    
    // Simulate typing delay (realistic response time)
    setTimeout(() => {
      const botResponse = getBotResponse(userMessage, conversationStage)
      addMessage(botResponse, true)
      setIsTyping(false)
    }, 1200 + Math.random() * 800) // 1.2-2 second delay
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

          {/* Success indicator */}
          {leadSaved && (
            <div className="absolute top-20 left-4 right-4 bg-green-600/20 border border-green-500/30 rounded-xl p-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <Check className="w-4 h-4" />
                <span>Lead saved! Pratik will contact you soon.</span>
              </div>
            </div>
          )}
        </div>
      )}
