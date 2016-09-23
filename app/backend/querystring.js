'use strict';

const util = require('./util.js');

module.exports.getJoiner = url => {
  url = url || '';
  return url.indexOf('?') === -1 ? '?' : '&';
};

module.exports.joinURL = (url, qs) => {
  if (!qs) {
    return url;
  }
  url = url || '';
  return url + module.exports.getJoiner(url) + qs;
};

module.exports.build = (param, strict = true) => {
  // Skip non-name ones in strict mode
  if (strict && !param.name) {
    return '';
  }

  if (!strict || param.value) {
    return util.flexibleEncode(param.name) + '=' + util.flexibleEncode(param.value);
  } else {
    return util.flexibleEncode(param.name);
  }
};

/**
 *
 * @param parameters
 * @param strict allow empty names and values
 * @returns {string}
 */
module.exports.buildFromParams = (parameters, strict = true) => {
  let items = [];
  for (var i = 0; i < parameters.length; i++) {
    let built = module.exports.build(parameters[i], strict);

    if (!built) {
      continue;
    }

    items.push(built);
  }

  return items.join('&');
};

/**
 *
 * @param qs
 * @param strict allow empty names and values
 * @returns {Array}
 */
module.exports.deconstructToParams = (qs, strict = true) => {
  const stringPairs = qs.split('&');
  const pairs = [];

  for (let stringPair of stringPairs) {
    const tmp = stringPair.split('=');

    const name = decodeURIComponent(tmp[0] || '');
    const value = decodeURIComponent(tmp[1] || '');

    if (strict && !name) {
      continue;
    }

    pairs.push({name, value});
  }

  return pairs;
};
