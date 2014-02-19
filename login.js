
/**
 * Login Class
 */
function Login() {
	// sessionId -> user map
	this.sessionMap = {
		99999 : { name: 'Foo', email: 'foo@bar.com' }
	};
}
/**
 * Say Hello {name} to the user
 */
Login.prototype.hello = function(sessionId) {
	return 'Hello ' + this.sessionMap[sessionId].name + '\n';
};

/**
 * Check whether the given session id is valid (is in sessionMap) or not.
 */
Login.prototype.isLoggedIn = function(sessionId) {
	return sessionId in this.sessionMap;
};

/**
 * Create a new session id for the given user.
 */
Login.prototype.login = function(_name, _email) {
   /*
	* Generate unique session id and set it into sessionMap like foo@bar.com
	*/
	var sessionId = new Date().getTime();
	this.sessionMap[sessionId] = { name: _name, email: _email } 
	
	console.log('new session id ' + sessionId + ' for login::' + _email);
	
	return sessionId;
};

Login.prototype.refreshSession = function(sessionId){
	console.log("Inside refreshSession");
	var name = this.sessionMap[sessionId].name;
	var email = this.sessionMap[sessionId].email;
	console.log("Both feilds present");
	//remove the session id from the session map
    delete this.sessionMap[sessionId];
    console.log("after delete");
	var newSessionID = new Date().getTime();
	// console.log("new id"+newSessionID);
	this.sessionMap[newSessionID] = { name: name, email: email } 
	
	console.log('new session id ' + newSessionID + ' for login::' + email);
	return newSessionID;
}
/**
 * Logout from the server
 */ 
Login.prototype.logout = function(sessionId) {
	console.log('logout::' + sessionId);
   /*
	* TODO: Remove the given sessionId from the sessionMap
	*/
	delete this.sessionMap[sessionId];
};

// Export the Login class
module.exports = new Login();
