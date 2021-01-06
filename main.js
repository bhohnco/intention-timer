var category = "";
var description = document.querySelector('.description'); //accomplish entry field
var minutes = document.querySelector('.minutes');
var seconds = document.querySelector('.seconds');
var studyButton = document.querySelector('#study');
var meditateButton = document.querySelector('#meditate');
var exerciseButton = document.querySelector('#exercise');
var startActivityButton = document.querySelector('.activity');
var activitiesList = [];
var currentActivity;

// EVENT LISTENERS

studyButton.addEventListener('click', study);
meditateButton.addEventListener('click', meditate);
exerciseButton.addEventListener('click', exercise);
startActivityButton.addEventListener('click', startActivity);

// EVENT HANDLERS

   //category button changes
function study () {
  category = "Study";
  study.classList.add('buttonChange');
};

function meditate() {
  category = "Meditate";
  meditate.classList.add('buttonChange');
};

function exercise() {
  category = "Exercise";
  exercise.classList.add('buttonChange');
};

// HELPER FUNCTIONS


var startMinutes = minutes.value;// input
var startSeconds = seconds.value;
var second = 1000;
var minute = second * 60;
var timer;
var minutesLeft = document.querySelector('.minutesLeft');
var secondsLeft = document.querySelector('.secondsLeft');


function createActivity() {
  var userActivity = {};
  userActivity.category = category;
  userActivity.description = description.value;
  userActivity.minutes = minutes.value;
  userActivity.seconds = seconds.value;
  return userActivity;0
};

// start Activity button
function startActivity() {
  hideForm();
  currentActivity = new Activity(createActivity());
  clearForm();
  currentActivity.startTimer();
  // moved to Activity.js : timer = setInterval(showRemaining, 1000);
};

function showRemaining() {
  minutesLeft.innerHTML = minutes - 1;
  secondsLeft.innerHTML = seconds - 1;
  if (minutes === 0 && seconds === 0) {
    clearInterval(timer);
    return;
  };
};

function hideForm() {
  hide([studyButton, meditateButton, exerciseButton, description, minutes, seconds, startActivityButton]);
};

function showForm() {
  hide([studyButton, meditateButton, exerciseButton, description, minutes, seconds, startActivityButton]);
};

function clearForm() {
  //category = "";
  description.innerText = "";
  minutes.innerText = "";
  seconds.innerText = "";
};

  // HIDE FUNCTIONS LAST

function show(elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.add('hidden');
  };
};


function hide(elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('hidden');
  };
};
