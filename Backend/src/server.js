const fs = require('fs');
const https = require('https');
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

const httpsOptions = {
    key: fs.readFileSync(process.env.SSL_KEY_FILE),
    cert: fs.readFileSync(process.env.SSL_CRT_FILE),
};

const httpsServer = https.createServer(httpsOptions, app);
const PORT = process.env.PORT || 3000;

httpsServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} with HTTPS`);
});
