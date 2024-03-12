import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

describe("Gilded Rose", () => {
  test("Shop update quality method", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0);
  });

  test("Aged Brie increases in quality within limits", () => {
    const gildedRose = new Shop([provideAgedBrie(5, 10), provideAgedBrie(1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(11);
    expect(items[1].quality).to.equal(50);
  });

  test("Sulfuras does not change sellIn or quality", () => {
    const gildedRose = new Shop([provideSulfuras(100)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(100);
    expect(items[0].quality).to.equal(80);
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
