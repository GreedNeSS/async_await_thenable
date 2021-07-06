'use strict';

const { readFile } = require('fs').promises;

(async () => {

	try {
		const file1 = await readFile('1-file.js');
		const file2 = await readFile('2-file')
			.catch(err => {
				console.log('Promise ... catch');
				console.error(err);
				return readFile('2-file.js');
			});
		const file3 = await readFile('3-file.js');
		console.dir([file1.length, file2.length, file3.length]);
	} catch (error) {
		console.log('try ... catch');
		console.error(error);
	}

})();