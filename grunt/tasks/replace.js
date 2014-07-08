/* jshint node:true */
/**
 * Common in PJS projects are references to @@verion and @@timestamp.
 * Replace is run on the dist dir.
 */
module.exports = {
	dist: {
		options: {
			patterns: [{
				match: 'timestamp',
				replacement: '<%= grunt.template.today() %>'
			}, {
				match: 'version',
				replacement: '<%= pkg.version %><%= grunt.config("buildNumber") %>'
			}]
		},
		src: "dist/**",
		dest: "./"
	}
};