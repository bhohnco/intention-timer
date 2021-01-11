var category = "";
var activityHeader = document.querySelector('.activity-header');

// tab1 - Choice Window
var tab1 = document.getElementById('tab1');
var description = document.querySelector('.description');
var inputMinutes = document.querySelector('.minutes');
var inputSeconds = document.querySelector('.seconds');
var studyButton = document.querySelector('#study');
var meditateButton = document.querySelector('#meditate');
var exerciseButton = document.querySelector('#exercise');
var storeActivityButton = document.querySelector('.start-activity');
var startButton = document.querySelector('.start-button');
var chooseActivityText = document.querySelector('.box1-lead');
var descriptionError = document.querySelector('.description-error');
var minutesError = document.querySelector('.minutes-error');
var secondsError = document.querySelector('.seconds-error');
var inActiveStudy = document.querySelector('.active-study');
var activeStudy = document.querySelector('.active-color-study');
var inActiveMeditate = document.querySelector('.active-meditate');
var activeMeditate = document.querySelector('.active-color-meditate');
var inActiveExercise = document.querySelector('.active-exercise');
var activeExercise = document.querySelector('.active-color-exercise');
// tab2 - Current Activity Window
var tab2 = document.getElementById('tab2');
var userDescription = document.querySelector('.description-display')
var minutesLeft = document.querySelector('.minutes-left');
var secondsLeft = document.querySelector('.seconds-left');
var activitiesDialogue = document.querySelector('.none-logged-text');
var completeAlert = document.getElementById('complete');
var logButton = document.querySelector('.log-button');
var activitiesWrapper = document.querySelector('.activities-wrapper');
var clearButton = document.querySelector('.clear-button');
var pastActivitiesButtons = document.querySelector('.past-activities');
var minutes = 0;
var seconds = 0;
var currentActivity;
var userActivity = {};
var userActivitiesList = [];

// EVENT LISTENERS

studyButton.addEventListener('click', study);
meditateButton.addEventListener('click', meditate);
exerciseButton.addEventListener('click', exercise);
storeActivityButton.addEventListener('click', storeActivity);
startButton.addEventListener('click', beginTimer);
logButton.addEventListener('click', logActivity);
clearButton.addEventListener('click', showForm);
window.addEventListener('load', retrieveActivities);

// EVENT HANDLERS

function study () {
  category = "Study";
  studyButton.classList.add('studycolor');
  inActiveStudy.classList.add('hidden');
  activeStudy.classList.remove('hidden');
};
function meditate() {
  category = "Meditate";
  meditateButton.classList.add('meditatecolor');
  hide([inActiveMeditate]);
  show([activeMeditate]);
};
function exercise() {
  category = "Exercise";
  exerciseButton.classList.add('exercisecolor');
  inActiveExercise.classList.add('hidden');
  activeExercise.classList.remove('hidden');
};

function storeActivity() {
  userActivity.category = category;
    if (validate()) {
    hide([descriptionError, minutesError, secondsError]);
    currentActivity = new Activity(userActivity);
    userDescription.innerText = currentActivity["description"];
    clearForm();
    hideForm();
    setTimer();
    show([tab2]);
    };
};

function beginTimer() {
  currentActivity.startTimer();
  hide([startButton]);
};

function logActivity() {
  userActivitiesList.push(currentActivity);
  var localActivity = JSON.stringify(userActivitiesList);
  localStorage.setItem("storedActivities", localActivity);
  hide([tab2, activitiesDialogue]);
  show([clearButton]);
  retrieveActivities();
};

function showForm() {
  clearForm();
  activityHeader.innerText = "New Activity";
  hide([clearButton, completeAlert]);
  show([tab1, startButton]);
};

function hideForm() {
  activityHeader.innerText = "Current Activity";
  hide([tab1]);
  show([tab2]);
};

function clearForm() {
  category = "";
  description.value = "";
  inputMinutes.value = "";
  inputSeconds.value = "";
};
function retrieveActivities() {
  if (!userActivitiesList || !userActivitiesList.length) {
  } else {
    var packedActivity = localStorage.getItem("storedActivities");
    userActivitiesList = JSON.parse(packedActivity);
    show([activitiesWrapper]);
    list();
  };
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
    return false;       //false returns ensure that the form won't submit with click
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
    show(minutesError);
  } else if (data = 'sec') {
    show(secondsError)
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
    secondsLeft.innerHTML = "0" + seconds;
  } else secondsLeft.innerHTML = seconds;
};


function showRemaining() {
  seconds--;
  if (seconds === -1) {
    minutes--;
    seconds = 59;
  };
  updateTimer();
  if (parseInt(minutes) == 0 && parseInt(seconds) == 0) {
    show([completeAlert, logButton]);
    currentActivity.markComplete();
    currentActivity.stopTimer();
  };
};



function list() {
  if (userActivitiesList.length > 0) {
    for (i = 0; i < userActivitiesList.length; i++) {
      createActivityBox(userActivitiesList[i], i);
    };
  };
};

var pastActivity; // node //object to load

function createActivityBox(act, i) {
    console.log(act);
    var objCategory = act.category
    activitiesWrapper.innerHTML += `<div class="past-activities" id="act${i}">${act.category}</div>`;
    //pastActivitiesButtons.innerHTML += `<div class="past-activities" >Howdy</div>`;


  // pastActivity = document.getElementById(`act${i}`);  //assign node
  // pastActivity.addEventListener('click', loadPastActivity);
  //};
};

function loadPastActivity(thisIsMyArrayAndIndex) {
  hide([clear, tab1]);
  show([tab2]);
  currentActivity = pastActivity;
}

// Our userActivities array has objects retrieved from JSON
// upon completion of an event we
  //add the event to array then store the whole array
  //as the same descriptor(and different id), overwriting old array

// upon load and after every save we retrieve the array and parse


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
