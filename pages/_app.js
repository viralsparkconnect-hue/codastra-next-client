// pages/_app.js - Fixed for Vercel Deployment
import '../styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

// Dynamically import AIChatWidget to prevent SSR issues
const AIChatWidget = dynamic(() => import('../components/AIChatWidget'), {
  ssr: false,
  loading: () => null
})

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [isPageLoading, setIsPageLoading] = useState(false)

  // Initialize app state
  useEffect(() => {
    setIsLoaded(true)
    
    // Online/offline status detection
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine)
      window.addEventListener('online', handleOnline)
      window.addEventListener('offline', handleOffline)
      
      return () => {
        window.removeEventListener('online', handleOnline)
        window.removeEventListener('offline', handleOffline)
      }
    }
  }, [])

  // Page loading state management
  useEffect(() => {
    const handleStart = () => setIsPageLoading(true)
    const handleComplete = () => setIsPageLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router.events])

  // Pages where chat should be hidden
  const hideChatPages = ['/admin', '/login', '/dashboard', '/api', '/404']
  const shouldShowChat = isLoaded && !hideChatPages.some(page => 
    router.pathname.startsWith(page)
  )

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#1e293b" />
        <meta name="description" content="Professional digital agency delivering cutting-edge web solutions" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="robots" content="index, follow" />
      </Head>

      {/* Page loading indicator */}
      {isPageLoading && (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ease-out"
            style={{ width: '100%', animation: 'pulse 1.5s ease-in-out infinite' }}
          />
        </div>
      )}

      {/* Offline notification */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2 text-sm z-40 shadow-lg">
          <span role="alert" aria-live="polite">
            You&apos;re currently offline. Some features may not work properly.
          </span>
        </div>
      )}

      {/* Main content wrapper */}
      <div className={`min-h-screen transition-opacity duration-200 ${
        isPageLoading ? 'opacity-90' : 'opacity-100'
      } ${!isOnline ? 'mt-10' : ''}`}>
        <Component {...pageProps} />
      </div>
      
      {/* AI Chat Widget - Only render client-side */}
      {shouldShowChat && <AIChatWidget />}
      
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white p-2 rounded z-50"
      >
        Skip to main content
      </a>
      
      {/* Global styles with proper escaping */}
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
          font-size: 16px;
        }
        
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background-color: #0f172a;
          color: white;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Screen reader only class */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        
        .focus\\:not-sr-only:focus {
          position: static;
          width: auto;
          height: auto;
          padding: 0.5rem;
          margin: 0;
          overflow: visible;
          clip: auto;
          white-space: normal;
        }
        
        /* Custom scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.1);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 4px;
          transition: background 0.2s ease;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
        }
        
        ::-webkit-scrollbar-corner {
          background: transparent;
        }
        
        /* Enhanced focus styles for accessibility */
        *:focus {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
          transition: outline 0.2s ease;
        }
        
        *:focus:not(:focus-visible) {
          outline: none;
        }
        
        *:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
        
        /* Button and interactive element styles */
        button, 
        [role="button"], 
        input[type="submit"], 
        input[type="button"] {
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        button:disabled,
        [role="button"][aria-disabled="true"] {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        /* Link styles */
        a {
          color: inherit;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        
        a:hover {
          color: #60a5fa;
        }
        
        /* Image optimization */
        img {
          max-width: 100%;
          height: auto;
          display: block;
        }
        
        /* Form element styles */
        input, 
        textarea, 
        select {
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
        }
        
        /* Loading state styles */
        .loading {
          opacity: 0.6;
          pointer-events: none;
          position: relative;
        }
        
        .loading::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.1);
          border-radius: inherit;
        }
        
        /* Animation keyframes */
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        /* Utility classes */
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          html {
            font-size: 14px;
          }
          
          body {
            font-size: 16px; /* Prevent zoom on iOS */
          }
          
          /* Improve touch targets */
          button, 
          [role="button"], 
          a {
            min-height: 44px;
            min-width: 44px;
          }
        }
        
        /* Tablet optimizations */
        @media (min-width: 769px) and (max-width: 1024px) {
          html {
            font-size: 15px;
          }
        }
        
        /* Desktop optimizations */
        @media (min-width: 1025px) {
          html {
            font-size: 16px;
          }
        }
        
        /* Reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
          
          .animate-fade-in,
          .animate-slide-in {
            animation: none;
          }
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
          body {
            background: #000;
            color: #fff;
          }
          
          ::-webkit-scrollbar-thumb {
            background: #fff;
          }
          
          *:focus {
            outline-color: #fff;
          }
        }
        
        /* Dark mode preferences (additional support) */
        @media (prefers-color-scheme: dark) {
          body {
            background-color: #0f172a;
            color: #f8fafc;
          }
        }
        
        /* Print styles */
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          
          .fixed,
          [data-chat-widget],
          .animate-pulse {
            display: none !important;
          }
          
          a {
            color: blue !important;
            text-decoration: underline !important;
          }
          
          h1, h2, h3, h4, h5, h6 {
            break-after: avoid;
            break-inside: avoid;
          }
          
          img {
            max-width: 100% !important;
          }
        }
        
        /* Error boundary styles */
        .error-boundary {
          padding: 2rem;
          text-align: center;
          background: #fee2e2;
          color: #991b1b;
          border: 1px solid #fecaca;
          border-radius: 8px;
          margin: 1rem;
        }
        
        .error-boundary h2 {
          margin-bottom: 1rem;
          color: #991b1b;
        }
        
        .error-boundary pre {
          background: #fef2f2;
          padding: 1rem;
          border-radius: 4px;
          text-align: left;
          overflow: auto;
          font-size: 0.875rem;
        }
      `}</style>
    </>
  )
}

export default MyApp
