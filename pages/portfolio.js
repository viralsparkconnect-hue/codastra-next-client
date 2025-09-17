import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, ArrowRight, Calendar, Users, TrendingUp, Award, Filter, Search, Eye, Heart, Star, Code, Smartphone, Globe, Brush } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [hoveredProject, setHoveredProject] = useState(null)
  const [viewMode, setViewMode] = useState('grid') // grid or list

  const categories = ['All', 'Web Development', 'Mobile Apps', 'E-commerce', 'UI/UX Design', 'Full Stack', 'AI/ML']

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Fashion Platform',
      category: 'E-commerce',
      desc: 'A comprehensive e-commerce platform with AI-powered recommendations, real-time inventory management, and seamless checkout experience.',
      longDesc: 'Built a complete e-commerce ecosystem featuring advanced product filtering, wishlist functionality, secure payment processing, and an intuitive admin dashboard. The platform handles 10,000+ daily transactions.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
      image: '🛍️',
      client: 'Fashion Forward Inc.',
      duration: '4 months',
      budget: '$15,000',
      results: ['300% increase in sales', '45% better conversion rate', '50% faster load times'],
      features: ['Advanced Search', 'Payment Integration', 'Admin Dashboard', 'Mobile Responsive', 'SEO Optimized'],
      year: 2024,
      status: 'Live',
      visits: '50K+',
      rating: 4.9,
      testimonial: 'Exceeded our expectations in every way. Our sales have tripled!',
      gradient: 'from-blue-500 to-purple-600',
      featured: true
    },
    {
      id: 2,
      title: 'FinTech Mobile Banking App',
      category: 'Mobile Apps',
      desc: 'Secure financial management app with real-time transactions, budget tracking, and AI-powered financial insights.',
      longDesc: 'Developed a comprehensive banking app with biometric authentication, real-time notifications, expense categorization, and investment tracking features.',
      tech: ['React Native', 'Firebase', 'Plaid API', 'Redux', 'Biometrics'],
      image: '💳',
      client: 'SecureBank',
      duration: '6 months',
      budget: '$25,000',
      results: ['100K+ downloads', '4.8 app store rating', '60% user retention'],
      features: ['Biometric Auth', 'Real-time Sync', 'Budget Tracking', 'Investment Tools'],
      year: 2024,
      status: 'Live',
      visits: '100K+',
      rating: 4.8,
      testimonial: 'Revolutionary banking experience. Users love the intuitive interface!',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      id: 3,
      title: 'Healthcare Management Dashboard',
      category: 'Web Development',
      desc: 'Comprehensive healthcare management system for medical professionals with patient records, appointment scheduling, and analytics.',
      longDesc: 'Built a complete healthcare ecosystem with patient management, appointment booking, medical records, prescription tracking, and detailed analytics dashboard.',
      tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Chart.js', 'Prisma'],
      image: '🏥',
      client: 'MediCare Solutions',
      duration: '5 months',
      budget: '$20,000',
      results: ['90% time savings', '500+ medical professionals', '99.9% uptime'],
      features: ['Patient Management', 'Appointment System', 'Analytics', 'HIPAA Compliant'],
      year: 2024,
      status: 'Live',
      visits: '25K+',
      rating: 4.9,
      testimonial: 'Transformed our entire practice workflow. Incredible system!',
      gradient: 'from-red-500 to-pink-600'
    },
    {
      id: 4,
      title: 'AI-Powered Content Platform',
      category: 'AI/ML',
      desc: 'Intelligent content creation platform with natural language processing and automated content generation.',
      longDesc: 'Created an AI-powered platform that generates high-quality content, provides SEO recommendations, and includes automated proofreading capabilities.',
      tech: ['Python', 'TensorFlow', 'Flask', 'OpenAI API', 'Redis'],
      image: '🤖',
      client: 'ContentCorp',
      duration: '8 months',
      budget: '$35,000',
      results: ['80% faster content creation', '200% productivity increase', '95% accuracy rate'],
      features: ['AI Content Generation', 'SEO Analysis', 'Multi-language', 'API Access'],
      year: 2023,
      status: 'Live',
      visits: '75K+',
      rating: 4.7,
