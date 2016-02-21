var types = require('./question-types'),
    storage = require('../storage');

module.exports = [{
  type: types.text,
  title: 'I\'m the lazy lazy panda, who are you?',
  value: '{username}',
  onAnswer: function(answer) {
    storage.set('username', answer, true);
  }
}, {
  // just for fun
  type: types.message,
  title: 'Good {daytime}, {username}!',
}, {
  type: types.boolean,
  title: 'Setup git?',
  value: true,
  command: 'git init',
  tasks: 'git'
}, {
  type: types.boolean,
  title: 'Gonna use npm modules?',
  value: true,
  tasks: 'npm'
}];