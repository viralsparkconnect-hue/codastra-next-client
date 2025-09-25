// pages/_app.js - Optimized and Fixed
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
    
    // Online/offline status
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

  // Page loading state
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Page loading indicator */}
      {isPageLoading && (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse" />
        </div>
      )}

      {/* Offline notification */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2 text-sm z-40">
          You're currently offline. Some features may not work properly.
        </div>
      )}

      {/* Main content */}
      <div className={`min-h-screen transition-opacity duration-200 ${isPageLoading ? 'opacity-90' : 'opacity-100'}`}>
        <Component {...pageProps} />
      </div>
      
      {/* AI Chat Widget */}
      {shouldShowChat && <AIChatWidget />}
      
      {/* Global styles */}
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
        
        /* Focus styles */
        *:focus {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          body {
            font-size: 16px;
          }
        }
        
        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* High contrast */
        @media (prefers-contrast: high) {
          body {
            background: #000;
            color: #fff;
          }
        }
      `}</style>
    </>
  )
}

export default MyApp
