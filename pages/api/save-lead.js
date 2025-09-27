// pages/api/save-lead.js - API endpoint to save leads to Google Sheets
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed. Use POST.' 
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

    // Extract lead data from request
    const {
      name,
      email,
      phone,
      service,
      message,
      source = 'Website Contact',
      budget,
      timeline,
      company,
      conversationHistory
    } = req.body;

    // Basic validation
    if (!name && !email) {
      return res.status(400).json({
        success: false,
        error: 'At least name or email is required'
      });
    }

    // Prepare data for Google Sheets
    const leadData = {
      name: name || '',
      email: email || '',
      phone: phone || '',
      service: service || 'General Inquiry',
      message: message || conversationHistory || '',
      source: source,
      budget: budget || '',
      timeline: timeline || '',
      company: company || '',
      timestamp: new Date().toISOString(),
      userAgent: req.headers['user-agent'] || '',
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'Unknown'
    };

    console.log('Sending lead data to Google Sheets:', {
      name: leadData.name,
      email: leadData.email,
      service: leadData.service,
      source: leadData.source
    });

    // Send to Google Apps Script
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Sheets API Error:', response.status, errorText);
      throw new Error(`Google Sheets API returned ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log('Google Sheets Response:', result);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Lead saved successfully to Google Sheets',
        leadId: result.data?.leadId || `LEAD-${Date.now()}`,
        timestamp: new Date().toISOString()
      });
    } else {
      throw new Error(result.error || 'Unknown error from Google Sheets');
    }

  } catch (error) {
    console.error('Error saving lead to Google Sheets:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Failed to save lead to Google Sheets',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
