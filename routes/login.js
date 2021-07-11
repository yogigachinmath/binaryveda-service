const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const validate = require('../validation');

router.get('/', validate.validateLoginSchema, async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });
    if (!user) next({ Error: 'Unauthorized', msg: 'No user found matching that email' });
    else if (user.password !== password)
      next({ Error: 'Unauthorized', msg: 'Please check the password, Password does not match' });
    else res.status(200).json({ email: user.email });
  } catch (err) {
    next({ Error: 'dbError', msg: err });
  }
});

module.exports = router;
