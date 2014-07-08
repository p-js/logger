/* jshint node:true */
/**
 * Beautify pre-commit, but don't change the code.
 * If this fails, you can run jsbeautifier:all to beautify everything,
 * and then commit.
 */
module.exports = {
	all: {
		'pre-commit': 'jsbeautifier:precommit release shell:addDist'
	}
};