'use strict';

const fs = require('fs');

(async () => {

	const stream = fs.createReadStream('./app.js', 'utf-8');
	for await (const chunk of stream) {
		console.log('-------------------iterable---------------------');
		console.log(chunk);
	}

})();
