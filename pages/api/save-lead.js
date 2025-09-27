// pages/api/get-leads.js - API endpoint to retrieve leads from Google Sheets
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed. Use GET.' 
    });
  }

  try {
    const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL;
    
    if (!GOOGLE_SHEETS_URL) {
      console.error('GOOGLE_SHEETS_URL not configured in environment variables');
      return res.status(500).json({
        success: false,
        error: 'Google Sheets integration not configured'
      });
    }

    console.log('Fetching leads from Google Sheets...');

    // Fetch leads from Google Apps Script
    const response = await fetch(`${GOOGLE_SHEETS_URL}?action=getLeads`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Sheets API Error:', response.status, errorText);
      throw new Error(`Google Sheets API returned ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log('Google Sheets Response:', result);

    if (result.success) {
      // Process and enhance the leads data
      const processedLeads = (result.leads || []).map((lead, index) => ({
        id: lead.id || `lead-${index}`,
        name: lead.name || 'Unknown',
        email: lead.email || '',
        phone: lead.phone || '',
        service: lead.service || 'General Inquiry',
        message: lead.message || '',
        source: lead.source || 'Website',
        status: lead.status || 'New',
        timestamp: lead.timestamp || new Date().toISOString(),
        budget: lead.budget || '',
        timeline: lead.timeline || '',
        company: lead.company || '',
        lead_score: lead.lead_score || 0,
        follow_up_date: lead.follow_up_date || '',
        notes: lead.notes || ''
      }));

      // Calculate summary statistics
      const stats = {
        total: processedLeads.length,
        newLeads: processedLeads.filter(lead => lead.status === 'New').length,
        contacted: processedLeads.filter(lead => lead.status === 'Contacted').length,
        qualified: processedLeads.filter(lead => lead.status === 'Qualified').length,
        closed: processedLeads.filter(lead => lead.status === 'Closed').length,
        averageScore: processedLeads.length > 0 
          ? (processedLeads.reduce((sum, lead) => sum + (parseFloat(lead.lead_score) || 0), 0) / processedLeads.length).toFixed(1)
          : 0,
        topServices: getTopServices(processedLeads),
        recentCount: processedLeads.filter(lead => {
          const leadDate = new Date(lead.timestamp);
          const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
          return leadDate > weekAgo;
        }).length
      };

      return res.status(200).json({
        success: true,
        leads: processedLeads,
        stats: stats,
        timestamp: new Date().toISOString(),
        total: processedLeads.length
      });
    } else {
      throw new Error(result.error || 'Unknown error from Google Sheets');
    }

  } catch (error) {
    console.error('Error fetching leads from Google Sheets:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch leads from Google Sheets',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

// Helper function to get top services
function getTopServices(leads) {
  const serviceCounts = {};
  
  leads.forEach(lead => {
    const service = lead.service || 'General Inquiry';
    serviceCounts[service] = (serviceCounts[service] || 0) + 1;
  });

  return Object.entries(serviceCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([service, count]) => ({ service, count }));
}
