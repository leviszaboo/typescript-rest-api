import User, { IUserInput } from "../models/user";

export async function createUser(input: IUserInput) {
    try {
        return await User.create(input)
    } catch(err: any) {
        throw new Error(err)
    }
}