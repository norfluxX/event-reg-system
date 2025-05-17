require('dns').setDefaultResultOrder('ipv4first');
require('dotenv').config();
const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');
const nodemailer = require('nodemailer');
const QRCode = require('qrcode');

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Email sending function
async function sendEmail(mailOptions) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    console.log('Sending email...');
    const info = await Promise.race([
      transporter.sendMail(mailOptions),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Email sending timeout')), 15000)
      )
    ]);
    
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending failed:', error.message);
    throw error;
  }
}

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Handle form POST
app.post('/register', async (req, res) => {
  console.log('Form submission received');
  const { name, email, phone, event } = req.body;

  try {
    const client = new MongoClient(mongoUri);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('registrations');

    // Generate registration ID
    const registrationId = Math.random().toString(36).substring(2, 15);
    
    await collection.insertOne({ 
      name, 
      email, 
      phone, 
      event, 
      registrationId,
      registeredAt: new Date() 
    });
    console.log("✅ Data inserted into MongoDB");
    await client.close();

    // Generate QR Code
    const qrData = {
      name,
      email,
      event,
      registrationId,
      timestamp: new Date().toISOString()
    };

    console.log('Generating QR code with data:', qrData);
    
    // Generate QR code as buffer
    const qrCodeBuffer = await QRCode.toBuffer(JSON.stringify(qrData), {
      errorCorrectionLevel: 'H',
      margin: 1,
      width: 100,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });
    
    console.log('✅ QR code generated successfully');

    // HTML email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #0066cc;">Hi ${name},</h2>
        <p>Thank you for registering for <strong>${event}</strong>!</p>
        <p>We've successfully received your registration details. Our team is excited to have you join us.</p>
        <hr />
        <h4>Your Registration Info:</h4>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Event:</strong> ${event}</li>
          <li><strong>Registration ID:</strong> ${registrationId}</li>
        </ul>
        <p>Please find your QR code attached to this email. Show this QR code at the event entrance.</p>
        <p>If you have any questions, feel free to reply to this email.</p>
        <br/>
        <p style="color: #555;">Warm regards,<br/>Event Team</p>
      </div>
    `;

    const mailOptions = {
      from: `"Event Registration" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `You're registered for ${event}!`,
      html: htmlContent,
      attachments: [{
        filename: 'event-qr-code.png',
        content: qrCodeBuffer,
        contentType: 'image/png'
      }]
    };

    try {
      await sendEmail(mailOptions);
      console.log("📧 Confirmation email sent with QR code");
      res.redirect('/success.html');
    } catch (emailError) {
      console.error('❌ Email sending error:', emailError);
      throw emailError;
    }
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

