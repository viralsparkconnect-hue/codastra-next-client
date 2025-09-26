import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-gray-700 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Codastra
            </h3>
            <p className="text-gray-400">
              Where Code Meets Creativity. Building digital experiences that matter.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/services" className="hover:text-blue-400 transition">Web Development</Link></li>
              <li><Link href="/services" className="hover:text-blue-400 transition">Mobile Apps</Link></li>
              <li><Link href="/services" className="hover:text-blue-400 transition">Digital Marketing</Link></li>
              <li><Link href="/services" className="hover:text-blue-400 transition">Branding</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-blue-400 transition">About Us</Link></li>
              <li><Link href="/portfolio" className="hover:text-blue-400 transition">Portfolio</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition">Careers</Link></li>
              <li><Link href="/" className="hover:text-blue-400 transition">Blog</Link></li>
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-blue-400" />
                <a href="mailto:codastra.conect@gmail.com" className="hover:text-blue-400 transition">
                  codastra.conect@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-blue-400" />
                <a href="tel:+919834683297" className="hover:text-blue-400 transition">
                  +91 98346 83297
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={18} className="text-blue-400" />
                <span>India</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex gap-4 mt-6 text-gray-400">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition">
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          © {new Date().getFullYear()} Codastra. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
