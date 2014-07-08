/* jshint node:true */
/**
 * No customization here.
 * Convention is to uglify all js in the dist dir.
 */
module.exports = {
	options: {
		sourceMap: true
	},
	all: {
		expand: true,
		cwd: "dist/",
		src: '*.js',
		ext: ".min.js",
		dest: 'dist/'
	}
};
