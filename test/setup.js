/* global expect:true, Logger:true, _:true */
/* jshint node:true */
/* jshint unused:false */
if (typeof process !== 'undefined' && process.title === 'node') {
	// We are in node. Require modules.
	expect = require('chai').expect;
	Logger = require('../dist/amd.node.js');
	_ = require("lodash");
} else {
	/* global chai */
	// We are in the browser. Set up variables like above using served js files.
	expect = chai.expect;
}
