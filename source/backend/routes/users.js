const router = require('express').Router();
let User = require('../models/user.model');
var nodemailer = require('nodemailer');
var valdiation = require('../validations.js')
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const email = req.body.email;
  const password = req.body.password;
  const repassword = req.body.repassword;
  const promocode = req.body.promocode;

  User.find({Email: email})//{Email: email, Password: password}
  .then((users => { 
      if(users.length>0){
        res.send('This Email is already in the system');
      }else{
        valditateresult = valdiation.validateSignup(firstname, lastname, email, password, repassword);
        console.log(valditateresult);
        if (valditateresult != "")
        {
          res.send(valditateresult);
        }
         else{
        const newUser = new User({
          Name: firstname,
          FamilyName: lastname,
          Email: email,
          Password: password,
          PromoCode: promocode
        });
        console.log(newUser);
        newUser.save()
          .then(() => {
            res.send('OK');
      
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: { user: 'mhemmadreact@gmail.com', pass: 'Mhmd1999' }
            });
            var mailOptions = {
                from: 'mhemmadreact@gmail.com',
                to: email,
                subject: "Registration",
                text: "Hello "+firstname+" "+ lastname+", This is Register Confirmation ",
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
          })
          .catch(err =>{ res.send('Not Ok');res.status(400).json('Error: ' + err)});
      }}
    }))
    ;


  
});

router.route('/getuser').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email + " " + password);
  User.find()//{Email: email, Password: password}
  .then((users => { 

    user ={}
    for (var index = 0; index < users.length; ++index) {
        var temp = users[index];
        if(temp.Email == email && temp.Password == password){
          user=temp
          break;
        }
    }
    res.json(user);
    console.log(user)
  }))
  .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;