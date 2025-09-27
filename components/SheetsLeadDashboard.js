// components/SheetsLeadDashboard.js
import { useEffect, useState } from "react"

export default function SheetsLeadDashboard() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Fetch leads from API
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch("/api/get-leads")
        if (!res.ok) throw new Error("Failed to fetch leads")
        const data = await res.json()
        setLeads(data)
      } catch (err) {
        setError(err.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }
    fetchLeads()
  }, [])

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading leads...</p>
        </div>
      </div>
    )
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-red-900/20 border border-red-600/40 text-red-300 px-6 py-4 rounded-xl max-w-md text-center">
          <p className="font-semibold">Error loading leads</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    )
  }

  // Dashboard Table
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-400">Leads Dashboard</h1>

      {leads.length === 0 ? (
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-center">
          <p className="text-gray-400">No leads found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-gray-800 rounded-xl border border-gray-700 shadow-lg">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Message</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {leads.map((lead, idx) => (
                <tr key={idx} className="hover:bg-gray-700/40 transition">
                  <td className="px-6 py-4 text-sm">{lead.name}</td>
                  <td className="px-6 py-4 text-sm">{lead.email}</td>
                  <td className="px-6 py-4 text-sm">{lead.phone}</td>
                  <td className="px-6 py-4 text-sm">{lead.message}</td>
                  <td className="px-6 py-4 text-sm">
                    {lead.date ? new Date(lead.date).toLocaleDateString() : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
