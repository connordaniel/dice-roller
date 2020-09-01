
var $ = require('jquery');
var Mustache = require('mustache');

$(document).ready(function () {

    var navData = {
        "title": "Dice Roller"
    }
    $.get('../navbar-template.html', function (templates, status) {
        var template = $(templates).html();
        $('#nav').append(Mustache.render(template, navData));
    });
});

function randomRange(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min; 

}

//stuff that edits items in the textfield
function onButtonClick(val) {
    var val = document.getElementById("textfield").value + val;
    document.getElementById("textfield").value = val;
    var input = document.getElementById("texfield");
}

function onClearClick() {
    document.getElementById("textfield").value = '';
}

function onBackspaceClick() {
    document.getElementById("textfield").value = document.getElementById("textfield").value.substring(0, document.getElementById("textfield").value.length - 1);
}

//when you click roll:
function onRollClick() {
    var inputText = document.getElementById("textfield").value;
    var actualNum = inputText.toString();
    if (actualNum.indexOf("d") === -1) {
        simpleMath();
    } else if (actualNum.substr(0,1) === "d") {
        singleDieDecider();
    } else {
        multiDiceDecider();
    }
   
}
function singleDieDecider() {
    var inputText = document.getElementById("textfield").value;
    var actualNum = inputText.toString();
    var plus = "+";
    var minus = "-";
    var mult = "*";
    var div = "/";
    var out = 0;
    if (actualNum.indexOf(plus) !== -1) {
        console.log("butts");
        out = rollSingleDieWithMath(plus);
    } else if (actualNum.indexOf(minus) !== -1) {
        out = rollSingleDieWithMath(minus);
    } else if (actualNum.indexOf(mult) !== -1) {
        out = rollSingleDieWithMath(mult);
    } else if (actualNum.indexOf(div) !== -1) {
        out = rollSingleDieWithMath(div);
    } else {
        out = rollSingleDie();
    }
    document.getElementById("textfield").value = out;

}

function multiDiceDecider() {
    var inputText = document.getElementById("textfield").value;
    var actualNum = inputText.toString();
    var plus = "+";
    var minus = "-";
    var mult = "*";
    var div = "/";
    var out = 0;
    if (actualNum.indexOf(plus) !== -1) {
        console.log("butts");
        out = rollMultipleDiceWithMath(plus);
    } else if (actualNum.indexOf(minus) !== -1) {
        out = rollMultipleDiceWithMath(minus);
    } else if (actualNum.indexOf(mult) !== -1) {
        out = rollMultipleDiceWithMath(mult);
    } else if (actualNum.indexOf(div) !== -1) {
        out = rollMultipleDiceWithMath(div);
    } else {
        out = rollMultipleDice();
    }
    document.getElementById("textfield").value = out;

}
function simpleMath() {
    var inputText = document.getElementById("textfield").value.toString();
    var actualNum = inputText.toString(); 
    var search = /(\d+)([\+\-\*\/])(\d+)/g;
    var match = search.exec(actualNum);
    console.log("booty");
    console.log(match[0]);
    var op = match[2];
    var ret = 0;
      console.log(op);
    if (op === "+") {
        ret = +match[1] + +match[3];
    } else if (op === "-") {
        ret = +match[1] - +match[3];
    } else if (op === "*") {
        ret = +match[1] * +match[3];
    } else if (op === "/") {
        ret = +match[1] / +match[3];
    }
    var out = Math.floor(ret);
    document.getElementById("textfield").value = out;
}
function rollSingleDie() {
    var inputText = document.getElementById("textfield").value.toString();
    var actualNum = inputText.toString();
    var search = /(d)(\d+)/g;
    var match = search.exec(actualNum);
    var sides = match[2];
    var roll = randomRange(1, sides);
    return roll;
}

function rollSingleDieWithMath(op) {
    var inputText = document.getElementById("textfield").value.toString();
    var actualNum = inputText.toString();
    var search = /(d)(\d+)(?:([-+*\/])((?:\s[-+])?\d+)\s*)+$/g;
    var match = search.exec(actualNum);
    console.log(match[1]);
    var sides = match[2];
    var roll = randomRange(1, sides);
    console.log(match[3]);
    if (op === "+") {
        console.log("roll: " + roll);
        roll += +match[4];
        console.log("what it should be: " + roll);
    } else if (op === "-") {
        roll -= +match[4];
    } else if (op === "*") {
        roll *= +match[4];
    } else if (op === "/") {
        roll /= +match[4];
    }
    return Math.floor(roll);
}

function rollMultipleDice () {
    var inputText = document.getElementById("textfield").value;
    var actualNum = inputText.toString();
    var myRegexp = /(\d+)(d)(\d+)/g;
    var match = myRegexp.exec(actualNum);
    console.log(match[3]);
    var rollTimes = match[1];
    var sides = match[3];
    var cum = 0;
    for (var i = 1; i <= rollTimes; i++) {
        temp = randomRange(1, sides);
        console.log(temp);
        cum += temp;
        var inputText = document.getElementById("textfield").value.toString();
        var actualNum = inputText.toString();
        console.log(cum);
    }
    return cum;
}

function rollMultipleDiceWithMath(op) {
    var inputText = document.getElementById("textfield").value;
    var actualNum = inputText.toString();
    var myRegexp = /(\d+)([d]?)(\d+)(?:\s*([-+*\/])\s*((?:\s[-+])?\d+)\s*)+$/g;
    var match = myRegexp.exec(actualNum);
    console.log(match[3]);
    var rollTimes = match[1];
    var sides = match[3];
    var cum = 0;
    for (var i = 1; i <= rollTimes; i++) {
        temp = randomRange(1, sides);
        console.log(temp);
        cum += temp;
        console.log(cum);
    }
    console.log(cum);
    console.log(match[4]);
    if (op === "+") {
        console.log("cum: " + cum);
        cum += +match[5];
        console.log("what it should be: " + cum);
    } else if (op === "-") {
        cum -= +match[5];
    } else if (op === "*") {
        cum *= +match[5];
    } else if (op === "/") {
        cum /= +match[5];
    }
    return Math.floor(cum);
} 