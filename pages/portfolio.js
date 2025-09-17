import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowRight, Star, Users, Trophy, TrendingUp, Calendar, Zap, Eye, Code, Smartphone, Globe, Search, Brush, Database, Filter, Play } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [hoveredProject, setHoveredProject] = useState(null)

  const categories = [
    { id: 'All', label: 'All Projects', icon: Globe, count: 12 },
    { id: 'Web Development', label: 'Web Apps', icon: Code, count: 5 },
    { id: 'Mobile Development', label: 'Mobile Apps', icon: Smartphone, count: 3 },
    { id: 'E-commerce', label: 'E-commerce', icon: TrendingUp, count: 2 },
    { id: 'AI/ML', label: 'AI & ML', icon: Zap, count: 2 }
  ]

  const projects = [
    {
      id: 1,
      title: 'TechFlow E-Commerce Platform',
      category: 'E-commerce',
      desc: 'A comprehensive e-commerce platform with advanced analytics, inventory management, and AI-powered recommendations.',
      longDesc: 'Built a full-scale e-commerce solution handling 10k+ daily transactions with real-time inventory sync, payment processing, and personalized shopping experiences.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS', 'Redis'],
      image: 'bg-gradient-to-br from-blue-600 to-blue-800',
      metrics: {
        revenue: '+250%',
        users: '50k+',
        performance: '98%',
        rating: 4.9
      },
      client: 'TechFlow Inc.',
      timeline: '4 months',
      year: '2024',
      featured: true,
      liveUrl: '#',
      githubUrl: '#',
      caseStudyUrl: '#'
    },
    {
      id: 2,
      title: 'HealthCare Pro Dashboard',
      category: 'Web Development',
      desc: 'Medical professional dashboard with patient management, appointment scheduling, and real-time analytics.',
      longDesc: 'Developed a comprehensive healthcare management system with HIPAA compliance, serving 500+ medical professionals.',
      tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Chart.js', 'Socket.io'],
      image: 'bg-gradient-to-br from-green-600 to-emerald-800',
      metrics: {
        efficiency: '+180%',
        users: '500+',
        uptime: '99.9%',
        rating: 4.8
      },
      client: 'MediCore Systems',
      timeline: '6 months',
      year: '2024',
      featured: false,
      liveUrl: '#',
      githubUrl: '#',
      caseStudyUrl: '#'
    },
    {
      id: 3,
      title: 'FinanceAI Mobile App',
      category: 'Mobile Development',
      desc: 'AI-powered personal finance app with expense tracking, investment advice, and budgeting tools.',
      longDesc: 'Created an intelligent financial management app using machine learning for personalized insights and recommendations.',
      tech: ['React Native', 'Python', 'TensorFlow', 'Firebase', 'Plaid API'],
      image: 'bg-gradient-to-br from-purple-600 to-pink-800',
      metrics: {
        downloads: '100k+',
        rating: '4.7★',
        retention: '85%',
        revenue: '+300%'
      },
      client: 'FinTech Solutions',
      timeline: '8 months',
      year: '2024',
      featured: true,
      liveUrl: '#',
      githubUrl: '#',
      caseStudyUrl: '#'
    },
    {
      id: 4,
      title: 'Smart Analytics Dashboard',
      category: 'AI/ML',
      desc: 'Advanced analytics platform with machine learning insights and predictive modeling for business intelligence.',
      longDesc: 'Built an enterprise-grade analytics solution processing millions of data points with real-time ML predictions.',
      tech: ['Python', 'Django', 'TensorFlow', 'D3.js', 'Apache Kafka'],
      image: 'bg-gradient-to-br from-orange-600 to-red-800',
      metrics: {
        accuracy: '94%',
        processing: '1M+/day',
        insights: '+400%',
        rating: 4.9
      },
      client: 'DataCorp Analytics',
      timeline: '5 months',
      year: '2023',
      featured: false,
      liveUrl: '#',
      githubUrl: '#',
      caseStudyUrl: '#'
    },
    {
      id: 5,
      title: 'EduLearn Learning Platform',
      category: 'Web Development',
      desc: 'Interactive online learning platform with video streaming, progress tracking, and collaborative tools.',
      longDesc: 'Developed a scalable educational platform serving 25k+ students with adaptive learning pathways.',
      tech: ['Vue.js', 'Laravel', 'MySQL', 'AWS S3', 'WebRTC'],
      image: 'bg-gradient-to-br from-indigo-600 to-purple-800',
      metrics: {
        students: '25k+',
        completion: '92%',
        engagement: '+220%',
        rating: 4.6
      },
      client: 'EduTech Global',
      timeline: '7 months',
      year: '2023',
      featured: false,
      liveUrl: '#',
      githubUrl: '#',
      caseStudyUrl: '#'
    },
    {
      id: 6,
      title: 'FoodieHub Delivery App',
      category: 'Mobile Development',
      desc: 'Food delivery platform with real-time tracking, payment integration, and restaurant management.',
      longDesc: 'Created a comprehensive food delivery ecosystem connecting customers, restaurants, and drivers.',
      tech: ['Flutter', 'Node.js', 'PostgreSQL', 'Google Maps API', 'Stripe'],
      image: 'bg-gradient-to-br from-yellow-600 to-orange-800',
      metrics: {
        orders: '500k+',
        restaurants: '2k+',
        drivers: '10k+',
        rating: 4.5
      },
      client: 'FoodieHub Inc.',
      timeline: '6 months',
      year: '2023',
      featured: true,
      liveUrl: '#',
      githubUrl: '#',
      caseStudyUrl: '#'
    }
  ]

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const stats = [
    { icon: Trophy, number: '250+', label: 'Projects Completed', color: 'text-yellow-400' },
    { icon: Users, number: '500+', label: 'Happy Clients', color: 'text-blue-400' },
    { icon: Star, number: '4.9', label: 'Average Rating', color: 'text-green-400' },
    { icon: TrendingUp, number: '99%', label: 'Success Rate', color: 'text-purple-400' },
  ]

  const achievements = [
    {
      icon: Trophy,
      title: 'Best Digital Agency 2024',
      org: 'Tech Excellence Awards',
      color: 'from-yellow-500 to-yellow-700'
    },
    {
      icon: Star,
      title: 'Top Rated on Clutch',
      org: '4.9/5 Rating - 200+ Reviews',
      color: 'from-blue-500 to-blue-700'
    },
    {
      icon: Globe,
      title: 'Awwwards Recognition',
      org: 'Site of the Day Winner',
      color: 'from-purple-500 to-purple-700'
    },
    {
      icon: Users,
      title: 'Client Choice Award',
      org: 'UpWork Top Agency',
      color: 'from-green-500 to-green-700'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'TechFlow Inc.',
      role: 'CEO',
      text: 'The e-commerce platform Codastra built transformed our business. Revenue increased by 250% within 6 months of launch.',
      rating: 5,
      avatar: '👩‍💼',
      project: 'E-commerce Platform'
    },
    {
      name: 'Dr. Michael Chen',
      company: 'MediCore Systems',
      role: 'CTO',
      text: 'Their healthcare dashboard streamlined our operations significantly. Patient satisfaction improved by 40%.',
      rating: 5,
      avatar: '👨‍⚕️',
      project: 'Healthcare Dashboard'
    },
    {
      name: 'Alex Rodriguez',
      company: 'FinTech Solutions',
      role: 'Product Manager',
      text: 'The mobile app exceeded expectations. User engagement is 85% higher than industry average.',
      rating: 5,
      avatar: '👨‍💼',
      project: 'Mobile Application'
    }
  ]

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Navigation />

      {/* Enhanced Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center relative overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-orb w-32 h-32 bg-blue-500/20 top-20 left-10"></div>
          <div className="floating-orb w-48 h-48 bg-purple-500/15 top-40 right-20"></div>
          <div className="floating-orb w-24 h-24 bg-pink-500/25 bottom-32 left-1/4"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our <span className="gradient-text">Portfolio</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Discover how we've helped businesses transform their digital presence with innovative solutions and exceptional results
          </motion.p>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {stats.map(({ icon: Icon, number, label, color }, i) => (
              <motion.div
                key={i}
                className="text-center p-4 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
                whileHover={{ y: -5 }}
              >
                <Icon className={`w-8 h-8 mx-auto mb-2 ${color}`} />
                <div className={`text-2xl font-bold ${color} mb-1`}>{number}</div>
                <div className="text-gray-400 text-sm">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Filter Section */}
      <section className="px-4 mb-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex items-center justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Filter className="w-6 h-6 text-blue-400 mr-3" />
            <h3 className="text-xl font-semibold text-white">Filter by Category</h3>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, i) => {
              const Icon = category.icon
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group px-6 py-4 rounded-2xl font-semibold transition-all duration-300 border backdrop-blur-sm ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg scale-105'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border-gray-600/50 hover:border-gray-500 hover:scale-105'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{category.label}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      selectedCategory === category.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-blue-900/30 text-blue-400 group-hover:bg-blue-800/50'
                    }`}>
                      {category.count}
                    </span>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Projects Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`group relative overflow-hidden rounded-3xl transition-all duration-500 cursor-pointer hover:scale-[1.02] ${
                  project.featured 
                    ? 'lg:col-span-2 lg:row-span-1' 
                    : ''
                }`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                whileHover={{ y: -10 }}
              >
                {project.featured && (
                  <div className="absolute -top-4 left-6 z-20">
                    <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                      <Star className="w-4 h-4 fill-current" />
                      Featured Project
                    </span>
                  </div>
                )}

                <div className="relative h-80 lg:h-96 overflow-hidden rounded-3xl bg-gray-800/50 border border-gray-700/50 hover:border-gray-600/70 transition-all duration-500">
                  {/* Project Image/Gradient */}
                  <div className={`absolute inset-0 ${project.image} transition-all duration-500 group-hover:scale-110`}>
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>
                  </div>

                  {/* Year Badge */}
                  <div className="absolute top-6 right-6 z-10">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-sm rounded-full font-semibold">
                      {project.year}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-6 left-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all hover:scale-110">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all hover:scale-110">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all hover:scale-110">
                      <Github className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Play Button for Featured */}
                  {project.featured && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                      <button className="p-6 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all hover:scale-110">
                        <Play className="w-8 h-8 fill-current" />
                      </button>
                    </div>
                  )}

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-blue-600/80 backdrop-blur-sm text-white text-sm rounded-full font-medium">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2 group-hover:text-gray-200 transition-colors">
                      {hoveredProject === project.id ? project.longDesc : project.desc}
                    </p>

                    {/* Client Info */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm">
                        <span className="text-blue-400 font-medium">Client: </span>
                        <span className="text-gray-300">{project.client}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-purple-400 font-medium">{project.timeline}</span>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                      {Object.entries(project.metrics).map(([key, value], idx) => (
                        <div key={idx} className="text-center p-2 bg-white/10 backdrop-blur-sm rounded-lg">
                          <div className="text-green-400 font-bold text-sm">{value}</div>
                          <div className="text-gray-400 text-xs capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 4).map((technology, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-800/60 backdrop-blur-sm text-gray-300 text-xs rounded-full border border-gray-700/50"
                        >
                          {technology}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="px-2 py-1 bg-blue-900/60 text-blue-300 text-xs rounded-full">
                          +{project.tech.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium text-sm group/btn">
                        <span>View Case Study</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-yellow-400 font-semibold text-sm">{project.metrics.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Achievements Section */}
      <section className="py-20 px-4 bg-gray-800/20">
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
              { 
                step: '01', 
                title: 'Discovery & Research', 
                desc: 'We dive deep into your business goals, target audience, and market landscape',
                icon: Search,
                color: 'from-blue-500 to-blue-700'
              },
              { 
                step: '02', 
                title: 'Design & Planning', 
                desc: 'Create detailed wireframes, prototypes, and technical architecture',
                icon: Brush,
                color: 'from-purple-500 to-purple-700'
              },
              { 
                step: '03', 
                title: 'Development & Testing', 
                desc: 'Build your solution with clean code, rigorous testing, and quality assurance',
                icon: Code,
                color: 'from-green-500 to-green-700'
              },
              { 
                step: '04', 
                title: 'Launch & Optimization', 
                desc: 'Deploy, monitor performance, and continuously optimize for success',
                icon: Zap,
                color: 'from-orange-500 to-orange-700'
              },
            ].map(({ step, title, desc, icon: Icon, color }, i) => (
              <motion.div
                key={i}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative mb-6">
                  <div className={`w-24 h-24 bg-gradient-to-br ${color} rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">{title}</h3>
                <p className="text-gray-300 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Technologies We <span className="gradient-text">Master</span>
            </h2>
            <p className="text-xl text-gray-300">Cutting-edge tools and frameworks we use</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: 'React', category: 'Frontend', color: 'from-cyan-500 to-blue-600' },
              { name: 'Node.js', category: 'Backend', color: 'from-green-500 to-emerald-600' },
              { name: 'Python', category: 'Backend', color: 'from-yellow-500 to-orange-600' },
              { name: 'React Native', category: 'Mobile', color: 'from-purple-500 to-pink-600' },
              { name: 'AWS', category: 'Cloud', color: 'from-orange-500 to-red-600' },
              { name: 'MongoDB', category: 'Database', color: 'from-green-600 to-teal-700' },
              { name: 'Next.js', category: 'Framework', color: 'from-gray-700 to-gray-900' },
              { name: 'TensorFlow', category: 'AI/ML', color: 'from-orange-400 to-yellow-600' },
              { name: 'Docker', category: 'DevOps', color: 'from-blue-600 to-cyan-600' },
              { name: 'Flutter', category: 'Mobile', color: 'from-blue-400 to-indigo-600' },
              { name: 'GraphQL', category: 'API', color: 'from-pink-500 to-rose-600' },
              { name: 'TypeScript', category: 'Language', color: 'from-blue-500 to-blue-700' },
            ].map(({ name, category, color }, i) => (
              <motion.div
                key={i}
                className="group text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <Database className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-1">{name}</h4>
                <p className="text-gray-400 text-xs">{category}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="p-12 bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-700/50 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Create Your <br />
                <span className="gradient-text">Next Success Story?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join our portfolio of successful projects. Let's transform your vision into a digital reality that drives results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/contact">
                  <motion.button 
                    className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Start Your Project
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </motion.button>
                </Link>
                <Link href="/services">
                  <button className="px-8 py-4 border-2 border-gray-600 text-white rounded-full font-semibold hover:border-blue-500 hover:text-blue-400 transition-all duration-300 flex items-center justify-center gap-2">
                    <Eye className="w-5 h-5" />
                    View Our Services
                  </button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-8 pt-8 border-t border-gray-700/50">
                <div className="flex items-center gap-2 text-gray-400">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span>Award-Winning Team</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span>500+ Happy Clients</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Star className="w-5 h-5 text-green-400" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <span>On-Time Delivery</span>
                </div>
              </div>
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

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Recognition & <span className="gradient-text">Awards</span>
            </h2>
            <p className="text-xl text-gray-300">Industry recognition for our exceptional work</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map(({ icon: Icon, title, org, color }, i) => (
              <motion.div
                key={i}
                className="text-center p-8 bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300 hover:scale-105 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{title}</h3>
                <p className="text-gray-400 text-sm">{org}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Client <span className="gradient-text">Success Stories</span>
            </h2>
            <p className="text-xl text-gray-300">Real results from real projects</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                className="p-8 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-3xl hover:border-gray-600/70 transition-all duration-300 hover:scale-105 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <div className="text-white font-bold">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                    <div className="text-gray-500 text-sm">{testimonial.company}</div>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-700">
                  <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-400 text-xs rounded-full">
                    {testimonial.project}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-gray-800/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial
