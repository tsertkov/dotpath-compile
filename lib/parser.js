var
  _ = require('lodash'),
  resolve = require('dotpath-resolve'),
  parser;

/**
 * @class parser
 */
parser = {
  /**
   * @type {RegExp}
   */
  tplRe: new RegExp([
    '<%=\\s*',  // delimiter start
    '(\\S+)',   // variable name
    '\\s*%>'    // delimiter end
  ].join(''), 'gm'),
  /**
   * @param {Object|Array} obj full object
   * @param {String} [selector] absolute dot-path
   * @param {Object|Array} [resolved] resolved selector
   * @returns {Object|Array} parsed obj
   */
  parseValues: function(obj, selector, resolved){
    var curObj, eachFn;

    if (selector) {
      curObj = !_.isUndefined(resolved) ? resolved : resolve(obj, selector);
    } else {
      curObj = obj;
    }

    eachFn = _.isArray(curObj) ? _.each : _.forIn;

    eachFn(curObj, function(value, key){
      var
        valueSelector = selector ? [selector, key].join('.') : key,
        parseValueFn = 'parseValue',
        newValue;

      if (_.isObject(value)) {
        parseValueFn += 'Object';
      } else if (_.isString(value)) {
        parseValueFn += 'String';
      } else {
        return;
      }

      newValue = this[parseValueFn].call(this, obj, valueSelector, value);

      if (newValue !== value) {
        curObj[key] = newValue;
      }
    }, this);

    return curObj;
  },
  /**
   * @param {Object|Array} obj
   * @param {String} valueSelector
   * @param {Object|Array} value
   * @returns {Object|Array}
   */
  parseValueObject: function(obj, valueSelector, value){
    return this.parseValues(obj, valueSelector, value);
  },
  /**
   * @param {Object|Array} obj
   * @param {String} valueSelector
   * @param {String} value
   * @returns {*}
   */
  parseValueString: function(obj, valueSelector, value){
    var newValue, parsedValue;

    function replacer(match, matchedSelector, offset, string){
      var
        matchedFullString = !offset && match === string,
        relative = matchedSelector[0] === '.',
        resolved;

      if (relative) {
        resolved = resolve(obj, matchedSelector.substr(1), valueSelector);
      } else {
        resolved = resolve(obj, matchedSelector);
      }

      if (matchedFullString) {
        // replace complete value instead of string replacement
        // configuration property value contains only template variable
        newValue = resolved;
        return match;
      }

      // do not expand template variable if its selector resolved to null
      // to processing selector target in js configuration file and then
      // expanding template variables again
      return (_.isNull(resolved) || _.isUndefined(resolved)) ? match : resolved;
    }

    // expand template variables in a given string
    parsedValue = value.replace(this.tplRe, replacer);
    if (!_.isNull(newValue) && !_.isUndefined(newValue)) {
      parsedValue = newValue;
    }

    return parsedValue;
  },
  /**
   * @param {Object|Array} parent
   * @param {String} [key]
   * @returns {Object|Array} parsed obj
   */
  parseKeys: function(parent, key){
    if (_.isUndefined(key)) {
      // create fake parent to simplify logic
      key = '0';
      parent = { '0': parent };
    }

    var obj = parent[key];

    // parse only objects
    if (!_.isObject(obj)) return obj;

    // call available key parsers
    if (obj['@_imports']) {
      obj = parent[key] = this.parseKeyImports(parent, key);
    }

    // recursion for own properties
    _.each(obj, function(_v, key){
      obj[key] = this.parseKeys(obj, key);
    }, this);

    return obj;
  },
  /**
   * @param {Object|Array} obj
   * @returns {Object|Array} cloned obj
   */
  parseKeyImports: function(parent, key){
    var
      obj = parent[key],
      importObj = obj['@_imports'],
      newObj;

    if (!_.isObject(importObj)) {
      return obj;
    }

    newObj = _.merge(Object.create(importObj), obj);
    delete newObj['@_imports'];
    return newObj;
  }
};

module.exports = parser;
