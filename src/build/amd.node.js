(function(root, factory) {
	/* global exports, module, define, require */
	if (typeof exports === 'object') {
		module.exports = factory(require('lodash'), require('loglevel'));
	} else if (typeof define === 'function' && define.amd) {
		define(['lodash', 'loglevel'], factory);
	}
}(this, function(_, log) {
	/* jshint unused:false */
	/* global Logger */
	//= ../logger.js
	return Logger;
}));
