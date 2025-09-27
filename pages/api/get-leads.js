// pages/api/get-leads.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed. Use GET.' });
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
    const response = await fetch(`${GOOGLE_SHEETS_URL}?action=getLeads`);
    const text = await response.text();

    let result;
    try {
      result = JSON.parse(text);
    } catch (err) {
      console.error('Invalid JSON response from Google Sheets:', text);
      throw new Error('Google Sheets did not return valid JSON');
    }

    console.log('Google Sheets Response:', result);

    let leads = result.success ? (result.leads || []) : [];

    // ✅ Inject dummy seed leads if no data
    if (leads.length === 0) {
      console.log('No leads found, injecting dummy seed leads...');
      leads = getDummyLeads();
    }

    // Process & enrich leads
    const processedLeads = leads.map((lead, index) => ({
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

    const stats = {
      total: processedLeads.length,
      newLeads: processedLeads.filter(l => l.status === 'New').length,
      contacted: processedLeads.filter(l => l.status === 'Contacted').length,
      qualified: processedLeads.filter(l => l.status === 'Qualified').length,
      closed: processedLeads.filter(l => l.status === 'Closed').length,
      averageScore: processedLeads.length > 0
        ? (processedLeads.reduce((sum, l) => sum + (parseFloat(l.lead_score) || 0), 0) / processedLeads.length).toFixed(1)
        : 0,
      topServices: getTopServices(processedLeads),
      recentCount: processedLeads.filter(l => {
        const leadDate = new Date(l.timestamp);
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return leadDate > weekAgo;
      }).length
    };

    return res.status(200).json({
      success: true,
      leads: processedLeads,
      stats,
      timestamp: new Date().toISOString(),
      total: processedLeads.length
    });

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

// ✅ Dummy leads generator
function getDummyLeads() {
  return [
    {
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "123-456-7890",
      service: "Web Development",
      message: "Looking for a modern website for my business.",
      source: "Demo Seed",
      status: "New",
      timestamp: new Date().toISOString(),
      budget: "$2000",
      timeline: "ASAP",
      company: "Alice Co.",
      lead_score: 8
    },
    {
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "987-654-3210",
      service: "SEO Optimization",
      message: "Need help with SEO ranking.",
      source: "Demo Seed",
      status: "Contacted",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      budget: "$1000",
      timeline: "Next Month",
      company: "Bob Enterprises",
      lead_score: 6
    },
    {
      name: "Charlie Davis",
      email: "charlie@example.com",
      phone: "555-666-7777",
      service: "App Development",
      message: "Want to build a mobile app for e-commerce.",
      source: "Demo Seed",
      status: "Qualified",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      budget: "$5000",
      timeline: "This Quarter",
      company: "Charlie Tech",
      lead_score: 9
    }
  ];
}

function getTopServices(leads) {
  const serviceCounts = {};
  leads.forEach(l => {
    const service = l.service || 'General Inquiry';
    serviceCounts[service] = (serviceCounts[service] || 0) + 1;
  });
  return Object.entries(serviceCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([service, count]) => ({ service, count }));
}
