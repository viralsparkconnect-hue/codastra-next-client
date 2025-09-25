import { motion } from 'framer-motion'
import { ArrowRight, Star, Users, Trophy, Zap, Check, Play, Shield, Award, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Services from '../components/Services'
import ContactForm from '../components/ContactForm'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const stats = [
    { icon: Users, number: 1200, label: 'Happy Clients' },
    { icon: Trophy, number: 850, label: 'Projects Completed' },
    { icon: Star, number: 4.9, label: 'Client Rating', isDecimal: true },
    { icon: Zap, number: 99, label: 'Success Rate', isPercentage: true },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc",
      content: "Their innovative approach transformed our digital presence completely. ROI increased by 300%!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "CTO, InnovateLab",
      content: "Exceptional quality and attention to detail. They delivered beyond our expectations.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director, GlobalTech",
      content: "Professional, creative, and results-driven. Our best investment in digital transformation.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ]

  const achievements = [
    { icon: Award, label: "Industry Awards", value: "15+" },
    { icon: Shield, label: "Years Experience", value: "10+" },
    { icon: Sparkles, label: "Technologies Mastered", value: "50+" }
  ]

  // Animated counter hook
  const useCounter = (end, duration = 2500, start = 0) => {
    const [count, setCount] = useState(start)
    
    useEffect(() => {
      if (!isLoaded) return
      
      let startTime
      const startCount = start
      
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        
        // Easing function for smoother animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        setCount(startCount + (end - startCount) * easeOutQuart)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      requestAnimationFrame(animate)
    }, [end, duration, start, isLoaded])
    
    return count
  }

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      
      {/* Premium Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center relative overflow-hidden min-h-screen flex items-center">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated gradient orbs */}
          <div className="floating-orb w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-600/30 top-10 -left-20 animate-pulse"></div>
          <div className="floating-orb w-80 h-80 bg-gradient-to-r from-purple-500/25 to-pink-500/25 top-1/3 -right-16"></div>
          <div className="floating-orb w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 bottom-20 left-1/3"></div>
          
          {/* Geometric shapes */}
          <div className="absolute top-20 right-20 w-32 h-32 border border-blue-400/30 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-40 left-16 w-24 h-24 border border-purple-400/30 rounded-full animate-bounce-slow"></div>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{
               backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
               backgroundSize: '50px 50px'
             }}>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero Badge */}
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 mb-8 backdrop-blur-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-sm text-blue-300 font-medium">Award-Winning Digital Agency</span>
            <div className="w-2 h-2 bg-green-400 rounded-full ml-2 animate-pulse"></div>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-300% animate-gradient-x">
              Digital Excellence
            </span>
            <br />
            <span className="text-white font-light">Delivered</span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            We create <span className="text-blue-400 font-medium">extraordinary digital experiences</span> that transform businesses and captivate audiences through cutting-edge technology and creative brilliance.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link href="/contact">
              <button className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 flex items-center gap-3 text-lg overflow-hidden">
                <span className="relative z-10">Start Your Project</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 delay-200"></div>
              </button>
            </Link>
            
            <Link href="/portfolio">
              <button className="group relative px-10 py-5 border-2 border-gray-600 text-white rounded-full font-semibold hover:border-blue-500 hover:text-blue-400 transition-all duration-300 backdrop-blur-sm flex items-center gap-3 text-lg overflow-hidden">
                <Play className="w-5 h-5" />
                <span>Watch Our Work</span>
                <div className="absolute inset-0 bg-blue-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 mb-16 opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="text-sm text-gray-400 font-medium">Trusted by industry leaders</div>
            {achievements.map(({ icon: Icon, label, value }, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-400">
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{value} {label}</span>
              </div>
            ))}
          </motion.div>

          {/* Enhanced Stats with Glass Morphism */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {stats.map(({ icon: Icon, number, label, isDecimal, isPercentage }, i) => {
              const animatedNumber = useCounter(number, 2500)
              
              return (
                <motion.div
                  key={i}
                  className="relative group"
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative text-center p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-400/50 transition-all duration-300 cursor-pointer">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-lg"></div>
                      <Icon className="relative w-10 h-10 mx-auto mb-4 text-blue-400" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">
                      {isDecimal 
                        ? animatedNumber.toFixed(1)
                        : isPercentage 
                          ? `${Math.ceil(animatedNumber)}%`
                          : `${Math.ceil(animatedNumber)}+`
                      }
                    </div>
                    <div className="text-gray-400 font-medium">{label}</div>
                    <div className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Premium Services Section */}
      <section className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Expertise</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive digital solutions tailored to elevate your business to new heights
            </p>
          </motion.div>
          <Services />
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/50 to-slate-900/50"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Client <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Success Stories</span>
            </h2>
            <p className="text-xl text-gray-300">What our clients say about working with us</p>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center">
              <div className="relative max-w-4xl">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-12 border border-white/10">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <img
                      src={testimonials[activeTestimonial].image}
                      alt={testimonials[activeTestimonial].name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-blue-400/30"
                    />
                    <div className="flex-1 text-center md:text-left">
                      <p className="text-2xl text-gray-200 mb-6 italic leading-relaxed">
                        "{testimonials[activeTestimonial].content}"
                      </p>
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <div>
                          <p className="text-white font-semibold text-lg">
                            {testimonials[activeTestimonial].name}
                          </p>
                          <p className="text-blue-400">
                            {testimonials[activeTestimonial].role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Star rating */}
                  <div className="flex justify-center md:justify-start mt-6 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial indicators */}
            <div className="flex justify-center mt-8 gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === activeTestimonial 
                      ? 'bg-blue-400 w-8' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30"></div>
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
             }}>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
            <div className="relative p-16 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10">
              <motion.div
                className="mb-8"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-6">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
                Ready to Create Something
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Extraordinary?
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Let's discuss how we can transform your vision into reality with our cutting-edge expertise and innovative solutions.
              </p>

              {/* Feature highlights */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  { icon: Shield, text: "100% Secure Process" },
                  { icon: Zap, text: "Lightning Fast Delivery" },
                  { icon: Award, text: "Award-Winning Results" }
                ].map(({ icon: Icon, text }, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 justify-center text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Icon className="w-5 h-5 text-blue-400" />
                    <span>{text}</span>
                  </motion.div>
                ))}
              </div>

              <ContactForm />
              
              <p className="text-sm text-gray-500 mt-8">
                Free consultation • No commitment required • Response within 24 hours
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      
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
      `}</style>
    </div>
  )
}
