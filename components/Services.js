import { motion } from 'framer-motion'
import Link from 'next/link'
import { Code, Megaphone, LineChart, Brush, Smartphone, Globe, Search, Palette } from 'lucide-react'

const services = [
  { 
    icon: Code, 
    title: 'Web Development', 
    desc: 'Custom, responsive websites built with cutting-edge technologies like React, Next.js, and Node.js.',
    features: ['React & Next.js', 'E-commerce Solutions', 'API Integration', 'Performance Optimization']
  },
  { 
    icon: Smartphone, 
    title: 'Mobile Apps', 
    desc: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
    features: ['iOS & Android', 'React Native', 'UI/UX Design', 'App Store Optimization']
  },
  { 
    icon: Megaphone, 
    title: 'Digital Marketing', 
    desc: 'Data-driven marketing campaigns that drive traffic, engagement, and conversions.',
    features: ['Social Media Marketing', 'PPC Advertising', 'Email Campaigns', 'Content Strategy']
  },
  { 
    icon: Search, 
    title: 'SEO & Analytics', 
    desc: 'Boost your online visibility and track performance with smart SEO strategies.',
    features: ['Technical SEO', 'Google Analytics', 'Keyword Research', 'Performance Tracking']
  },
  { 
    icon: Brush, 
    title: 'Branding & Design', 
    desc: 'Creative design solutions that build strong brand identities and visual experiences.',
    features: ['Logo Design', 'Brand Guidelines', 'Print Design', 'Visual Identity']
  },
  { 
    icon: Globe, 
    title: 'Cloud Solutions', 
    desc: 'Scalable cloud infrastructure and deployment solutions for modern applications.',
    features: ['AWS & Azure', 'DevOps Setup', 'CI/CD Pipelines', 'Cloud Migration']
  },
]

export default function Services() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive digital solutions designed to elevate your business to new heights
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(({ icon: Icon, title, desc, features }, i) => (
            <motion.div
              key={i}
              className="group relative p-8 rounded-2xl bg-gray-800/50 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
                  <p className="text-gray-300 leading-relaxed">{desc}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-blue-400 mb-3">Key Features:</h4>
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-300 text-sm">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-700">
                  <Link href="/services">
                    <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 group-hover:shadow-lg">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center p-12 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-3xl border border-gray-700"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Need Something Custom?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We specialize in creating tailored solutions that perfectly fit your unique business needs
          </p>
          <Link href="/contact">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Discuss Your Project
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
