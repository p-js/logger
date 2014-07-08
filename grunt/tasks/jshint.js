/* jshint node:true */
/**
 * See README.md for more about the jshint settings.
 */
module.exports = function(grunt, options) {
	options.settings = options.settings || {};
	var src = options.settings.jshint || "src/**/*.js";
	return {
		devel: {
			options: grunt.file.readJSON("./grunt/settings/jshint-dev.json"),
			src: src
		},
		release: {
			options: grunt.file.readJSON("./grunt/settings/jshint.json"),
			src: src
		}
	};
};