// Initialize values for score, questions, and an array for results.
var score = 0;
var q = 0;
var scoreBoard = new Array();

// Initialize global objects within document.
var range;
var questions;
var mathType;
var msgBox = document.getElementById('msgBox');
var params = document.getElementById('params');

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

// Randomly generates integers for questions.
function generateQ(range, base) {
    var a = Math.floor((Math.random() * (range - 1)) + base);
    return a;
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
    var posNeg = 0;

    if (mathType==1) {
        var fetch = Math.random();
        if (fetch < 0.5) {
            type = '&nbsp; + &nbsp;'
            posNeg = 1;
        } else {
            type = '&nbsp; - &nbsp;'
        }
        var base = 1;
    } else if (mathType==2) {
        type='&nbsp; x &nbsp;';
        var base = 2;
    } else if (mathType==3){
        type='&nbsp; / &nbsp;';
        var base = 2;
    }
    
    var rand1 = Math.floor((Math.random() * (range - 1)) + base);
    var rand2 = Math.floor((Math.random() * (range - 1)) + base);
    
    msgBox.innerHTML = '';

    switch(mathType) {
        case '1':
        params.innerHTML ='<p id="counter"> Question ' + (q+1) + ' / ' + questions + '</p>' + rand1 + type + rand2 +
        '&nbsp; = &nbsp;<input autofocus="autofocus" required="required" id="answr" size="5" class="fontStyle" type="text"><p><button id="submit" class="fontStyle" onClick="addSubAnswr('
        + rand1 + ', ' + rand2 + ', ' + posNeg + ')">Submit</button></p>';
        break;

        case '2':
        params.innerHTML ='<p id="counter"> Question ' + (q+1) + ' / ' + questions + '</p>' + rand1 + type + rand2 +
        '&nbsp; = &nbsp;<input id="answr" size="5" class="fontStyle" type="text"><p><button id="submit" class="fontStyle" onClick="multAnswr('
        + rand1 + ', ' + rand2 + ')">Submit</button></p>';
        break;

        case '3':
        params.innerHTML ='<p id="counter"> Question ' + (q+1) + ' / ' + questions + '</p>' + (rand1*rand2) + type + rand2 +
        '&nbsp; = &nbsp;<input id="answr" size="5" class="fontStyle" type="text"><p><button id="submit" class="fontStyle" onClick="dividAnswr('
        + rand1 + ', ' + rand2 + ')">Submit</button></p>';
        break;   
    }
}

// Addition/subtraction function.
function addSubAnswr(a, b, addSub) {
    var answr = document.getElementById('answr').value;
    if (addSub==1) {
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
    params.innerHTML ='<p id="counter"> YOU SCORED ' + score + ' / ' + questions + '</p> <button id="newQuiz" class="fontStyle" onClick="defaultScreen()">New Quiz</button></p><p><button id="scoreButton" class="fontStyle" onClick="scoreScreen()">Quiz Review</button></p>'
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
    params.innerHTML='<b>Highest integer you\'d like to see:<br /><input id="range" value="12" type="text" class="fontStyle" size="5" /><br /><br />How many questions?</b><br /><input id="questions" value="" type="text" class="fontStyle" size="5" /><br /><br /><select id="mathType" class="fontStyle" type="select"><option value="1">Addition/Subtraction</option><option value="2">Multiplication</option><option value="3">Division</option></select><br /><br /><button onclick="initialize()" class="fontStyle">Let\'s do some math!</button>';
}