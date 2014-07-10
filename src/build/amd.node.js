(function(root, factory) {
	/* global exports, module, define, require */
	if (typeof exports === 'object') {
		module.exports = factory(require('lodash'));
	} else if (typeof define === 'function' && define.amd) {
		define(['lodash'], factory);
	}
}(this, function(_) {
	/* jshint unused:false */
	/* global Logger */
	//= ../logger.js
	return Logger;
}));