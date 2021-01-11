var category = "";
var activityHeader = document.querySelector('.activity-header');
var description = document.querySelector('.description'); //accomplish entry field
var inputMinutes = document.querySelector('.minutes');
var inputSeconds = document.querySelector('.seconds');
var studyButton = document.querySelector('#study');
var meditateButton = document.querySelector('#meditate');
var exerciseButton = document.querySelector('#exercise');
var storeActivityButton = document.querySelector('.activity');
var timerDialogue = document.querySelector('.timer-dialogue');
var inActiveChoice1 = document.querySelector('.active-study')
var activeChoice1 = document.querySelector('.active-color-study')
var inActiveChoice2 = document.querySelector('.active-meditate')
var activeChoice2 = document.querySelector('.active-color-meditate')
var inActiveChoice3 = document.querySelector('.active-exercise')
var activeChoice3 = document.querySelector('.active-color-exercise')
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
startButton.addEventListener('click', beginTimer);
logButton.addEventListener('click', logActivity);
clearButton.addEventListener('click', showForm);


//window.addEventListener('load', retrieveActivities)
// EVENT HANDLERS

   //category button changes

function study () {
  // event.preventDefault()
  category = "Study";
  studyButton.classList.add('btn-category');
  studyButton.classList.add('studycolor');
  inActiveChoice1.classList.add('hidden');
  activeChoice1.classList.remove('hidden');
};

function meditate() {
  category = "Meditate";
  meditateButton.classList.add('btn-category');
  meditateButton.classList.add('meditatecolor');
  inActiveChoice2.classList.add('hidden');
  activeChoice2.classList.remove('hidden');
};

function exercise() {
  category = "Exercise";
  exerciseButton.classList.add('btn-category');
  exerciseButton.classList.add('exercisecolor');
  inActiveChoice3.classList.add('hidden');
  activeChoice3.classList.remove('hidden');
};



// HELPER FUNCTIONS
=======
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
  if (description.value != "") {
    userActivity.description = description.value;
  } //else showError('desc');
  if (verifyNumber(inputMinutes.value)) {
    userActivity.minutes = inputMinutes.value;
  } //else showError('min');
  if (verifyNumber(inputSeconds.value)) {
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

function verifyNumber(data) {
  if (isNaN(data) || data < 0 || data > 300) {
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
  minutesLeft.innerHTML = minutes;
  if (minutes < 10) {
    minutesLeft.innerHTML = "0" + minutes;
  } else minutesLeft.innerHTML = minutes;

  if (seconds < 10) {
    secondsLeft.innerHTML = "0" + seconds; // keeps seconds inline
  } else secondsLeft.innerHTML = seconds;
};

function beginTimer() {
  currentActivity.startTimer();
  hide([startButton]);
};

function showRemaining() {
  //userDescription.innerText = userActivity['description']; // show second page descriptor
  seconds--;
  if (seconds === -1) {
    minutes--;
    seconds = 59;
  };
  if (minutes == 0 && seconds == 0) {
    updateTimer(); //clearInterval(timer);
    timerDialogue.innerText = "Complete"
    currentActivity.markComplete;
    return;
  updateTimer();
  if (parseInt(minutes) == 0 && parseInt(seconds) == 0) {
    show([completeAlert, logButton]);
    show([clearButton]);
    currentActivity.markComplete();
    currentActivity.stopTimer();
  };
  seconds--;
  updateTimer();
};

function hideForm() {
  hide([studyButton, meditateButton, exerciseButton, description, inputMinutes, inputSeconds, storeActivityButton]);
};

function showForm() {
    activityHeader.innerText = "New Activity";
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
  hide([countdown, logButton, completeAlert, activitiesDialogue]);
  show([clearButton]);
  retrieveActivities();
};

function retrieveActivities() {
  console.log(userActivitiesList);
  if (!userActivitiesList || !userActivitiesList.length) { //if we have no activities logged
    console.log(userActivitiesList);
  } else {
    var packedActivity = localStorage.getItem("storedActivities");
    var userActivitiesList = JSON.parse(packedActivity);
    hide([]);
    show([activitiesWrapper]);
    list();
  };
};

function list() {
  console.log(userActivitiesList);
  if (userActivitiesList.length > 0) {
    console.log('hola')
    for (i = 0; i < userActivitiesList.length; i++) {
      createActivityBox(userActivitiesList[i], i);
    };
  };
};

var pastActivity; // node //object to load

function createActivityBox(act, i) {
  if (userActivitiesList.length > 0) {   //likely won't need this conditional
    console.log('hello');
    activitiesWrapper.innerHTML = "<h2>wily</h2>";
    pastActivitiesButtons.innerHTML += `<div class="past-activities" >Howdy</div>`;
    activitiesWrapper.innerHTML += `<h2 class="past-activities" >hoot</h2>`
    activitiesWrapper.innerHTML += `<div class="past-activities" >hoot</div>`; // +`<div class="past-activities" id="act${i}">${act}</div>`;
  // pastActivity = document.getElementById(`act${i}`);  //assign node
  // pastActivity.addEventListener('click', loadPastActivity);
  };
};

function loadPastActivity() {
  show([countdown, startButton, log, completeAlert]);
  hide([clear]);
  currentActivity = pastActivity;
}

// Our userActivities array has objects retrieved from JSON
// upon completion of an event we
  //add the event to array then store the whole array
  //as the same descriptor, overwriting old array

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

hide([chooseActivityText, questionText, minutesLabel, secondsLabel, studyButton, meditateButton, exerciseButton, description, inputMinutes, inputSeconds, storeActivityButton]);
