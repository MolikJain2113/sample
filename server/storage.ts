import { InsertUser, User, Clothing, InsertClothing, UpdateProfile } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserProfile(userId: number, data: UpdateProfile): Promise<User>;
  createClothing(clothing: InsertClothing): Promise<Clothing>;
  getUserClothes(userId: number): Promise<Clothing[]>;
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private clothes: Map<number, Clothing>;
  private currentUserId: number;
  private currentClothingId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.clothes = new Map();
    this.currentUserId = 1;
    this.currentClothingId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async updateUserProfile(userId: number, data: UpdateProfile): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) throw new Error("User not found");
    
    const updatedUser = { ...user, ...data };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async createClothing(clothing: InsertClothing): Promise<Clothing> {
    const id = this.currentClothingId++;
    const newClothing = { ...clothing, id };
    this.clothes.set(id, newClothing);
    return newClothing;
  }

  async getUserClothes(userId: number): Promise<Clothing[]> {
    return Array.from(this.clothes.values()).filter(
      (clothing) => clothing.userId === userId
    );
  }
}

export const storage = new MemStorage();
