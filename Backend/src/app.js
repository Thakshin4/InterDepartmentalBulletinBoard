require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const helmet = require('helmet');
const morgan = require('morgan');
const postsRoutes = require('./routes/postsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const fs = require('fs');
const https = require('https');
const path = require('path');
const mongoose = require('mongoose'); // Import Mongoose

const app = express();

app.use(express.json());
app.use(cors());
// app.use(helmet());
app.use(morgan('combined'));

app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Interdepartmental Bulletin Board API' });
});

const PORT = process.env.PORT || 3000;

const SSL_KEY_FILE = process.env.SSL_KEY_FILE;
const SSL_CRT_FILE = process.env.SSL_CRT_FILE;

if (fs.existsSync(SSL_KEY_FILE) && fs.existsSync(SSL_CRT_FILE)) {
    const httpsOptions = {
        key: fs.readFileSync(SSL_KEY_FILE),
        cert: fs.readFileSync(SSL_CRT_FILE),
    };

    const httpsServer = https.createServer(httpsOptions, app);

    // Connect to MongoDB
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log('Connected to MongoDB');
            httpsServer.listen(PORT, () => {
                console.log(`Server is running on port ${PORT} with HTTPS`);
                console.log(`https://localhost:${PORT}`);
            });
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
} else {
    console.error('SSL certificate and private key files not found. Please check the file paths.');
}

module.exports = app;
