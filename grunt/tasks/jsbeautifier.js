/* jshint node:true */
/**
 * all, beautify all js in the src dir (can be overriden with settings.jsbeautifier)
 * precommit, just verifies and doesn't beautify.
 */
module.exports = function(grunt, options) {
	options.settings = options.settings || {};
	var jsbeautifyrc = grunt.file.readJSON("./grunt/settings/jsbeautify.json"),
		src = options.settings.jsbeautifier || "src/**/*.js";
	if (grunt.util.kindOf(src) === "string") {
		src = [src];
	}
	// always beautify package.json and bower.json
	src = src.concat(["package.json", "bower.json"]);
	return {
		all: {
			src: src,
			options: {
				js: jsbeautifyrc
			},
		},
		precommit: {
			src: src,
			options: {
				js: jsbeautifyrc,
				mode: "VERIFY_ONLY"
			}
		}

	};
};
