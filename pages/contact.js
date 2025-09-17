import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, ArrowRight, Star, Users, CheckCircle, Globe, Calendar, Heart } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import ContactForm from '../components/ContactForm'

export default function Contact() {
  const [selectedOffice, setSelectedOffice] = useState('main')

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      info: 'hello@codastra.com',
      desc: 'Send us an email anytime!',
      color: 'from-blue-500 to-blue-700',
      action: () => window.location.href = 'mailto:hello@codastra.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      info: '+1 (555) 123-4567',
      desc: 'Mon-Fri from 8am to 5pm',
      color: 'from-green-500 to-green-700',
      action: () => window.location.href = 'tel:+15551234567'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      info: '123 Business Ave, NY 10001',
      desc: 'Come say hello at our office',
      color: 'from-purple-500 to-purple-700',
      action: () => window.open('https://maps.google.com/?q=123+Business+Ave+NY+10001', '_blank')
    },
    {
      icon: Clock,
      title: 'Working Hours',
      info: 'Mon - Fri: 9am - 6pm',
      desc: 'Weekend support available',
      color: 'from-orange-500 to-orange-700',
      action: () => {}
    }
  ]

  const offices = [
    {
      id: 'main',
      city: 'New York',
      address: '123 Business Avenue, NY 10001',
      phone: '+1 (555) 123-4567',
      email: 'ny@codastra.com',
      timezone: 'EST',
      team: 25,
      specialties: ['Web Development', 'Mobile Apps', 'AI/ML']
    },
    {
      id: 'west',
      city: 'San Francisco',
      address: '456 Tech Street, SF 94105',
      phone: '+1 (555) 987-6543',
      email: 'sf@codastra.com',
      timezone: 'PST',
      team: 18,
      specialties: ['Cloud Solutions', 'DevOps', 'Blockchain']
    },
    {
      id: 'europe',
      city: 'London',
      address: '789 Innovation Lane, London EC2A',
      phone: '+44 20 1234 5678',
      email: 'london@codastra.com',
      timezone: 'GMT',
      team: 12,
      specialties: ['Digital Marketing', 'Branding', 'E-commerce']
    }
  ]

  const whyChooseUs = [
    { 
      icon: Star, 
      title: '4.9/5 Rating', 
      desc: 'Consistently high client satisfaction across all projects',
      stat: '500+ Reviews'
    },
    { 
      icon: Users, 
      title: 'Expert Team', 
      desc: 'Seasoned professionals with 5+ years average experience',
      stat: '50+ Experts'
    },
    { 
      icon: CheckCircle, 
      title: '99% On-Time', 
      desc: 'Reliable delivery with rigorous project management',
      stat: '250+ Projects'
    },
    { 
      icon: Globe, 
      title: 'Global Reach', 
      desc: 'Serving clients across 5 continents with 24/7 support',
      stat: '30+ Countries'
    },
  ]

  const faqs = [
    {
      q: "How long does a typical project take?",
      a: "Project timelines vary based on complexity and scope. Simple websites take 2-4 weeks, while complex applications can take 8-16 weeks. We provide detailed timelines during our initial consultation."
    },
    {
      q: "Do you offer ongoing support and maintenance?",
      a: "Yes! We provide comprehensive support packages including 24/7 monitoring, security updates, performance optimization, and feature enhancements."
    },
    {
      q: "What's your development process like?",
      a: "We follow an agile methodology with weekly sprints, regular client check-ins, and transparent progress tracking. You'll have full visibility into your project's development."
    },
    {
      q: "Can you work with our existing systems?",
      a: "Absolutely! We specialize in integrating with existing systems, APIs, and databases. Our team can assess your current infrastructure and recommend the best approach."
    },
    {
      q: "What if I need changes during development?",
      a: "We welcome feedback and changes! Our agile process accommodates revisions, and we'll discuss any timeline or budget implications transparently."
    },
    {
      q: "Do you sign NDAs for confidential projects?",
      a: "Yes, we routinely sign NDAs and take data security seriously. All client information is treated with the highest level of confidentiality."
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'TechStartup Inc.',
      role: 'CEO',
      text: 'Codastra transformed our outdated website into a modern, high-converting platform. The team was professional, responsive, and delivered beyond our expectations.',
      rating: 5,
      avatar: '👩‍💼',
      project: 'E-commerce Platform'
    },
    {
      name: 'Michael Chen',
      company: 'RetailCorp',
      role: 'CTO',
      text: 'Their mobile app development expertise is outstanding. Our user engagement increased by 200% after launching the app they built for us.',
      rating: 5,
      avatar: '👨‍💻',
      project: 'Mobile Application'
    },
    {
      name: 'Lisa Rodriguez',
      company: 'GrowthCo',
      role: 'Marketing Director',
      text: 'The digital marketing campaign they created generated 5x more leads than our previous efforts. ROI exceeded all expectations!',
      rating: 5,
      avatar: '👩‍🎨',
      project: 'Digital Marketing'
    }
  ]

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
            Let's Create Something <br />
            <span className="gradient-text">Amazing Together</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Ready to transform your digital presence? We're here to help you succeed with cutting-edge solutions and exceptional service.
          </motion.p>
          
          {/* Quick Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <button 
              onClick={() => document.querySelector('#contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 relative overflow-hidden"
            >
              <span className="relative z-10">Start Your Project</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
            <button 
              onClick={() => window.location.href = 'tel:+15551234567'}
              className="px-8 py-4 border-2 border-gray-600 text-white rounded-full font-semibold hover:border-blue-500 hover:text-blue-400 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {whyChooseUs.map(({ icon: Icon, title, desc, stat }, i) => (
              <motion.div
                key={i}
                className="text-center p-4 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
                whileHover={{ y: -5 }}
              >
                <Icon className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                <div className="text-lg font-bold text-white mb-1">{title}</div>
                <div className="text-blue-400 font-semibold text-sm mb-1">{stat}</div>
                <div className="text-gray-400 text-xs">{desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Contact Info Cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Multiple Ways to <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-xl text-gray-300">Choose the method that works best for you</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfo.map(({ icon: Icon, title, info, desc, color, action }, i) => (
              <motion.div
                key={i}
                className="group text-center p-8 bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-700/50 hover:border-gray-600/70 transition-all duration-500 cursor-pointer hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                onClick={action}
                whileHover={{ y: -10 }}
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">{title}</h3>
                <p className="text-blue-400 font-semibold mb-2">{info}</p>
                <p className="text-gray-400 text-sm mb-4">{desc}</p>
                <div className="flex items-center justify-center gap-2 text-blue-400 font-medium text-sm">
                  <span>Click to {title.split(' ')[0].toLowerCase()}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Enhanced Contact Form */}
            <motion.div
              id="contact-form"
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-8 border border-gray-700/50 backdrop-blur-sm relative overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">Send us a Message</h2>
                    <p className="text-blue-400 text-sm">We'll respond within 2 hours</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-8">
                  Tell us about your project and we'll get back to you with a detailed proposal and timeline.
                </p>
                <ContactForm />
              </div>
            </motion.div>

            {/* Enhanced Info Sidebar */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Office Locations */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Globe className="w-6 h-6 text-blue-400" />
                  Our Offices
                </h3>
                <div className="space-y-4">
                  {offices.map((office, i) => (
                    <div
                      key={office.id}
                      className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                        selectedOffice === office.id
                          ? 'bg-blue-900/30 border border-blue-500/50'
                          : 'bg-gray-700/30 hover:bg-gray-700/50 border border-gray-600/30'
                      }`}
                      onClick={() => setSelectedOffice(office.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-semibold">{office.city}</h4>
                        <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded-full">
                          {office.timezone}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{office.address}</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{office.team} team members</span>
                        <span className="text-blue-400">{office.specialties[0]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response Time Guarantee */}
              <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-3xl p-8 border border-green-700/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Fast Response</h3>
                    <p className="text-green-400 text-sm">Guaranteed within 2 hours</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-green-900/20 rounded-lg">
                    <div className="text-green-400 font-bold">&lt; 2 hrs</div>
                    <div className="text-gray-300">Initial Response</div>
                  </div>
                  <div className="text-center p-3 bg-green-900/20 rounded-lg">
                    <div className="text-green-400 font-bold">&lt; 24 hrs</div>
                    <div className="text-gray-300">Detailed Proposal</div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-3xl p-8 border border-red-700/30">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <Heart className="w-6 h-6 text-red-400" />
                  Need Urgent Help?
                </h3>
                <p className="text-gray-300 mb-4 text-sm">
                  For existing clients with critical issues, we offer 24/7 emergency support.
                </p>
                <button 
                  onClick={() => window.location.href = 'tel:+15551234567'}
                  className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Emergency Hotline
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-20 px-4 bg-gray-800/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-xl text-gray-300">Everything you need to know about working with us</p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map(({ q, a }, i) => (
              <motion.div
                key={i}
                className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-start gap-3">
                  <span className="text-blue-400 text-lg">Q{i + 1}.</span>
                  {q}
                </h3>
                <p className="text-gray-300 leading-relaxed pl-8">{a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
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
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-300">Real testimonials from real projects</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                className="p-8 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-3xl hover:border-gray-600/70 transition-all duration-300 hover:scale-105"
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

      {/* Enhanced Map Section */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Visit Our Office</h2>
            <p className="text-xl text-gray-300">Located in the heart of Manhattan's tech district</p>
          </motion.div>

          <motion.div
            className="relative h-96 bg-gradient-to-br from-gray-700 to-gray-800 rounded-3xl flex items-center justify-center border border-gray-600 cursor-pointer hover:from-gray-600 hover:to-gray-700 transition-all duration-300 overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            onClick={() => window.open('https://maps.google.com/?q=123+Business+Ave+NY+10001', '_blank')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 group-hover:from-blue-900/30 group-hover:to-purple-900/30 transition-all duration-300"></div>
            <div className="text-center relative z-10">
              <MapPin className="w-20 h-20 text-blue-400 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-3xl font-bold text-white mb-4">Interactive Map</h3>
              <p className="text-gray-300 mb-2 text-lg">123 Business Avenue</p>
              <p className="text-gray-300 mb-4">New York, NY 10001</p>
              <div className="flex items-center justify-center gap-2 text-blue-400 font-medium">
                <span>Click to open in Google Maps</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>

          {/* Office Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {[
              { icon: MapPin, title: 'Address', info: '123 Business Avenue, NY 10001' },
              { icon: Phone, title: 'Phone', info: '+1 (555) 123-4567' },
              { icon: Mail, title: 'Email', info: 'hello@codastra.com' },
            ].map(({ icon: Icon, title, info }, i) => (
              <div key={i} className="text-center p-6 bg-gray-800/50 rounded-2xl backdrop-blur-sm">
                <Icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">{title}</h4>
                <p className="text-gray-300">{info}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="p-12 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-3xl border border-gray-700/50 backdrop-blur-sm relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Start Your <br />
                <span className="gradient-text">Digital Journey?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join 500+ satisfied clients who have transformed their businesses with our innovative solutions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => document.querySelector('#contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    Get Free Consultation
                  </span>
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
                <Link href="/portfolio">
                  <button className="px-8 py-4 border-2 border-gray-600 text-white rounded-full font-semibold hover:border-blue-500 hover:text-blue-400 transition-all duration-300 flex items-center justify-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Schedule Call
                  </button>
                </Link>
              </div>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center items-center gap-8 mt-8 pt-8 border-t border-gray-700/50">
                <div className="flex items-center gap-2 text-gray-400">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>No Commitment Required</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>2 Hour Response Time</span>
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
      `}</style>
    </div>
  )
}
