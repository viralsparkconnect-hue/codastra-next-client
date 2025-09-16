import { motion } from 'framer-motion'
import Services from '../components/Services'
import ContactForm from '../components/ContactForm'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center text-center px-4">
      <motion.h1
        className="text-5xl font-bold mt-20 mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Codastra
      </motion.h1>
      <p className="text-xl mb-12">Where Code Meets Creativity</p>

      <Services />

      <section className="mt-20 w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
        <ContactForm />
      </section>

      <footer className="mt-20 py-6 border-t border-gray-700 w-full text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Codastra. All rights reserved.
      </footer>
    </div>
  )
}