'use strict';

const fs = require('fs');
const log = require('chip');
const utils = {};

/**
 * @function forIn
 * @param {Object} obj - the object which should be looped
 * @param {function} loopCallback - arguments are key and value
 * @returns {boolean} valid incoming variable obj
 */
utils.forIn = (obj, loopCallback) => {

	if (typeof obj !== 'object' || (obj instanceof Array)) {
		return false;
	}

	Object.keys(obj).map((key) => {
		loopCallback(key, obj[key]);
		return true;
	});

	return true;
};

/**
 * @function getStats
 * @param {string} path - the path
 * @returns {{isDirectory:function,isFile:function}} stats
 */
utils.getStats = (path) => {
	return fs.statSync(path);
};

/**
 * @function isDir
 * @param {string} path - the path
 * @returns {boolean} is directory
 */
utils.isDir = (path) => {

	try {
		return utils.getStats(path).isDirectory();
	} catch (err) {
		return false;
	}

};

/**
 * @function isFile
 * @param {string} path - the path
 * @returns {boolean} is directory
 */
utils.isFile = (path) => {

	try {
		return utils.getStats(path).isFile();
	} catch (err) {
		return false;
	}

};

/**
 * @function writeDir
 * @param {string} path - the path
 * @returns {boolean} directory was written
 */
utils.writeDir = (path) => {

	if (utils.isDir(path)) {
		return false;
	}

	try {
		fs.mkdirSync(path);
		return true;
	} catch (err) {
		log.error(err);
		return false;
	}
};

/**
 * @function writeFile
 * @param {string} path - the path
 * @param {string} fileData - data in file
 * @returns {boolean} file was written
 */
utils.writeFile = (path, fileData) => {
	try {
		fs.writeFileSync(path, fileData);
		return true;
	} catch (err) {
		log.error(err);
		return false;
	}
};

/**
 *
 * @method readDir
 * @param {string} dir - path to directory
 * @param {Array|undefined} ignoreFiles - ignore files
 * @returns {Array} list of files and directories in given directory
 * @public
 */
utils.readDir = (dir, ignoreFiles) => {

	ignoreFiles = ignoreFiles || ['.DS_Store'];

	const results = [];
	let list = [];

	try {
		list = fs.readdirSync(dir);
	} catch (err) {
		log.error(`Folder "${err.path}" not found!`);
		return [];
	}

	list.map((file) => {
		if (ignoreFiles.indexOf(file) < 0) {
			results.push(file);
		}
		return true;
	});
	return results;
};

/**
 *
 * @method readFile
 * @param {string} path - path to file
 * @returns {string|undefined} file data
 * @public
 */
utils.readFile = (path) => {
	try {
		return fs.readFileSync(path, 'utf8');
	} catch (err) {
		return undefined;
	}
};

/**
 *
 * @method removeFile
 * @param {string} path - path to file
 * @returns {boolean} file was removed
 * @public
 */
utils.removeFile = (path) => {
	try {
		fs.unlinkSync(path);
		return true;
	} catch (err) {
		log.error(`Cannot remove file "${err.path}"!`);
		return false;
	}
};

/**
 *
 * @method removeDir
 * @param {string} path - path to directory
 * @returns {boolean} file was removed
 * @public
 */
utils.removeDir = (path) => {
	try {
		if (!utils.isDir(path)) {
			return false;
		}

		fs.readdirSync(path).forEach((file) => {
			const curPath = `${path}/${file}`;
			if (utils.isDir(curPath)) {
				// remove dir
				utils.removeDir(curPath);
			} else {
				// delete file
				utils.removeFile(curPath);
			}
		});
		fs.rmdirSync(path);
		return true;

	} catch (err) {
		return false;
	}
};

/**
 * Capitalizes the first letter of the given string.
 *
 * @method capitalize
 * @param {string} str - the original string
 * @returns {string} The capitalized string
 */
utils.capitalize = (str) => {
	// Capitalize the first letter
	return str
		.substr(0, 1)
		.toUpperCase()
		.concat(str.substr(1));
};

/**
 * Camelizes the given string.
 *
 * @method toCamel
 * @param {string} str - the original string
 * @returns {string} the camelized string
 */
utils.toCamel = (str) => {
	return str.replace(/(\-[A-Za-z])/g, ($1) => {
		return $1.toUpperCase().replace('-', '');
	});
};


/**
 *
 * @method relativePath
 * @param {string} rootPath - the root path which will be removed
 * @param {string} path - the path
 * @returns {string} the cleaned path
 * @public
 */
utils.relativePath = (rootPath, path) => {

	if (typeof path !== 'string') {
		return '';
	}

	if (!rootPath) {
		return path;
	}

	return path.replace(rootPath, '');
};

/**
 *
 * @method typeOf
 * @param {*} value - the original value
 * @returns {string} - returns typeof given value
 * @public
 */
utils.typeOf = (value) => {

	if (value === null) {
		return 'null';
	}

	if (value === undefined) {
		return 'undefined';
	}

	if (isNaN(value) && value.toString() === 'NaN') {
		return 'NaN';
	}

	return (value instanceof Array) ? 'array' : typeof value;
};

/**
 *
 * @method encodeNmsPath
 * @param {string} path - the decoded path
 * @returns {string} - returns encoded path
 * @public
 */
utils.encodeNmsPath = (path) => {
	return new Buffer(path).toString('base64');
};

/**
 *
 * @method decodeNmsPath
 * @param {string} encodedPath - the encoded path
 * @returns {string} - returns path
 * @public
 */
utils.decodeNmsPath = (encodedPath) => {
	return new Buffer(encodedPath, 'base64').toString('ascii').replace(/\/\//g, '/');
};

module.exports = utils;
