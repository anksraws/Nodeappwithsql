const mysql = require('mysql');

const con = mysql.createConnection({
	host:'localhost',
	user: 'root',
	password: '',
	database:'mydb'
});

con.connect(function(err) {
	if(err) throw err;
	console.log('connected to database');
})
module.exports = con ;