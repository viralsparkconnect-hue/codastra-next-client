// pages/admin/leads.js - Admin dashboard page for viewing leads
import { useState, useEffect } from 'react'
import SheetsLeadDashboard from '../../components/SheetsLeadDashboard'
import Navigation from '../../components/Navigation'

// Simple icons
const Lock = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
)

const Eye = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

const EyeOff = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
  </svg>
)

const Shield = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

export default function LeadsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Check for existing authentication on component mount
  useEffect(() => {
    const auth = localStorage.getItem('dashboard_auth')
    const authTimestamp = localStorage.getItem('dashboard_auth_timestamp')
    
    // Check if authentication is still valid (24 hours)
    if (auth === 'true' && authTimestamp) {
      const authTime = parseInt(authTimestamp)
      const now = Date.now()
      const twentyFourHours = 24 * 60 * 60 * 1000
      
      if (now - authTime < twentyFourHours) {
        setIsAuthenticated(true)
      } else {
        // Authentication expired
        localStorage.removeItem('dashboard_auth')
        localStorage.removeItem('dashboard_auth_timestamp')
      }
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Check for too many failed attempts
    if (loginAttempts >= 5) {
      setError('Too many failed attempts. Please wait 5 minutes before trying again.')
      setIsLoading(false)
      return
    }

    // Simulate a small delay for security
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (password === 'codastra2024') { 
      setIsAuthenticated(true)
      localStorage.setItem('dashboard_auth', 'true')
      localStorage.setItem('dashboard_auth_timestamp', Date.now().toString())
      setError('')
      setLoginAttempts(0)
    } else {
      setError('Incorrect password. Please try again.')
      setLoginAttempts(prev => prev + 1)
      setPassword('')
      
      // Add progressive delay for failed attempts
      if (loginAttempts >= 2) {
        await new Promise(resolve => setTimeout(resolve, (loginAttempts - 1) * 1000))
      }
    }
    
    setIsLoading(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('dashboard_auth')
    localStorage.removeItem('dashboard_auth_timestamp')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 flex items-center justify-center px-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative bg-gray-800/50 backdrop-blur-xl p-8 rounded-3xl border border-gray-700/50 max-w-md w-full shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Admin Dashboard
            </h2>
            <p className="text-gray-400">
              Secure access to lead management system
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Password Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Dashboard Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-12 pr-12 py-4 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:border-transparent transition-all duration-300 ${
                    error 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-600 focus:ring-blue-500 hover:border-gray-500'
                  }`}
                  required
                  disabled={isLoading || loginAttempts >= 5}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-900/20 border border-red-600/30 rounded-xl">
                <p className="text-red-300 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Login Attempts Warning */}
            {loginAttempts >= 3 && loginAttempts < 5 && (
              <div className="p-4 bg-yellow-900/20 border border-yellow-600/30 rounded-xl">
                <p className="text-yellow-300 text-sm text-center">
                  Warning: {5 - loginAttempts} attempts remaining
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || loginAttempts >= 5 || !password.trim()}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                isLoading || loginAttempts >= 5 || !password.trim()
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] shadow-lg hover:shadow-xl'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Access Dashboard
                </>
              )}
            </button>
          </form>

          {/* Security Note */}
          <div className="mt-8 p-4 bg-gray-700/30 rounded-xl border border-gray-600/30">
            <p className="text-gray-400 text-xs text-center">
              🔒 This is a secure area. All access attempts are logged and monitored.
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Powered by <span className="text-blue-400 font-semibold">Codastra</span>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Navigation with Logout */}
      <nav className="bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Codastra Admin
              </h1>
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Dashboard Active</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-400">
                Welcome, Admin
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600/10 text-red-400 border border-red-600/30 rounded-xl hover:bg-red-600/20 transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <SheetsLeadDashboard />
    </>
  )
}
