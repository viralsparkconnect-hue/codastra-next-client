// pages/_app.js - Fixed for Vercel Deployment with EmailJS
import '../styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Script from 'next/script'
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
  const [emailjsLoaded, setEmailjsLoaded] = useState(false)

  // Initialize EmailJS when script loads
  const initializeEmailJS = () => {
    if (typeof window !== 'undefined' && window.emailjs) {
      try {
        window.emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'AlryU3umMzVGedPYh')
        setEmailjsLoaded(true)
        console.log('EmailJS initialized successfully')
      } catch (error) {
        console.error('EmailJS initialization failed:', error)
      }
    }
  }

  // Initialize app state
  useEffect(() => {
    setIsLoaded(true)
    
    // Online/offline status detection (browser only)
    if (typeof window !== 'undefined') {
      const handleOnline = () => setIsOnline(true)
      const handleOffline = () => setIsOnline(false)
      
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
  const shouldShowChat = isLoaded && emailjsLoaded && !hideChatPages.some(page => 
    router.pathname.startsWith(page)
  )

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#1e293b" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </Head>

      {/* Load EmailJS script */}
      <Script
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
        onLoad={initializeEmailJS}
        onError={(e) => {
          console.error('Failed to load EmailJS:', e)
        }}
      />

      {/* Page loading indicator */}
      {isPageLoading && (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ease-out animate-pulse w-full" />
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

      {/* EmailJS loading indicator */}
      {isLoaded && !emailjsLoaded && (
        <div className="fixed bottom-4 left-4 bg-blue-600/20 border border-blue-500/30 rounded-lg p-3 text-blue-300 text-sm z-30">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Initializing chat system...</span>
          </div>
        </div>
      )}

      {/* Main content wrapper */}
      <div className={`min-h-screen transition-opacity duration-200 ${
        isPageLoading ? 'opacity-90' : 'opacity-100'
      } ${!isOnline ? 'mt-10' : ''}`}>
        <main id="main-content">
          <Component {...pageProps} />
        </main>
      </div>
      
      {/* AI Chat Widget - Only render when EmailJS is ready */}
      {shouldShowChat && <AIChatWidget />}
      
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white p-2 rounded z-50"
      >
        Skip to main content
      </a>
    </>
  )
}

export default MyApp
