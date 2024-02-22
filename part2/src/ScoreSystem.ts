export default class ScoreSystem {
  value: number;

  constructor() {
    this.value = 0;
  }

  linesCleared(count: number) {
    switch (count) {
      case 1:
        this.value += 40;
        break;
      case 2:
        this.value += 100;
        break;
      case 3:
        this.value += 300;
        break;
      case 4:
        this.value += 1000;
        break;
      default:
        break;
    }
  }
}
