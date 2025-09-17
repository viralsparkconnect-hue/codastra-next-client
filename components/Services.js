import { motion } from 'framer-motion'
import Link from 'next/link'
import { Code, Megaphone, LineChart, Brush, Smartphone, Globe, Search, Palette, ArrowRight } from 'lucide-react'

const services = [
  { 
    icon: Code, 
    title: 'Web Development', 
    desc: 'Custom, responsive websites built with cutting-edge technologies like React, Next.js, and Node.js.',
    features: ['React & Next.js', 'E-commerce Solutions', 'API Integration', 'Performance Optimization'],
    color: 'from-blue-500 to-blue-700',
    hoverColor: 'group-hover:from-blue-400 group-hover:to-blue-600'
  },
  { 
    icon: Smartphone, 
    title: 'Mobile Apps', 
    desc: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
    features: ['iOS & Android', 'React Native', 'UI/UX Design', 'App Store Optimization'],
    color: 'from-purple-500 to-pink-600',
    hoverColor: 'group-hover:from-purple-400 group-hover:to-pink-500',
    popular: true
  },
  { 
    icon: Megaphone, 
    title: 'Digital Marketing', 
    desc: 'Data-driven marketing campaigns that drive traffic, engagement, and conversions.',
    features: ['Social Media Marketing', 'PPC Advertising', 'Email Campaigns', 'Content Strategy'],
    color: 'from-green-500 to-teal-600',
    hoverColor: 'group-hover:from-green-400 group-hover:to-teal-500'
  },
  { 
    icon: Search, 
    title: 'SEO & Analytics', 
    desc: 'Boost your online visibility and track performance with smart SEO strategies.',
    features: ['Technical SEO', 'Google Analytics', 'Keyword Research', 'Performance Tracking'],
    color: 'from-yellow-500 to-orange-600',
    hoverColor: 'group-hover:from-yellow-400 group-hover:to-orange-500'
  },
  { 
    icon: Brush, 
    title: 'Branding & Design', 
    desc: 'Creative design solutions that build strong brand identities and visual experiences.',
    features: ['Logo Design', 'Brand Guidelines', 'Print Design', 'Visual Identity'],
    color: 'from-pink-500 to-rose-600',
    hoverColor: 'group-hover:from-pink-400 group-hover:to-rose-500'
  },
  { 
    icon: Globe, 
    title: 'Cloud Solutions', 
    desc: 'Scalable cloud infrastructure and deployment solutions for modern applications.',
    features: ['AWS & Azure', 'DevOps Setup', 'CI/CD Pipelines', 'Cloud Migration'],
    color: 'from-cyan-500 to-blue-600',
    hoverColor: 'group-hover:from-cyan-400 group-hover:to-blue-500'
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export default function Services() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive digital solutions designed to elevate your business to new heights
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map(({ icon: Icon, title, desc, features, color, hoverColor, popular }, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative"
            >
              {/* Popular Badge */}
              {popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className={`
                relative p-8 rounded-3xl transition-all duration-500 cursor-pointer h-full
                bg-gray-800/30 backdrop-blur-sm border border-gray-700/50
                hover:bg-gray-800/50 hover:border-gray-600/70
                hover:shadow-2xl hover:shadow-blue-500/10
                group-hover:scale-[1.02] group-hover:-translate-y-2
                ${popular ? 'border-purple-500/50 shadow-lg shadow-purple-500/10' : ''}
              `}>
                {/* Background Gradient Overlay */}
                <div className={`
                  absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 
                  transition-opacity duration-500 bg-gradient-to-br ${color}
                `}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`
                    w-16 h-16 rounded-2xl flex items-center justify-center mb-6 
                    transition-all duration-500 group-hover:scale-110
                    bg-gradient-to-br ${color} ${hoverColor}
                  `}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Title and Description */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                    {title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-gray-200 transition-colors">
                    {desc}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    <h4 className="text-sm font-semibold text-blue-400 mb-3">Key Features:</h4>
                    {features.map((feature, idx) => (
                      <motion.div 
                        key={idx} 
                        className="flex items-center text-gray-300 text-sm group-hover:text-gray-200 transition-colors"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className={`w-2 h-2 rounded-full mr-3 bg-gradient-to-r ${color} flex-shrink-0`}></div>
                        {feature}
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link href="/services">
                    <button className={`
                      w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 
                      flex items-center justify-center gap-2 group/btn
                      bg-gradient-to-r ${color} hover:shadow-lg relative overflow-hidden
                    `}>
                      <span className="relative z-10">Learn More</span>
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform relative z-10" />
                      
                      {/* Button shimmer effect */}
                      <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center p-12 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-3xl border border-gray-700/50 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Need Something Custom?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We specialize in creating tailored solutions that perfectly fit your unique business needs
          </p>
          <Link href="/contact">
            <motion.button 
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Discuss Your Project</span>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
