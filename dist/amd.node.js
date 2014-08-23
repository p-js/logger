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
	/* global _, log */
	// appenders output the logs.
	var appenders = [log];
	
	/**
	 * Pass a name and all logs from this instance will be prefixed.
	 */
	function Logger(name) {
		this.prefix = name || "Logger";
		_.bindAll.apply(null, [this].concat(Logger.logMethods)); // so loggers can be event handlers.
	}
	
	function outputLog(level, prefix, args) {
		var logFilters = Logger.filters ? Logger.filters.toString().toLowerCase() : "";
		if (logFilters.indexOf("all") !== -1 || prefix.toLowerCase().indexOf(logFilters) !== -1) {
			args = _.toArray(args);
			args.unshift(prefix);
			_.each(appenders, function(appender) {
				if (level === "log") {
					// loglevel doesn't have a log method. 
					// trace outputs too much
					// so go with debug
					level = "debug";
				}
				appender[level].apply(log, args);
			});
		}
	}
	_.extend(Logger, {
		logMethods: ["trace", "debug", "info", "log", "warn", "error"],
		addAppender: function(appender) {
			// make sure the appender has every method.
			var hasAllMethods = _.every(Logger.logMethods, function(method) {
				return _.isFunction(appender[method]);
			});
			if (hasAllMethods) {
				appenders.push(appender);
			} else {
				log.error("Logging error, adding bad appender", appender);
			}
		},
		enableAll: function() {
			log.enableAll();
		},
		disableAll: function() {
			log.disableAll();
		},
		setLevel: function(level) {
			log.setLevel(level);
		}
	});
	
	_.each(Logger.logMethods, function(method) {
		Logger.prototype[method] = function() {
			outputLog(method, "[" + this.prefix + "]", arguments);
		};
	});
	// Enable all by default.
	Logger.enableAll();
	Logger.version = "0.2.3";
	Logger.build = "Sat Aug 23 2014 11:04:44";
	return Logger;
}));