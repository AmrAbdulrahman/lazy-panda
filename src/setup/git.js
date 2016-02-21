var storage = require('../storage');

module.exports = [{
  title: 'Github username?',
  value: '{github-username}',
  onAnswer: function(answer) {
    storage.set('github-username', answer, true);
  }
}, {
  title: 'Remote name:',
  value: 'origin'
}, {
  title: 'Remote url:',
  value: 'git@github.com:{github-username}/{repo-name}.git'
}, {
  title: 'Setup .gitignore?',
  value: true,
  tasks: 'git-ignore'
}];