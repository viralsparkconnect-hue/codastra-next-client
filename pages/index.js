// pages/index.js - Fixed for Vercel Deployment
import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Services from '../components/Services'
import ContactForm from '../components/ContactForm'

// Simple icon components to avoid external dependencies
const ArrowRight = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

const Star = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const Users = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
)

const Trophy = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
)

const Zap = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const Check = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const Play = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M13 16h-1.586a1 1 0 01-.707-.293L8.293 13.293A1 1 0 007.586 13H6" />
  </svg>
)

const Shield = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const Award = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
)

const Sparkles = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l3.057-3L12 3l3.943-3L19 3l2.5 8.5L19 20l-3.943-3L12 20l-3.057-3L5 20l-2.5-8.5L5 3z" />
  </svg>
)

const ChevronDown = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

  // Stats with proper animations
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

  // Testimonials data
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

  // Features showcase
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

  // Counter hook with proper cleanup
  const useCounter = (end, duration = 2500, start = 0) => {
    const [count, setCount] = useState(start)
    
    useEffect(() => {
      if (!isLoaded) return
      
      let animationFrameId
      let startTime
      const startCount = start
      
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        
        // Easing function
        const easeOutCubic = 1 - Math.pow(1 - progress, 3)
        setCount(startCount + (end - startCount) * easeOutCubic)
        
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate)
        }
      }
      
      animationFrameId = requestAnimationFrame(animate)
      
      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId)
        }
      }
    }, [end, duration, start, isLoaded])
    
    return count
  }

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (typeof window !== 'undefined') {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100
        })
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <>
      <Head>
        <title>Codastra - Digital Excellence Delivered | Professional Web Development Agency</title>
        <meta name="description" content="Transform your business with our award-winning digital solutions. 300+ happy clients, 200+ projects completed. Web development, mobile apps, UI/UX design." />
        <meta name="keywords" content="web development, mobile apps, UI/UX design, digital agency, software development" />
        <meta property="og:title" content="Codastra - Digital Excellence Delivered" />
        <meta property="og:description" content="Professional digital agency with 300+ happy clients and 200+ completed projects." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://yourwebsite.com" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Codastra",
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
        
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="pt-32 pb-20 px-4 text-center relative overflow-hidden min-h-screen flex items-center"
        >
          {/* Dynamic Background Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Interactive gradient orbs */}
            <div 
              className="floating-orb w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-600/30 top-10 -left-20"
              style={{
                transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
              }}
            />
            <div 
              className="floating-orb w-80 h-80 bg-gradient-to-r from-purple-500/25 to-pink-500/25 top-1/3 -right-16"
              style={{
                transform: `translate(${-mousePosition.x * 0.05}px, ${-mousePosition.y * 0.05}px)`
              }}
            />
            <div 
              className="floating-orb w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 bottom-20 left-1/3"
              style={{
                transform: `translate(${mousePosition.x * 0.08}px, ${-mousePosition.y * 0.08}px)`
              }}
            />
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Hero Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 mb-8 backdrop-blur-md hover:border-blue-400/50 transition-all duration-300">
              <Sparkles className="w-5 h-5 text-blue-400 mr-3 animate-pulse" />
              <span className="text-sm text-blue-300 font-semibold tracking-wide">Award-Winning Digital Agency</span>
              <div className="w-2 h-2 bg-green-400 rounded-full ml-3 animate-pulse" />
            </div>

            {/* Hero Title */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-300% animate-gradient-x inline-block">
                Digital Excellence
              </span>
              <br />
              <span className="text-white font-light">
                Delivered
              </span>
            </h1>
            
            {/* Hero Description */}
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
              We create <span className="text-blue-400 font-medium hover:text-purple-400 transition-colors duration-300">
                extraordinary digital experiences
              </span> that transform businesses and captivate audiences through cutting-edge technology and creative brilliance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24">
              <Link href="/contact">
                <button className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg overflow-hidden shadow-2xl hover:scale-105 hover:shadow-blue-500/50 transition-all duration-300">
                  <span className="relative z-10 flex items-center gap-3">
                    Start Your Project
                    <ArrowRight />
                  </span>
                </button>
              </Link>
              
              <Link href="/portfolio">
                <button className="group relative px-12 py-6 border-2 border-gray-600 text-white rounded-full font-semibold text-lg backdrop-blur-sm overflow-hidden hover:border-blue-400 hover:text-blue-400 hover:scale-105 transition-all duration-300">
                  <span className="flex items-center gap-3 relative z-10">
                    <Play className="w-5 h-5" />
                    Watch Our Work
                  </span>
                </button>
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map(({ icon: Icon, number, label, isDecimal, isPercentage, suffix, color, description }, i) => {
                const animatedNumber = useCounter(number, 3000)
                
                return (
                  <div
                    key={i}
                    className="relative group cursor-pointer hover:-translate-y-4 hover:scale-105 transition-all duration-300"
                  >
                    {/* Card Content */}
                    <div className="relative text-center p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 group-hover:border-blue-400/50 transition-all duration-300">
                      {/* Icon */}
                      <div className="relative mb-6">
                        <Icon className="relative w-12 h-12 mx-auto text-blue-400" />
                      </div>
                      
                      {/* Animated Number */}
                      <div className="text-5xl md:text-6xl font-bold text-white mb-3 font-mono group-hover:scale-110 transition-transform duration-300">
                        {isDecimal 
                          ? animatedNumber.toFixed(1)
                          : isPercentage 
                            ? `${Math.ceil(animatedNumber)}%`
                            : `${Math.ceil(animatedNumber)}${suffix || '+'}`
                        }
                      </div>
                      
                      {/* Label */}
                      <div className="text-gray-300 font-semibold mb-2">{label}</div>
                      
                      {/* Description */}
                      <div className="text-gray-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {description}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="flex flex-col items-center gap-2 text-gray-400 cursor-pointer animate-bounce hover:text-blue-400 transition-colors duration-300">
                <span className="text-sm">Scroll to explore</span>
                <ChevronDown className="w-6 h-6" />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-32 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10" />
          <div className="max-w-7xl mx-auto relative z-10">
            <Services />
          </div>
        </section>

        {/* Client Testimonials */}
        <section className="py-32 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800/50 to-slate-900/50" />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Client <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Success Stories</span>
              </h2>
              <p className="text-xl text-gray-300">Real results from our valued partnerships</p>
            </div>

            <div className="relative">
              <div className="flex justify-center">
                <div className="relative max-w-4xl w-full">
                  {/* Testimonial Card */}
                  <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-12 border border-white/10">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      {/* Client Image */}
                      <div className="relative hover:scale-105 transition-transform duration-300">
                        <img
                          src={testimonials[activeTestimonial].image}
                          alt={testimonials[activeTestimonial].name}
                          className="w-28 h-28 rounded-full object-cover border-4 border-blue-400/30"
                        />
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      
                      {/* Testimonial Content */}
                      <div className="flex-1 text-center md:text-left">
                        <p 
                          className="text-2xl text-gray-200 mb-6 italic leading-relaxed"
                          key={activeTestimonial}
                        >
                          &ldquo;{testimonials[activeTestimonial].content}&rdquo;
                        </p>
                        
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
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
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
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                      i === activeTestimonial 
                        ? 'bg-blue-400 w-12' 
                        : 'bg-gray-600 hover:bg-gray-500 w-3'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30" />
          
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="relative">
              {/* CTA Card */}
              <div className="relative p-16 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10">
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-8 animate-pulse">
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                </div>

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

                {/* Feature Highlights */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  {features.map(({ icon: Icon, title, description, color }, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-3 text-center hover:scale-105 hover:-translate-y-2 transition-all duration-300"
                    >
                      <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${color} hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
                        <p className="text-gray-400 text-sm">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Contact Form */}
                <div className="scale-95 hover:scale-100 transition-transform duration-300">
                  <ContactForm />
                </div>
                
                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-500">
                  {[
                    "Free consultation",
                    "No commitment required", 
                    "Response within 24 hours",
                    "100% confidential"
                  ].map((text, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 hover:text-blue-400 transition-colors duration-300"
                    >
                      <Check className="w-4 h-4 text-green-400" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        
        {/* Custom Styles */}
        <style jsx>{`
          .floating-orb {
            border-radius: 50%;
            filter: blur(60px);
            animation: float 8s ease-in-out infinite;
            position: absolute;
          }
          
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg) scale(1); 
            }
            50% { 
              transform: translateY(-30px) rotate(180deg) scale(1.1); 
            }
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
        `}</style>
      </div>
    </>
  )
}
