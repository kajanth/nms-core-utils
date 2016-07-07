const fs = require('fs');
const log = require('chip');
const extend = require('extend');
const utils = {};

/**
 * @function forIn
 * @param {Object} obj - the object which should be looped
 * @param {function} callback - arguments are key and value
 * @returns {boolean} valid incoming variable obj
 */
utils.forIn = (obj, callback) => {

	if (typeof obj !== 'object' || (obj instanceof Array)) {
		return false;
	}

	Object.keys(obj).map((key) => {
		callback(key, obj[key]);
	});

	return true;
};


module.exports = utils;