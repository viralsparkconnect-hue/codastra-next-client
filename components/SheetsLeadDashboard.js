// components/SheetsLeadDashboard.js - Simple working version
import { useState, useEffect } from 'react'

export default function SheetsLeadDashboard() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/get-leads')
      const data = await response.json()
      
      if (data.success) {
        setLeads(data.leads || [])
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
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Error Loading Dashboard</h2>
          <p className="text-red-400 mb-6">{error}</p>
          <button
            onClick={fetchLeads}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
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
                Total Leads: {leads.length} | Last updated: {new Date().toLocaleString()}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchLeads}
                className="px-4 py-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-xl hover:bg-blue-600/30 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Card */}
        <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{leads.length}</div>
              <div className="text-gray-400 text-sm">Total Leads</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {leads.filter(lead => {
                  const today = new Date()
                  const leadDate = new Date(lead.timestamp)
                  return today.toDateString() === leadDate.toDateString()
                }).length}
              </div>
              <div className="text-gray-400 text-sm">Today</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {leads.filter(lead => {
                  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                  const leadDate = new Date(lead.timestamp)
                  return leadDate > weekAgo
                }).length}
              </div>
              <div className="text-gray-400 text-sm">This Week</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {[...new Set(leads.map(lead => lead.service))].length}
              </div>
              <div className="text-gray-400 text-sm">Services</div>
            </div>
          </div>
        </div>
        
        {/* Leads List */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/50 overflow-hidden">
          <div className="p-6 border-b border-gray-700/50">
            <h2 className="text-xl font-semibold text-white">Recent Leads</h2>
          </div>
          
          {leads.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <p className="text-gray-400 text-lg">No leads found</p>
              <p className="text-gray-500 text-sm mt-2">Leads will appear here when customers contact you</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-700/30">
              {leads.map((lead, index) => (
                <div key={index} className="p-6 hover:bg-gray-700/20 transition-colors">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Lead Info */}
                    <div className="space-y-1">
                      <h3 className="font-semibold text-white text-lg">
                        {lead.name || 'Unknown Lead'}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-300 text-sm">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>{lead.email || 'No email provided'}</span>
                      </div>
                      {lead.phone && (
                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>{lead.phone}</span>
                        </div>
                      )}
                    </div>

                    {/* Service & Date */}
                    <div className="space-y-2">
                      <div>
                        <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm border border-blue-500/30">
                          {lead.service || 'General Inquiry'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span>
                          {lead.timestamp 
                            ? new Date(lead.timestamp).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                            : 'No date'
                          }
                        </span>
                      </div>
                      {lead.source && (
                        <div className="text-gray-500 text-sm">
                          Source: {lead.source}
                        </div>
                      )}
                    </div>

                    {/* Message Preview */}
                    <div>
                      {lead.message && (
                        <div className="bg-gray-700/30 p-3 rounded-lg">
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {lead.message.length > 150 
                              ? `${lead.message.substring(0, 150)}...` 
                              : lead.message
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {leads.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Showing all {leads.length} leads • Data synced with Google Sheets
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
