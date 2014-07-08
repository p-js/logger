/* jshint node:true */
/**
 * options.watch The files to watch
 * options.watchTasks The tasks to run when the files change.
 */
module.exports = function(grunt, options) {
	var settings = options.settings || {};
	return {
		all: {
			files: settings.watch || ['Gruntfile.js', 'src/**/*', 'test/**/*'],
			tasks: settings.watchTasks || ['default']
		}
	};
};