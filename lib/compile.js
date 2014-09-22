/** @module dotpath-compile */

var parser = require('./parser.js');

/**
 * Compile object template
 * @see parser.parseValues
 * @see parser.parseKeys
 * @param {Object|Array} obj
 * @returns {Object|Array} compiled obj
 */
module.exports = function compile(obj){
  parser.parseValues(obj);
  obj = parser.parseKeys(obj);
  parser.parseValues(obj);
  return obj;
};
