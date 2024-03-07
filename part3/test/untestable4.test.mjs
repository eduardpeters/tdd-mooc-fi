import { afterAll, afterEach, beforeAll, beforeEach, describe, test } from "vitest";
import { PasswordHasher, PasswordService, PostgresUserDao } from "../src/untestable4.mjs";
import { expect } from "chai";

describe("Password hasher", () => {
  let hasher;
  beforeEach(() => {
    hasher = new PasswordHasher();
  });

  test("A password is hashed", () => {
    const plainText = "hey-there";
    const hash = hasher.hashPassword(plainText);
    expect(hash).not.to.equal(plainText);
  });

  test("A valid hash is verified", () => {
    const plainText = "hey-there";
    const hash = hasher.hashPassword(plainText);
    expect(hasher.verifyPassword(hash, plainText)).to.be.true;
  });

  test("An incorrect hash is rejected", () => {
    const plainText = "hey-there";
    const hash = hasher.hashPassword(plainText);
    expect(hasher.verifyPassword(hash, "hello-there")).to.be.false;
  });
});

async function connectDb() {
  return new pg.Pool({
    user: process.env.VITE_PGUSER,
    host: process.env.VITE_PGHOST,
    database: process.env.VITE_PGDATABASE,
    password: process.env.VITE_PGPASSWORD,
    port: process.env.VITE_PGPORT,
  });
}

async function truncateTables(db) {
  db.query("truncate users");
}

describe("Users DAO", () => {
  const userId = 123;
  let db;
  let users;
  let hasher;
  let service;

  beforeAll(async () => {
    db = await connectDb();
    await truncateTables(db);
    users = new PostgresUserDao(db);
    hasher = new PasswordHasher();
    service = new PasswordService();
  });

  afterAll(async () => {
    await db.end();
  });

  test("Password can be changed", async () => {
    const originalUser = {
      userId,
      passwordHash: hasher.hashPassword("old-password"),
    };

    await users.save(originalUser);

    await service.changePassword(userId, "old-password", "new-password");

    const newUser = await users.getById(userId);

    expect(newUser.passwordHash).to.not.equal(originalUser.passwordHash);
    expect(hasher.verifyPassword(newUser.passwordHash, "new-password")).to.be.true;
  });

  test("Wrong password is rejected", async () => {
    const originalUser = {
      userId,
      passwordHash: hasher.hashPassword("old-password"),
    };

    await users.save(originalUser);

    let error;
    try {
      await service.changePassword(userId, "wrong-password", "new-password");
    } catch (e) {
      error = e;
    }

    expect(error).to.deep.equal(new Error("wrong old password"));
  });

  test("Get user by id", async () => {
    const firstUser = {
      userId: 123,
      passwordHash: "abc",
    };
    const secondUser = {
      userId: 456,
      passwordHash: "def",
    };

    await users.save(firstUser);
    await users.save(secondUser);

    const firstUserStored = await users.getById(123);
    const secondUserStored = await users.getById(456);

    expect(firstUserStored).to.deep.equal(firstUser);
    expect(secondUserStored).to.deep.equal(secondUser);
    expect(firstUserStored).to.not.equal(firstUser, "Differente reference");
    expect(await users.getById(999)).to.equal(null);
  });
});
