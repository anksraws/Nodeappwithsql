const jwt = require('jsonwebtoken')
const con = require('./../connection/connection.js');
const bcrypt = require('bcrypt');

module.exports.signup = (req, res) => {

 let {
  name,
  email,
  password
 } = req.body;

 const saltRounds = 10;
 bcrypt.genSalt(saltRounds).then((salt) => {
  return bcrypt.hash(password, salt)
 }).then((hash) => {
  var sql = `insert into user (name,email,password) values ("${name}","${email}","${hash}")`;
  con.query(sql, function(err, result) {
   if (err) res.status(400).send({err}); 
   else {
    sql = `select user_id from user where email= "${email}"`;
    con.query(sql, (err, result) => {
     if (err) throw err;
     useId = (result[0].user_id).toString();
     let payload = {
      useId,
      email
     };
     var token = jwt.sign(payload,'abc123').toString();
     sql = `update user set token = "${token}" where email = "${email}"`;
     con.query(sql, (err, result) => {
      if (err) throw err;
      res.send({
       useId,
       name,
       email,
       hash,
       token
      });
     })
    })
   }
  });
 });
}

module.exports.login = (req, res) => {
 let {
  name,
  email,
  password
 } = req.body;
 var sql = `select user_id,password from user where email = "${email}" and name = "${name}"`;
 con.query(sql, (err, result) => {
  if (err) {
   res.status(404).send();
  }
  var hash = (result[0].password).toString();
  bcrypt.compare(password, hash, (err, result) => {
   if (result == false) {
    res.status(404).send();
   } else {
    let payload = {
     userId,
     email
    };
    var token = jwt.sign(payload, 'abc123').toString();
    sql = `update user set token = "${token}" where email = "${email}"`;
    con.query(sql, (err, result) => {
     if (err) throw err;
     res.send({
      token
     });
    })
   }

  })

 })

}

module.exports.details = (req, res) => {
  var decoded = req.decode;
  res.send(decoded);
}

module.exports.order = (req, res) =>{
  var decoded = req.decode;
  var food = req.body.order_food;
  var sql = `insert into restaurant (customer_id, order_food) values ("${decoded.userId}","${food}")`;
  con.query(sql, (err, result) => {
    if (err) {
   res.status(404).send();
  }
  else{
    res.send({
      user_id: decoded.userId,
      order_food:food

    });
  }
  })
}
