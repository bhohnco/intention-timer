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
var circle = document.querySelector('.circle-characteristics');
var completeAlert = document.getElementById('complete');
var logButton = document.querySelector('.log-button');
var activitiesWrapper = document.querySelector('.activities-wrapper');
var clearButton = document.querySelector('.clear-button');
var pastActivitiesButtons = document.querySelector('.past-activities');
var clearPastButton = document.querySelector('.clear-past-button');
var minutes;
var seconds;
var currentActivity;
var userActivity = {};
var userActivitiesList = [];

// EVENT LISTENERS

studyButton.addEventListener('click', study)
meditateButton.addEventListener('click', meditate);
exerciseButton.addEventListener('click', exercise);
storeActivityButton.addEventListener('click', storeActivity);
startButton.addEventListener('click', beginTimer);
logButton.addEventListener('click', logActivity);
clearButton.addEventListener('click', showForm);
clearPastButton.addEventListener('click', clearAllPast);
window.addEventListener('load', retrieveActivities);


// EVENT HANDLERS

function study () {
  category = "Study";
  studyButton.classList.toggle('studycolor');
  inActiveStudy.classList.toggle('hidden');
  activeStudy.classList.toggle('hidden');
};


function meditate() {
  category = "Meditate";
  meditateButton.classList.toggle('meditatecolor');
  inActiveMeditate.classList.toggle('hidden');
  activeMeditate.classList.toggle('hidden');
};

function exercise() {
  category = "Exercise";
  exerciseButton.classList.toggle('exercisecolor');
  inActiveExercise.classList.toggle('hidden');
  activeExercise.classList.toggle('hidden');
};

function storeActivity() {
  userActivity.category = category;
  visualHide([descriptionError, minutesError, secondsError]); // any previous errors
    if (validate()) {
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
  userActivitiesList.unshift(currentActivity);
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
  changeCircleColor();
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
  var packedActivity = localStorage.getItem("storedActivities");
  if (packedActivity) {
    userActivitiesList = JSON.parse(packedActivity);
  };
  if (!userActivitiesList || !userActivitiesList.length) {
    return;
    } else {
    hide([activitiesDialogue]);
    show([activitiesWrapper]);
    list();
  };
};

// HELPER FUNCTIONS

function verifyNumber(node, data) {  //gets called from validate()
  if (isNaN(parseInt(data)) || parseInt(data) < 0 || parseInt(data) > 300) {
    node.innerText = "";
    return false;
  } else return true;
};

function validate() {
  if (verifyNumber(inputMinutes, inputMinutes.value)) {
    userActivity.minutes = inputMinutes.value;
  } else {
    showError('min');
    return false;
  };
  if (verifyNumber(inputSeconds, inputSeconds.value)) {
    userActivity.seconds = inputSeconds.value;
  } else {
    showError('sec');
    return false;
  };
  if (description.value != "") {
    userActivity.description = description.value;
  } else {
    showError('desc');
    return false;      //false returns ensure that the form won't submit with click
};
  return true;
};

function showError(data) {
  if (data === 'sec') {
    visualShow([secondsError])
  } else if (data === 'min') {
    visualShow([minutesError]);
  } else if (data === 'desc') {
    visualShow([descriptionError]);
  };
};

function setTimer() {
  minutes = currentActivity.minutes;
  seconds = currentActivity.seconds;
  updateTimer();
};

function updateTimer() {
  minutesLeft.innerHTML = minutes;
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
    clearTimer(); // calls clearInterval from Activity.js(timer);
    currentActivity.markComplete;
    return;
  };
};

function clearTimer() {
  show([completeAlert, logButton]);
  currentActivity.markComplete();
  currentActivity.stopTimer();
};

function list() {
  activitiesWrapper.innerHTML = "";  // clear Past activities box
  if (userActivitiesList.length > 0) {
    for (i = 0; i < userActivitiesList.length; i++) {
      createActivityBox(userActivitiesList[i], i);
    };
  };
};

var pastActivity; // node //object to load

// color-coding the sidebar:
// change class of div by using variables to access
function createActivityBox(act, i) {
    var cat = act.category;
    var color = "";
    if (cat === 'Study') {
      color = "category-color-study";
    } else if (cat === "Meditate") {
      color = "category-color-meditate";
    } else if (cat === "Exercise") {
      color = "category-color-exercise";
    };
    activitiesWrapper.innerHTML += `
        <div class="activity-card" id="act${i}">
          <div class="category-color-container">
            <div class="category-color"></div>
          </div>  
          <p class="activity-type">${act.category}</p>
          <span class="card-minutes">${act.minutes} MIN</span>
          <p class="activity-description">${act.description}</p>
        </div>`;

  pastActivity = document.getElementById(`act${i}`);  //assign node
  pastActivity.addEventListener('click', loadPastActivity);
};

function loadPastActivity() {
  hide([clearButton, tab1]);
  show([tab2]);
  currentActivity = pastActivity;
};

function clearAllPast() {
  localStorage.clear();
  retrieveActivities();
  activitiesWrapper.innerHTML = "";
  show([activitiesDialogue]);
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

function toggle(elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.toggle('hidden');
  }
}

  function changeCircleColor() {
    if (currentActivity.category === 'Study') {
      circle.classList.add('circle-green');
    } else if (currentActivity.category === 'Exercise') {
      circle.classList.add('circle-orange');
    } else if (currentActivity.category === 'Meditate') {
      circle.classList.add('circle-purple');
    }
  };

function visualShow(elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('visibility-hidden');
  };
};

function visualHide(elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.add('visibility-hidden');
  };
};
