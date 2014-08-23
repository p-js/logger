/* global _ */
var Logger = (function(_) {
	// jshint unused:false
	var log = (function() {
		/*! loglevel - v1.1.0 - https://github.com/pimterry/loglevel - (c) 2014 Tim Perry - licensed MIT */
		(function (root, definition) {
		    if (typeof module === 'object' && module.exports && typeof require === 'function') {
		        module.exports = definition();
		    } else if (typeof define === 'function' && typeof define.amd === 'object') {
		        define(definition);
		    } else {
		        root.log = definition();
		    }
		}(this, function () {
		    var self = {};
		    var noop = function() {};
		    var undefinedType = "undefined";
		
		    function realMethod(methodName) {
		        if (typeof console === undefinedType) {
		            return noop;
		        } else if (console[methodName] === undefined) {
		            if (console.log !== undefined) {
		                return boundToConsole(console, 'log');
		            } else {
		                return noop;
		            }
		        } else {
		            return boundToConsole(console, methodName);
		        }
		    }
		
		    function boundToConsole(console, methodName) {
		        var method = console[methodName];
		        if (method.bind === undefined) {
		            if (Function.prototype.bind === undefined) {
		                return functionBindingWrapper(method, console);
		            } else {
		                try {
		                    return Function.prototype.bind.call(console[methodName], console);
		                } catch (e) {
		                    // In IE8 + Modernizr, the bind shim will reject the above, so we fall back to wrapping
		                    return functionBindingWrapper(method, console);
		                }
		            }
		        } else {
		            return console[methodName].bind(console);
		        }
		    }
		
		    function functionBindingWrapper(f, context) {
		        return function() {
		            Function.prototype.apply.apply(f, [context, arguments]);
		        };
		    }
		
		    var logMethods = [
		        "trace",
		        "debug",
		        "info",
		        "warn",
		        "error"
		    ];
		
		    function replaceLoggingMethods(methodFactory) {
		        for (var ii = 0; ii < logMethods.length; ii++) {
		            self[logMethods[ii]] = methodFactory(logMethods[ii]);
		        }
		    }
		
		    function cookiesAvailable() {
		        return (typeof window !== undefinedType &&
		                window.document !== undefined &&
		                window.document.cookie !== undefined);
		    }
		
		    function localStorageAvailable() {
		        try {
		            return (typeof window !== undefinedType &&
		                    window.localStorage !== undefined &&
		                    window.localStorage !== null);
		        } catch (e) {
		            return false;
		        }
		    }
		
		    function persistLevelIfPossible(levelNum) {
		        var localStorageFail = false,
		            levelName;
		
		        for (var key in self.levels) {
		            if (self.levels.hasOwnProperty(key) && self.levels[key] === levelNum) {
		                levelName = key;
		                break;
		            }
		        }
		
		        if (localStorageAvailable()) {
		            /*
		             * Setting localStorage can create a DOM 22 Exception if running in Private mode
		             * in Safari, so even if it is available we need to catch any errors when trying
		             * to write to it
		             */
		            try {
		                window.localStorage['loglevel'] = levelName;
		            } catch (e) {
		                localStorageFail = true;
		            }
		        } else {
		            localStorageFail = true;
		        }
		
		        if (localStorageFail && cookiesAvailable()) {
		            window.document.cookie = "loglevel=" + levelName + ";";
		        }
		    }
		
		    var cookieRegex = /loglevel=([^;]+)/;
		
		    function loadPersistedLevel() {
		        var storedLevel;
		
		        if (localStorageAvailable()) {
		            storedLevel = window.localStorage['loglevel'];
		        }
		
		        if (storedLevel === undefined && cookiesAvailable()) {
		            var cookieMatch = cookieRegex.exec(window.document.cookie) || [];
		            storedLevel = cookieMatch[1];
		        }
		        
		        if (self.levels[storedLevel] === undefined) {
		            storedLevel = "WARN";
		        }
		
		        self.setLevel(self.levels[storedLevel]);
		    }
		
		    /*
		     *
		     * Public API
		     *
		     */
		
		    self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
		        "ERROR": 4, "SILENT": 5};
		
		    self.setLevel = function (level) {
		        if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
		            persistLevelIfPossible(level);
		
		            if (level === self.levels.SILENT) {
		                replaceLoggingMethods(function () {
		                    return noop;
		                });
		                return;
		            } else if (typeof console === undefinedType) {
		                replaceLoggingMethods(function (methodName) {
		                    return function () {
		                        if (typeof console !== undefinedType) {
		                            self.setLevel(level);
		                            self[methodName].apply(self, arguments);
		                        }
		                    };
		                });
		                return "No console available for logging";
		            } else {
		                replaceLoggingMethods(function (methodName) {
		                    if (level <= self.levels[methodName.toUpperCase()]) {
		                        return realMethod(methodName);
		                    } else {
		                        return noop;
		                    }
		                });
		            }
		        } else if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
		            self.setLevel(self.levels[level.toUpperCase()]);
		        } else {
		            throw "log.setLevel() called with invalid level: " + level;
		        }
		    };
		
		    self.enableAll = function() {
		        self.setLevel(self.levels.TRACE);
		    };
		
		    self.disableAll = function() {
		        self.setLevel(self.levels.SILENT);
		    };
		
		    // Grab the current global log variable in case of overwrite
		    var _log = (typeof window !== undefinedType) ? window.log : undefined;
		    self.noConflict = function() {
		        if (typeof window !== undefinedType &&
		               window.log === self) {
		            window.log = _log;
		        }
		
		        return self;
		    };
		
		    loadPersistedLevel();
		    return self;
		}));
		return this.log;
	}).apply({});
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
	Logger.version = "0.3.0";
	Logger.build = "Sat Aug 23 2014 11:06:36";
	return Logger;
})(_);