import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import ContactForm from '../components/ContactForm'

export default function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      info: 'hello@codastra.com',
      desc: 'Send us an email anytime!'
    },
    {
      icon: Phone,
      title: 'Call Us',
      info: '+1 (555) 123-4567',
      desc: 'Mon-Fri from 8am to 5pm'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      info: '123 Business Ave, NY 10001',
      desc: 'Come say hello at our office'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      info: 'Mon - Fri: 9am - 6pm',
      desc: 'Weekend support available'
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
              <Link href="/services" className="text-gray-300 hover:text-blue-400 transition">Services</Link>
              <Link href="/portfolio" className="text-gray-300 hover:text-blue-400 transition">Portfolio</Link>
              <Link href="/contact" className="text-white hover:text-blue-400 transition">Contact</Link>
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
            Get In <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Touch</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Ready to start your next project? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfo.map(({ icon: Icon, title, info, desc }, i) => (
              <motion.div
                key={i}
                className="text-center p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-blue-400 font-medium mb-1">{info}</p>
                <p className="text-gray-400 text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Main Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              className="bg-gray-800/50 rounded-3xl p-8 border border-gray-700"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-8 h-8 text-blue-400" />
                <h2 className="text-3xl font-bold text-white">Send us a Message</h2>
              </div>
              <p className="text-gray-300 mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
              <ContactForm />
            </motion.div>

            {/* Additional Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Quick Response */}
              <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-3xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-4">Quick Response</h3>
                <p className="text-gray-300 mb-6">
                  Need immediate assistance? We're here to help you right away.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                    <Phone className="w-5 h-5" />
                    Call Now
                  </button>
                  <button className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-600 text-white rounded-lg font-semibold hover:border-blue-500 hover:text-blue-400 transition-all duration-300">
                    <Mail className="w-5 h-5" />
                    Email Us
                  </button>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-gray-800/50 rounded-3xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-6">Frequently Asked</h3>
                <div className="space-y-4">
                  {[
                    {
                      q: "How long does a typical project take?",
                      a: "Project timelines vary based on complexity, typically 2-12 weeks."
                    },
                    {
                      q: "Do you offer ongoing support?",
                      a: "Yes, we provide 24/7 support and maintenance services."
                    },
                    {
                      q: "What's your development process?",
                      a: "We follow agile methodology with regular client updates."
                    }
                  ].map(({ q, a }, i) => (
                    <div key={i} className="border-b border-gray-700 pb-4 last:border-b-0">
                      <h4 className="text-white font-semibold mb-2">{q}</h4>
                      <p className="text-gray-400 text-sm">{a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-gray-800/50 rounded-3xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-6">Office Hours</h3>
                <div className="space-y-3">
                  {[
                    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
                    { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
                    { day: 'Sunday', hours: 'Emergency support only' },
                  ].map(({ day, hours }, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-gray-300">{day}</span>
                      <span className="text-blue-400 font-medium">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Find Us</h2>
            <p className="text-xl text-gray-300">Located in the heart of the city</p>
          </motion.div>

          <motion.div
            className="h-96 bg-gray-700 rounded-3xl flex items-center justify-center border border-gray-600"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="text-center">
              <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Interactive Map</h3>
              <p className="text-gray-300">123 Business Avenue, New York, NY 10001</p>
            </div>
          </motion.div>
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
              Let's Build Something Amazing
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Your next big project starts with a simple conversation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg">
                <Send className="w-5 h-5" />
                Get Free Quote
              </button>
              <button className="px-8 py-4 border-2 border-gray-600 text-white rounded-full font-semibold hover:border-blue-500 hover:text-blue-400 transition-all duration-300">
                Schedule Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-700 bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Codastra
          </div>
          <p className="text-gray-400 mb-8">Where Code Meets Creativity</p>
          <div className="border-t border-gray-700 pt-8 text-gray-400">
            © {new Date().getFullYear()} Codastra. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
