import { InsertUser, User, Clothing, InsertClothing, UpdateProfile } from "@shared/schema";
import session from "express-session";
import { db } from "./db";
import { eq } from "drizzle-orm";
import connectPg from "connect-pg-simple";
import { pool } from "./db";
import { users, clothes } from "@shared/schema";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserProfile(userId: number, data: UpdateProfile): Promise<User>;
  createClothing(clothing: InsertClothing): Promise<Clothing>;
  getUserClothes(userId: number): Promise<Clothing[]>;
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values({
      username: insertUser.username,
      password: insertUser.password,
      nickname: null,
      dateOfBirth: null,
      gender: null,
      height: null,
      weight: null,
      bodyType: null,
      colorPalette: null
    }).returning();
    return user;
  }

  async updateUserProfile(userId: number, data: UpdateProfile): Promise<User> {
    const [user] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async createClothing(clothing: InsertClothing): Promise<Clothing> {
    const [newClothing] = await db
      .insert(clothes)
      .values({
        ...clothing,
        season: clothing.season || null,
        occasion: clothing.occasion || null,
        category: clothing.category || null,
        color: clothing.color || null,
        material: clothing.material || null,
        pattern: clothing.pattern || null,
        style: clothing.style || null,
        fit: clothing.fit || null,
        neckline: clothing.neckline || null,
        length: clothing.length || null,
        brand: clothing.brand || null
      })
      .returning();
    return newClothing;
  }

  async getUserClothes(userId: number): Promise<Clothing[]> {
    return db.select().from(clothes).where(eq(clothes.userId, userId));
  }
}

export const storage = new DatabaseStorage();