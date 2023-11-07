const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import your User model

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

        // Create a new user with the hashed password
        const newUser = new User({
            username,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        // Generate a JWT token for the user
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Token expiration time
        });

        // Respond with the token and user data
        res.status(201).json({ token, user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Log in a user
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user in the database
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token for the user
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Token expiration time
        });

        // Respond with the token and user data
        res.status(200).json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

function handleError(res, error) {
    console.error(error);
    res.status(500).json({ error: error.message }); // Respond with the error message
}
