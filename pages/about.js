import { motion } from 'framer-motion'
import { Users, Target, Lightbulb, Award } from 'lucide-react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function About() {
  const team = [
    { name: 'Alex Rodriguez', role: 'CEO & Founder' },
    { name: 'Sarah Chen', role: 'CTO' },
    { name: 'Marcus Johnson', role: 'Design Director' },
    { name: 'Emily Davis', role: 'Marketing Lead' },
  ]

  const values = [
    { icon: Target, title: 'Mission-Driven', desc: 'We exist to transform businesses through innovative digital solutions.' },
    { icon: Lightbulb, title: 'Innovation First', desc: 'Cutting-edge technology meets creative problem-solving.' },
    { icon: Users, title: 'Client-Focused', desc: 'Your success is our success. We build lasting partnerships.' },
    { icon: Award, title: 'Quality Excellence', desc: 'Premium results through meticulous attention to detail.' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Codastra</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Founded in 2020, we've been at the forefront of digital innovation, helping businesses transform their digital presence and achieve unprecedented growth.
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
            <p className="text-gray-300 mb-4">
              What started as a small team of passionate developers has grown into a full-service digital agency. We've helped over 500 businesses across the globe achieve their digital transformation goals.
            </p>
            <p className="text-gray-300 mb-6">
              Our journey began with a simple belief: technology should serve humanity, not the other way around. This philosophy drives every project we undertake.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <div className="text-3xl font-bold text-blue-400">5+</div>
                <div className="text-gray-300">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <div className="text-3xl font-bold text-purple-400">50+</div>
                <div className="text-gray-300">Team Members</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="h-96 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-white text-center">
              <Users className="w-24 h-24 mx-auto mb-4" />
              <p className="text-xl font-semibold">Building the Future</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-xl text-gray-300">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={i}
                className="text-center p-6 bg-gray-800 rounded-2xl hover:bg-gray-700 transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <Icon className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-300 text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-300">The brilliant minds behind Codastra</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map(({ name, role }, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="w-48 h-48 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Users className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">{name}</h3>
                <p className="text-gray-400">{role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="p-12 rounded-3xl border border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Work With Us?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's create something amazing together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg">
                  Get In Touch
                </button>
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
    </div>
  )
}
