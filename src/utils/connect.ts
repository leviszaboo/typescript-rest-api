import mongoose from "mongoose";
import config from "config";
import log from "./logger";

export default async function connect(){
    const dbUri = config.get<string>("dbUri")

    return mongoose.connect(dbUri)
    .then(() => log.info("Connected to db"))
    .catch((err) => console.log(err))
}