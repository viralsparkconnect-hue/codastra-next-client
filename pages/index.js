import { motion } from 'framer-motion'
import { ArrowRight, Star, Users, Trophy, Zap } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Services from '../components/Services'
import ContactForm from '../components/ContactForm'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  const stats = [
    { icon: Users, number: 500, label: 'Happy Clients' },
    { icon: Trophy, number: 250, label: 'Projects Done' },
    { icon: Star, number: 4.9, label: 'Client Rating', isDecimal: true },
    { icon: Zap, number: 99, label: 'Success Rate', isPercentage: true },
  ]

  // Animated counter hook
  const useCounter = (end, duration = 2000, start = 0) => {
    const [count, setCount] = useState(start)
    
    useEffect(() => {
      if (!isLoaded) return
      
      let startTime
      const startCount = start
      
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        
        setCount(startCount + (end - startCount) * progress)
        
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Navigation />
      
      {/* Enhanced Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center relative overflow-hidden min-h-screen flex items-center">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-orb w-32 h-32 bg-blue-500/20 top-20 left-10"></div>
          <div className="floating-orb w-48 h-48 bg-purple-500/15 top-40 right-20"></div>
          <div className="floating-orb w-24 h-24 bg-pink-500/25 bottom-32 left-1/4"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Digital Innovation
            </span>
            <br />
            <span className="text-white">Redefined</span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            We craft extraordinary digital experiences that transform businesses and captivate audiences through cutting-edge technology and creative brilliance.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link href="/contact">
              <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 relative overflow-hidden">
                <span className="relative z-10">Start Your Project</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </Link>
            <Link href="/portfolio">
              <button className="px-8 py-4 border-2 border-gray-600 text-white rounded-full font-semibold hover:border-blue-500 hover:text-blue-400 transition-all duration-300 backdrop-blur-sm">
                View Our Work
              </button>
            </Link>
          </motion.div>

          {/* Enhanced Stats with Animation */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {stats.map(({ icon: Icon, number, label, isDecimal, isPercentage }, i) => {
              const animatedNumber = useCounter(number, 2000)
              
              return (
                <motion.div
                  key={i}
                  className="text-center p-6 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 hover:scale-105 transition-all duration-300 cursor-pointer"
                  whileHover={{ y: -5 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <Icon className="w-8 h-8 mx-auto mb-4 text-blue-400" />
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {isDecimal 
                      ? animatedNumber.toFixed(1)
                      : isPercentage 
                        ? `${Math.ceil(animatedNumber)}%`
                        : `${Math.ceil(animatedNumber)}+`
                    }
                  </div>
                  <div className="text-gray-400">{label}</div>
                </motion.div>
              )
            })}
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="animate-bounce text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section with Glass Effect */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Services />
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            className="p-12 rounded-3xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss how we can bring your vision to life with our expertise
            </p>
            <ContactForm />
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
      `}</style>
    </div>
  )
}
