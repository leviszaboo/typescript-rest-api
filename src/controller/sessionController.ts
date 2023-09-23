import { Request, Response } from "express";
import { validatePassword } from "../service/userService";
import { createSession } from "../service/sessionService";
import { signJwt } from "../utils/jwtUtils";
import config from "config"

export async function createUserSessionHandler(req: Request, res: Response) {
    const user = await validatePassword(req.body);
    console.log(req.body)

    if (!user) {
        return res.status(401).send("Invalid email or password.")
    }

    const session = await createSession(user._id);

    const accessToken = signJwt(
        {...user, session: session._id},
        { expiresIn: config.get("accessTokenTtl")}
    );

    const refreshToken = signJwt(
        {...user, session: session._id},
        { expiresIn: config.get("refreshTokenTtl")}
    );

    return res.send({ accessToken, refreshToken })
}