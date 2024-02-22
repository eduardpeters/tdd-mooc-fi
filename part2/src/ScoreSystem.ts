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
      default:
        break;
    }
  }
}
