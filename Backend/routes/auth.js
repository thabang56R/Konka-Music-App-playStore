const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// register
router.post('/register', async (req, res) => {
const { name, email, password } = req.body;
try {
let user = await User.findOne({ email });
if(user) return res.status(400).json({ message: 'Email exists' });


const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(password, salt);
user = new User({ name, email, password: hash });
await user.save();


const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
} catch(e) { res.status(500).json({ message: e.message }); }
});


// login
router.post('/login', async (req, res) => {
const { email, password } = req.body;
try {
const user = await User.findOne({ email });
if(!user) return res.status(400).json({ message: 'Invalid creds' });
const isMatch = await bcrypt.compare(password, user.password);
if(!isMatch) return res.status(400).json({ message: 'Invalid creds' });
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
} catch(e) { res.status(500).json({ message: e.message }); }
});


module.exports = router;