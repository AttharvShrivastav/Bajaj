const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors

const app = express();
const port = process.env.PORT || 5001;

// Use cors middleware to enable CORS
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type',
}));

app.use(bodyParser.json());

// Endpoint to handle POST requests
app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data || [];
        
        // Validate data
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, error: 'Invalid data format' });
        }

        // Filter and process the data
        const numbers = data.filter(item => /^\d+$/.test(item));
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
        const lowercaseAlphabets = alphabets.filter(char => char === char.toLowerCase());
        const highestLowercaseAlphabet = lowercaseAlphabets.reduce((max, char) => char > max ? char : max, '');

        // Build the response
        const response = {
            is_success: true,
            user_id: 'john_doe_17091999',
            email: 'john@xyz.com',
            roll_number: 'ABCD123',
            numbers: numbers,
            alphabets: alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
        };

        // Send the response
        res.json(response);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ is_success: false, error: 'Internal Server Error' });
    }
});

// Endpoint to handle GET requests
app.get('/bfhl', (req, res) => {
    try {
        const response = {
            operation_code: 1
        };
        res.json(response);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
