/* jshint node:true */
/**
 * addDist is run by the precommit hook.
 */
module.exports = {
	addDist: {
		command: "git add dist -A"
	}
};