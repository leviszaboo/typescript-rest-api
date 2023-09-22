import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/userController";
import validateResource from "./middleware/validateResource";
import { createUserSchema } from "./schema/userSchema";

export default function routes(app: Express) {
    app.get("/healthcheck", (_req: Request, res: Response) => res.sendStatus(200))

    app.post("/api/user", validateResource(createUserSchema), createUserHandler)
}