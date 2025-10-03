import { useState, useEffect } from 'react'

// Icons
const Lock = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
)

const Mail = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const Shield = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const Key = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
)

const CheckCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const AlertCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const Send = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
)

const ArrowLeft = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
)

const Users = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

const TrendingUp = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const Sparkles = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l3.057-3L12 3l3.943-3L19 3l2.5 8.5L19 20l-3.943-3L12 20l-3.057-3L5 20l-2.5-8.5L5 3z" />
  </svg>
)

const Refresh = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
)

const Download = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
)

const Phone = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const Star = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
)

const Clock = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const Briefcase = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v10a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8" />
  </svg>
)

export default function CRMAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [step, setStep] = useState('email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [resendTimer, setResendTimer] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  // Dashboard state
  const [leads, setLeads] = useState([])
  const [stats, setStats] = useState({})
  const [loadingLeads, setLoadingLeads] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const auth = localStorage.getItem('crm_auth')
    const authTimestamp = localStorage.getItem('crm_auth_timestamp')
    const authEmail = localStorage.getItem('crm_auth_email')
    
    if (auth === 'true' && authTimestamp && authEmail === 'codastra.conect@gmail.com') {
      const authTime = parseInt(authTimestamp)
      const now = Date.now()
      const twentyFourHours = 24 * 60 * 60 * 1000
      
      if (now - authTime < twentyFourHours) {
        setIsAuthenticated(true)
        setEmail(authEmail)
      } else {
        localStorage.removeItem('crm_auth')
        localStorage.removeItem('crm_auth_timestamp')
        localStorage.removeItem('crm_auth_email')
      }
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      loadLeads()
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  const handleSendOTP = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    if (email.toLowerCase().trim() !== 'codastra.conect@gmail.com') {
      setError('Access denied. Only authorized admin email can login.')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase().trim() })
      })

      const result = await response.json()

      if (result.success) {
        setStep('otp')
        setSuccess('OTP sent! Check your email.')
        setResendTimer(60)
      } else {
        throw new Error(result.error || 'Failed to send OTP')
      }
    } catch (error) {
      setError('Failed to send OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email.toLowerCase().trim(), 
          otp: otp.trim() 
        })
      })

      const result = await response.json()

      if (result.success) {
        setIsAuthenticated(true)
        localStorage.setItem('crm_auth', 'true')
        localStorage.setItem('crm_auth_timestamp', Date.now().toString())
        localStorage.setItem('crm_auth_email', email.toLowerCase().trim())
        setSuccess('Login successful!')
      } else {
        throw new Error(result.error || 'Invalid OTP')
      }
    } catch (error) {
      setError(error.message || 'Invalid OTP. Please try again.')
      setOtp('')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    if (resendTimer > 0) return
    
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase().trim() })
      })

      const result = await response.json()

      if (result.success) {
        setSuccess('New OTP sent to your email!')
        setResendTimer(60)
      } else {
        throw new Error(result.error || 'Failed to resend OTP')
      }
    } catch (error) {
      setError('Failed to resend OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('crm_auth')
    localStorage.removeItem('crm_auth_timestamp')
    localStorage.removeItem('crm_auth_email')
    setEmail('')
    setOtp('')
    setStep('email')
  }

  const handleBackToEmail = () => {
    setStep('email')
    setOtp('')
    setError('')
    setSuccess('')
  }

  const loadLeads = async () => {
    setLoadingLeads(true)
    try {
      const response = await fetch('/api/get-leads')
      const data = await response.json()
      
      if (data.success && data.leads) {
        setLeads(data.leads || [])
        setStats(data.stats || {})
      }
    } catch (error) {
      console.error('Error loading leads:', error)
      setUploadStatus('⚠ Error loading leads')
    } finally {
      setLoadingLeads(false)
    }
  }

  const handleDownloadCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Company', 'Service', 'Status', 'Lead Score', 'Budget', 'Message', 'Date']
    
    const csvData = leads.map(lead => [
      lead.name,
      lead.email,
      lead.phone,
      lead.company,
      lead.service,
      lead.status,
      lead.lead_score,
      lead.budget,
      `"${(lead.message || '').replace(/"/g, '""')}"`,
      new Date(lead.timestamp).toLocaleString()
    ])

    const csv = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Codastra_Leads_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getStatusColor = (status) => {
    const colors = {
      'New': 'bg-blue-500/20 text-blue-300 border-blue-400/30',
      'Contacted': 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30',
      'Qualified': 'bg-green-500/20 text-green-300 border-green-400/30',
      'Closed': 'bg-gray-500/20 text-gray-300 border-gray-400/30'
    }
    return colors[status] || colors['New']
  }

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-400'
    if (score >= 6) return 'text-yellow-400'
    return 'text-red-400'
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="floating-orb w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-600/20 top-10 -left-20"
            style={{ transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)` }}
          />
          <div 
            className="floating-orb w-80 h-80 bg-gradient-to-r from-purple-500/15 to-pink-500/15 top-1/3 -right-16"
            style={{ transform: `translate(${-mousePosition.x * 0.05}px, ${-mousePosition.y * 0.05}px)` }}
          />
        </div>

        <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 max-w-md w-full shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
              Codastra CRM
            </h2>
            <p className="text-gray-400">
              {step === 'email' ? 'Secure OTP Login' : 'Enter Verification Code'}
            </p>
          </div>

          {step === 'email' && (
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Admin Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="codastra.conect@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendOTP(e)}
                    className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:border-transparent transition-all ${
                      error ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:ring-blue-500'
                    }`}
                    disabled={isLoading}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Only <span className="text-blue-400 font-semibold">codastra.conect@gmail.com</span> can access
                </p>
              </div>

              {error && (
                <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              {success && (
                <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <p className="text-green-300 text-sm">{success}</p>
                </div>
              )}

              <button
                onClick={handleSendOTP}
                disabled={isLoading || !email.trim()}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-3 ${
                  isLoading || !email.trim()
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-[1.02] shadow-lg hover:shadow-blue-500/50'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send OTP
                  </>
                )}
              </button>
            </div>
          )}

          {step === 'otp' && (
            <div className="space-y-6">
              <button
                onClick={handleBackToEmail}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Change email</span>
              </button>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Enter 6-Digit OTP
                </label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    onKeyPress={(e) => e.key === 'Enter' && otp.length === 6 && handleVerifyOTP(e)}
                    className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:border-transparent transition-all text-center text-2xl tracking-widest font-mono ${
                      error ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:ring-blue-500'
                    }`}
                    disabled={isLoading}
                    maxLength={6}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  OTP sent to <span className="text-blue-400">{email}</span>
                </p>
              </div>

              {error && (
                <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              {success && (
                <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <p className="text-green-300 text-sm">{success}</p>
                </div>
              )}

              <button
                onClick={handleVerifyOTP}
                disabled={isLoading || otp.length !== 6}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-3 ${
                  isLoading || otp.length !== 6
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-[1.02] shadow-lg hover:shadow-blue-500/50'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Verify & Login
                  </>
                )}
              </button>

              <div className="text-center">
                <button
                  onClick={handleResendOTP}
                  disabled={resendTimer > 0 || isLoading}
                  className={`text-sm ${
                    resendTimer > 0 || isLoading
                      ? 'text-gray-500 cursor-not-allowed'
                      : 'text-blue-400 hover:text-blue-300'
                  } transition-colors`}
                >
                  {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>Secured with OTP Email Verification</span>
            </div>
            <p className="text-gray-500 text-xs text-center mt-2">
              All access attempts are logged and monitored
            </p>
          </div>
        </div>

        <style jsx>{`
          .floating-orb {
            border-radius: 50%;
            filter: blur(60px);
            animation: float 8s ease-in-out infinite;
            position: absolute;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-30px) scale(1.1); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Codastra CRM
              </h1>
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>System Online</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={loadLeads}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Refresh leads"
              >
                <Refresh className={`w-5 h-5 ${loadingLeads ? 'animate-spin' : ''}`} />
              </button>
              <div className="text-sm text-gray-300 hidden sm:flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                {email}
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/20 text-red-300 border border-red-400/30 rounded-lg hover:bg-red-500/30 transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-blue-400/30 transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Leads</p>
                <p className="text-3xl font-bold text-white">{stats.total || 0}</p>
              </div>
              <Users className="w-10 h-10 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-yellow-400/30 transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">New Leads</p>
                <p className="text-3xl font-bold text-blue-400">{stats.newLeads || 0}</p>
              </div>
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-green-400/30 transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">This Week</p>
                <p className="text-3xl font-bold text-green-400">{stats.recentCount || 0}</p>
              </div>
              <TrendingUp className="w-10 h-10 text-green-400" />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-purple-400/30 transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Avg Score</p>
                <p className="text-3xl font-bold text-purple-400">{stats.averageScore || '0.0'}</p>
              </div>
              <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl font-semibold text-white">Lead Management</h2>
            <button
              onClick={handleDownloadCSV}
              disabled={leads.length === 0}
              className="px-4 py-2 bg-purple-500/20 text-purple-300 border border-purple-400/30 rounded-lg hover:bg-purple-500/30 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>

          {uploadStatus && (
            <div className="mt-4 p-3 bg-blue-500/20 border border-blue-400/30 rounded-lg text-blue-300 text-sm text-center">
              {uploadStatus}
            </div>
          )}
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
          {loadingLeads ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-4 border-white/20 border-t-blue-400 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Loading leads...</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No leads found</h3>
              <p className="text-gray-400">Leads will appear here once customers start contacting you.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Lead Info</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Score</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {leads.map((lead, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-white">{lead.name || 'Anonymous'}</div>
                          <div className="text-sm text-gray-400">{lead.company || 'No company'}</div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          {lead.email && (
                            <div className="text-sm text-white flex items-center gap-2">
                              <Mail className="w-3 h-3 text-gray-400" />
                              {lead.email}
                            </div>
                          )}
                          {lead.phone && (
                            <div className="text-sm text-gray-400 flex items-center gap-2">
                              <Phone className="w-3 h-3" />
                              {lead.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-blue-400" />
                          <span className="text-sm text-gray-300">{lead.service || 'General Inquiry'}</span>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(lead.status || 'New')}`}>
                          {lead.status || 'New'}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className={`font-semibold ${getScoreColor(lead.lead_score || 0)}`}>
                            {lead.lead_score || 0}/10
                          </span>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock className="w-3 h-3" />
                          {new Date(lead.timestamp || lead.date).toLocaleDateString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>
            Powered by <span className="text-blue-400 font-semibold">Codastra</span> CRM System
          </p>
          <p className="mt-1 flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-green-400" />
            Secured with OTP Authentication
          </p>
        </div>
      </div>

      <style jsx>{`
        .floating-orb {
          border-radius: 50%;
          filter: blur(60px);
          animation: float 8s ease-in-out infinite;
          position: absolute;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.1); }
        }
      `}</style>
    </div>
  )
}
