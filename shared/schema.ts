import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  nickname: text("nickname"),
  dateOfBirth: text("date_of_birth"),
  gender: text("gender"),
  height: integer("height"),
  weight: integer("weight"),
  bodyType: text("body_type"),
  colorPalette: text("color_palette")
});

export const clothes = pgTable("clothes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  imageUrl: text("image_url").notNull(),
  tags: jsonb("tags").default([]).notNull(),
  season: text("season"),
  occasion: text("occasion"),
  category: text("category"),
  color: text("color"),
  material: text("material"),
  pattern: text("pattern"),
  style: text("style"),
  fit: text("fit"),
  neckline: text("neckline"),
  length: text("length"),
  brand: text("brand")
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});

// Create a custom insert schema for clothes that makes tags optional
export const insertClothingSchema = createInsertSchema(clothes)
  .extend({
    tags: z.array(z.string()).default([])
  })
  .omit({ id: true });

export const updateProfileSchema = z.object({
  nickname: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  height: z.number().optional(),
  weight: z.number().optional(),
  bodyType: z.string().optional(),
  colorPalette: z.string().optional()
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Clothing = typeof clothes.$inferSelect;
export type InsertClothing = z.infer<typeof insertClothingSchema>;
export type UpdateProfile = z.infer<typeof updateProfileSchema>;