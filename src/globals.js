var fs = require('fs'),
    path = require('path'),
    globalSettingsPath = path.join(process.env.HOME, '.lazy-panda');

function set(key, value) {
  if (fs.existsSync(globalSettingsPath) === false){
    fs.mkdirSync(globalSettingsPath);
  }

  fs.writeFileSync(path.join(globalSettingsPath, key + '.txt'), value);
}

function get(key) {
  var value = null,
      filePath = path.join(globalSettingsPath, key + '.txt');

  if (fs.existsSync(filePath) === true) {
    value = fs.readFileSync(filePath).toString();
  }

  return value;
}

module.exports = {
  set: set,
  get: get
};