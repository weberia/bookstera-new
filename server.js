'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
var Path = require('path');
var Inert = require('inert');

server.connection({ port: 3000 });

var r = require('rethinkdb')
var cn = null;
r.connect( {host: 'archera', port: 28015, db: 'bookstera'}, function(err, conn) {
  if (err) throw err;
  cn = conn;
})

server.register(require('vision'), (err) => {
  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'views/common'
  });
});

server.register(Inert, (err) => {

  if (err) {
    throw err;
  }

  server.route({

    method: 'GET',
    path: '/assets/{param*}',
    handler: {
      directory: {
        path: Path.join(__dirname, 'public'),
        listing: true
      }
    }

  });

});


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

server.route({
  method: 'GET',
  path: '/semantix/{jsonld?}',
  handler: function (request, reply) {

    const jsonld = request.params.jsonld ? encodeURIComponent(request.params.jsonld) : 'list';

    if (jsonld == 'list') {
      r.db('bookstera').table('jsonld').run(cn, function(err, result) {
        if (err) {
          reply('error');
        } else {
          reply(result.toArray());
        }
      });
    } else {
      r.db('bookstera').table('jsonld').filter(r.row('@type').eq(jsonld)).run(cn, function(err, result) {
        if (err) {
          reply('error');
        } else {
          reply(result.toArray());
        }
      });
    }
  
  }
});

server.route({
  method: 'GET',
  path: '/collabox/{action}/{collab*}',
  handler: function (request, reply) {

    var action = request.params.action;

    const collabParts = request.params.collab.split('/');

    var arg1 = encodeURIComponent(collabParts[0]);
    var arg2 = encodeURIComponent(collabParts[1]);

    reply.view('index', {
      whoami: 'Guest',
      title: 'Judul ini',
      message: 'Message ini'
    });

  }
});

server.route({
  method: ['GET', 'POST'],
  path: '/speax',
  handler: function (request, reply) {

    //reply(request.params + request.method);
    if (request.method == 'get') {
      reply("{'error': 'only POST allowed'}");
    } else {
      reply(request.params);
    }

  }
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
