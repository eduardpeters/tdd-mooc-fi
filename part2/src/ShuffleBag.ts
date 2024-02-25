export class ShuffleBag<T> {
  data: T[] = [];
  currentPosition = -1;

  constructor(data?: T[]) {
    if (data?.length) {
      this.data = data;
      this.currentPosition = data.length - 1;
    }
  }

  next() {
    return 1;
  }
}
