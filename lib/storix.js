var r = require('rethinkdb');

var connection = null;

r.connect( {host: 'archera', port: 28015, db: 'bookstera'}, function(err, conn) {
  if (err) throw err;
  connection = conn;
})

function Storix() {}

Storix.prototype.rethink = r;
Storix.prototype.conn = connection;

// export the class
module.exports = Storix;
