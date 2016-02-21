var _ = require('lodash'),
    readlineSync = require('readline-sync'),
    interpolate = require('./interpolate'),
    storage = require('./storage'),
    setup = require('./setup'),
    types = require('./setup/question-types');

storage.init();

function getQuestionTitle(question) {
  var rawTitle = question.title;
  
  if (question.type !== types.message) {
    rawTitle = rawTitle + ' : ';
  }

  if (_.isUndefined(question.value) === false) {
    rawTitle = rawTitle + '(' + question.value + ') ';
  }

  return rawTitle.interpolate();
}

function goThrough(questions) {
  _.each(questions, function(question) {

    var questionTitle = getQuestionTitle(question);

    if (question.type === types.message) {
      console.log(questionTitle);
    } else {
      var answer = readlineSync.question(questionTitle);
      question.value = answer || question.value;

      if (_.isString(question.value) === true) {
        question.value = question.value.interpolate();
      }
    }

    // call callback if any
    if (_.isUndefined(question.onAnswer) === false) {
      question.onAnswer(question.value);
    }

    if (_.isUndefined(question.options) === false) {
      var optionIndex = readlineSync.keyInSelect(question.options, 'save option: ');

      // not CANCEL
      if (optionIndex !== -1) {
        question.option = question.options[optionIndex];
      }
    }

    // go through subtasks recursively
    if (_.isUndefined(question.tasks) === false && question.value === true) {
      if (_.isString(question.tasks) === true) {
        question.tasks = require('./setup/' + question.tasks);
      }

      goThrough(question.tasks);
    }
  });
}

goThrough(setup);

console.log(setup);