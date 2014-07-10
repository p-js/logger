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
	/* global _, module*/
	/* exported Logger */
	var Logger = (function() {
		var colors = {
				debug: "blue",
				info: "green",
				log: "#333",
				warn: "orange",
				error: "red"
			},
			noop = function() {},
			postMessage = window.postMessage || noop,
			consoleProps = ["debug", "log", "info", "error", "warn"],
			console = window.console || {};
	
		// pollyfill 
		_.each(consoleProps, function(prop) {
			if (!console[prop]) {
				console[prop] = noop;
			}
		});
	
		function Logger(name) {
			this.prefix = name || "Logger";
			_.bindAll(this, "debug", "info", "log", "warn", "error"); // so loggers can be event handlers.
		}
	
		function doLog(level, logger, args) {
			var loggers = Logger.getFilters();
			if (loggers.indexOf("all") !== -1 || logger.prefix.toLowerCase().indexOf(loggers) !== -1) {
				var prefix = "[" + logger.prefix + "]";
				args = _.toArray(args);
				postMessage("logMessage:<span style=\"color:" + colors[level] + "\">" + prefix + " " + args + "</span>", "*");
				args.unshift(prefix);
				console[level].apply(console, args);
			}
		}
		_.extend(Logger.prototype, {
			debug: function() {
				doLog("debug", this, arguments);
			},
			info: function() {
				doLog("info", this, arguments);
			},
			log: function() {
				doLog("log", this, arguments);
			},
			warn: function() {
				doLog("warn", this, arguments);
			},
			error: function() {
				doLog("error", this, arguments);
			}
		});
		Logger.getFilters = function() {
			if (!Logger.fiters) {
				return "";
			}
			return Logger.filters.toString().toLowerCase();
		};
		return Logger;
	})();
	
	module.exports = Logger;
	return Logger;
}));