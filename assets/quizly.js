var Quizly = (function () {
    function Quizly(target, data) {
        this.container = this.parseContainer(target);
        this.template = new QuizlyTemplater(this.container);
        if (data) {
            this.createQuizHtml(this.container, data);
        }
        this.bindListener();
        this.hideResults();
    }
    Quizly.prototype.hideResults = function () {
        var resultSpans = this.container.querySelectorAll('.right, .wrong');
        for (var i = 0; i < resultSpans.length; i++) {
            resultSpans[i].style.display = 'none';
        }
    };
    Quizly.prototype.bindListener = function () {
        var that = this;
        [].forEach.call(this.container.querySelectorAll('input, select'), function (el) {
            //bind reference so it's available in the handler.
            //don't assign type check til after or typescript complains about the custom property
            el.quizly = that;
            el.addEventListener('change', function (event) {
                var input = event.srcElement;
                that.handler(input, that);
            });
        });
    };
    Quizly.prototype.parseContainer = function (target) {
        if (typeof target === 'string') {
            var targetElement = document.getElementById(target);
            if (!targetElement) {
                throw "Invalid id, please check your spelling.";
            }
            return targetElement;
        }
        else if (target instanceof HTMLElement) {
            return target;
        }
        else {
            throw "First parameter passed into Quizly must be an element or element Id!";
        }
    };
    Quizly.prototype.getCheckboxValues = function (input) {
        var checked = this.container.querySelectorAll('input[name=' + input.getAttribute('name') + ']:checked');
        var values = [];
        for (var i = 0; i < checked.length; i++) {
            var check = checked[i];
            values.push(check.value);
        }
        return values;
    };
    Quizly.prototype.getValues = function (input, self) {
        var typeAttr = input.getAttribute('type');
        var values = [];
        if (typeAttr && typeAttr.toLowerCase() == 'checkbox') {
            values = this.getCheckboxValues(input);
        }
        else {
            values = [input.value];
        }
        return values;
    };
    Quizly.prototype.parseAnswers = function (answer) {
        answer = answer.replace(/\[|\]/g, '');
        var answers = answer.match(/([^\\\][^,]|\\,)+/g);
        for (var i = 0; i < answers.length; i++) {
            answers[i] = this.normalize(answers[i]);
        }
        return answers;
    };
    Quizly.prototype.normalize = function (text) {
        return text.replace('\\,', ',').trim().replace(/^[0]+/g, "").toLowerCase();
    };
    Quizly.prototype.getInputContainer = function (input) {
        var grandparent = input.parentNode.parentNode;
        return grandparent !== null && grandparent.hasAttribute('data-quiz-container') ? input.parentNode.parentNode : input.parentNode;
    };
    Quizly.prototype.checkAnswers = function (answers, values) {
        var correct = true;
        for (var i = 0; i < values.length; i++) {
            if (answers.indexOf(this.normalize(values[i])) == -1) {
                correct = false;
                break;
            }
        }
        return (correct && (values.length == answers.length));
    };
    Quizly.prototype.displayResults = function (container, correct) {
        var resultSpans = container.querySelectorAll('.right, .wrong');
        for (var i = 0; i < resultSpans.length; i++) {
            var resultSpan = resultSpans[i];
            resultSpan.style.display = 'none';
        }
        if (correct) {
            var right = container.querySelector('.right');
            right.style.display = '';
        }
        else {
            var wrong = container.querySelector('.wrong');
            wrong.style.display = '';
        }
    };
    Quizly.prototype.handler = function (input, quizly) {
        var values = quizly.getValues(input, quizly);
        var container = quizly.getInputContainer(input);
        var answers = quizly.parseAnswers(container.querySelector('[data-answer]').getAttribute('data-answer'));
        var correct = quizly.checkAnswers(answers, values);
        quizly.displayResults(container, correct);
    };
    ;
    Quizly.prototype.createQuizHtml = function (container, data) {
        for (var i = 0; i < data.length; i++) {
            var question = data[i];
            if (question.type == "select") {
                this.template.createSelect(question);
            }
            else if (question.type == "radio" || question.type == "checkbox") {
                this.template.createCheckboxOrRadio(question);
            }
            else {
                this.template.createInput(question);
            }
        }
    };
    return Quizly;
}());
/**
Example Data Structure for Quizly
[
  {
    name: "",
    type: "",
    answer: "",
    answers: [],
    value: "",
    values: [],
    placeholder: "",
    multiple: "",
    question: "",
    right: "",
    wrong: ""
  },
  {
    name: "",
    type: "checkbox", //or radio
    answer: "",
    answers: [],
    value: "",
    values: [
      {
        value: "",
        label: ""
      },
      {
        value: "",
        label: ""
      }
    ],
    placeholder: "",
    multiple: "",
    question: "",
    right: "",
    wrong: ""
  }
]
**/
