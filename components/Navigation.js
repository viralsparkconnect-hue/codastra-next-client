import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent cursor-pointer"
            >
              Codastra
            </motion.div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className={`${router.pathname === '/' ? 'text-white' : 'text-gray-300'} hover:text-blue-400 transition`}>
              Home
            </Link>
            <Link href="/about" className={`${router.pathname === '/about' ? 'text-white' : 'text-gray-300'} hover:text-blue-400 transition`}>
              About
            </Link>
            <Link href="/services" className={`${router.pathname === '/services' ? 'text-white' : 'text-gray-300'} hover:text-blue-400 transition`}>
              Services
            </Link>
            <Link href="/portfolio" className={`${router.pathname === '/portfolio' ? 'text-white' : 'text-gray-300'} hover:text-blue-400 transition`}>
              Portfolio
            </Link>
            <Link href="/contact" className={`${router.pathname === '/contact' ? 'text-white' : 'text-gray-300'} hover:text-blue-400 transition`}>
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
                Home
              </Link>
              <Link href="/about" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
                About
              </Link>
              <Link href="/services" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
                Services
              </Link>
              <Link href="/portfolio" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
                Portfolio
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
