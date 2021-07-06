'use strict';

const fs = require('fs');

class Thenable {

	constructor() {
		this.thenHandler = null;
		this.next = null;
	}

	then(fn) {
		console.log('then callback:', fn.toString());
		this.fn = fn;
		const next = new Thenable();
		this.next = next;
		return next;
	}

	resolve(value) {
		const fn = this.fn;
		if (fn) {
			console.log({ resolve: this });
			const nextVal = fn(value);
			if (this.next) {
				this.next.resolve(nextVal);
			}
		}
	}
}

const readFile = fileName => {
	const thenable = new Thenable();
	fs.readFile(fileName, 'utf-8', (err, data) => {
		if (err) {
			throw err;
		}
		thenable.resolve(data);
	});
	return thenable;
};

(async () => {

	const file1 = await readFile('app.js').then(x => {
		console.log(x.length);
		return x += 'heh';
	}).then(x => x);
	console.dir({ length: file1.length });

})();