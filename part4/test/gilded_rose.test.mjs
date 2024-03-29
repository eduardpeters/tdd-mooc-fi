import { describe, test } from "vitest";
import { expect } from "chai";
import { Shop, AgedBrie, Sulfuras, BackstagePass, GenericItem, ConjuredItem } from "../src/gilded_rose.mjs";

describe("Gilded Rose", () => {
  test("Shop can be instantiated", () => {
    const gildedRose = new Shop();
    const items = gildedRose.updateQuality();
    expect(items).to.deep.equal([]);
  });

  test("Shop update quality method", () => {
    const gildedRose = new Shop([provideItem("foo", 0, 0), provideItem("bar", -1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0);
    expect(items[1].name).to.equal("bar");
    expect(items[1].sellIn).to.equal(-2);
    expect(items[1].quality).to.equal(8);
  });

  test("Aged Brie increases in quality within limits", () => {
    const gildedRose = new Shop([provideAgedBrie(5, 10), provideAgedBrie(1, 50), provideAgedBrie(0, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(11);
    expect(items[1].quality).to.equal(50);
    expect(items[2].quality).to.equal(27);
  });

  test("Sulfuras does not change sellIn or quality", () => {
    const gildedRose = new Shop([provideSulfuras(100)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(100);
    expect(items[0].quality).to.equal(80);
  });

  test("Backstage passes have different quality increases", () => {
    const gildedRose = new Shop([
      provideBackstagePass(11, 10),
      provideBackstagePass(10, 10),
      provideBackstagePass(5, 10),
      provideBackstagePass(0, 10),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(11);
    expect(items[1].quality).to.equal(12);
    expect(items[2].quality).to.equal(13);
    expect(items[3].quality).to.equal(0);
  });

  test("Backstage passes obey the quality limits", () => {
    const gildedRose = new Shop([
      provideBackstagePass(11, 50),
      provideBackstagePass(10, 50),
      provideBackstagePass(5, 50),
      provideBackstagePass(0, 50),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
    expect(items[1].quality).to.equal(50);
    expect(items[2].quality).to.equal(50);
    expect(items[3].quality).to.equal(0);
  });
});

describe("Item quality behaviour", () => {
  test("Items are created and decrease in quality", () => {
    const fooItem = new GenericItem("foo", 5, 10);
    const barItem = new GenericItem("bar", 1, 10);
    fooItem.updateQuality();
    barItem.updateQuality();
    expect(fooItem.name).to.equal("foo");
    expect(fooItem.sellIn).to.equal(4);
    expect(fooItem.quality).to.equal(9);
    expect(barItem.name).to.equal("bar");
    expect(barItem.sellIn).to.equal(0);
    expect(barItem.quality).to.equal(9);
  });

  test("Items past sellIn data decrease in quality twice as fast", () => {
    const fooItem = new GenericItem("foo", 0, 10);
    fooItem.updateQuality();
    expect(fooItem.name).to.equal("foo");
    expect(fooItem.sellIn).to.equal(-1);
    expect(fooItem.quality).to.equal(8);
  });

  test("Items do not decrease in quality below 0", () => {
    const fooItem = new GenericItem("foo", 5, 0);
    const barItem = new GenericItem("bar", 0, 0);
    fooItem.updateQuality();
    barItem.updateQuality();
    expect(fooItem.sellIn).to.equal(4);
    expect(fooItem.quality).to.equal(0);
    expect(barItem.sellIn).to.equal(-1);
    expect(barItem.quality).to.equal(0);
  });
});

describe("Aged Brie", () => {
  test("Aged Brie increases in quality", () => {
    const agedBrie1 = new AgedBrie(5, 10);
    const agedBrie2 = new AgedBrie(1, 10);
    agedBrie1.updateQuality();
    agedBrie2.updateQuality();
    expect(agedBrie1.name).to.equal("Aged Brie");
    expect(agedBrie1.sellIn).to.equal(4);
    expect(agedBrie1.quality).to.equal(11);
    expect(agedBrie2.sellIn).to.equal(0);
    expect(agedBrie2.quality).to.equal(11);
  });

  test("Aged Brie increases in quality within limits", () => {
    const agedBrie1 = new AgedBrie(5, 50);
    const agedBrie2 = new AgedBrie(1, 50);
    const agedBrie3 = new AgedBrie(0, 50);
    agedBrie1.updateQuality();
    agedBrie2.updateQuality();
    agedBrie3.updateQuality();
    expect(agedBrie1.sellIn).to.equal(4);
    expect(agedBrie1.quality).to.equal(50);
    expect(agedBrie2.sellIn).to.equal(0);
    expect(agedBrie2.quality).to.equal(50);
    expect(agedBrie3.sellIn).to.equal(-1);
    expect(agedBrie3.quality).to.equal(50);
  });

  test("Aged Brie increases in quality twice as fast after sell in", () => {
    const agedBrie = new AgedBrie(0, 10);
    agedBrie.updateQuality();
    expect(agedBrie.name).to.equal("Aged Brie");
    expect(agedBrie.sellIn).to.equal(-1);
    expect(agedBrie.quality).to.equal(12);
  });
});

describe("Sulfuras, Hand of Ragnaros", () => {
  test("Sulfuras has no changes with update", () => {
    const sulfuras = new Sulfuras(5);
    sulfuras.updateQuality();
    expect(sulfuras.name).to.equal("Sulfuras, Hand of Ragnaros");
    expect(sulfuras.sellIn).to.equal(5);
    expect(sulfuras.quality).to.equal(80);
  });
});

describe("Backstage passes", () => {
  test("Backstage passes increase in quality at normal rate", () => {
    const backstagePass = new BackstagePass(15, 10);
    backstagePass.updateQuality();
    expect(backstagePass.name).to.equal("Backstage passes to a TAFKAL80ETC concert");
    expect(backstagePass.sellIn).to.equal(14);
    expect(backstagePass.quality).to.equal(11);
  });

  test("Backstage passes increase in quality at double rate at 10 days from sell in date", () => {
    const backstagePass1 = new BackstagePass(10, 10);
    const backstagePass2 = new BackstagePass(7, 10);
    const backstagePass3 = new BackstagePass(8, 50);
    backstagePass1.updateQuality();
    backstagePass2.updateQuality();
    backstagePass3.updateQuality();
    expect(backstagePass1.quality).to.equal(12);
    expect(backstagePass2.quality).to.equal(12);
    expect(backstagePass3.quality).to.equal(50);
  });

  test("Backstage passes increase in quality at triple rate at 5 days from sell in date", () => {
    const backstagePass1 = new BackstagePass(5, 10);
    const backstagePass2 = new BackstagePass(3, 10);
    const backstagePass3 = new BackstagePass(1, 50);
    backstagePass1.updateQuality();
    backstagePass2.updateQuality();
    backstagePass3.updateQuality();
    expect(backstagePass1.quality).to.equal(13);
    expect(backstagePass2.quality).to.equal(13);
    expect(backstagePass3.quality).to.equal(50);
  });

  test("Backstage passes drop to 0 quality after sell in date", () => {
    const backstagePass = new BackstagePass(0, 50);
    backstagePass.updateQuality();
    expect(backstagePass.quality).to.equal(0);
  });
});

describe("Conjured item", () => {
  test("Conjured item degrades twice as fast", () => {
    const conjured1 = new ConjuredItem(5, 20);
    const conjured2 = new ConjuredItem(1, 20);
    conjured1.updateQuality();
    conjured2.updateQuality();
    expect(conjured1.name).to.equal("Conjured");
    expect(conjured1.sellIn).to.equal(4);
    expect(conjured1.quality).to.equal(18);
    expect(conjured2.sellIn).to.equal(0);
    expect(conjured2.quality).to.equal(18);
  });

  test("Conjured item degrades even faster after sell in date", () => {
    const conjured1 = new ConjuredItem(0, 20);
    const conjured2 = new ConjuredItem(-2, 20);
    conjured1.updateQuality();
    conjured2.updateQuality();
    expect(conjured1.sellIn).to.equal(-1);
    expect(conjured1.quality).to.equal(16);
    expect(conjured2.sellIn).to.equal(-3);
    expect(conjured2.quality).to.equal(16);
  });

  test("Conjured item degrades within limits", () => {
    const conjured1 = new ConjuredItem(5, 0);
    const conjured2 = new ConjuredItem(0, 0);
    conjured1.updateQuality();
    conjured2.updateQuality();
    expect(conjured1.sellIn).to.equal(4);
    expect(conjured1.quality).to.equal(0);
    expect(conjured2.sellIn).to.equal(-1);
    expect(conjured2.quality).to.equal(0);
  });
});

function provideItem(name, sellIn = 10, quality = 25) {
  return new GenericItem(name, sellIn, quality);
}

function provideAgedBrie(sellIn = 10, quality = 25) {
  return new AgedBrie(sellIn, quality);
}

function provideBackstagePass(sellIn = 10, quality = 25) {
  return new BackstagePass(sellIn, quality);
}

function provideSulfuras(sellIn = 10) {
  return new Sulfuras(sellIn);
}
