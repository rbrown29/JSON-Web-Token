const { BadRequest } = require('../errors');
const jwt = require('jsonwebtoken');

//  login looks for username and password in the request body
//  if either is missing, it throws a BadRequest error
//  if both are present, it creates a token and sends it back to the client
const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new BadRequest('Please provide email and password');
    }
    const id = new Date().getDate();
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
    res.status(200).json({ msg: 'user created', token });
};

//  dashboard is a protected route
//  it sends back a message with the user's username and a random number
const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({ msg: `Hello, ${req.user.username}`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}` });
      
};

module.exports = {
    login,
    dashboard
};