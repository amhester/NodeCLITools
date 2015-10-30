var argv = require('yargs').argv;
var chalk = require('chalk');
var _ = require('lodash');
var fs = require('fs');

if(!argv.file1 || !argv.file2) {
	console.log(chalk.bgWhite.red("Both --file1 and --file2 need to be specified to successfully merge."));
}

if(!argv.dest) {
	console.log(chalk.bgWhite.red("--dest needs to be specified in order to properly output the file!"));
}

var file1 = JSON.parse(fs.readFileSync(argv.file1));
console.log(chalk.cyan("file1 read. File has " + countKeys(file1) + " keys."));
var file2 = JSON.parse(fs.readFileSync(argv.file2));
console.log(chalk.cyan("file2 read. File has " + countKeys(file2) + " keys."));

var mergedData = _.merge({}, file1, file2);

fs.writeFile(argv.dest, JSON.stringify(mergedData, null, 2), function (err) {
	if(err) {
		console.log(chalk.bgWhite.red("Error creating merged file."));
		console.log('%s', err);
	} else {
		console.log(chalk.bgWhite.green('Successfully created merged file @' + argv.dest + ". File has " + countKeys(mergedData) + " keys."));		
	}		
	console.log("Merge process finished.");
});

function countKeys(data) {
	var i = 0;
	for(var key in data) {
		if(data.hasOwnProperty(key)) {
			i++;
		}
	}
	return i;
}