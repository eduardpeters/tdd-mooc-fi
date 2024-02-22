export default class ScoreSystem {
  value: number;

  constructor() {
    this.value = 0;
  }

  linesCleared(count: number) {
    this.value += 40 * count;
  }
}
