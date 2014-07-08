/* jshint node:true */
/**
 * Removes directories and files based on a pattern.
 * https://github.com/isaacs/minimatch
 */
module.exports = function(grunt, options) {
	options.settings = options.settings || {};
	var path = [options.settings.clean || "dist/*"];
	return {
		folder: path
	};
};