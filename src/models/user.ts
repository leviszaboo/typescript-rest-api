import mongoose from "mongoose";
import bcrypt from "bcrypt"
import config from "config"

export interface IUserInput {
    email: string, 
    name: string
    password: string
}

export interface IUser extends IUserInput, mongoose.Document{
    createdAt: Date,
    updatedAt: Date,
    comparePassword(candidatePasssword:string): Promise<boolean>
}

const userSchema = new mongoose.Schema<IUser>({
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true }
}, {
    timestamps: true
})

userSchema.pre("save", async function(next: (err?: Error) => void) {
    let user = this as IUser;

    if (!user.isModified('password')) {
        console.log(user.isModified('password'))
        return next()
    }

    const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));

    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash

    return next()
})

userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    const user = this as IUser

    return bcrypt.compare(candidatePassword, user.password).catch((_err) => false)
}

const User = mongoose.model("User", userSchema)

export default User