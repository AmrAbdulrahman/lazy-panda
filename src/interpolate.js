var _ = require('lodash');

String.prototype.interpolate = function() {
  var storage = require('./storage');

  var res = this;

  _.each(storage.all(), function(value, key) {
    res = _.replace(res, new RegExp('{' + key + '}', 'g'), storage.get(key));
  });

  return res;
};