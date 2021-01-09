var category = "";
var description = document.querySelector('.description'); //accomplish entry field
var inputMinutes = document.querySelector('.minutes');
var inputSeconds = document.querySelector('.seconds');
var studyButton = document.querySelector('#study');
var meditateButton = document.querySelector('#meditate');
var exerciseButton = document.querySelector('#exercise');
var storeActivityButton = document.querySelector('.activity');
var startButton = document.querySelector('.start-button');
var chooseActivityText = document.querySelector('.box1-lead');
var questionText = document.querySelector('.questionText');
var minutesLabel = document.querySelector('.minutes-label');
var secondsLabel = document.querySelector('.seconds-label');
var descriptionError = document.querySelector('.description-error');
var minutesError = document.querySelector('.minutes-error');
var secondsError = document.querySelector('.seconds-error');
var minutesLeft = document.querySelector('.minutes-left');
var secondsLeft = document.querySelector('.seconds-left');
var countdown = document.querySelector('.countdown');
var completeAlert = document.querySelector('.complete');
var logButton = document.querySelector('.log');
var minutes;
var seconds;
var userActivitiesList = [];
var userActivity = {};
var currentActivity;

// EVENT LISTENERS

studyButton.addEventListener('click', study);
meditateButton.addEventListener('click', meditate);
exerciseButton.addEventListener('click', exercise);
storeActivityButton.addEventListener('click', storeActivity);
startButton.addEventListener('click', beginTimer);
logButton.addEventListener('click', logActivity);
window.addEventListener('load', retrieveActivities);
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

function verifyNumber(node, data) {
  if (isNaN(parseInt(data)) || parseInt(data) < 0 || parseInt(data) > 300) {
    node.innerText = "";
    return false;
  } else return true;
};

function validate() {
  if (description.value != "") {
    userActivity.description = description.value;
  } else {
    alert('No description entered!') //showError('desc');
    return false;       // these false returns ensure that the form won't submit with click
  };
  if (verifyNumber(inputMinutes, inputMinutes.value)) {
    userActivity.minutes = inputMinutes.value;
  } else {
    alert('Not a number!'); //showError('min');
    return false;
  };
  if (verifyNumber(inputSeconds, inputSeconds.value)) {
    userActivity.seconds = inputSeconds.value;
  } else {
    alert('Not a number!'); //showError('sec');
    return false;
  };
  return true;
};

function showError(data) {
  if (data = 'desc') {
    show(descriptionError);
  } else if (data = 'min') {
    show(minutesError);    //document minute error message
  } else if (data = 'sec') {
    show(secondsError)
  };
};

// storeActivity fired by Start Activity button
function storeActivity() {
  userActivity.category = category;
  if (validate()) {
    hide([descriptionError, minutesError, secondsError]);
    currentActivity = new Activity(userActivity);
    clearForm();
    hideForm();
    setTimer();
  };
};

function setTimer() {
  minutes = currentActivity.minutes;
  seconds = currentActivity.seconds;
  updateTimer();
};

function updateTimer() {
  if (minutes < 10) {
    minutesLeft.innerHTML = "0" + minutes;
  } else minutesLeft.innerHTML = minutes;
  if (seconds < 10) {
    secondsLeft.innerHTML = "0" + seconds; // keeps seconds inline
  } else secondsLeft.innerHTML = seconds;
};

function beginTimer() {
  currentActivity.startTimer();
};

function showRemaining() {
  //userDescription.innerText = userActivity['description']; // show second page descriptor
  seconds--;
  if (seconds === -1) {
    minutes--;
    seconds = 59;
  };
  updateTimer();
  if (parseInt(minutes) == 0 && parseInt(seconds) == 0) {
    hide([startButton]);
    show([completeAlert, logButton]);
    currentActivity.markComplete();
    currentActivity.stopTimer();
  };
};

function hideForm() {
  hide([chooseActivityText, questionText, minutesLabel, secondsLabel, studyButton, meditateButton, exerciseButton, description, inputMinutes, inputSeconds, storeActivityButton]);
  show([countdown, startButton]);
};

function showForm() {
  show([chooseActivityText, questionText, minutesLabel, secondsLabel, studyButton, meditateButton, exerciseButton, description, inputMinutes, inputSeconds, storeActivityButton]);
  hide([countdown, startButton]);
};

function clearForm() {
  category = "";
  description.innerText = "";
  inputMinutes.innerText = "";
  inputSeconds.innerText = "";
};

function logActivity() {
  userActivitiesList.push(currentActivity);
  var localActivity = JSON.stringify(userActivitiesList);
  localStorage.setItem("storedActivities", localActivity);
  console.log(userActivitiesList);
  console.log(localActivity);
};

function retrieveActivities() {
  var packedActivity = localStorage.getItem("storedActivities");
  userActivitiesList = JSON.parse(packedActivity);

  console.log(userActivitiesList);
};

// Our userActivities array has objects retrieved from JSON
// upon completion of an event we
  //add the activity itself then store the whole array
  //as the same descriptor, overwriting old array

// upon load we retrieve the array

  // HIDE FUNCTIONS

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
