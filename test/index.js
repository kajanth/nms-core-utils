'use strict';

const assert = require('assert');
const utils = require('../index.js');

describe('forIn', () => {

	it('loop forIn', (done) => {

		const keys = [];
		const values = [];

		utils.forIn({
			a: 1,
			b: 2
		}, (key, value) => {
			keys.push(key);
			values.push(value);
		});

		assert.equal(keys[0], 'a');
		assert.equal(keys[1], 'b');
		assert.equal(values[0], 1);
		assert.equal(values[1], 2);
		done();
	});

	it('loop forIn - array', (done) => {

		const keys = [];
		const values = [];

		utils.forIn([1, 2], (key, value) => {
			keys.push(key);
			values.push(value);
		});

		assert.equal(keys[0], undefined);
		assert.equal(values[0], undefined);
		done();
	});

	it('loop forIn - undefined', (done) => {

		let counter = 0;

		utils.forIn([1, 2], () => {
			counter += 1;
		});

		assert.equal(counter, 0);
		done();
	});

});

describe('isDir', () => {

	it('test is dir', (done) => {

		const dir = '../';

		assert.equal(utils.isDir(dir), true);
		done();
	});

	it('.gitignore isn\'t dir', (done) => {

		const dir = '../.gitignore';

		assert.equal(utils.isDir(dir), false);
		done();
	});

});
