import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    try {
      console.log('Form submitted:', form)
      // Here you would normally send to your backend/API
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setSubmitted(true)
      setForm({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center p-8 bg-green-900/20 border border-green-500 rounded-2xl">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-green-400 mb-2">Message Sent!</h3>
        <p className="text-gray-300 mb-4">Thank you for reaching out. We'll get back to you within 24 hours.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
          Your Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="John Doe"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
          Your Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="john@example.com"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
          Your Message *
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell us about your project..."
          value={form.message}
          onChange={handleChange}
          required
          rows="5"
          className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
          isSubmitting
            ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
        }`}
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
            Sending...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
            Send Message
          </>
        )}
      </button>
    </form>
  )
}
