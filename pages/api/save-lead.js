// pages/api/save-lead.js - Updated with new Google Apps Script URL
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
    // Use the new Google Apps Script URL
    const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL || 
      'https://script.google.com/macros/s/AKfycbxJLp_K8izuP3qTjVUf4l1oChdO9HTqT-3G4XCTmw3LmS_2K58mIcvpPSUs0DrkIBFrpw/exec';
    
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
      conversationHistory,
      salesManager
    } = req.body;

    // Basic validation - require at least name or email
    if (!name && !email) {
      return res.status(400).json({
        success: false,
        error: 'At least name or email is required'
      });
    }

    // Prepare data for Google Sheets with better formatting
    const leadData = {
      name: (name || '').trim() || 'Anonymous',
      email: (email || '').trim() || 'No email provided',
      phone: (phone || '').trim() || 'No phone provided',
      service: service || 'General Inquiry',
      message: message || conversationHistory || 'No message provided',
      source: source,
      budget: budget || 'Not specified',
      timeline: timeline || 'Not specified',
      company: (company || '').trim() || 'Not specified',
      salesManager: salesManager || 'General',
      timestamp: new Date().toISOString(),
      userAgent: req.headers['user-agent'] || 'Unknown',
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'Unknown',
      leadScore: calculateLeadScore(name, email, phone, service, message, conversationHistory),
      status: 'New',
      followUpDate: getFollowUpDate(),
      notes: `Lead from ${source}${salesManager ? ` via ${salesManager}` : ''}`
    };

    console.log('Sending lead data to new Google Sheets URL:', {
      url: GOOGLE_SHEETS_URL,
      name: leadData.name,
      email: leadData.email,
      service: leadData.service,
      source: leadData.source,
      leadScore: leadData.leadScore
    });

    // Send to Google Apps Script with timeout and retry logic
    const response = await fetchWithRetry(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData)
    }, 3);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Sheets API Error:', response.status, errorText);
      throw new Error(`Google Sheets API returned ${response.status}: ${errorText}`);
    }

    let result;
    try {
      const responseText = await response.text();
      console.log('Raw Google Sheets response:', responseText);
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse Google Sheets response:', parseError);
      throw new Error('Invalid response from Google Sheets API');
    }

    console.log('Parsed Google Sheets Response:', result);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Lead saved successfully to Google Sheets',
        leadId: result.data?.leadId || `LEAD-${Date.now()}`,
        timestamp: new Date().toISOString(),
        leadScore: leadData.leadScore,
        source: leadData.source
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
      timestamp: new Date().toISOString(),
      url: process.env.GOOGLE_SHEETS_URL ? 'URL configured' : 'URL missing'
    });
  }
}

// Helper function to fetch with retry logic
async function fetchWithRetry(url, options, maxRetries = 3) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${maxRetries} to reach Google Sheets`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response;
      
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error.message);
      lastError = error;
      
      // Wait before retrying (exponential backoff)
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
        console.log(`Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}

// Helper function to calculate lead score
function calculateLeadScore(name, email, phone, service, message, conversationHistory) {
  let score = 0;
  
  // Basic contact info
  if (name && name.trim()) score += 2;
  if (email && email.includes('@')) score += 3;
  if (phone && phone.trim()) score += 2;
  
  // Service interest
  if (service && service !== 'General Inquiry') score += 2;
  
  // Message quality
  const fullMessage = (message || '') + (conversationHistory || '');
  if (fullMessage.length > 50) score += 1;
  if (fullMessage.length > 200) score += 1;
  
  // Engagement indicators
  if (fullMessage.toLowerCase().includes('budget')) score += 2;
  if (fullMessage.toLowerCase().includes('timeline')) score += 1;
  if (fullMessage.toLowerCase().includes('urgent')) score += 2;
  if (fullMessage.toLowerCase().includes('asap')) score += 2;
  
  return Math.min(score, 10); // Cap at 10
}

// Helper function to calculate follow-up date
function getFollowUpDate() {
  const followUp = new Date();
  followUp.setDate(followUp.getDate() + 1); // Next business day
  return followUp.toISOString().split('T')[0]; // YYYY-MM-DD format
}
