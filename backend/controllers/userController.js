const bcrypt = require('bcrypt');
const { createUser, findUserByEmail } = require('../models/userModel');
const generateToken = require('../utils/tokenUtils'); // Import the token generation utility

// Sign-up logic
const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }

    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(name, email, hashedPassword);

        if (newUser) {
            const token = generateToken(newUser); // Generate JWT token
            res.status(201).json({
                message: 'User created successfully',
                user: newUser,
                token, // Include the token in the response
            });
        } else {
            return res.status(500).json({ message: 'User creation failed' });
        }
    } else {
        return res.status(400).json({ message: 'User already exists' });
    }
};

// Sign-in logic
const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user); 

        return res.json({
            token, 
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { signUp, signIn };
