const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const authConfig = process.env.SECRET;

const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email } = req.body;

  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ 'msg': 'User already exists'});

    const user = await User.create(req.body);
    
    user.password = undefined;

    return res.send(user);
  } catch (e) {
    return res.status(400).send({ 'msg': `Registration failed` });
  }
});

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user)
    return res.status(400).send({ 'msg': 'User not found' });
  
  if (!await bcrypt.compare(password, user.password))
    return res.status(400).send({ 'msg': 'Invalid password' });
  
  user.password = undefined;

  const token = jwt.sign({ id: user.id }, authConfig, {
    expiresIn: 86400,
  });

  res.send({ user, token });
})

module.exports = app => app.use('/auth', router);