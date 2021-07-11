const express = require('express');
const router = express.Router();
const validate = require('../validation');
const Users = require('../models/users');

router.post('/', validate.validateSignUpSchema, async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (user) res.status(409).send('Email already exists, Please try to login');
    else {
      const user = new Users({ firstName, lastName, email, password });
      const newUser = await user.save();
      res.status(200).send({ id: newUser._id, email: newUser.email });
    }
  } catch (err) {
    next({ Error: 'dbError', msg: err });
  }
});

module.exports = router;
