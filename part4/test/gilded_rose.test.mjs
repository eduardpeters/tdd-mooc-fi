import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop, AgedBrie, Sulfuras, BackstagePass, GenericItem } from "../src/gilded_rose.mjs";

describe("Gilded Rose", () => {
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

  test.skip("Aged Brie increases in quality within limits", () => {
    const gildedRose = new Shop([provideAgedBrie(5, 10), provideAgedBrie(1, 50), provideAgedBrie(0, 25)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(11);
    expect(items[1].quality).to.equal(50);
    expect(items[2].quality).to.equal(27);
  });

  test.skip("Sulfuras does not change sellIn or quality", () => {
    const gildedRose = new Shop([provideSulfuras(100)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(100);
    expect(items[0].quality).to.equal(80);
  });

  test.skip("Backstage passes have different quality increases", () => {
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

  test.skip("Backstage passes obey the quality limits", () => {
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
    fooItem.updateQuality();
    expect(fooItem.name).to.equal("foo");
    expect(fooItem.sellIn).to.equal(4);
    expect(fooItem.quality).to.equal(9);
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

describe("Backstage passes", () => {
  test("Backstage passes increase in quality at normal rate", () => {
    const backstagePass = new BackstagePass(15, 10);
    backstagePass.updateQuality();
    expect(backstagePass.quality).to.equal(11);
  });

  test("Backstage passes increase in quality at double rate at 10 days from sell in date", () => {
    const backstagePass1 = new BackstagePass(10, 10);
    const backstagePass2 = new BackstagePass(8, 10);
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

function provideItem(name, sellIn = 10, quality = 25) {
  return new GenericItem(name, sellIn, quality);
}

function provideAgedBrie(sellIn = 10, quality = 25) {
  return new Item("Aged Brie", sellIn, quality);
}

function provideBackstagePass(sellIn = 10, quality = 25) {
  return new Item("Backstage passes to a TAFKAL80ETC concert", sellIn, quality);
}

function provideSulfuras(sellIn = 10) {
  return new Item("Sulfuras, Hand of Ragnaros", sellIn, 80);
}
