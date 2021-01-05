class Activity {
  constructor(data) {
    this.category = data.category;
    this.description = data.description;
    this.minutes = data.minutes;
    this.seconds = data.seconds;
    this.completed = false;
    this.id = Date.now();
  };
};

module.exports = Activity;
