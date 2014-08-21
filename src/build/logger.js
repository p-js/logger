/* global _ */
var Logger = (function(_) {
	// jshint unused:false
	var log = (function() {
		//= ../../components/loglevel/dist/loglevel.js
		return this.log;
	}).apply({});
	//= ../logger.js
	return Logger;
})(_);
