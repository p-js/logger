/*global Logger, test, expect, ok, _*/

test("logger test", function() {
	var methods = ["debug", "log", "info", "error", "warn"],
		logger = new(Logger)();
	expect(methods.length);
	_.each(methods, function(method) {
		logger[method]("testing logger method:" + method);
		ok(true, method + " worked");
	});
});