const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    })
});
app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
       if(err) {
           res.sendStatus(403)
       } else {
            res.json({
                message:'post created ...',
                authData
            });
       }
    });
   
});
//FORMAT OF TOKEN
// authorization : Bearer <access_token>

//verify token
function verifyToken(req, res, next) {
    // get auth header value
    const bearerHeader = req.headers['authorization'];
    // check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
        //Forbidden
        res.sendStatus(403);
    }

}
app.post('/api/login', (req, res) => {
    // Mock user
    const user = {
        id:1,
        username: 'vnky',
        email:'vnky@gmail.com'
    };
    jwt.sign({user: user}, 'secretKey', {expiresIn: '30s'}, (err, token) => {
        res.json({
            token: token
        });
    })
})

app.listen(5000, () => console.log('server started on port 5000'))