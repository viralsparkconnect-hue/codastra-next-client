// pages/_app.js - Complete Updated Code
import '../styles/globals.css'
import AIChatWidget from '../components/AIChatWidget'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isOnline, setIsOnline] = useState(true)

  // Ensure proper loading and hydration
  useEffect(() => {
    setIsLoaded(true)
    
    // Check online status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Optional: Hide chat on specific pages (admin, login, etc.)
  const hideChatPages = [
    '/admin',
    '/login', 
    '/dashboard',
    '/admin/login',
    '/api',
    '/404'
  ]
  
  // Check if current page should show chat
  const showChat = !hideChatPages.some(page => router.pathname.startsWith(page)) && isLoaded

  // Page loading state
  const [isPageLoading, setIsPageLoading] = useState(false)

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
  }, [router])

  return (
    <>
      {/* Global Head Settings */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#1e293b" />
        <meta name="description" content="Professional Digital Agency - Web Development, Mobile Apps, UI/UX Design" />
        
        {/* Preload important resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        
        {/* SEO Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Digital Excellence Delivered" />
        <meta property="og:description" content="We create extraordinary digital experiences with 300+ happy clients and 200+ projects completed." />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Page Loading Indicator */}
      {isPageLoading && (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse"></div>
        </div>
      )}

      {/* Offline Notification */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2 text-sm z-40">
          You're currently offline. Some features may not work properly.
        </div>
      )}

      {/* Main App Content */}
      <div className={`min-h-screen ${isPageLoading ? 'opacity-90' : 'opacity-100'} transition-opacity duration-200`}>
        <Component {...pageProps} />
      </div>
      
      {/* AI Chat Widget - Global across all pages */}
      {showChat && (
        <AIChatWidget 
          currentPage={router.pathname}
          isOnline={isOnline}
        />
      )}
      
      {/* Global Styles */}
      <style jsx global>{`
        /* Ensure chat widget has highest priority */
        .chat-widget {
          z-index: 9999 !important;
        }
        
        /* Smooth page transitions */
        * {
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          transition: all 0.3s ease;
          background-color: #0f172a;
          color: white;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.1);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
        }
        
        /* Loading animation */
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .loading-shimmer {
          animation: shimmer 1.5s infinite;
        }
        
        /* Focus styles for accessibility */
        *:focus {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
        
        /* Prevent flash of unstyled content */
        .hydration-loading * {
          visibility: hidden;
        }
        
        .hydration-complete * {
          visibility: visible;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          body {
            font-size: 16px; /* Prevent zoom on iOS */
          }
        }
        
        /* Print styles */
        @media print {
          .chat-widget {
            display: none !important;
          }
        }
        
        /* Reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* High contrast mode */
        @media (prefers-contrast: high) {
          body {
            background: #000;
            color: #fff;
          }
        }
        
        /* Dark mode system preference */
        @media (prefers-color-scheme: dark) {
          body {
            background-color: #0f172a;
            color: #f1f5f9;
          }
        }
      `}</style>
    </>
  )
}

// Optional: Add error boundary
MyApp.getInitialProps = async (appContext) => {
  // This runs on server-side and client-side
  return {
    pageProps: {}
  }
}

export default MyApp
