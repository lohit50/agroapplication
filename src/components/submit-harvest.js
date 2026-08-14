// pages/api/submit-harvest.js
import { google } from 'googleapis';

export default async function handler(req, res) {
  // Ensure only POST requests are handled
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Authenticate with Google Sheets
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,  // Your service account email
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')  // Your private key
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    // Create Google Sheets client
    const sheets = google.sheets({ version: 'v4', auth });

    // Your Google Sheet ID (replace with your actual sheet ID)
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;  // Your sheet ID

    // Prepare rows to be inserted
    const inventoryItems = req.body;
    
    // Transform inventory items into rows
    const rows = inventoryItems.map(item => [
      new Date().toISOString(),  // Timestamp
      item.category,              // Crop Category
      item.crop,                  // Crop Name
      item.quantity,              // Quantity
      item.daysToHarvest,         // Days Until Harvest
      'Planned'                   // Initial Status
    ]);

    // Append rows to the sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet!A:F',  // Adjust sheet name and range as needed
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: { values: rows }
    });

    // Respond with success
    res.status(200).json({ 
      message: 'Harvest data submitted successfully',
      insertedRows: response.data.updates.updatedRows
    });

  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    res.status(500).json({ 
      message: 'Failed to submit harvest data', 
      error: error.message 
    });
  }
}

// Export configuration for API route
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',  // Adjust the size limit if necessary
    },
  },
};
