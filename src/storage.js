var execSync = require('child_process').execSync,
    globals = require('./globals'),
    storage = {};

function set(key, value, global) {
  storage[key] = value;

  if (global === true) {
    globals.set(key, value);
  }

  return storage[key];
}

function get(key) {
  var valueFromGlobals = globals.get(key);
  storage[key] = valueFromGlobals || storage[key];
  return storage[key];
}

function all() {
  return storage;
}

function init() {
  // set username globally
  var username = process.env.USER;
  set('username', username);

  // set daytime
  var hours = (new Date()).getHours();
  var daytime = 'morning';
  hours >= 12 ? daytime = 'afternoon' : '';
  hours >= 18 ? daytime = 'evening' : '';
  set('daytime', daytime);

  // set githubUsername
  set('github-username', username);

  // set repoName
  var pwdParts = process.env.PWD.split('/'),
      dirName = pwdParts[pwdParts.length - 1];

  set('repo-name', dirName);
}

module.exports = {
  set: set,
  get: get,
  all: all,
  init: init
};