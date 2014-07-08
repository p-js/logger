/* jshint node:true */
module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt, {
		scope: 'devDependencies'
	});
	require('load-grunt-config')(grunt, {
		// the path where all the grunt task live is grunt/tasks
		configPath: require("path").join(process.cwd(), 'grunt', 'tasks'),
		// data is passed into the tasks
		data: {
			// pkg is the package.json, used to get name and version.
			pkg: grunt.file.readJSON('package.json'),
			// settings are a way to override the defaults.
			settings: {
				// defaults, these can be removed.
				clean: "dist/*",
				jshint: "src/**/*.js",
				jsbeautifier: "src/**/*.js",
				watch: ["Gruntfile.js", "src/**/*", "test/**/*"],
				watchTasks: "default"
			}
		}
	});
};
