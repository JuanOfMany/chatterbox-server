/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var messagesData = []
var count = 0;
var handleRequest = function (request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // ======== Dummy Message =========


  var addMessage = function (message) {
    message = JSON.parse(message);
    // console.log('addMessage : ', message, typeof message)
    message.createdAt = JSON.stringify(new Date());
    message.message_id = count;
    count++;
    messagesData.push(message)
    return message;
  }

  //   var request = require('request');
  //   var RateLimiter = require('limiter').RateLimiter;

  //   var limiter = new RateLimiter(1, 100); // at most 1 request every 100 ms
  //   var throttledRequest = function() {
  //     var requestArgs = arguments;
  //     limiter.removeTokens(1, function() {
  //         request.apply(this, requestArgs);
  //     });
  // };

  // console.log('thisisrequest: ', (request))
  if (request.url === '/classes/messages') {
    console.log('serving a(n)', request.method, 'request')
    if (request.method === 'OPTIONS') {
      var statusCode = 202;
      var headers = defaultCorsHeaders;
      response.setHeader('allow', 'GET, POST, OPTIONS')
      headers['Content-Type'] = 'application/json';
      response.writeHead(statusCode, headers);
      response.end()
    }

    if (request.method === 'GET') {
      var statusCode = 200;
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = 'application/json';
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(messagesData))
    }

    if (request.method === 'POST') {
      var body = '';
      request.on('data', function (chunk) {
        body += chunk;
      });
      request.on('end', function () {
        if (JSON.parse(body).text.length === 0) {
          var statusCode = 400
          var headers = defaultCorsHeaders;
          headers['Content-Type'] = 'application/json';
          response.writeHead(statusCode, headers);
          response.end('Empty Message Not Accepted');
        // }  else if (
        //   console.log(body)
        //   JSON.parse(body.text) === messagesData[messagesData.length - 1].text &&
        //   JSON.parse(body.username) === messagesData[messagesData.length -1].username
        // ) {
        //   var statusCode = 400
        //   var headers = defaultCorsHeaders;
        //   headers['Content-Type'] = 'application/json';
        //   response.writeHead(statusCode, headers);
        //   response.end('stooooopp spamming spame spam spam spam');
        } else {
          body = addMessage(body);
          var statusCode = 201
          var headers = defaultCorsHeaders;
          headers['Content-Type'] = 'application/json';
          response.writeHead(statusCode, headers);
          response.end(JSON.stringify(body));
        }
      })
    }

    if (request.method === 'PUT') {
      var statusCode = 400;
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = 'application/json';
      response.writeHead(statusCode, headers);
      response.end()
    }

    if (request.method === 'DELETE') {
      var statusCode = 400;
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = 'application/json';
      response.writeHead(statusCode, headers);
      response.end()
    }

  } else {
    var statusCode = 404;
    var headers = defaultCorsHeaders;
    response.writeHead(statusCode, headers);
    response.end('Page not found');
  }
};

// // COMMENT OUT BELOW
// // console.log('response: ', (response))
// //
// // Adding more logging to your server can be an easy way to get passive
// // debugging help, but you should always be careful about leaving stray
// // console.logs in your code.
// console.log('Serving request type ' + request.method + ' for url ' + request.url);


// // The outgoing status.
// var statusCode = 200;

// // See the note below about CORS headers.
// var headers = defaultCorsHeaders;

// // Tell the client we are sending them plain text.
// //
// // You will need to change this if you are sending something
// // other than plain text, like JSON or HTML.
// headers['Content-Type'] = 'application/json';

// // .writeHead() writes to the request line and headers of the response,
// // which includes the status and all headers.
// response.writeHead(statusCode, headers);

// // Make sure to always call response.end() - Node may not send
// // anything back to the client until you do. The string you pass to
// // response.end() will be the body of the response - i.e. what shows
// // up in the browser.
// //
// // Calling .end "flushes" the response's internal buffer, forcing
// // node to actually send all the data over to the client.
// response.write(JSON.stringify(dummyMessages))
// response.end();
// };
// COMMENT OUT ABOVE

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};

module.exports = {
  'defaultCorsHeaders': defaultCorsHeaders,
  'handleRequest': handleRequest
}

// var dummyMessages = [
//   {
//     username: 'zero',
//     text: 'this is the message',
//     createdAt: 0,
//   },
//   {
//     username: 'some dude',
//     text: 'this is a message',
//     createdAt: 1,
//   },
//   {
//     username: 'Me llamo Lopez',
//     text: 'este es un mensaje',
//     createdAt: 2,
//   },
//   {
//     username: 'Bonjor',
//     text: 'parlevous frances',
//     createdAt: 3,
//   },
//   {
//     username: 'asdf',
//     text: 'suuuuuuh',
//     createdAt: 4,
//   },
//   {
//     username: 'Jin An Liu',
//     text: 'ni hao, wo xi huan bi sa bing',
//     createdAt: 5,
//   }
// ]