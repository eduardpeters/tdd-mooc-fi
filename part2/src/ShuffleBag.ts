export class ShuffleBag<T> {
  data: T[] = [];
  currentPosition = -1;

  constructor(data?: T[]) {
    if (data?.length) {
      this.data = data;
      this.currentPosition = data.length - 1;
    }
  }

  next(): T {
    if (this.currentPosition < 1) {
      this.currentPosition = this.data.length - 1;
      return this.data[0];
    } else {
      const nextPosition = Math.floor(Math.random() * this.currentPosition);
      const nextItem = this.data[nextPosition];
      this.data[nextPosition] = this.data[this.currentPosition];
      this.data[this.currentPosition] = nextItem;
      this.currentPosition--;
      return nextItem;
    }
  }
}
