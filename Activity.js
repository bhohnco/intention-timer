class Activity {
  constructor(data) {
    this.category = data.category;
    this.description = data.description;
    this.minutes = data.minutes;
    this.seconds = data.seconds;
    this.completed = false;
    this.id = Date.now();
  };

  startTimer() {
    timer = setInterval(showRemaining, 1000);
  };

  markComplete() {
    this.completed = true;
  };

  saveToStorage() {
    activitiesList.push(this);
  };
};
