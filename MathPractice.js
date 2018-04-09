// Initialize values for score, questions, and an array for results.
var score = 0;
var q = 0;
var scoreBoard = new Array();

// Initialize global objects within document.
var range = 12;
var questions = '';
var mathType;
var msgBox = document.getElementById('msgBox');
var params = document.getElementById('params');
var rand1;
var rand2;
var posNeg = 0;

//
defaultScreen();

// Display functions for error, correct, and incorrect responses.
function error() {
    msgBox.setAttribute('style', 'color: red');
    msgBox.innerHTML = 'INPUT ERROR';
}
function correct() {
    msgBox.setAttribute('style', 'color: green');
    msgBox.innerHTML = 'CORRECT!';
}
function incorrect(a) {
    msgBox.setAttribute('style', 'color: red');
    msgBox.innerHTML = 'INCORRECT! The answer is ' + a;
}

// Clears all of an elements children.
function clearParams() {
    while (params.firstChild) {
        params.removeChild(params.firstChild);
    }
}

// Will target a buttons functionality from input box with enter key.
function enterFunction(targetInput, targetButton) {
    document.getElementById(targetInput)
    .addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById(targetButton).click();
        }
    });
}

// Helper function for setting attributes in DOM elements.
function setAttributes(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

// Grab input from user.
function initialize() {
    range = document.getElementById('range').value;
    questions = document.getElementById('questions').value;
    mathType = document.getElementById('mathType').value;

    // Make sure user input is valid
    if (isNaN(questions) || questions == '' || questions <= 0 || isNaN(range) || range == '' || range <= 0) {
        error();
    } else {
        questionThread()
    }
}

// Generates questions and prints them to the parameter box
function questionThread() {
    if (mathType==1) {
        var fetch = Math.random();
        if (fetch < 0.5) {
            type = '  +  '
            posNeg = 1;
        } else {
            type = '  -  '
            posNeg = 0;
        }
        var base = 1;
    } else if (mathType==2) {
        type='  x  ';
        var base = 2;
    } else if (mathType==3){
        type='  /  ';
        var base = 2;
    }
    
    rand1 = Math.floor((Math.random() * (range - 1)) + base);
    rand2 = Math.floor((Math.random() * (range - 1)) + base);
    
    msgBox.innerHTML = '';

    clearParams();

    var input = document.createElement('input');
    var button1 = document.createElement('button');
    var br = document.createElement('br');
    var p1 = document.createElement('p');
    var p2 = document.createElement('p');

    var qCount = document.createTextNode('Question ' + (q+1) + ' / ' + questions);
    if (mathType==3) {
        var qThread = document.createTextNode((rand1 * rand2) + type + rand2 + ' ' + ' = ' + ' ');
    } else {
        var qThread = document.createTextNode(rand1 + type + rand2 + ' ' + ' = ' + ' ');
    }

    var submitButton = document.createTextNode('Submit');

    p1.appendChild(qCount);
    params.appendChild(p1);
    params.appendChild(qThread);
    params.appendChild(input);
        
    input.setAttribute('id', 'answr');
    input.setAttribute('size', '5');
    input.setAttribute('class', 'fontStyle');
    input.select();
        
    br;
    button1.appendChild(submitButton);
    p2.appendChild(button1);
    params.appendChild(p2);

    button1.setAttribute('id', 'submit');
    button1.setAttribute('class', 'fontStyle');
        
    enterFunction('answr', 'submit');

    switch(mathType) {
        case '1':
        button1.setAttribute('onClick', 'addSubAnswr(rand1, rand2, posNeg)');
        break;

        case '2':
        button1.setAttribute('onClick', 'multAnswr(rand1, rand2)');
        break;

        case '3':
        button1.setAttribute('onClick', 'dividAnswr(rand1, rand2)');
        break;   
    }
}

// Addition/subtraction function.
function addSubAnswr(a, b, posNeg) {
    var answr = document.getElementById('answr').value;
    if (posNeg==1) {
        var resultAdd = a + b;
        scoreBoard[q] = [(q+1), a, ' + ', b, (a+b), answr];
        quizResult(answr, resultAdd);
    } else {
        var resultSub = a - b;
        scoreBoard[q] = [(q+1), a, ' - ', b, (a-b), answr];
        quizResult(answr, resultSub);
    }
}
// Multiplication function.
function multAnswr(a, b) {
    var result = a * b;
    var answr = document.getElementById('answr').value;

    scoreBoard[q] = [(q+1), a, ' x ', b, (a*b), answr];
    quizResult(answr, result);
}
// Division function.
function dividAnswr(a, b) {
    var answr = document.getElementById('answr').value;

    scoreBoard[q] = [(q+1), (a*b), ' / ', b, (a), answr];
    quizResult(answr, a);
}

// Testing for correct input, and choosing correct output
function quizResult(answr, result) {
    var submitButton = document.getElementById('submit');

    if (isNaN(answr) || answr=='') {
        error();
    } else if (answr == (result) && (q+1) == questions) { 
        correct();
        score++;
        finalScreen();
    } else if (answr == (result)) {
        correct();
        submitButton.innerHTML='Next Question';
        submitButton.setAttribute('onClick', 'questionThread()');
        score++;
        q++
    } else if ((q+1) == questions) { 
        incorrect(result);
        finalScreen();
    } else {
        incorrect(result);
        submitButton.innerHTML='Next Question';
        submitButton.setAttribute('onClick', 'questionThread()');
        q++
    }
}
// End of quiz screen with score, new quiz button, and quiz review button.
function finalScreen() {
    clearParams();

    var p3 = document.createElement('p');
    var p4 = document.createElement('p');
    var button2 = document.createElement('button');
    var button3 = document.createElement('button');

    p3.innerHTML='YOU SCORED ' + score + ' / ' + questions;
    button2.innerHTML='New Quiz';
    button3.innerHTML='Quiz Review';

    button2.setAttribute('id', 'newQuiz');
    button2.setAttribute('class', 'fontStyle');
    button2.setAttribute('onClick', 'defaultScreen()');

    button3.setAttribute('id', 'scoreButton');
    button3.setAttribute('class', 'fontStyle');
    button3.setAttribute('onClick', 'scoreScreen()');
    
    params.appendChild(p3);
    params.appendChild(button2);
    p4.appendChild(button3);
    params.appendChild(p4);

    //params.innerHTML ='<p id="counter"> YOU SCORED ' + score + ' / ' + questions + '</p> <button id="newQuiz" class="fontStyle" onClick="defaultScreen()">New Quiz</button><p><button id="scoreButton" class="fontStyle" onClick="scoreScreen()">Quiz Review</button></p>'
}
// Generate the score screen.
function scoreScreen() {
    msgBox.innerHTML = '';
    var table='<table align="center"><thead><th>#</th><th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th><th colspan="4">Question</th><th>&nbsp;</th><th colspan="2">Answer</th></thead><tbody id="scoreBox"><tr></tr>';
    for (var i = 0; i <= q; i++) {
        if (scoreBoard[i][4]==scoreBoard[i][5]) {
            table += '<tr><td>' + scoreBoard[i][0] + '</td><td>&nbsp;</td><td> ' + scoreBoard[i][1] + ' </td><td>' + scoreBoard[i][2] + '</td><td> ' + scoreBoard[i][3] + ' </td><td>=</td><td>&nbsp;</td><td>' + scoreBoard[i][4] + '</td>';
        } else {
            table += '<tr><td>' + scoreBoard[i][0] + '</td><td>&nbsp;</td><td> ' + scoreBoard[i][1] + ' </td><td>' + scoreBoard[i][2] + '</td><td> ' + scoreBoard[i][3] + ' </td><td>=</td><td>&nbsp;</td><td>' + scoreBoard[i][4] + '</td><td style="color: red">' + 
            scoreBoard[i][5] + '</td>';
        }
    }
    table = table + '</tbody></table><br /><button id="reset" onClick="defaultScreen()" class="fontStyle">New Quiz</button>';
    params.innerHTML=table;
}

// Resets the prompt window to default range/questions prompt.
function defaultScreen() {
    score = 0;
    q = 0;
    scoreBoard = new Array();

    msgBox.innerHTML = '';
    clearParams();

    var b = document.createElement('b');
    var br1 = document.createElement('br');
    var br2 = document.createElement('br');
    var br3 = document.createElement('br');
    var br4 = document.createElement('br');
    var br5 = document.createElement('br');
    var br6 = document.createElement('br');
    var br7 = document.createElement('br');
    var br8 = document.createElement('br');
    var rangeBox = document.createElement('input');
    var qBox = document.createElement('input');
    var typeSelect = document.createElement('select');
    var option1 = document.createElement('option');
    var option2 = document.createElement('option');
    var option3 = document.createElement('option');
    var startButton = document.createElement('button');
    var hiInteger = document.createTextNode('Highest integer you\'d like to see:');
    var qCount = document.createTextNode('How many questions?');

    b.appendChild(hiInteger);
    b.appendChild(br1);
    b.appendChild(rangeBox);
    b.appendChild(br2);
    b.appendChild(br3);
    b.appendChild(qCount);

    params.appendChild(b);
    params.appendChild(br4);
    params.appendChild(qBox);
    params.appendChild(br5);
    params.appendChild(br6);
    params.appendChild(typeSelect);
    params.appendChild(br7);
    params.appendChild(br8);
    params.appendChild(startButton);

    typeSelect.appendChild(option1);
    typeSelect.appendChild(option2);
    typeSelect.appendChild(option3);

    rangeBox.setAttribute('id', 'range');
    rangeBox.setAttribute('value', range);
    rangeBox.setAttribute('type', 'text');
    rangeBox.setAttribute('class', 'fontStyle');
    rangeBox.setAttribute('size', '5');

    qBox.setAttribute('id', 'questions');
    qBox.setAttribute('value', questions);
    qBox.setAttribute('type', 'text');
    qBox.setAttribute('class', 'fontStyle');
    qBox.setAttribute('size', '5');
    qBox.select();

    typeSelect.setAttribute('id', 'mathType');
    typeSelect.setAttribute('class', 'fontStyle');
    typeSelect.setAttribute('type', 'select');

    startButton.setAttribute('id', 'start')
    startButton.setAttribute('onClick', 'initialize()')
    startButton.setAttribute('class', 'fontStyle')

    startButton.innerHTML='Let\'s do some math!';

    option1.setAttribute('value', '1');
    option1.innerHTML='Addition/Subtraction';
    option2.setAttribute('value', '2');
    option2.innerHTML='Multiplication';
    option3.setAttribute('value', '3');
    option3.innerHTML='Division';

    if (mathType==1) {
        option1.setAttribute('selected', 'selected');
    } else if (mathType==2) {
        option2.setAttribute('selected', 'selected');
    } else if (mathType==3) {
        option3.setAttribute('selected', 'selected');
    }

    enterFunction('range', 'start');
    enterFunction('questions', 'start');
    enterFunction('mathType', 'start');
}