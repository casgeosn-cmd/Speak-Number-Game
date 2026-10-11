const msgEl = document.getElementById('msg');

// generate a random number
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

const randomNum= getRandomNumber();
console.log('Number:', randomNum);

window.SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

//start recognition and game 
recognition.start();

// capture user speak
function onSpeak(event) {
    const msg=event.results[0][0].transcript;
    // log event
    console.log(msg);
}
recognition.addEventListener('result', onSpeak);

// Write what user speaks
function writeMessage(msg) {
    const div= document.createElement('div');
    div.textContent= 'You said: ';
    const span = document.createElement('span');
    span.classList.add('box');
    span.textContent=msg;
    msgEl.append(div, span);
}
// check msg against the secret number
function checkNumber(msg) {
     if (msg === 'one' || msg === 'won') {
    num = 1;
  } else if (msg === 'two') {
    num = 2;
  } else if (msg === 'three') {
    num = 3;
  } else if (msg === 'four') {
    num = 4;
  } else if (msg === 'five') {
    num = 5;
  } else if (msg === 'six') {
    num = 6;
  } else if (msg === 'seven') {
    num = 7;
  } else if (msg === 'eight') {
    num = 8;
  } else if (msg === 'nine') {
    num = 9;
  }
    //check if spoken content is a valid number
if (Number.isNaN(num)) {
    const div = document.createElement('div');
    div.textContent='That is not a valid number';
    msgEl.innerHTML = '';
    msgEl.append(div);

    return;
}

//check if it's in range
if (num<1 || num>100) {
    const div=document.createElement('div');
    div.textContent='number must be between 1 and 100';
    msgEl.append(div);
    return;
}

//check number and provide feedback
if (num === randomNum) {
    const h2=document.createElement('h2');
    h2.textContent = `Congrats! You have guessed the number! It was ${num}. You got it in ${guess} guess(es)!`;

    const button = document.createElement('button');
    button.classList.add('play-again');
    button.id='play-again';
    button.textContent = 'Play Again';
 // add listenera and handler to button
    button.addEventListener('click', () => window.location.reload());

    msgEl.append(h2, button);
} else if (num > randomNum) {
    const div= document.createElement('div');
    div.textContent = 'GO LOWER';
    msgEl.append(div);
 } else {
    // if (number < random number)
    const div = document.createElement('div');
    div.textContent = 'GO HIGHER';
    msgEl.append(div);
 }
}