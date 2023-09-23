import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/userController";
import validateResource from "./middleware/validateResource";
import { createUserSchema } from "./schema/userSchema";
import { createSessionSchema } from "./schema/sessionSchema";
import { createUserSessionHandler } from "./controller/sessionController";

export default function routes(app: Express) {
    app.get("/healthcheck", (_req: Request, res: Response) => res.sendStatus(200))

    app.post("/api/users/create", validateResource(createUserSchema), createUserHandler)

    app.post("/api/sessions/create", validateResource(createSessionSchema), createUserSessionHandler)
}