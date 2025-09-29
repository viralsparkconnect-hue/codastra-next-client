// pages/api/delete-lead.js
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
      console.error('GOOGLE_SHEETS_URL not configured');
      return res.status(500).json({
        success: false,
        error: 'Google Sheets integration not configured'
      });
    }

    const { id, email } = req.body;

    if (!id && !email) {
      return res.status(400).json({
        success: false,
        error: 'Lead ID or email is required to delete'
      });
    }

    console.log('Deleting lead:', { id, email });

    // Prepare delete request
    const deletePayload = {
      action: 'deleteLead',
      id,
      email,
      timestamp: new Date().toISOString()
    };

    // Send delete request to Google Sheets
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deletePayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Sheets API Error:', response.status, errorText);
      throw new Error(`Google Sheets API returned ${response.status}`);
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
        message: 'Lead deleted successfully',
        timestamp: new Date().toISOString()
      });
    } else {
      throw new Error(result.error || 'Failed to delete lead from Google Sheets');
    }

  } catch (error) {
    console.error('Error deleting lead:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Failed to delete lead',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
