/* jshint node:true */
/**
 * Usually run from the command line while doing releases.
 * $ grunt bump --level minor
 */
module.exports = {
	// this option keeps the .json files formatted with tabs.
	options: {
		hardTab: true,
	},
	files: ['package.json', 'bower.json']
};