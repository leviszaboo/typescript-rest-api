import { omit } from "lodash";
import User, { IUserInput } from "../models/user";

export async function createUser(input: IUserInput) {
    try {
        const existingUser = await User.findOne({ email: input.email })

        if (existingUser) {
            throw new Error("User already exists.")
        }
    
        const user = await User.create(input)
        return user
    } catch(err: any) {
        throw new Error(err)
    }
}

export async function validatePassword({email, password}: {email: string, password: string}) {
    const user = await User.findOne({ email: email })
    if (!user) {
        return false
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) return false

    return omit(user.toJSON(), "password")
}