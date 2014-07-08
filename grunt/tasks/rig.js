/* jshint node:true */
/**
 * Rig replaces //= file with the contents of the file.
 * It's more useful than concat.
 */
module.exports = {
	all: {
		expand: true,
		cwd: "src/build/",
		src: '*.js',
		dest: 'dist/'
	}
};