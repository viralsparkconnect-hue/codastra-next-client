import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Portfolio() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      category: 'Web Development',
      desc: 'A modern e-commerce platform with advanced features and seamless user experience.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: '/api/placeholder/600/400',
      link: '#',
      github: '#'
    },
    {
      title: 'FinTech Mobile App',
      category: 'Mobile Development',
      desc: 'Secure financial management app with real-time transactions and analytics.',
      tech: ['React Native', 'Firebase', 'Plaid API', 'Redux'],
      image: '/api/placeholder/600/400',
      link: '#',
      github: '#'
    },
    {
      title: 'Healthcare Dashboard',
      category: 'Web Application',
      desc: 'Comprehensive healthcare management system for medical professionals.',
      tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Chart.js'],
      image: '/api/placeholder/600/400',
      link: '#',
      github: '#'
    },
    {
      title: 'AI-Powered Chatbot',
      category: 'AI/ML',
      desc: 'Intelligent customer service chatbot with natural language processing.',
      tech: ['Python', 'TensorFlow', 'Flask', 'OpenAI API'],
      image: '/api/placeholder/600/400',
      link: '#',
      github: '#'
    },
    {
      title: 'Real Estate Platform',
      category: 'Full Stack',
      desc: 'Complete real estate marketplace with property listings and virtual tours.',
      tech: ['Vue.js', 'Laravel', 'MySQL', 'AWS S3'],
      image: '/api/placeholder/600/400',
      link: '#',
      github: '#'
    },
    {
      title: 'Social Media App',
      category: 'Mobile Development',
      desc: 'Social networking app with photo sharing and real-time messaging.',
      tech: ['Flutter', 'Dart', 'Firebase', 'Cloud Functions'],
      image: '/api/placeholder/600/400',
      link: '#',
      github: '#'
    }
  ]

  const categories = ['All', 'Web Development', 'Mobile Development', 'Full Stack', 'AI/ML', 'Web Application']

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
              <Link href="/services" className="text-gray-300 hover:text-blue-400 transition">Services</Link>
              <Link href="/portfolio" className="text-white hover:text-blue-400 transition">Portfolio</Link>
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
            Our <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Portfolio</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Explore our latest projects and see how we've helped businesses achieve their digital transformation goals
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-4 mb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, i) => (
              <motion.button
                key={i}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  i === 0 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(({ title, category, desc, tech, link, github }, i) => (
              <motion.div
                key={i}
                className="group bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-600 to-purple-600 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-sm rounded-full">
                      {category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <a href={link} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a href={github} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition">
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{desc}</p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tech.map((technology, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group-hover:gap-3 duration-300">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Project Impact</h2>
            <p className="text-xl text-gray-300">The results speak for themselves</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '250+', label: 'Projects Completed', desc: 'Successfully delivered projects' },
              { number: '500+', label: 'Happy Clients', desc: 'Satisfied customers worldwide' },
              { number: '99%', label: 'Success Rate', desc: 'Projects delivered on time' },
              { number: '24/7', label: 'Support', desc: 'Round-the-clock assistance' },
            ].map(({ number, label, desc }, i) => (
              <motion.div
                key={i}
                className="text-center p-6 bg-gray-800/50 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                  {number}
                </div>
                <div className="text-white font-semibold mb-2">{label}</div>
                <div className="text-gray-400 text-sm">{desc}</div>
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
              Have a Project in Mind?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's bring your vision to life with our expertise and passion
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg">
                  Start Your Project
                </button>
              </Link>
              <button className="px-8 py-4 border-2 border-gray-600 text-white rounded-full font-semibold hover:border-blue-500 hover:text-blue-400 transition-all duration-300">
                View More Work
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
