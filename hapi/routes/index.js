exports.endpoints = [
{method: 'POST', path: '/login', handler: function (request, h){
	var user = request.payload.login;
	var pass = request.payload.pass;

	var mysql = require('mysql');

	var con = mysql.createConnection({
		host: "192.168.110.133",
		user: "root",
		password: "example",
		database: "police"
	});	
	return new Promise((resolve, reject) => {
	con.connect(function(err) {
		if (err) throw err;
		con.query("SELECT * FROM users where username like '"+user+"' and password like sha2('"+pass+"',512) and actif is true", function (err, result, fields) {
			resolve(result);
			if (err) reject(err);
   });
		});
});
}
},
{method: 'GET', path: '/users', handler: function (request, h){
	var mysql = require('mysql');
	var con = mysql.createConnection({
		host: "192.168.110.133",
		user: "root",
		password: "example",
		database: "police"
	});	
	return new Promise((resolve, reject) => {
	con.connect(function(err) {
		if (err) throw err;
		con.query("SELECT username,role,actif,nom FROM users", function (err, result, fields) {
			resolve(result);
			if (err) reject(err);
   });
		});
});
}
},
{method: 'POST', path: '/userProf', handler: function (request, h){
	var user = request.payload.login;
	var role = request.payload.role;
	var mysql = require('mysql');
	var con = mysql.createConnection({
		host: "192.168.110.133",
		user: "root",
		password: "example",
		database: "police"
	});
	if (role === 'chef')
	{	
		return new Promise((resolve, reject) => {
			con.connect(function(err) {
			if (err) throw err;
				con.query("SELECT username,role,actif,nom FROM users where username like '"+user+"'", function (err, result, fields) {
				resolve(result);
				if (err) reject(err);
   			});
			});
		});
	}
	else
	{
		return new Promise((resolve) => {
		resolve("need to be chef");
		});
	}
}
},
{method: 'POST', path: '/userSupr', handler: function (request, h){
	var user = request.payload.login;
	var role = request.payload.role;
	var mysql = require('mysql');
	var con = mysql.createConnection({
		host: "192.168.110.133",
		user: "root",
		password: "example",
		database: "police"
	});
	if (role === 'chef')
	{	
		return new Promise((resolve, reject) => {
			con.connect(function(err) {
			if (err) throw err;
				con.query("DELETE FROM users where username like '"+user+"'", function (err, result, fields) {
				resolve(result);
				if (err) reject(err);
   			});
			});
		});
	}
	else
	{
		return new Promise((resolve) => {
		resolve("need to be chef");
		});
	}
}
},
{method: 'POST', path: '/userActv', handler: function (request, h){
	var user = request.payload.login;
	var role = request.payload.role;
	var mysql = require('mysql');
	var con = mysql.createConnection({
		host: "192.168.110.133",
		user: "root",
		password: "example",
		database: "police"
	});
	if (role === 'chef')
	{	
		return new Promise((resolve, reject) => {
			con.connect(function(err) {
			if (err) throw err;
				con.query("update users set actif = true where username like '"+user+"'", function (err, result, fields) {
				resolve(result);
				if (err) reject(err);
   			});
			});
		});
	}
	else
	{
		return new Promise((resolve) => {
		resolve("need to be chef");
		});
	}
}
}
]
