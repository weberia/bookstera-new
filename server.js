'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({ port: 3000 });

var r = require('rethinkdb')
var cn = null;
r.connect( {host: 'archera', port: 28015, db: 'bookstera'}, function(err, conn) {
  if (err) throw err;
  cn = conn;
})

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    r.db('rethinkdb').table('server_config').run(cn, function(err, result) {
        if (err) {
          reply('error');
        } else {
          reply(result.toArray());
        }
    })
  }
});

server.route({
  method: 'GET',
  path: '/resources.json',
  handler: function (request, reply) {
    r.db('bookstera').table('resources').run(cn, function(err, result) {
        if (err) {
          reply('error');
        } else {
          reply(result.toArray());
        }
    })
  }
});



server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
