import chalk from "chalk";

export class Timer {
  constructor() {
    this.startTime = 0;
    this.endTime = 0;
    this.elapsedTime = 0;
  }

  start() {
    console.log(chalk.green('⏱️- Timer started'));
    this.startTime = Date.now();
  }

  stop() {
    console.log(chalk.green('⏱️- Timer ended'));
    this.endTime = Date.now();
    this.elapsedTime = this.endTime - this.startTime;
  }

  getElapsedTime() {
    this.elapsedTime = Date.now() - this.startTime;
    return this.elapsedTime;
  }

  getElapsedTimeFormatted() {
    const elapsedTime = this.getElapsedTime();
    const seconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    let formattedSeconds = seconds % 60;
    let formattedMinutes = minutes % 60;
    let formattedHours = hours % 60;

    if (formattedSeconds < 10) {
      formattedSeconds = `0${formattedSeconds}`;
    }
    if (formattedMinutes < 10) {
      formattedMinutes = `0${formattedMinutes}`;
    }
    if (formattedHours < 10) {
      formattedHours = `0${formattedHours}`;
    }

    return `${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s`;
  }

  getEstimatedTime(currentValue, totalValue) {
    const elapsedTime = this.getElapsedTime();
    const estimatedTime = (elapsedTime * totalValue) / currentValue;
    const seconds = Math.floor(estimatedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    let formattedSeconds = seconds % 60;
    let formattedMinutes = minutes % 60;
    let formattedHours = hours % 60;

    if (formattedSeconds < 10) {
      formattedSeconds = `0${formattedSeconds}`;
    }
    if (formattedMinutes < 10) {
      formattedMinutes = `0${formattedMinutes}`;
    }
    if (formattedHours < 10) {
      formattedHours = `0${formattedHours}`;
    }

    return `${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s`;
  }
}