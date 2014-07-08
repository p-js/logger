/* jshint node:true */
/**
 * PJS projects often create a test directory, and the test directory needs
 * to reference the bower components.
 */
module.exports = {
	test: {
		src: 'test/**/*',
		dest: 'dist/'
	},
	components: {
		src: 'components/**/*.{js,css}',
		dest: 'dist/test/'
	}
};