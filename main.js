var category = "";
var description = document.querySelector('.description'); //accomplish entry field
var inputMinutes = document.querySelector('.minutes');
var inputSeconds = document.querySelector('.seconds');
var studyButton = document.querySelector('#study');
var meditateButton = document.querySelector('#meditate');
var exerciseButton = document.querySelector('#exercise');
var storeActivityButton = document.querySelector('.activity');
var timerDialogue = document.querySelector('.timer-dialogue');
var chooseActivityText = document.querySelector('.box1-lead');
var questionText = document.querySelector('.questionText');
var minutesLabel = document.querySelector('.minutes-label');
var secondsLabel = document.querySelector('.seconds-label');

var activitiesList = [];
var currentActivity;
// for use only with timer countdown
var minutes;
var seconds;
var minutesLeft = document.querySelector('.minutes-left');
var secondsLeft = document.querySelector('.seconds-left');

// EVENT LISTENERS

studyButton.addEventListener('click', study);
meditateButton.addEventListener('click', meditate);
exerciseButton.addEventListener('click', exercise);
storeActivityButton.addEventListener('click', storeActivity);
timerDialogue.addEventListener('click', beginTimer);

// EVENT HANDLERS

   //category button changes
function study () {
  category = "Study";
  studyButton.classList.add('btn-category');
};

function meditate() {
  category = "Meditate";
  meditateButton.classList.add('btn-category');
};

function exercise() {
  category = "Exercise";
  exerciseButton.classList.add('btn-category');
};

// HELPER FUNCTIONS

function createActivity() {
  var userActivity = {};
  userActivity.category = category;
  if (description.value != "") {
    userActivity.description = description.value;
  } //else showError('desc');
  if (verifyNumber(inputMinutes, inputMinutes.value)) {
    userActivity.minutes = inputMinutes.value;
  } //else showError('min');
  if (verifyNumber(inputSeconds, inputSeconds.value)) {
    userActivity.seconds = inputSeconds.value;
  } //else showError('sec');
  return userActivity;  // to instantiation below
};

var descriptionError = document.querySelector('.description-error');
var minutesError = document.querySelector('.minutes-error');
var secondsError = document.querySelector('.seconds-error');

function showError(data) {
  if (data = 'desc') {
    show(descriptionError);
  };
  if (data = 'min') {
    show(minutesError);   //document minute error message
  };
  if (data = 'sec') {
    show(secondsError)
  };
};

function verifyNumber(node, data) {
  if (isNaN(data) || data < 0 || data > 300) {
    node.innerText = "";
    return false;
  } else return true;
};

// start Activity button = store activity
function storeActivity() {
  hideForm();
  currentActivity = new Activity(createActivity());
  console.log(currentActivity);
  clearForm();
  setTimer();
};


function setTimer() {
  minutes = currentActivity.minutes;
  seconds = currentActivity.seconds;
  updateTimer();
};

function updateTimer() {
  minutesLeft.innerHTML = minutes;
  if (seconds < 10) {
    secondsLeft.innerHTML = "0" + seconds; // keeps seconds inline
  } else secondsLeft.innerHTML = seconds;
};

function beginTimer() {
  currentActivity.startTimer();
};

function showRemaining() {
  //userDescription.innerText = userActivity['description']; // show second page descriptor
  if (seconds === -1) {
    minutes--;
    seconds = 59;
  };
  if (minutes == 0 && seconds == 0) {
    updateTimer(); //clearInterval(timer);
    timerDialogue.innerText = "Complete"
    currentActivity.markComplete;
    return;
  };
  seconds--;
  updateTimer();
};

function hideForm() {
  hide([studyButton, meditateButton, exerciseButton, description, inputMinutes, inputSeconds, storeActivityButton]);
};

function showForm() {
  hide([chooseActivityText, questionText, minutesLabel, secondsLabel, studyButton, meditateButton, exerciseButton, description, inputMinutes, inputSeconds, storeActivityButton]);
};

function clearForm() {
  category = "";
  description.innerText = "";
  inputMinutes.innerText = "";
  inputSeconds.innerText = "";
};

  // HIDE FUNCTIONS LAST

function show(elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('hidden');
  };
};


function hide(elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.add('hidden');
  };
};
