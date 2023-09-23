import mongoose from "mongoose";
import { IUser } from "./user";

export interface ISession {
    user: IUser["_id"], 
    valid: boolean,
    createdAt: Date;
    updatedAt: Date
}

const sessionSchema = new mongoose.Schema<ISession>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
}, {
    timestamps: true
})


const Session = mongoose.model("Session", sessionSchema)

export default Session