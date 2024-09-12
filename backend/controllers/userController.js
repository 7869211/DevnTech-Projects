const bcrypt = require('bcrypt');
const { createUser, findUserByEmail } = require('../models/userModel');
const generateToken = require('../utils/tokenUtils');

const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }

    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(name, email, hashedPassword);

        if (!newUser) {
            return res.status(500).json({ message: 'User creation failed' });
        }

        //const token = generateToken(newUser); 
        return res.status(201).json({
            message: 'User created successfully',
            user: { id: newUser.id, name: newUser.name, email: newUser.email },
            //token,
        });
    } catch (error) {
        console.error('Error during sign-up:', error.message);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const signIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

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
            user: { id: user.id, name: user.name, email: user.email }, 
        });
    } catch (error) {
        console.error('Error during sign-in:', error.message);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { signUp, signIn };
