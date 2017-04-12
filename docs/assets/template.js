var QuizlyTemplater = (function () {
    function QuizlyTemplater(container) {
        this.container = container;
    }
    QuizlyTemplater.prototype.createLabel = function (question, includeRightWrong, right, wrong) {
        var label = document.createElement('label');
        label.textContent = question;
        if (includeRightWrong) {
            var rightAndWrong = this.createRightWrong(right, wrong);
            for (var i = 0; i < rightAndWrong.length; i++) {
                label.appendChild(rightAndWrong[i]);
            }
        }
        var br = document.createElement('br');
        label.appendChild(br);
        return label;
    };
    QuizlyTemplater.prototype.createSelectElement = function (answer, name) {
        var select = document.createElement('select');
        select.setAttribute('data-answer', answer);
        select.setAttribute('name', name);
        return select;
    };
    QuizlyTemplater.prototype.createOption = function (value, text) {
        var option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        return option;
    };
    QuizlyTemplater.prototype.createQuestionContainer = function (text, answer, right, wrong) {
        var div = document.createElement('div');
        div.setAttribute('data-quiz-container', '');
        var span = document.createElement('span');
        span.textContent = text;
        span.setAttribute('data-answer', answer);
        var rightAndWrong = this.createRightWrong(right, wrong);
        for (var i = 0; i < rightAndWrong.length; i++) {
            span.appendChild(rightAndWrong[i]);
        }
        div.appendChild(span);
        div.appendChild(document.createElement('br'));
        return div;
    };
    QuizlyTemplater.prototype.createInputElement = function (type, name) {
        var input = document.createElement('input');
        input.setAttribute('type', type);
        input.setAttribute('name', name);
        return input;
    };
    QuizlyTemplater.prototype.createRightWrong = function (rightText, wrongText) {
        var right = document.createElement('span');
        right.textContent = rightText ? rightText : "Correct";
        right.classList.add('right');
        var wrong = document.createElement('span');
        wrong.textContent = wrongText ? wrongText : "Incorrect";
        wrong.classList.add('wrong');
        return [right, wrong];
    };
    QuizlyTemplater.prototype.createSelect = function (question) {
        var answer = question.answers.length ? question.answers.join(',') : question.answer;
        var select = this.createSelectElement(answer, question.name);
        for (var j = 0; j < question.values.length; j++) {
            var option = this.createOption(question.values[j], question.values[j]);
            select.appendChild(option);
        }
        var label = this.createLabel(question.question, true, question.right, question.wrong);
        label.appendChild(select);
        label.appendChild(document.createElement('br'));
        this.container.appendChild(label);
    };
    QuizlyTemplater.prototype.createCheckboxOrRadio = function (question) {
        var questionContainer = this.createQuestionContainer(question.question, question.answers.length ? question.answers.join(',') : question.answer, question.right, question.wrong);
        this.container.appendChild(questionContainer);
        for (var j = 0; j < question.values.length; j++) {
            var value = question.values[j];
            var label = this.createLabel(typeof value === 'object' ? value.label : value);
            var input = this.createInputElement(question.type, question.name);
            input.value = typeof value === 'object' ? value.value : value;
            label.insertBefore(input, label.firstChild);
            questionContainer.appendChild(label);
        }
    };
    QuizlyTemplater.prototype.createInput = function (question) {
        var label = this.createLabel(question.question, true, question.right, question.wrong);
        var input = this.createInputElement(question.type, question.name);
        input.setAttribute('data-answer', question.answer);
        input.setAttribute('placeholder', question.placeholder);
        label.appendChild(input);
        this.container.appendChild(label);
    };
    return QuizlyTemplater;
}());
