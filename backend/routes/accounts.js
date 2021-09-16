const router = require('express').Router();
let Account = require('../models/account.model');

// router.route('/').get((req, res) => {
//   Exercise.find()
//     .then(exercises => res.json(exercises))
//     .catch(err => res.status().json('Error: ' + err));
// });

router.route('/add').post((req, res) => {
  const fullname = req.body.fullname;
  const eamil = req.body.eamil;
  const password = req.body.password;

  const newAccount = new Account({
    fullname,
    eamil,
    password,
  });

  newAccount.save()
  .then(() => res.json('Account added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;