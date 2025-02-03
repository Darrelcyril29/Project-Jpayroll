const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000; // You can use any port

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Nodemailer Configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Replace with your email service (e.g., Gmail, Outlook, etc.)
  auth: {
    user: 'sneakereverse@gmail.com', // Replace with your email
    pass: 'eqns tqff nott xsgy', // Replace with your email password or app password
  },
});

// Route to send OTP
app.post('/send-otp', (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Your OTP for Password Reset',
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send({ status: 'error', message: 'Failed to send OTP' });
    }
    console.log('Email sent:', info.response);
    return res.status(200).send({ status: 'success', message: 'OTP sent successfully', otp });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
