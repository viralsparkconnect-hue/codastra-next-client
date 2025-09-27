// components/SheetsLeadDashboard.js - Google Sheets Lead Dashboard
import { useState, useEffect } from 'react'

// Simple icons as components
const Users = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
)

const Mail = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const Phone = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const Calendar = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
)

const Search = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const Download = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const Star = ({ className, filled = false }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
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

const AlertCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

export default function SheetsLeadDashboard() {
  const [leads, setLeads] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [serviceFilter, setServiceFilter] = useState('all')
  const [sortBy, setSortBy] = useState('timestamp')
  const [sortOrder, setSortOrder] = useState('desc')
  const [lastRefresh, setLastRefresh] = useState(new Date())

  // Fetch leads from API
  const fetchLeads = async () => {
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/get-leads')
      const data = await response.json()
      
      if (data.success) {
        setLeads(data.leads || [])
        setStats(data.stats || {})
        setLastRefresh(new Date())
      } else {
        setError(data.error || 'Failed to fetch leads')
      }
    } catch (err) {
      console.error('Error fetching leads:', err)
      setError('Network error: Could not fetch leads')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  // Filter and sort leads
  const filteredLeads = leads
    .filter(lead => {
      // Search filter
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch = !searchTerm || 
        (lead.name || '').toLowerCase().includes(searchLower) ||
        (lead.email || '').toLowerCase().includes(searchLower) ||
        (lead.company || '').toLowerCase().includes(searchLower) ||
        (lead.service || '').toLowerCase().includes(searchLower)

      // Status filter
      const matchesStatus = statusFilter === 'all' || (lead.status || 'New') === statusFilter

      // Service filter
      const matchesService = serviceFilter === 'all' || (lead.service || '') === serviceFilter

      return matchesSearch && matchesStatus && matchesService
    })
    .sort((a, b) => {
      let aValue = a[sortBy] || ''
      let bValue = b[sortBy] || ''

      // Handle different data types
      if (sortBy === 'timestamp') {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      } else if (sortBy === 'lead_score') {
        aValue = parseFloat(aValue) || 0
        bValue = parseFloat(bValue) || 0
      } else {
        aValue = aValue.toString().toLowerCase()
        bValue = bValue.toString().toLowerCase()
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Service', 'Status', 'Lead Score', 'Company', 'Timestamp', 'Message']
    const csvContent = [
      headers.join(','),
      ...filteredLeads.map(lead => [
        `"${(lead.name || '').replace(/"/g, '""')}"`,
        `"${(lead.email || '').replace(/"/g, '""')}"`,
        `"${(lead.phone || '').replace(/"/g, '""')}"`,
        `"${(lead.service || '').replace(/"/g, '""')}"`,
        `"${(lead.status || 'New').replace(/"/g, '""')}"`,
        lead.lead_score || 0,
        `"${(lead.company || '').replace(/"/g, '""')}"`,
        `"${new Date(lead.timestamp || '').toLocaleDateString()}"`,
        `"${((lead.message || '').replace(/"/g, '""')).substring(0, 100)}..."`
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `codastra-leads-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  // Get unique services for filter
  const uniqueServices = [...new Set(leads.map(lead => lead.service || 'General Inquiry'))].filter(Boolean)
  const statuses = ['New', 'Contacted', 'Qualified', 'Closed']

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading leads dashboard...</p>
          <p className="text-gray-400">Fetching data from Google Sheets</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Error Loading Dashboard</h2>
          <p className="text-red-400 mb-6">{error}</p>
          <button
            onClick={fetchLeads}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <Refresh className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-md border-b border-gray-700/50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Leads Dashboard</h1>
              <p className="text-gray-400">
                Last updated: {lastRefresh.toLocaleString()}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={fetchLeads}
                className="px-4 py-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-xl hover:bg-blue-600/30 transition-colors flex items-center gap-2"
              >
                <Refresh className="w-4 h-4" />
                Refresh
              </button>
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-green-600/20 text-green-400 border border-green-500/30 rounded-xl hover:bg-green-600/30 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Leads</p>
                <p className="text-3xl font-bold text-white">{stats.total || 0}</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">New Leads</p>
                <p className="text-3xl font-bold text-green-400">{stats.newLeads || 0}</p>
              </div>
              <Mail className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">This Week</p>
                <p className="text-3xl font-bold text-purple-400">{stats.recentCount || 0}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Score</p>
                <p className="text-3xl font-bold text-yellow-400">{stats.averageScore || '0.0'}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            {/* Service Filter */}
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Services</option>
              {uniqueServices.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-')
                setSortBy(field)
                setSortOrder(order)
              }}
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="timestamp-desc">Latest First</option>
              <option value="timestamp-asc">Oldest First</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="lead_score-desc">Highest Score</option>
              <option value="lead_score-asc">Lowest Score</option>
            </select>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700/50 border-b border-gray-600">
                  <th className="text-left p-4 font-medium text-gray-300">Lead</th>
                  <th className="text-left p-4 font-medium text-gray-300">Contact</th>
                  <th className="text-left p-4 font-medium text-gray-300">Service</th>
                  <th className="text-left p-4 font-medium text-gray-300">Status</th>
                  <th className="text-left p-4 font-medium text-gray-300">Date</th>
                  <th className="text-left p-4 font-medium text-gray-300">Score</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center p-8 text-gray-400">
                      {searchTerm || statusFilter !== 'all' || serviceFilter !== 'all' 
                        ? 'No leads match your filters' 
                        : 'No leads found'
                      }
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead, index) => (
                    <tr key={lead.id || index} className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors">
                      <td className="p-4">
                        <div>
                          <p className="text-white font-medium">{lead.name || 'Unknown'}</p>
                          <p className="text-gray-400 text-sm">{lead.company || 'No company'}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          {lead.email && (
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                              <Mail className="w-4 h-4 text-blue-400" />
                              <span>{lead.email}</span>
                            </div>
                          )}
                          {lead.phone && (
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                              <Phone className="w-4 h-4 text-green-400" />
                              <span>{lead.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm border border-blue-500/30">
                          {lead.service || 'General'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm border ${
                          (lead.status || 'New') === 'New' ? 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30' :
                          (lead.status || 'New') === 'Contacted' ? 'bg-blue-600/20 text-blue-400 border-blue-500/30' :
                          (lead.status || 'New') === 'Qualified' ? 'bg-purple-600/20 text-purple-400 border-purple-500/30' :
                          'bg-green-600/20 text-green-400 border-green-500/30'
                        }`}>
                          {lead.status || 'New'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{new Date(lead.timestamp || '').toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white font-medium">{lead.lead_score || 0}</span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Showing {filteredLeads.length} of {leads.length} leads
          </p>
        </div>
      </div>
    </div>
  )
}
