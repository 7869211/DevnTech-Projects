const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const payload = {
        id: user.id, 
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(JSON.stringify(payload));
};

module.exports = generateToken;
