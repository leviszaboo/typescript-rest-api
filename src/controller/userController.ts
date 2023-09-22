import { Request, Response } from "express";
import { omit } from "lodash";
import log from "../utils/logger";
import { createUser } from "../service/userService";
import { CreateUserInput } from "../schema/userSchema";

export async function createUserHandler(
    req: Request<{}, {}, CreateUserInput['body']>, 
    res: Response
    ) {
    try {
        const user = await createUser(req.body);
        return res.send(omit(user.toJSON(), "password"));
    } catch(err: any) {
        log.error(err)
        return res.status(409).send(err.message)
    }
}