const router = require('express').Router();
const bcrypt =require("bcryptjs");
const Users = require('../users/users-model');
const secrets = require("../config/secrets");
const jwt = require ("jsonwebtoken");



router.post('/register', (req, res) => {
  let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); 
    user.password = hash;
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  // implement registration
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;
    console.log(username)
    
    Users.findBy({username})
    .first()
    .then(user =>{
        if(user && bcrypt.compareSync(password, user.password)) {
           const token = generateToken(user);

            res.status(200).json({ message: `Welcome ${user.username}!`, token });
        } else {
            res.status(401).json({message: 'Invalid Credentials'})
        }
    })
    .catch(({ name, message ,stack}) =>{res.status(500).json({name, message, stack})})
  // implement login
});
function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "2h"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;

