import { motion } from 'framer-motion'
import { Code, Smartphone, Megaphone, Search, Brush, Globe, ArrowRight, Check, Star, Users, Clock, TrendingUp, Shield, Zap } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [hoveredService, setHoveredService] = useState(null)

  const categories = ['All', 'Development', 'Marketing', 'Design', 'Infrastructure']

  const services = [
    {
      icon: Code,
      title: 'Web Development',
      category: 'Development',
      desc: 'Custom websites and web applications built with modern technologies',
      price: 'Starting at $2,999',
      timeline: '2-6 weeks',
      features: ['React & Next.js', 'Responsive Design', 'SEO Optimized', 'Fast Loading', 'Mobile First', 'API Integration'],
      popular: false,
      rating: 4.9,
      clients: 150,
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      category: 'Development',
      desc: 'Native and cross-platform mobile applications for iOS and Android',
      price: 'Starting at $4,999',
      timeline: '4-12 weeks',
      features: ['iOS & Android', 'React Native', 'Native Performance', 'App Store Submission', 'Push Notifications', 'Offline Support'],
      popular: true,
      rating: 4.8,
      clients: 89,
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Megaphone,
      title: 'Digital Marketing',
      category: 'Marketing',
      desc: 'Comprehensive digital marketing strategies to grow your business',
      price: 'Starting at $1,999/month',
      timeline: 'Ongoing',
      features: ['Social Media Marketing', 'Google Ads', 'Email Marketing', 'Content Strategy', 'Analytics Reporting', 'ROI Tracking'],
      popular: false,
      rating: 4.7,
      clients: 234,
      gradient: 'from-green-500 to-teal-600'
    },
    {
      icon: Search,
      title: 'SEO & Analytics',
      category: 'Marketing',
      desc: 'Improve your search rankings and track your website performance',
      price: 'Starting at $999/month',
      timeline: '3-6 months',
      features: ['Technical SEO', 'Keyword Research', 'Google Analytics', 'Search Console Setup', 'Monthly Reports', 'Competitor Analysis'],
      popular: false,
      rating: 4.9,
      clients: 178,
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Brush,
      title: 'Branding & Design',
      category: 'Design',
      desc: 'Create a strong visual identity that represents your brand perfectly',
      price: 'Starting at $1,499',
      timeline: '1-3 weeks',
      features: ['Logo Design', 'Brand Guidelines', 'Business Cards', 'Social Media Kit', 'Print Design', 'Brand Strategy'],
      popular: false,
      rating: 4.8,
      clients: 267,
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      icon: Globe,
      title: 'Cloud Solutions',
      category: 'Infrastructure',
      desc: 'Scalable cloud infrastructure and deployment solutions',
      price: 'Starting at $599/month',
      timeline: '1-2 weeks',
      features: ['AWS/Azure Setup', 'DevOps Pipeline', 'Auto Scaling', 'Backup Solutions', 'Security Setup', '24/7 Monitoring'],
      popular: false,
      rating: 4.9,
      clients: 112,
      gradient: 'from-cyan-500 to-blue-600'
    }
  ]

  const filteredServices = selectedCategory === 'All' 
    ? services 
    : services.filter(service => service.category === selectedCategory)

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'TechStartup Inc.',
      service: 'Web Development',
      text: 'Codastra delivered an outstanding website that exceeded our expectations. The team was professional and responsive throughout.',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: 'Mike Chen',
      company: 'RetailCorp',
      service: 'Mobile App',
      text: 'Our mobile app has been a game-changer for our business. User engagement increased by 200% since launch.',
      rating: 5,
      avatar: '👨‍💻'
    },
    {
      name: 'Lisa Rodriguez',
      company: 'Local Business',
      service: 'Digital Marketing',
      text: 'The marketing campaign generated 5x more leads than our previous efforts. Highly recommended!',
      rating: 5,
      avatar: '👩‍🎨'
    }
  ]

  const stats = [
    { icon: Users, number: '500+', label: 'Happy Clients', color: 'text-blue-400' },
    { icon: Star, number: '4.9', label: 'Average Rating', color: 'text-yellow-400' },
    { icon: Clock, number: '98%', label: 'On-Time Delivery', color: 'text-green-400' },
    { icon: TrendingUp, number: '250%', label: 'Average ROI', color: 'text-purple-400' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center relative overflow-hidden">
        <div className="floating-orb w-32 h-32 bg-blue-500/20 top-20 left-10"></div>
        <div className="floating-orb w-48 h-48 bg-purple-500/15 top-40 right-20"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our <span className="gradient-text">Services</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            From concept to deployment, we offer comprehensive digital solutions that drive real business results
          </motion.p>
          
          {/* Trust Indicators */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {stats.map(({ icon: Icon, number, label, color }, i) => (
              <div key={i} className="text-center">
                <Icon className={`w-8 h-8 mx-auto mb-2 ${color}`} />
                <div className={`text-2xl font-bold ${color}`}>{number}</div>
                <div className="text-gray-400 text-sm">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 mb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, i) => (
              <motion.button
                key={i}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600/50 hover:border-gray-500'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredServices.map((service, i) => (
              <motion.div
                key={service.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`relative p-8 rounded-3xl transition-all duration-500 cursor-pointer group ${
                  service.popular 
                    ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-purple-500/50 shadow-lg shadow-purple-500/20' 
                    : 'bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/70'
                } hover:scale-[1.02] hover:-translate-y-2`}
                onMouseEnter={() => setHoveredService(i)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Background Gradient Overlay */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${service.gradient}`}></div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${service.gradient} group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-yellow-400 font-semibold">{service.rating}</span>
                      </div>
                      <div className="text-gray-400 text-sm">{service.clients} clients</div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors">
                    {service.desc}
                  </p>

                  {/* Price and Timeline */}
                  <div className="flex justify-between items-center mb-6 p-3 bg-gray-700/30 rounded-lg">
                    <div>
                      <div className="text-blue-400 font-bold">{service.price}</div>
                      <div className="text-gray-400 text-sm">Investment</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-semibold">{service.timeline}</div>
                      <div className="text-gray-400 text-sm">Timeline</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-center text-gray-300 text-sm group-hover:text-gray-200 transition-colors">
                        <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    {service.features.length > 4 && (
                      <div className="text-blue-400 text-sm font-medium">
                        +{service.features.length - 4} more features
                      </div>
                    )}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-3">
                    <Link href="/contact" className="flex-1">
                      <button className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r ${service.gradient} text-white hover:shadow-lg relative overflow-hidden group/btn`}>
                        <span className="relative z-10">Get Started</span>
                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                      </button>
                    </Link>
                    <button className="px-4 py-3 border-2 border-gray-600 text-gray-300 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-400 transition-all duration-300">
                      Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gray-800/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-300">Real results from real businesses</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                className="p-6 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:border-gray-600/70 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{testimonial.avatar}</div>
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.company}</div>
                    <div className="text-blue-400 text-sm">{testimonial.service}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Process</h2>
            <p className="text-xl text-gray-300">How we deliver exceptional results</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[ 
              { step: '01', title: 'Discovery', desc: 'We understand your needs and goals', icon: Search },
              { step: '02', title: 'Planning', desc: 'Create a detailed project roadmap', icon: Shield },
              { step: '03', title: 'Development', desc: 'Build your solution with precision', icon: Code },
              { step: '04', title: 'Launch', desc: 'Deploy and optimize for success', icon: Zap },
            ].map(({ step, title, desc, icon: Icon }, i) => (
              <motion.div
                key={i}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-300">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="p-12 bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-700/50"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss your project and create something amazing together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button 
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Your Project
                    <ArrowRight className="w-5 h-5" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </motion.button>
              </Link>
              <Link href="/portfolio">
                <button className="px-8 py-4 border-2 border-gray-600 text-white rounded-full font-semibold hover:border-blue-500 hover:text-blue-400 transition-all duration-300">
                  View Our Work
                </button>
              </Link>
            </div>
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
