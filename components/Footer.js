import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-gray-700 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Codastra
            </h3>
            <p className="text-gray-400">
              Where Code Meets Creativity. Building digital experiences that matter.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/services" className="hover:text-blue-400 transition">Web Development</Link></li>
              <li><Link href="/services" className="hover:text-blue-400 transition">Mobile Apps</Link></li>
              <li><Link href="/services" className="hover:text-blue-400 transition">Digital Marketing</Link></li>
              <li><Link href="/services" className="hover:text-blue-400 transition">Branding</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-blue-400 transition">About Us</Link></li>
              <li><Link href="/portfolio" className="hover:text-blue-400 transition">Portfolio</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition">Careers</Link></li>
              <li><Link href="/" className="hover:text-blue-400 transition">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>codastra.conect@gmail.com</li>
              <li>+91 (902) 169-8707</li>
              <li>India</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          © {new Date().getFullYear()} Codastra. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
