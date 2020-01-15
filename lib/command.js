const exec = require('child_process').exec;
const path = require('path'); 
 /*
cmdAall = [
		'call start_agent.bat' 
]; 
groupfile
'C:\\Users\\devni\\Desktop\\pm2-linealert\\'
*/
const executeCommands = function(cmdArr,groupfile, runIndex, callback) {
	if (runIndex >= cmdArr.length) {
	    callback();
	    return;
	}
	let runpath=path.resolve();
	if(groupfile.length>5){runpath=path.resolve(groupfile)} 
	exec(cmdArr[runIndex], {
	    'cwd':runpath
	}, function(err, stdout, stderr) {
	    console.log('exec(' + cmdArr[runIndex] + ')');
	    executeCommands(cmdArr,groupfile, runIndex + 1, callback);
	});
};

const RunCommands = function(cmdAall,groupfile) { 
	executeCommands(cmdAall,groupfile, 0, function() {
		console.log('Executing commands complete');
	});
}; 
module.exports = { RunCommands};