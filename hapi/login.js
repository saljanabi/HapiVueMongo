var Bcrypt = require('bcrypt'); // use bcrypt to hash passwords.
var db     = require('your-favourite-database'); // your choice of DB
var Boom   = require('boom') //

function handler (request, reply) {
  db.get(request.payload.email, function(err, res) { // GENERIC DB request. insert your own here!
    if(err) {
      reply('fail').code(400); // don't leak info about user existence
    }
    Bcrypt.compare(request.payload.password, user.password, function (err, isValid) {
        if(!err && isValid) {
          reply('great success'); // or what ever you want to rply
        } else {
          reply(Boom.notFound('Sorry, that username or password is invalid, please try again.'));
        } // see: https://github.com/dwyl/hapi-login/issues/14
    }); // END Bcrypt.compare which checks the password is correct
  }); // END db.get which checks if the person is in our database
}