/* global describe, it, Logger, expect, _ */
describe("logger test node", function() {
	var methods = Logger.logMethods,
		logger = new Logger("TestLogger");
	_.each(methods, function(method) {
		it(method + " should be a function", function() {
			expect(logger[method]).to.be.a("function");
		});
	});
	var appender = {},
		logResults = "";
	_.each(methods, function(method) {
		appender[method] = function() {
			logResults = "test " + method + ": " + _.toArray(arguments).join(", ");
		};
	});
	Logger.addAppender(appender);
	_.each(_.without(methods, "log"), function(method) {
		it("should " + method, function() {
			logResults = "";
			logger[method]("arg1", "arg2");
			expect("test " + method + ": [TestLogger], arg1, arg2").to.equal(logResults);
		});
	});

});
