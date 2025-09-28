import { useState, useEffect } from 'react'

// Icons
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

const Users = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
)

const Search = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const Edit = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
)

const Trash = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
)

const Plus = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m-7-7h14" />
  </svg>
)

const X = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const Calendar = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const Phone = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const Mail = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const Building = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
)

const Sparkles = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l3.057-3L12 3l3.943-3L19 3l2.5 8.5L19 20l-3.943-3L12 20l-3.057-3L5 20l-2.5-8.5L5 3z" />
  </svg>
)

const Trophy = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
)

const Star = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const Refresh = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
)

const TrendingUp = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const Clock = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

export default function CRMAdminPage() {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // CRM states
  const [leads, setLeads] = useState([])
  const [filteredLeads, setFilteredLeads] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [serviceFilter, setServiceFilter] = useState('All')
  const [selectedLead, setSelectedLead] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editForm, setEditForm] = useState({})
  const [lastUpdated, setLastUpdated] = useState(null)

  // Check authentication on mount
  useEffect(() => {
    const auth = sessionStorage.getItem('dashboard_auth')
    const authTimestamp = sessionStorage.getItem('dashboard_auth_timestamp')
    
    if (auth === 'true' && authTimestamp) {
      const authTime = parseInt(authTimestamp)
      const now = Date.now()
      const twentyFourHours = 24 * 60 * 60 * 1000
      
      if (now - authTime < twentyFourHours) {
        setIsAuthenticated(true)
      } else {
        sessionStorage.removeItem('dashboard_auth')
        sessionStorage.removeItem('dashboard_auth_timestamp')
      }
    }
  }, [])

  // Load leads when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadLeads()
    }
  }, [isAuthenticated])

  // Auto-refresh every 30 seconds when authenticated
  useEffect(() => {
    let interval
    if (isAuthenticated) {
      interval = setInterval(() => {
        loadLeads(true)
      }, 30000)
    }
    return () => clearInterval(interval)
  }, [isAuthenticated])

  // Filter leads
  useEffect(() => {
    let filtered = leads

    if (searchTerm) {
      filtered = filtered.filter(lead =>
        (lead.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.company || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.phone || '').includes(searchTerm)
      )
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter(lead => lead.status === statusFilter)
    }

    if (serviceFilter !== 'All') {
      filtered = filtered.filter(lead => lead.service === serviceFilter)
    }

    setFilteredLeads(filtered)
  }, [leads, searchTerm, statusFilter, serviceFilter])

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (loginAttempts >= 5) {
      setError('Too many failed attempts. Please wait 5 minutes before trying again.')
      setIsLoading(false)
      return
    }

    await new Promise(resolve => setTimeout(resolve, 1000))

    if (password === 'codastra2024') {
      setIsAuthenticated(true)
      sessionStorage.setItem('dashboard_auth', 'true')
      sessionStorage.setItem('dashboard_auth_timestamp', Date.now().toString())
      setError('')
      setLoginAttempts(0)
    } else {
      setError('Incorrect password. Please try again.')
      setLoginAttempts(prev => prev + 1)
      setPassword('')
    }
    
    setIsLoading(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('dashboard_auth')
    sessionStorage.removeItem('dashboard_auth_timestamp')
    setLeads([])
    setStats({})
  }

  const loadLeads = async (showRefreshLoader = false) => {
    try {
      if (showRefreshLoader) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      setError('')

      // Simulate API call - in real implementation, this would call your /api/get-leads endpoint
      const response = await fetch('/api/get-leads', {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      
      if (data.success) {
        setLeads(data.leads || [])
        setStats(data.stats || {})
        setLastUpdated(new Date())
        setError('')
      } else {
        throw new Error(data.error || 'Failed to fetch leads')
      }
    } catch (err) {
      console.error('Error fetching leads:', err)
      setError(err.message || "Failed to load leads")
      
      // Fallback to demo data if API fails and we have no leads
      if (leads.length === 0) {
        const demoData = {
          leads: [
            {
              id: 1,
              name: "Alice Johnson",
              email: "alice@example.com",
              phone: "123-456-7890",
              service: "Web Development",
              message: "Looking for a modern website for my business.",
              source: "Website",
              status: "New",
              timestamp: new Date().toISOString(),
              budget: "$5,000",
              timeline: "2 weeks",
              company: "Alice Co.",
              lead_score: 8,
              follow_up_date: "2025-01-15",
              notes: "High priority client"
            },
            {
              id: 2,
              name: "Bob Smith",
              email: "bob@example.com",
              phone: "987-654-3210",
              service: "SEO Optimization",
              message: "Need help with SEO ranking.",
              source: "Google Ads",
              status: "Contacted",
              timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              budget: "$2,000",
              timeline: "1 month",
              company: "Bob Enterprises",
              lead_score: 6,
              follow_up_date: "2025-01-20",
              notes: "Responded to initial email"
            },
            {
              id: 3,
              name: "Charlie Davis",
              email: "charlie@example.com",
              phone: "555-666-7777",
              service: "App Development",
              message: "Want to build a mobile app for e-commerce.",
              source: "Referral",
              status: "Qualified",
              timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
              budget: "$15,000",
              timeline: "3 months",
              company: "Charlie Tech",
              lead_score: 9,
              follow_up_date: "2025-01-18",
              notes: "Ready to start project"
            }
          ],
          stats: {
            total: 3,
            newLeads: 1,
            contacted: 1,
            qualified: 1,
            closed: 0,
            averageScore: 7.7,
            recentCount: 2
          }
        }
        setLeads(demoData.leads)
        setStats(demoData.stats)
        setLastUpdated(new Date())
      }
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleEditLead = (lead) => {
    setSelectedLead(lead)
    setEditForm(lead)
    setShowEditModal(true)
  }

  const handleUpdateLead = async () => {
    try {
      const updatedLeads = leads.map(lead =>
        lead.id === selectedLead.id ? { ...lead, ...editForm } : lead
      )
      setLeads(updatedLeads)
      
      // Update stats
      const newStats = calculateStats(updatedLeads)
      setStats(newStats)
      
      setShowEditModal(false)
      setSelectedLead(null)
      setEditForm({})
    } catch (error) {
      console.error('Error updating lead:', error)
    }
  }

  const handleDeleteLead = async (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        const updatedLeads = leads.filter(lead => lead.id !== leadId)
        setLeads(updatedLeads)
        
        // Update stats
        const newStats = calculateStats(updatedLeads)
        setStats(newStats)
      } catch (error) {
        console.error('Error deleting lead:', error)
      }
    }
  }

  const handleAddLead = async () => {
    try {
      const newLead = {
        id: Date.now(),
        ...editForm,
        timestamp: new Date().toISOString(),
        lead_score: editForm.lead_score || 5,
        status: 'New'
      }
      const updatedLeads = [newLead, ...leads]
      setLeads(updatedLeads)
      
      // Update stats
      const newStats = calculateStats(updatedLeads)
      setStats(newStats)
      
      setShowAddModal(false)
      setEditForm({})
    } catch (error) {
      console.error('Error adding lead:', error)
    }
  }

  const calculateStats = (leadList) => {
    const total = leadList.length
    const newLeads = leadList.filter(l => l.status === 'New').length
    const contacted = leadList.filter(l => l.status === 'Contacted').length
    const qualified = leadList.filter(l => l.status === 'Qualified').length
    const closed = leadList.filter(l => l.status === 'Closed').length
    
    const averageScore = total > 0
      ? (leadList.reduce((sum, l) => sum + (parseFloat(l.lead_score) || 0), 0) / total).toFixed(1)
      : 0

    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const recentCount = leadList.filter(l => {
      const leadDate = new Date(l.timestamp)
      return leadDate > weekAgo
    }).length

    return {
      total,
      newLeads,
      contacted,
      qualified,
      closed,
      averageScore,
      recentCount
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      'New': 'bg-blue-500/20 text-blue-300 border border-blue-400/30',
      'Contacted': 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30',
      'Qualified': 'bg-green-500/20 text-green-300 border border-green-400/30',
      'Closed': 'bg-purple-500/20 text-purple-300 border border-purple-400/30',
      'Lost': 'bg-red-500/20 text-red-300 border border-red-400/30'
    }
    return colors[status] || colors['New']
  }

  const getScoreColor = (score) => {
    const numScore = parseFloat(score) || 0
    if (numScore >= 8) return 'text-green-400'
    if (numScore >= 6) return 'text-yellow-400'
    return 'text-red-400'
  }

  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return 'Invalid Date'
    }
  }

  const uniqueServices = [...new Set(leads.map(lead => lead.service).filter(Boolean))]

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-orb w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-600/30 top-10 -left-20" />
          <div className="floating-orb w-80 h-80 bg-gradient-to-r from-purple-500/25 to-pink-500/25 top-1/3 -right-16" />
          <div className="floating-orb w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 bottom-20 left-1/3" />
        </div>

        <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 max-w-md w-full shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 hover:scale-105 transition-transform duration-300">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Codastra CRM
              </span>
            </h2>
            <p className="text-gray-400">
              Secure access to lead management system
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
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
                  className={`w-full pl-12 pr-12 py-4 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:border-transparent transition-all duration-300 backdrop-blur-md ${
                    error 
                      ? 'border-red-400/50 focus:ring-red-500' 
                      : 'border-white/20 focus:ring-blue-500 hover:border-white/30'
                  }`}
                  required
                  disabled={isLoading || loginAttempts >= 5}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-400/30 rounded-xl backdrop-blur-md">
                <p className="text-red-300 text-sm text-center">{error}</p>
              </div>
            )}

            {loginAttempts >= 3 && loginAttempts < 5 && (
              <div className="p-4 bg-yellow-500/10 border border-yellow-400/30 rounded-xl backdrop-blur-md">
                <p className="text-yellow-300 text-sm text-center">
                  Warning: {5 - loginAttempts} attempts remaining
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || loginAttempts >= 5 || !password.trim()}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                isLoading || loginAttempts >= 5 || !password.trim()
                  ? 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-blue-500/25'
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
                  Access CRM
                </>
              )}
            </button>
          </form>

          <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
            <p className="text-gray-400 text-xs text-center">
              🔒 This is a secure area. All access attempts are logged and monitored.
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Powered by <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-semibold">Codastra</span>
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
            0%, 100% { 
              transform: translateY(0px) rotate(0deg) scale(1); 
            }
            50% { 
              transform: translateY(-30px) rotate(180deg) scale(1.1); 
            }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-orb w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-600/10 top-10 -right-20" />
        <div className="floating-orb w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 bottom-32 -left-16" />
      </div>

      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Codastra CRM
              </h1>
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>System Online</span>
                {lastUpdated && (
                  <span className="text-xs text-gray-500 ml-2">
                    Updated: {lastUpdated.toLocaleTimeString()}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => loadLeads(true)}
                disabled={refreshing}
                className={`px-3 py-2 bg-blue-500/10 text-blue-400 border border-blue-400/30 rounded-lg hover:bg-blue-500/20 transition-all duration-300 text-sm backdrop-blur-md flex items-center gap-2 ${
                  refreshing ? 'animate-pulse' : ''
                }`}
              >
                <Refresh className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Syncing...' : 'Refresh'}
              </button>
              <div className="text-sm text-gray-300">
                Welcome, Admin
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-400/30 rounded-lg hover:bg-red-500/20 transition-all duration-300 text-sm backdrop-blur-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-blue-400/30 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Leads</p>
                <p className="text-2xl font-bold text-white">{stats.total || 0}</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-blue-400/30 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">New Leads</p>
                <p className="text-2xl font-bold text-blue-400">{stats.newLeads || 0}</p>
              </div>
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-green-400/30 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Qualified</p>
                <p className="text-2xl font-bold text-green-400">{stats.qualified || 0}</p>
              </div>
              <Trophy className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Avg Score</p>
                <p className="text-2xl font-bold text-purple-400">{stats.averageScore || 0}</p>
              </div>
              <Star className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-400/30 rounded-xl p-4 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <X className="w-3 h-3 text-red-400" />
              </div>
              <div>
                <p className="font-semibold text-red-300">Connection Issue</p>
                <p className="text-sm text-red-400 mt-1">{error}</p>
                <p className="text-xs text-red-500 mt-1">Showing cached data or demo mode</p>
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-6 hover:border-blue-400/20 transition-all duration-300">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 w-full sm:w-80 text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300 hover:border-white/30"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white backdrop-blur-md transition-all duration-300 hover:border-white/30"
              >
                <option value="All" className="bg-slate-800">All Status</option>
                <option value="New" className="bg-slate-800">New</option>
                <option value="Contacted" className="bg-slate-800">Contacted</option>
                <option value="Qualified" className="bg-slate-800">Qualified</option>
                <option value="Closed" className="bg-slate-800">Closed</option>
                <option value="Lost" className="bg-slate-800">Lost</option>
              </select>

              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white backdrop-blur-md transition-all duration-300 hover:border-white/30"
              >
                <option value="All" className="bg-slate-800">All Services</option>
                {uniqueServices.map(service => (
                  <option key={service} value={service} className="bg-slate-800">{service}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                setEditForm({
                  name: '',
                  email: '',
                  phone: '',
                  service: 'Web Development',
                  message: '',
                  company: '',
                  budget: '',
                  timeline: '',
                  source: 'Manual Entry',
                  follow_up_date: '',
                  notes: '',
                  lead_score: 5
                })
                setShowAddModal(true)
              }}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            >
              <Plus className="w-4 h-4" />
              Add Lead
            </button>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden hover:border-blue-400/20 transition-all duration-300">
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading leads...</p>
              <p className="text-gray-500 text-sm mt-2">Connecting to database...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No leads found</h3>
              <p className="text-gray-400">
                {searchTerm || statusFilter !== 'All' || serviceFilter !== 'All' 
                  ? 'Try adjusting your search criteria or filters.'
                  : 'Leads will appear here once customers start contacting you.'
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="px-6 py-4 border-b border-white/10 bg-white/5">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  Recent Leads ({filteredLeads.length})
                  {searchTerm && (
                    <span className="text-sm font-normal text-gray-400">
                      - filtered by "{searchTerm}"
                    </span>
                  )}
                </h2>
              </div>
              <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Lead Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Budget
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-transparent divide-y divide-white/5">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/5 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-white">{lead.name || 'Anonymous'}</div>
                          <div className="text-sm text-gray-400 flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            {lead.company || 'No company'}
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          {lead.email && (
                            <div className="text-sm text-gray-300 flex items-center gap-2">
                              <Mail className="w-3 h-3 text-gray-500" />
                              <a href={`mailto:${lead.email}`} className="hover:text-blue-400 transition-colors duration-200">
                                {lead.email}
                              </a>
                            </div>
                          )}
                          {lead.phone && (
                            <div className="text-sm text-gray-400 flex items-center gap-2">
                              <Phone className="w-3 h-3 text-gray-500" />
                              <a href={`tel:${lead.phone}`} className="hover:text-blue-400 transition-colors duration-200">
                                {lead.phone}
                              </a>
                            </div>
                          )}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{lead.service || 'General Inquiry'}</div>
                        <div className="text-sm text-gray-400">{lead.source || 'Unknown'}</div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={lead.status || 'New'}
                          onChange={(e) => {
                            const updatedLeads = leads.map(l =>
                              l.id === lead.id ? { ...l, status: e.target.value } : l
                            )
                            setLeads(updatedLeads)
                            const newStats = calculateStats(updatedLeads)
                            setStats(newStats)
                          }}
                          className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${getStatusColor(lead.status || 'New')}`}
                        >
                          <option value="New" className="bg-slate-800">New</option>
                          <option value="Contacted" className="bg-slate-800">Contacted</option>
                          <option value="Qualified" className="bg-slate-800">Qualified</option>
                          <option value="Closed" className="bg-slate-800">Closed</option>
                          <option value="Lost" className="bg-slate-800">Lost</option>
                        </select>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium flex items-center gap-1 ${getScoreColor(lead.lead_score)}`}>
                          <Star className="w-3 h-3" />
                          {lead.lead_score || 0}/10
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{lead.budget || 'Not specified'}</div>
                        <div className="text-sm text-gray-400">{lead.timeline || 'Not specified'}</div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-500" />
                          {formatDate(lead.timestamp)}
                        </div>
                        {lead.follow_up_date && (
                          <div className="text-xs text-blue-400 flex items-center gap-1 mt-1">
                            <Calendar className="w-3 h-3" />
                            Follow up: {new Date(lead.follow_up_date).toLocaleDateString()}
                          </div>
                        )}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditLead(lead)}
                            className="text-blue-400 hover:text-blue-300 p-1 rounded hover:bg-blue-500/20 transition-all duration-200"
                            title="Edit lead"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/20 transition-all duration-200"
                            title="Delete lead"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Edit Lead Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900/95 backdrop-blur-md rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Edit Lead</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-300 p-1 rounded hover:bg-white/10 transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleUpdateLead(); }} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Notes
                </label>
                <textarea
                  value={editForm.notes || ''}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                  rows="3"
                  placeholder="Internal notes..."
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300"
                />
              </div>

              <div className="mt-8 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-300 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 focus:ring-2 focus:ring-gray-500 backdrop-blur-md transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 border border-transparent rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                >
                  Update Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900/95 backdrop-blur-md rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Add New Lead</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-300 p-1 rounded hover:bg-white/10 transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleAddLead(); }} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={editForm.email || ''}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={editForm.phone || ''}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={editForm.company || ''}
                    onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Service
                  </label>
                  <select
                    value={editForm.service || ''}
                    onChange={(e) => setEditForm({ ...editForm, service: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white backdrop-blur-md transition-all duration-300"
                  >
                    <option value="Web Development" className="bg-slate-800">Web Development</option>
                    <option value="App Development" className="bg-slate-800">App Development</option>
                    <option value="SEO Optimization" className="bg-slate-800">SEO Optimization</option>
                    <option value="Digital Marketing" className="bg-slate-800">Digital Marketing</option>
                    <option value="E-commerce" className="bg-slate-800">E-commerce</option>
                    <option value="Consulting" className="bg-slate-800">Consulting</option>
                    <option value="Other" className="bg-slate-800">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Budget
                  </label>
                  <input
                    type="text"
                    value={editForm.budget || ''}
                    onChange={(e) => setEditForm({ ...editForm, budget: e.target.value })}
                    placeholder="e.g., $5,000"
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Timeline
                  </label>
                  <input
                    type="text"
                    value={editForm.timeline || ''}
                    onChange={(e) => setEditForm({ ...editForm, timeline: e.target.value })}
                    placeholder="e.g., 2 weeks"
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Follow-up Date
                  </label>
                  <input
                    type="date"
                    value={editForm.follow_up_date || ''}
                    onChange={(e) => setEditForm({ ...editForm, follow_up_date: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white backdrop-blur-md transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Lead Score (1-10)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={editForm.lead_score || ''}
                    onChange={(e) => setEditForm({ ...editForm, lead_score: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Source
                  </label>
                  <select
                    value={editForm.source || ''}
                    onChange={(e) => setEditForm({ ...editForm, source: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white backdrop-blur-md transition-all duration-300"
                  >
                    <option value="Manual Entry" className="bg-slate-800">Manual Entry</option>
                    <option value="Website" className="bg-slate-800">Website</option>
                    <option value="Google Ads" className="bg-slate-800">Google Ads</option>
                    <option value="Social Media" className="bg-slate-800">Social Media</option>
                    <option value="Referral" className="bg-slate-800">Referral</option>
                    <option value="Cold Outreach" className="bg-slate-800">Cold Outreach</option>
                    <option value="Event" className="bg-slate-800">Event</option>
                    <option value="Other" className="bg-slate-800">Other</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  value={editForm.message || ''}
                  onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                  rows="3"
                  placeholder="Lead inquiry message..."
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Notes
                </label>
                <textarea
                  value={editForm.notes || ''}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                  rows="3"
                  placeholder="Internal notes..."
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300"
                />
              </div>

              <div className="mt-8 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-300 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 focus:ring-2 focus:ring-gray-500 backdrop-blur-md transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 border border-transparent rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                >
                  Add Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 text-sm space-y-2">
            <p>
              Powered by <span className="text-blue-400 font-semibold">Codastra</span> Lead Management System
            </p>
            <p>
              Connected to Google Sheets • Auto-refreshes every 30 seconds
            </p>
            {lastUpdated && (
              <p className="text-xs">
                Last synced: {lastUpdated.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <button
          onClick={() => {
            setEditForm({
              name: '',
              email: '',
              phone: '',
              service: 'Web Development',
              message: '',
              company: '',
              budget: '',
              timeline: '',
              source: 'Manual Entry',
              follow_up_date: '',
              notes: '',
              lead_score: 5
            })
            setShowAddModal(true)
          }}
          className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <style jsx>{`
        .floating-orb {
          border-radius: 50%;
          filter: blur(60px);
          animation: float 8s ease-in-out infinite;
          position: absolute;
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
          }
          50% { 
            transform: translateY(-30px) rotate(180deg) scale(1.1); 
          }
        }
      `}</style>
    </div>
  )
}-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={editForm.email || ''}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={editForm.phone || ''}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={editForm.company || ''}
                    onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Service
                  </label>
                  <select
                    value={editForm.service || ''}
                    onChange={(e) => setEditForm({ ...editForm, service: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white backdrop-blur-md transition-all duration-300"
                  >
                    <option value="Web Development" className="bg-slate-800">Web Development</option>
                    <option value="App Development" className="bg-slate-800">App Development</option>
                    <option value="SEO Optimization" className="bg-slate-800">SEO Optimization</option>
                    <option value="Digital Marketing" className="bg-slate-800">Digital Marketing</option>
                    <option value="E-commerce" className="bg-slate-800">E-commerce</option>
                    <option value="Consulting" className="bg-slate-800">Consulting</option>
                    <option value="Other" className="bg-slate-800">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Status
                  </label>
                  <select
                    value={editForm.status || ''}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white backdrop-blur-md transition-all duration-300"
                  >
                    <option value="New" className="bg-slate-800">New</option>
                    <option value="Contacted" className="bg-slate-800">Contacted</option>
                    <option value="Qualified" className="bg-slate-800">Qualified</option>
                    <option value="Closed" className="bg-slate-800">Closed</option>
                    <option value="Lost" className="bg-slate-800">Lost</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Budget
                  </label>
                  <input
                    type="text"
                    value={editForm.budget || ''}
                    onChange={(e) => setEditForm({ ...editForm, budget: e.target.value })}
                    placeholder="e.g., $5,000"
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Timeline
                  </label>
                  <input
                    type="text"
                    value={editForm.timeline || ''}
                    onChange={(e) => setEditForm({ ...editForm, timeline: e.target.value })}
                    placeholder="e.g., 2 weeks"
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Follow-up Date
                  </label>
                  <input
                    type="date"
                    value={editForm.follow_up_date || ''}
                    onChange={(e) => setEditForm({ ...editForm, follow_up_date: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white backdrop-blur-md transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Lead Score (1-10)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={editForm.lead_score || ''}
                    onChange={(e) => setEditForm({ ...editForm, lead_score: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white placeholder-gray-400 backdrop-blur-md transition-all duration-300"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  value={editForm.message || ''}
                  onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                  rows="3"
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white placeholder-gray-400 backdrop-blur-md transition-all duration
