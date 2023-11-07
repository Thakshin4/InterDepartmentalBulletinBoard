const cors = require('cors');

const corsOptions = {
    origin: 'http://your-frontend-domain.com', // Allow requests from your frontend
    optionsSuccessStatus: 200,
};

module.exports = cors(corsOptions);
