const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  return res.send('<h1>Hello Palenca</h1>');
})

app.post('/uber/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password
  if (email === 'pierre@palenca.com' && password === 'MyPwdChingon123') {
    return res.json({
      message: 'SUCCESS',
      access_token: 'cTV0aWFuQ2NqaURGRE82UmZXNVBpdTRxakx3V1F5'
    })
  }
  return res.status(401).json({
    message: 'CREDENTIALS_INVALID',
    details: 'Incorrect username or password'
  })
})


app.get('/uber/profile/:access_token', (req, res) => {
  const accessToken = req.params.access_token
  if (accessToken === 'cTV0aWFuQ2NqaURGRE82UmZXNVBpdTRxakx3V1F5') {
    return res.json({
      message: 'SUCCESS',
      platform: 'uber',
      profile: {
        email: 'pierre@palenca.com',
        name: 'Pierre'
      }
    })
  }
  return res.status(401).json({
    message: 'CREDENTIALS_INVALID',
    details: 'Incorrect token'
  })
})

module.exports = app;
