// pages/index.js - Fixed for Vercel Deployment
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Star, Users, Trophy, Zap, Check, Play, Shield, Award, Sparkles, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Services from '../components/Services'
import ContactForm from '../components/ContactForm'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)
  
  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  // Enhanced stats with better animations
  const stats = [
    { 
      icon: Users, 
      number: 300, 
      label: 'Happy Clients', 
      suffix: '+',
      color: 'from-blue-400 to-blue-600',
      description: 'Satisfied customers worldwide'
    },
    { 
      icon: Trophy, 
      number: 200, 
      label: 'Projects Completed', 
      suffix: '+',
      color: 'from-purple-400 to-purple-600',
      description: 'Successful deliveries'
    },
    { 
      icon: Star, 
      number: 4.9, 
      label: 'Client Rating', 
      isDecimal: true,
      color: 'from-yellow-400 to-yellow-600',
      description: 'Average satisfaction score'
    },
    { 
      icon: Zap, 
      number: 99, 
      label: 'Success Rate', 
      isPercentage: true,
      color: 'from-green-400 to-green-600',
      description: 'Project completion rate'
    },
  ]

  // Enhanced testimonials with more details
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc",
      company: "TechStart Inc",
      content: "Their innovative approach transformed our digital presence completely. ROI increased by 300% within 6 months!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      project: "E-commerce Platform"
    },
    {
      name: "Michael Chen",
      role: "CTO, InnovateLab",
      company: "InnovateLab", 
      content: "Exceptional quality and attention to detail. They delivered beyond our expectations with cutting-edge technology.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      project: "Mobile Application"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director, GlobalTech",
      company: "GlobalTech",
      content: "Professional, creative, and results-driven. Our best investment in digital transformation. Highly recommended!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      project: "Web Application"
    }
  ]

  // Enhanced features showcase
  const features = [
    {
      icon: Shield,
      title: "100% Secure Process",
      description: "Enterprise-grade security protocols",
      color: "text-blue-400"
    },
    {
      icon: Zap,
      title: "Lightning Fast Delivery", 
      description: "Agile development methodology",
      color: "text-yellow-400"
    },
    {
      icon: Award,
      title: "Award-Winning Results",
      description: "Industry-recognized excellence",
      color: "text-purple-400"
    }
  ]

  // Enhanced counter hook with easing
  const useCounter = (end, duration = 2500, start = 0) => {
    const [count, setCount] = useState(start)
    
    useEffect(() => {
      if (!isLoaded) return
      
      let startTime
      const startCount = start
      
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        
        // Enhanced easing function
        const easeOutCubic = 1 - Math.pow(1 - progress, 3)
        setCount(startCount + (end - startCount) * easeOutCubic)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      requestAnimationFrame(animate)
    }, [end, duration, start, isLoaded])
    
    return count
  }

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Auto-rotate testimonials with pause on hover
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000) // Increased to 6 seconds
    return () => clearInterval(interval)
  }, [testimonials.length]) // Added dependency

  return (
    <>
      <Head>
        <title>Digital Excellence Delivered | Professional Web Development Agency</title>
        <meta name="description" content="Transform your business with our award-winning digital solutions. 300+ happy clients, 200+ projects completed. Web development, mobile apps, UI/UX design." />
        <meta name="keywords" content="web development, mobile apps, UI/UX design, digital agency, software development" />
        <meta property="og:title" content="Digital Excellence Delivered" />
        <meta property="og:description" content="Professional digital agency with 300+ happy clients and 200+ completed projects." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop" />
        <link rel="canonical" href="https://yourwebsite.com" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Digital Excellence Agency",
              "description": "Professional digital agency specializing in web development, mobile apps, and UI/UX design",
              "url": "https://yourwebsite.com",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "300"
              },
              "offers": {
                "@type": "Offer",
                "description": "Digital development services",
                "priceRange": "$"
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <Navigation />
        
        {/* Enhanced Hero Section with Parallax */}
        <motion.section 
          ref={heroRef}
          className="pt-32 pb-20 px-4 text-center relative overflow-hidden min-h-screen flex items-center"
          style={{ y, opacity }}
        >
          {/* Dynamic Background Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Interactive gradient orbs */}
            <motion.div 
              className="floating-orb w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-600/30 top-10 -left-20"
              animate={{
                x: mousePosition.x * 0.1,
                y: mousePosition.y * 0.1,
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div 
              className="floating-orb w-80 h-80 bg-gradient-to-r from-purple-500/25 to-pink-500/25 top-1/3 -right-16"
              animate={{
                x: -mousePosition.x * 0.05,
                y: -mousePosition.y * 0.05,
                scale: [1, 0.9, 1],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div 
              className="floating-orb w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 bottom-20 left-1/3"
              animate={{
                x: mousePosition.x * 0.08,
                y: -mousePosition.y * 0.08,
                rotate: 360,
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            
            {/* Animated geometric shapes */}
            <motion.div 
              className="absolute top-20 right-20 w-32 h-32 border border-blue-400/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ transform: "rotate(45deg)" }}
            />
            <motion.div 
              className="absolute bottom-40 left-16 w-24 h-24 border border-purple-400/30 rounded-full"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          
          {/* Animated grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
              backgroundSize: '50px 50px',
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
            }}
          />
          
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Enhanced Hero Badge */}
            <motion.div
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 mb-8 backdrop-blur-md hover:border-blue-400/50 transition-all duration-300"
              initial={{ opacity: 0, y: -30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Sparkles className="w-5 h-5 text-blue-400 mr-3 animate-pulse" />
              <span className="text-sm text-blue-300 font-semibold tracking-wide">Award-Winning Digital Agency</span>
              <motion.div 
                className="w-2 h-2 bg-green-400 rounded-full ml-3"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Enhanced Hero Title */}
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            >
              <motion.span 
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-300% animate-gradient-x inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                Digital Excellence
              </motion.span>
              <br />
              <motion.span 
                className="text-white font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                Delivered
              </motion.span>
            </motion.h1>
            
            {/* Enhanced Hero Description */}
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              We create <motion.span 
                className="text-blue-400 font-medium"
                whileHover={{ color: "#a855f7" }}
                transition={{ duration: 0.3 }}
              >
                extraordinary digital experiences
              </motion.span> that transform businesses and captivate audiences through cutting-edge technology and creative brilliance.
            </motion.p>

            {/* Enhanced CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <Link href="/contact">
                <motion.button 
                  className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg overflow-hidden shadow-2xl"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Start Your Project
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full"
                    animate={{ translateX: ["100%", "-100%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                </motion.button>
              </Link>
              
              <Link href="/portfolio">
                <motion.button 
                  className="group relative px-12 py-6 border-2 border-gray-600 text-white rounded-full font-semibold text-lg backdrop-blur-sm overflow-hidden"
                  whileHover={{ 
                    borderColor: "#3b82f6", 
                    color: "#60a5fa",
                    scale: 1.05 
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-3 relative z-10">
                    <Play className="w-5 h-5" />
                    Watch Our Work
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-blue-500/10 transform scale-x-0 origin-left"
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </Link>
            </motion.div>

            {/* Enhanced Trust Indicators */}
            <motion.div
              className="flex flex-wrap justify-center items-center gap-8 mb-20 opacity-70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <div className="text-sm text-gray-400 font-medium">Trusted by businesses worldwide</div>
              {[
                { icon: Users, text: "50+ Expert Team", color: "bg-blue-400" },
                { icon: Trophy, text: "300+ Happy Clients", color: "bg-green-400" },
                { text: "200+ Projects Completed", color: "bg-purple-400" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  className="flex items-center gap-2 text-gray-400"
                  whileHover={{ scale: 1.05, color: "#60a5fa" }}
                >
                  <motion.div 
                    className={`w-2 h-2 ${item.color} rounded-full`}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span className="text-sm font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Stats Grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {stats.map(({ icon: Icon, number, label, isDecimal, isPercentage, suffix, color, description }, i) => {
                const animatedNumber = useCounter(number, 3000)
                
                return (
                  <motion.div
                    key={i}
                    className="relative group cursor-pointer"
                    whileHover={{ y: -15, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ transitionDelay: `${1.2 + i * 0.1}s`, transitionDuration: '0.6s' }}
                  >
                    {/* Hover Glow Effect */}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-r ${color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30`}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Card Content */}
                    <div className="relative text-center p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 group-hover:border-blue-400/50 transition-all duration-300">
                      {/* Icon with Background */}
                      <div className="relative mb-6">
                        <motion.div 
                          className={`absolute inset-0 bg-gradient-to-r ${color} rounded-full blur-lg opacity-50`}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                        />
                        <Icon className="relative w-12 h-12 mx-auto text-blue-400" />
                      </div>
                      
                      {/* Animated Number */}
                      <motion.div 
                        className="text-5xl md:text-6xl font-bold text-white mb-3 font-mono"
                        whileHover={{ scale: 1.1 }}
                      >
                        {isDecimal 
                          ? animatedNumber.toFixed(1)
                          : isPercentage 
                            ? `${Math.ceil(animatedNumber)}%`
                            : `${Math.ceil(animatedNumber)}${suffix || '+'}`
                        }
                      </motion.div>
                      
                      {/* Label */}
                      <div className="text-gray-300 font-semibold mb-2">{label}</div>
                      
                      {/* Description */}
                      <div className="text-gray-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {description}
                      </div>
                      
                      {/* Status Indicator */}
                      <motion.div 
                        className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              <motion.div
                className="flex flex-col items-center gap-2 text-gray-400 cursor-pointer"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={{ color: "#60a5fa" }}
              >
                <span className="text-sm">Scroll to explore</span>
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Enhanced Services Section */}
        <section className="py-32 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10" />
          <div className="max-w-7xl mx-auto relative z-10">
            <Services />
          </div>
        </section>

        {/* Enhanced Client Testimonials */}
        <section className="py-32 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800/50 to-slate-900/50" />
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Client <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Success Stories</span>
              </h2>
              <p className="text-xl text-gray-300">Real results from our valued partnerships</p>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center">
                <div className="relative max-w-4xl w-full">
                  {/* Background Glow */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  
                  {/* Testimonial Card */}
                  <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-12 border border-white/10">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      {/* Client Image */}
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={testimonials[activeTestimonial].image}
                          alt={testimonials[activeTestimonial].name}
                          className="w-28 h-28 rounded-full object-cover border-4 border-blue-400/30"
                        />
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </motion.div>
                      
                      {/* Testimonial Content */}
                      <div className="flex-1 text-center md:text-left">
                        <motion.p 
                          className="text-2xl text-gray-200 mb-6 italic leading-relaxed"
                          key={activeTestimonial}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          &ldquo;{testimonials[activeTestimonial].content}&rdquo;
                        </motion.p>
                        
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                          <div>
                            <p className="text-white font-semibold text-lg">
                              {testimonials[activeTestimonial].name}
                            </p>
                            <p className="text-blue-400 font-medium">
                              {testimonials[activeTestimonial].role}
                            </p>
                            <p className="text-gray-400 text-sm">
                              Project: {testimonials[activeTestimonial].project}
                            </p>
                          </div>
                        </div>
                        
                        {/* Star Rating */}
                        <div className="flex justify-center md:justify-start gap-1">
                          {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1, duration: 0.3 }}
                            >
                              <Star className="w-5 h-5 text-yellow-400 fill-current" />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Testimonial Navigation */}
              <div className="flex justify-center mt-8 gap-3">
                {testimonials.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      i === activeTestimonial 
                        ? 'bg-blue-400 w-12' 
                        : 'bg-gray-600 hover:bg-gray-500 w-3'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-32 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30" />
          <motion.div 
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Background Glow */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {/* CTA Card */}
              <div className="relative p-16 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10">
                <motion.div
                  className="mb-8"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-8"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-12 h-12 text-white" />
                  </motion.div>
                </motion.div>

                <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
                  Ready to Create Something
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Extraordinary?
                  </span>
                </h2>
                
                <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                  Let&apos;s discuss how we can transform your vision into reality with our cutting-edge expertise and innovative solutions.
                </p>

                {/* Enhanced Feature Highlights */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  {features.map(({ icon: Icon, title, description, color }, i) => (
                    <motion.div
                      key={i}
                      className="flex flex-col items-center gap-3 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <motion.div
                        className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${color}`}
                        whileHover={{ 
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          borderColor: "rgba(59, 130, 246, 0.3)"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="w-8 h-8" />
                      </motion.div>
                      <div>
                        <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
                        <p className="text-gray-400 text-sm">{description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced Contact Form */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <ContactForm />
                </motion.div>
                
                {/* Trust Indicators */}
                <motion.div
                  className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  viewport={{ once: true }}
                >
                  {[
                    "Free consultation",
                    "No commitment required", 
                    "Response within 24 hours",
                    "100% confidential"
                  ].map((text, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2"
                      whileHover={{ color: "#60a5fa" }}
                    >
                      <Check className="w-4 h-4 text-green-400" />
                      <span>{text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
        
        {/* Enhanced Global Styles */}
        <style jsx>{`
          .floating-orb {
            border-radius: 50%;
            filter: blur(60px);
            animation: float 8s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg) scale(1); 
            }
            50% { 
              transform: translateY(-30px) rotate(180deg) scale(1.1); 
            }
          }
          
          .animate-spin-slow {
            animation: spin 20s linear infinite;
          }
          
          .animate-bounce-slow {
            animation: bounce 3s ease-in-out infinite;
          }
          
          .bg-300\\% {
            background-size: 300% 300%;
          }
          
          .animate-gradient-x {
            animation: gradient-x 3s ease infinite;
          }
          
          @keyframes gradient-x {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes bounce {
            0%, 100% { 
              transform: translateY(0px);
            }
            50% { 
              transform: translateY(-10px);
            }
          }

          /* Enhanced scroll behavior */
          html {
            scroll-behavior: smooth;
          }

          /* Custom selection colors */
          ::selection {
            background: rgba(59, 130, 246, 0.3);
            color: white;
          }

          /* Enhanced focus styles */
          button:focus,
          input:focus,
          textarea:focus {
            outline: 2px solid #3b82f6;
            outline-offset: 2px;
          }

          /* Loading states */
          .loading {
            opacity: 0.6;
            pointer-events: none;
          }

          /* Mobile optimizations */
          @media (max-width: 768px) {
            .floating-orb {
              width: 200px !important;
              height: 200px !important;
            }
            
            .text-9xl {
              font-size: 4rem !important;
            }
            
            .text-6xl {
              font-size: 3rem !important;
            }
          }

          /* Reduced motion preferences */
          @media (prefers-reduced-motion: reduce) {
            .floating-orb,
            .animate-spin-slow,
            .animate-bounce-slow,
            .animate-gradient-x {
              animation: none !important;
            }
            
            * {
              transition-duration: 0.01ms !important;
            }
          }

          /* High contrast mode */
          @media (prefers-contrast: high) {
            .bg-white\\/5 {
              background: rgba(255, 255, 255, 0.15) !important;
            }
            
            .border-white\\/10 {
              border-color: rgba(255, 255, 255, 0.3) !important;
            }
          }

          /* Print styles */
          @media print {
            .floating-orb,
            .animate-spin-slow,
            .animate-bounce-slow {
              display: none !important;
            }
            
            body {
              background: white !important;
              color: black !important;
            }
          }
        `}</style>
      </div>
    </>
  )
}
