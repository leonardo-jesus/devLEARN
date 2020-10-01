const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { UserService } = require('./services/user');

const userService = new UserService();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/user', async (req, res) => {
  try {
    const users = await userService.getAll();
    return res.json(users);
  } catch (e) {
    res.status(400).json({ 'msg': `${e}` });
  }
})

app.post('/register', async (req, res) => {
  const user = req.body;
  try {
    await userService.createUser(user);
    return res.status(200).json({'msg': 'User created with success'});
  } catch(e) {
    res.status(400).json({ 'msg': `${e}` });
  }
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));