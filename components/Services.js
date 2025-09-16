import { motion } from 'framer-motion'
import { Code, Megaphone, LineChart, Brush } from 'lucide-react'

const services = [
  { icon: Code, title: 'Website Development', desc: 'Custom, responsive, and scalable websites built with the latest tech.' },
  { icon: Megaphone, title: 'Digital Marketing', desc: 'Drive traffic, engagement, and conversions with tailored campaigns.' },
  { icon: LineChart, title: 'SEO & Analytics', desc: 'Boost visibility and measure performance with smart SEO strategies.' },
  { icon: Brush, title: 'Branding & Design', desc: 'Creative design and brand identity that stand out.' },
]

export default function Services() {
  return (
    <section className="mt-12 w-full max-w-5xl">
      <h2 className="text-3xl font-bold mb-8">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={i}
            className="p-6 rounded-2xl bg-gray-800 shadow-lg hover:shadow-xl transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <Icon className="w-10 h-10 mb-4 text-blue-400" />
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-300">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}