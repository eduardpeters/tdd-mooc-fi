export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}
export class GenericItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  updateQuality() {
    this.sellIn -= 1;
    if (this.quality > 0) {
      this.quality -= 1;
    }
    if (this.quality > 0 && this.sellIn < 0) {
      this.quality -= 1;
    }
  }
}

export class AgedBrie extends Item {
  constructor(sellIn, quality) {
    super("Aged Brie", sellIn, quality);
  }

  updateQuality() {
    this.sellIn -= 1;
    if (this.quality < 50) {
      this.quality += 1;
    }
    if (this.quality < 50 && this.sellIn < 0) {
      this.quality += 1;
    }
  }
}

export class Sulfuras extends Item {
  constructor(sellIn, quality = 80) {
    super("Sulfuras, Hand of Ragnaros", sellIn, quality);
  }

  updateQuality() {}
}

export class BackstagePass extends Item {
  constructor(sellIn, quality) {
    super("Backstage passes to a TAFKAL80ETC concert", sellIn, quality);
  }

  updateQuality() {
    this.sellIn -= 1;
    if (this.sellIn >= 0) {
      if (this.quality < 50) {
        this.quality += 1;
      }
      if (this.quality < 50 && this.sellIn < 10) {
        this.quality += 1;
      }
      if (this.quality < 50 && this.sellIn < 6) {
        this.quality += 1;
      }
    } else {
      this.quality = 0;
    }
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      item.updateQuality();
    }

    return this.items;
  }
}
