const express = require('express');

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

module.exports = app => app.use('/auth', router);