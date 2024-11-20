import {model, Schema, Types} from "mongoose";

const tokenSchema = new Schema ({
    refreshToken:{
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    }

})

export const Token = model('Token',tokenSchema)