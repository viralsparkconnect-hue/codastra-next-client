import { motion } from 'framer-motion'
import { Code, Smartphone, Megaphone, Search, Brush, Globe, ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'

export default function Services() {
  const services = [
    {
      icon: Code,
      title: 'Web Development',
      desc: 'Custom websites and web applications built with modern technologies',
      price: 'Starting at $2,999',
      features: ['React & Next.js', 'Responsive Design', 'SEO Optimized', 'Fast Loading', 'Mobile First', 'API Integration'],
      popular: false
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      desc: 'Native and cross-platform mobile applications for iOS and Android',
      price: 'Starting at $4,999',
      features: ['iOS & Android', 'React Native', 'Native Performance', 'App Store Submission', 'Push Notifications', 'Offline Support'],
      popular: true
    },
    {
      icon: Megaphone,
      title: 'Digital Marketing',
      desc: 'Comprehensive digital marketing strategies to grow your business',
      price: 'Starting at $1,999/month',
      features: ['Social Media Marketing', 'Google Ads', 'Email Marketing', 'Content Strategy', 'Analytics Reporting', 'ROI Tracking'],
      popular: false
    },
    {
      icon: Search,
      title: 'SEO & Analytics',
      desc: 'Improve your search rankings and track your website performance',
      price: 'Starting at $999/month',
      features: ['Technical SEO', 'Keyword Research', 'Google Analytics', 'Search Console Setup', 'Monthly Reports', 'Competitor Analysis'],
      popular: false
    },
    {
      icon: Brush,
      title: 'Branding & Design',
      desc: 'Create a strong visual identity that represents your brand perfectly',
      price: 'Starting at $1,499',
      features: ['Logo Design', 'Brand Guidelines', 'Business Cards', 'Social Media Kit', 'Print Design', 'Brand Strategy'],
      popular: false
    },
    {
      icon: Globe,
      title: 'Cloud Solutions',
      desc: 'Scalable cloud infrastructure and deployment solutions',
      price: 'Starting at $599/month',
      features: ['AWS/Azure Setup', 'DevOps Pipeline', 'Auto Scaling', 'Backup Solutions', 'Security Setup', '24/7 Monitoring'],
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Codastra
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-300 hover:text-blue-400 transition">Home</Link>
              <Link href="/about" className="text-gray-300 hover:text-blue-400 transition">About</Link>
              <Link href="/services" className="text-white hover:text-blue-400 transition">Services</Link>
              <Link href="/portfolio" className="text-gray-300 hover:text-blue-400 transition">Portfolio</Link>
              <Link href="/contact" className="text-gray-300 hover:text-blue-400 transition">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Services</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            From concept to deployment, we offer comprehensive digital solutions that drive real business results
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(({ icon: Icon, title, desc, price, features, popular }, i) => (
              <motion.div
                key={i}
                className={`relative p-8 rounded-3xl border transition-all duration-300 hover:scale-105 ${
                  popular 
                    ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500 shadow-lg shadow-blue-500/20' 
                    : 'bg-gray-800/50 border-gray-700 hover:border-blue-500/50'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                {popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                    popular ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gray-700'
                  }`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                  <p className="text-gray-300 mb-4">{desc}</p>
                  <div className="text-3xl font-bold text-blue-400">{price}</div>
                </div>

                <div className="space-y-3 mb-8">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}>
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Process</h2>
            <p className="text-xl text-gray-300">How we deliver exceptional results</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'We understand your needs and goals' },
              { step: '02', title: 'Planning', desc: 'Create a detailed project roadmap' },
              { step: '03', title: 'Development', desc: 'Build your solution with precision' },
              { step: '04', title: 'Launch', desc: 'Deploy and optimize for success' },
            ].map(({ step, title, desc }, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                  {step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-300">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="p-12 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-3xl border border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss your project and create something amazing together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg">
                  Start Your Project
                </button>
              </Link>
              <button className="px-8 py-4 border-2 border-gray-600 text-white rounded-full font-semibold hover:border-blue-500 hover:text-blue-400 transition-all duration-300">
                Schedule a Call
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
