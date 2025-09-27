// components/AIChatWidget.js - Enhanced with Google Sheets Integration
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
        // Extract email manually if regex didn't catch it
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
        // Extract phone manually or use the message as phone
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
      return "Perfect! I've noted that down. Your dedicated project manager will include this in your custom proposal. You can expect to hear from us within
