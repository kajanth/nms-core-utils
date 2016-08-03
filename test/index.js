'use strict';
/* global describe, it, require */

const assert = require('assert');
const utils = require('../index.js');
const testPaths = [
	['/test', 'L3Rlc3Q='],
	['/path/{placeholder}/sub', 'L3BhdGgve3BsYWNlaG9sZGVyfS9zdWI='],
	[
		'/path/{placeholder}/{super}/{long}/1,323,343/sub/directory',
		'L3BhdGgve3BsYWNlaG9sZGVyfS97c3VwZXJ9L3tsb25nfS8xLDMyMywzNDMvc3ViL2RpcmVjdG9yeQ=='
	],
	[
		'/path/{placeholder}/{super}/with.selector.html',
		'L3BhdGgve3BsYWNlaG9sZGVyfS97c3VwZXJ9L3dpdGguc2VsZWN0b3IuaHRtbA=='
	]
];

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

		const dir = './test';

		assert.equal(utils.isDir(dir), true);
		done();
	});

	it('.gitignore isn\'t dir', (done) => {

		const dir = './.gitignore';

		assert.equal(utils.isDir(dir), false);
		done();
	});

});

describe('isFile', () => {

	it('test isn\'t file', (done) => {

		const dir = './test';

		assert.equal(utils.isFile(dir), false);
		done();
	});

	it('index.js is file', (done) => {

		const dir = './index.js';

		assert.equal(utils.isFile(dir), true);
		done();
	});

});

describe('write and remove dir', () => {

	it('write directory test/tmp', (done) => {

		const dir = './test/tmp';

		assert.equal(utils.isDir(dir), false);
		assert.equal(utils.writeDir(dir), true);
		assert.equal(utils.isDir(dir), true);
		utils.removeDir(dir);
		done();
	});

});

describe('write and remove file', () => {

	it('write directory test/tmp', (done) => {

		const dir = './test/tmp';
		const dirFile = './test/tmp/test.txt';

		assert.equal(utils.isFile(dirFile), false);
		assert.equal(utils.writeDir(dir), true);
		assert.equal(utils.writeFile(dirFile, 'test'), true);
		assert.equal(utils.isFile(dirFile), true);
		assert.equal(utils.removeFile(dirFile), true);
		utils.removeDir(dir);
		done();
	});
});

describe('capitalize', () => {

	it('capitalize test', (done) => {
		assert.equal(utils.capitalize('test'), 'Test');
		done();
	});

	it('capitalize Test', (done) => {
		assert.equal(utils.capitalize('Test'), 'Test');
		done();
	});

	it('capitalize test-abc', (done) => {
		assert.equal(utils.capitalize('test-abc'), 'Test-abc');
		done();
	});
});

describe('toCamelcase', () => {

	it('toCamelcase test', (done) => {
		assert.equal(utils.toCamel('test'), 'test');
		done();
	});

	it('toCamelcase test-abc', (done) => {
		assert.equal(utils.toCamel('test-abc'), 'testAbc');
		done();
	});

	it('toCamelcase & capitalize test-abc', (done) => {
		assert.equal(utils.capitalize(utils.toCamel('test-abc')), 'TestAbc');
		done();
	});

});

describe('relativePath', () => {

	it('relativePath ~/User/projects/xy/src/abc/test.js -> src/abc/test.js', (done) => {
		assert.equal(utils.relativePath('~/User/projects/xy/', '~/User/projects/xy/src/abc/test.js'), 'src/abc/test.js');
		done();
	});

});

describe('typeOf', () => {

	it('typeOf undefined', (done) => {
		assert.equal(utils.typeOf(undefined), 'undefined');
		done();
	});

	it('typeOf number', (done) => {
		assert.equal(utils.typeOf(3), 'number');
		done();
	});

	it('typeOf number float', (done) => {
		assert.equal(utils.typeOf(3.4), 'number');
		done();
	});

	it('typeOf string', (done) => {
		assert.equal(utils.typeOf('test'), 'string');
		done();
	});

	it('typeOf Object', (done) => {
		assert.equal(utils.typeOf({}), 'object');
		done();
	});

	it('typeOf Object', (done) => {
		assert.equal(utils.typeOf({ test: 'test' }), 'object');
		done();
	});

	it('typeOf Array', (done) => {
		assert.equal(utils.typeOf([]), 'array');
		done();
	});

	it('typeOf null', (done) => {
		assert.equal(utils.typeOf(null), 'null');
		done();
	});

	it('typeOf NaN', (done) => {
		assert.equal(utils.typeOf(NaN), 'NaN');
		done();
	});

});

describe('encodeNmsPath', () => {

	testPaths.map(([decoded, encoded]) => {
		it(`${decoded} => ${encoded}`, (done) => {
			assert.equal(utils.encodeNmsPath(decoded), encoded);
			done();
		});
		return true;
	});

});

describe('decodeNmsPath', () => {

	testPaths.map(([decoded, encoded]) => {
		it(`${encoded} => ${decoded}`, (done) => {
			assert.equal(utils.decodeNmsPath(encoded), decoded);
			done();
		});
		return true;
	});

});
