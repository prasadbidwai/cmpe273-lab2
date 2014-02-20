var connect = require('connect');
var login = require('./login');

var app = connect();

app.use(connect.json()); // Parse JSON request body into `request.body`
app.use(connect.urlencoded()); // Parse form in request body into `request.body`
app.use(connect.cookieParser()); // Parse cookies in the request headers into `request.cookies`
app.use(connect.query()); // Parse query string into `request.query`

app.use('/', main);

function main(request, response, next) {
	switch (request.method) {
		case 'GET': get(request, response); break;
		case 'POST': post(request, response); break;
		case 'DELETE': del(request, response); break;
		case 'PUT': put(request, response); break;
	}
};

function get(request, response) {
	var cookies = request.cookies;
	console.log(cookies);
	if ('session_id' in cookies) {
		var sid = cookies['session_id'];
		if ( login.isLoggedIn(sid) ) {
			response.setHeader('Content-Tyspe','text/html');
			response.setHeader('Set-Cookie', 'session_id=' + sid);
			response.end(login.hello(sid));	
		} else {
			response.end("Invalid session_id! Please login again\n");
		}
	} else {
		response.end("Please login via HTTP POST\n");
	}
};

function post(request, response) {
	// TODO: read 'name and email from the request.body'
	// var newSessionId = login.login('xxx', 'xxx@gmail.com');
	// TODO: set new session id to the 'session_id' cookie in the response
	// replace "Logged In" response with response.end(login.hello(newSessionId));
	if( 'name' in request.body) {
		var name = request.body['name'];
		if('email' in request.body){
			var email = request.body['email'];
			var newSessionId = login.login(name, email);
			 response.writeHead(200, {
    			'Content-Type': 'text/html',
    			'Set-Cookie': 'session_id='+newSessionId
    			
  });
			response.end(login.hello(newSessionId));
		}
	}
	response.end("body params not found\n");
};

function del(request, response) {
	console.log("DELETE:: Logout from the server");
 	// TODO: remove session id via login.logout(xxx)
 	// No need to set session id in the response cookies since you just logged out!

var cookies = request.cookies;
	console.log(cookies);
	if ('session_id' in cookies) {
		var sessionid = cookies['session_id'];
		if ( login.isLoggedIn(sessionid) ) {
			login.logout(sessionid);
			console.log("Session found");  	response.end('Logged out from the server\n');
		} else {
			response.end("Invalid session_id! Please login again\n");
		}
	} else {
		response.end("Please login via HTTP POST\n");
	}
};



function put(request, response) {
	console.log("PUT:: Re-generate new seesion_id for the same user");
	// TODO: refresh session_idon id; similar to the post() function
	console.log("Inside PUT method");
	var cookies = request.cookies;
	console.log(cookies);
	if ('session_id' in cookies) {
		console.log("Session found");
		var sid = cookies['session_id'];
		if ( login.isLoggedIn(sid) ) {
			console.log("Already logged in");
			var newSessionId = login.refreshSession(sid);
			response.setHeader('Set-Cookie', 'session_id=' + newSessionId);
			// response.end(login.hello(newSessionId));
			response.end("Re-freshed session id\n");
		} else {
			response.end("Invalid session_id!\n");
		}
	
}
else {
		response.end("Please login via HTTP POST\n");
	}
};

app.listen(8000);

console.log("Node.JS server running at 8000...");
