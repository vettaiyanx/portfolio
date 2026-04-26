const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Simple endpoint for health check
app.get('/', (req, res) => {
    res.send('Portfolio Backend is Running!');
});

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    console.log('New Contact Request:', { name, email, message });

    // In a real scenario, you'd send an email here
    // For now, we'll simulate success
    try {
        // Simulating processing time
        setTimeout(() => {
            res.status(200).json({ 
                success: true, 
                message: 'Your message has been received by the neural network! I will get back to you soon.' 
            });
        }, 1000);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
