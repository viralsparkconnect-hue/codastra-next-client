import { motion } from 'framer-motion'
import { Users, Target, Lightbulb, Award, MapPin, Mail, Phone, Calendar, Trophy, TrendingUp, Globe, Star, ArrowRight, Play, Zap, Shield, Heart } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function About() {
  const [activeTab, setActiveTab] = useState('story')
  const [counters, setCounters] = useState({ clients: 0, projects: 0, experience: 0, team: 0 })

  const team = [
    { 
      name: 'Amol Patil', 
      role: 'CEO & Founder',
      bio: 'Visionary leader with MCA and 5+ years of international sales experience. Leading digital transformation.',
      skills: ['Strategy', 'Leadership', 'International Sales', 'Business Development'],
      avatar: '👨‍💼',
      social: {},
      gradient: 'from-blue-500 to-blue-700'
    },
    { 
      name: 'Pratik Rajput', 
      role: 'Co-Founder & CMO',
      bio: 'BE Mechanical engineer with 5+ years in international sales. Expert in global market strategy.', 
      skills: ['Marketing', 'International Sales', 'Strategy', 'Client Relations'],
      avatar: '👨‍💻',
      social: {},
      gradient: 'from-purple-500 to-pink-600'
    },
    { 
      name: 'Shubham Suryavanshi', 
      role: 'CTO',
      bio: 'Full-stack development expert leading complete coding production and architecture.',
      skills: ['Full-Stack Development', 'System Architecture', 'Team Leadership', 'Production Management'],
      avatar: '👨‍💻',
      social: {},
      gradient: 'from-green-500 to-teal-600'
    },
    { 
      name: 'Harsh Shekhawat', 
      role: 'CRM Specialist',
      bio: 'Software engineering graduate with 3+ years experience in CRM systems and client management.',
      skills: ['CRM Systems', 'Software Engineering', 'Client Management', 'Data Analytics'],
      avatar: '👨‍💼',
      social: {},
      gradient: 'from-yellow-500 to-orange-600'
    }
  ]

  const values = [
    { 
      icon: Target, 
      title: 'Global Vision', 
      desc: 'We bring international sales expertise to transform businesses through innovative digital solutions.',
      stats: '98% Client Satisfaction'
    },
    { 
      icon: Lightbulb, 
      title: 'Innovation First', 
      desc: 'Combining mechanical engineering precision with cutting-edge software development.',
      stats: '50+ Tech Stack Mastery'
    },
    { 
      icon: Users, 
      title: 'Client-Focused', 
      desc: 'With 5+ years of international sales experience, we understand global client needs.',
      stats: '200+ Happy Clients'
    },
    { 
      icon: Award, 
      title: 'Quality Excellence', 
      desc: 'Premium results through expert leadership and meticulous attention to detail.',
      stats: '99% On-Time Delivery'
    },
  ]

  const milestones = [
    { year: '2019', title: 'Foundation', desc: 'Started with a vision combining technical expertise and international sales' },
    { year: '2020', title: 'Team Formation', desc: 'Brought together diverse expertise from engineering to software development' },
    { year: '2021', title: 'First 50 Clients', desc: 'Achieved major milestone with excellent client satisfaction' },
    { year: '2022', title: 'Technology Leadership', desc: 'Established as leading software development team in Nashik region' },
    { year: '2023', title: 'International Growth', desc: 'Expanded client base globally leveraging international sales expertise' },
    { year: '2024', title: 'Market Leadership', desc: 'Recognized as premier digital solutions provider in Maharashtra' },
  ]

  const achievements = [
    { icon: Trophy, title: 'Top Developer Team 2024', org: 'Maharashtra Tech Awards' },
    { icon: Star, title: 'Client Choice Award', org: 'Regional Business Excellence' },
    { icon: Globe, title: 'International Recognition', org: 'Global Software Development' },
    { icon: Users, title: 'Best Team Collaboration', org: 'Nashik IT Association' },
  ]

  const stats = [
    { icon: Users, number: 200, label: 'Happy Clients', suffix: '+', color: 'text-blue-400' },
    { icon: Trophy, number: 150, label: 'Projects Completed', suffix: '+', color: 'text-green-400' },
    { icon: Calendar, number: 5, label: 'Years Experience', suffix: '+', color: 'text-purple-400' },
    { icon: TrendingUp, number: 50, label: 'Team Members', suffix: '+', color: 'text-yellow-400' },
  ]

  // Animated counter
  useEffect(() => {
    const animateCounters = () => {
      stats.forEach(({ number }, index) => {
        let start = 0
        const increment = number / 100
        const timer = setInterval(() => {
          start += increment
          if (start >= number) {
            start = number
            clearInterval(timer)
          }
          setCounters(prev => ({
            ...prev,
            [index]: Math.ceil(start)
          }))
        }, 20)
      })
    }
    
    const timer = setTimeout(animateCounters, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center relative overflow-hidden">
        <div className="floating-orb w-32 h-32 bg-blue-500/20 top-20 left-10"></div>
        <div className="floating-orb w-48 h-48 bg-purple-500/15 top-40 right-20"></div>
        <div className="floating-orb w-24 h-24 bg-pink-500/25 bottom-32 left-1/4"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About <span className="gradient-text">Codastra</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            We're a dynamic team from Nashik, India, combining international sales expertise with cutting-edge software development to deliver exceptional digital solutions worldwide.
          </motion.p>
          
          {/* Animated Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {stats.map(({ icon: Icon, number, label, suffix, color }, i) => (
              <motion.div
                key={i}
                className="text-center p-4 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
                whileHover={{ y: -5 }}
              >
                <Icon className={`w-8 h-8 mx-auto mb-2 ${color}`} />
                <div className={`text-3xl font-bold ${color} mb-1`}>
                  {counters[i] || number}{suffix}
                </div>
                <div className="text-gray-400 text-sm">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive Tabs Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'story', label: 'Our Story', icon: Heart },
              { id: 'values', label: 'Our Values', icon: Target },
              { id: 'timeline', label: 'Timeline', icon: Calendar },
              { id: 'achievements', label: 'Awards', icon: Trophy },
            ].map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5" />
                {label}
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Our Story Tab */}
            {activeTab === 'story' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-4xl font-bold text-white mb-6">Our Nashik Journey</h2>
                  <p className="text-gray-300 mb-4 text-lg">
                    From the vibrant city of Nashik, Maharashtra, we've built a powerhouse team of 50+ professionals combining diverse expertise - from MCA and mechanical engineering backgrounds to international sales and software development mastery.
                  </p>
                  <p className="text-gray-300 mb-6 text-lg">
                    Our unique blend of technical excellence and international business acumen allows us to create solutions that not only work perfectly but also succeed in global markets. With our team of 50+ professionals, we've helped over 200 businesses transform their digital presence worldwide.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-800/30 rounded-xl">
                      <div className="text-3xl font-bold text-blue-400">Nashik</div>
                      <div className="text-gray-300">Based in India</div>
                    </div>
                    <div className="text-center p-4 bg-gray-800/30 rounded-xl">
                      <div className="text-3xl font-bold text-purple-400">Global</div>
                      <div className="text-gray-300">Client Reach</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="h-96 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center relative overflow-hidden">
                    <div className="text-white text-center z-10">
                      <MapPin className="w-20 h-20 mx-auto mb-4" />
                      <p className="text-xl font-semibold">Nashik, Maharashtra</p>
                      <p className="text-lg">India's Digital Hub</p>
                    </div>
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Values Tab */}
            {activeTab === 'values' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {values.map(({ icon: Icon, title, desc, stats }, i) => (
                  <motion.div
                    key={i}
                    className="p-8 bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
                        <p className="text-gray-300 mb-4 leading-relaxed">{desc}</p>
                        <div className="inline-block px-4 py-2 bg-blue-900/30 rounded-full text-blue-400 text-sm font-semibold">
                          {stats}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600"></div>
                <div className="space-y-12">
                  {milestones.map(({ year, title, desc }, i) => (
                    <motion.div
                      key={i}
                      className={`flex items-center gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2, duration: 0.6 }}
                    >
                      <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                        <div className="p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50">
                          <div className="text-2xl font-bold text-blue-400 mb-2">{year}</div>
                          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                          <p className="text-gray-300">{desc}</p>
                        </div>
                      </div>
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-gray-900 relative z-10"></div>
                      <div className="flex-1"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {achievements.map(({ icon: Icon, title, org }, i) => (
                  <motion.div
                    key={i}
                    className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    whileHover={{ y: -5 }}
                  >
                    <Icon className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                    <p className="text-gray-400 text-sm">{org}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-gray-800/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Meet Our <span className="gradient-text">Core Leadership</span>
            </h2>
            <p className="text-xl text-gray-300">Top 4 leaders from our 50+ member team driving digital transformation from Nashik, India</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map(({ name, role, bio, skills, avatar, social, gradient }, i) => (
              <motion.div
                key={i}
                className="group p-8 bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="text-center mb-6">
                  <div className={`w-24 h-24 mx-auto mb-4 rounded-3xl bg-gradient-to-br ${gradient} flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300`}>
                    {avatar}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
                  <p className="text-blue-400 font-semibold mb-3">{role}</p>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{bio}</p>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Social Links */}
                {Object.keys(social).length > 0 && (
                  <div className="flex justify-center gap-4">
                    {Object.entries(social).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        className="w-10 h-10 bg-gray-700/50 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300"
                      >
                        <div className="w-5 h-5">🔗</div>
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="p-12 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-3xl border border-gray-700/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Work With Our Nashik Team?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's combine our international experience with local expertise to transform your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button 
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get In Touch
                    <ArrowRight className="w-5 h-5" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </motion.button>
              </Link>
              <Link href="/services">
                <button className="px-8 py-4 border-2 border-gray-600 text-white rounded-full font-semibold hover:border-blue-500 hover:text-blue-400 transition-all duration-300">
                  Our Services
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .floating-orb {
          position: absolute;
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
