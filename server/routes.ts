import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertClothingSchema, updateProfileSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  // Profile routes
  app.put("/api/profile", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const data = updateProfileSchema.parse(req.body);
    const updatedUser = await storage.updateUserProfile(req.user.id, data);
    res.json(updatedUser);
  });

  // Clothing routes
  app.post("/api/clothes", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const data = insertClothingSchema.parse({
      ...req.body,
      userId: req.user.id
    });
    const clothing = await storage.createClothing(data);
    res.status(201).json(clothing);
  });

  app.get("/api/clothes", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const clothes = await storage.getUserClothes(req.user.id);
    res.json(clothes);
  });

  const httpServer = createServer(app);
  return httpServer;
}
