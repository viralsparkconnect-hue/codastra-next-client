// components/Layout.js
import Navigation from './Navigation'
import Footer from './Footer'
import AIChatWidget from './AIChatWidget'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>{children}</main>
      <Footer />
      
      {/* AI Chat Widget appears on all pages */}
      <AIChatWidget />
    </div>
  )
}

// Then update your pages like this:

// pages/index.js (Home Page)
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        {/* Your home page content */}
        <section className="pt-32 pb-20 px-4">
          {/* Hero content */}
        </section>
        {/* Rest of your home page */}
      </div>
    </Layout>
  )
}

// pages/about.js
import Layout from '../components/Layout'

export default function About() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 text-white">
        <h1>About Us</h1>
        {/* About page content */}
      </div>
    </Layout>
  )
}

// pages/contact.js
import Layout from '../components/Layout'

export default function Contact() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 text-white">
        <h1>Contact Us</h1>
        {/* Contact page content */}
      </div>
    </Layout>
  )
}

// pages/services.js
import Layout from '../components/Layout'

export default function Services() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 text-white">
        <h1>Our Services</h1>
        {/* Services page content */}
      </div>
    </Layout>
  )
}
