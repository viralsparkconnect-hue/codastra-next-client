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
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Error Loading Dashboard</h2>
          <p className="text-red-400 mb-6">{error}</p>
          <button
            onClick={fetchLeads}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Leads Dashboard</h1>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Total Leads: {leads.length}</h2>
          
          {leads.length === 0 ? (
            <p className="text-gray-400">No leads found.</p>
          ) : (
            <div className="space-y-4">
              {leads.map((lead, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h3 className="font-semibold text-white">{lead.name || 'Unknown'}</h3>
                      <p className="text-gray-300 text-sm">{lead.email || 'No email'}</p>
                    </div>
                    <div>
                      <p className="text-gray-300">{lead.service || 'General Inquiry'}</p>
                      <p className="text-gray-400 text-sm">{lead.phone || 'No phone'}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">
                        {lead.timestamp ? new Date(lead.timestamp).toLocaleDateString() : 'No date'}
                      </p>
                    </div>
                  </div>
                  {lead.message && (
                    <div className="mt-3 pt-3 border-t border-gray-600">
                      <p className="text-gray-300 text-sm">
                        {lead.message.substring(0, 200)}
                        {lead.message.length > 200 ? '...' : ''}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
