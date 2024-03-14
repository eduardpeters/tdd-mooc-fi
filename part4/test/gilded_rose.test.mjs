import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop, AgedBrie } from "../src/gilded_rose.mjs";

describe("Gilded Rose", () => {
  test("Shop update quality method", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0), new Item("bar", -1, 10)]);
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

describe("Aged Brie", () => {
  test("Aged Brie increases in quality", () => {
    const agedBrie = new AgedBrie(5, 10);
    agedBrie.updateQuality();
    expect(agedBrie.quality).to.equal(11);
  });

  test("Aged Brie increases in quality within limits", () => {
    const agedBrie = new AgedBrie(5, 50);
    agedBrie.updateQuality();
    expect(agedBrie.quality).to.equal(50);
  });

  test("Aged Brie increases in quality twice as fast after sell in", () => {
    const agedBrie = new AgedBrie(0, 10);
    agedBrie.updateQuality();
    expect(agedBrie.quality).to.equal(12);
  });
});

describe("Sulfuras, Hand of Ragnaros", () => {
  test("Sulfuras has no changes with update", () => {
    const sulfuras = new Sulfuras(5, 80);
    sulfuras.updateQuality();
    expect(sulfuras.sellIn).to.equal(5);
    expect(sulfuras.quality).to.equal(80);
  });
});

function provideAgedBrie(sellIn = 10, quality = 25) {
  return new Item("Aged Brie", sellIn, quality);
}

function provideBackstagePass(sellIn = 10, quality = 25) {
  return new Item("Backstage passes to a TAFKAL80ETC concert", sellIn, quality);
}

function provideSulfuras(sellIn = 10) {
  return new Item("Sulfuras, Hand of Ragnaros", sellIn, 80);
}
