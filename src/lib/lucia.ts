import { dev } from '$app/env';
import mongoose from "mongoose";
import lucia from 'lucia-sveltekit';
import { MONGO_URI, LUCIA_SECRET } from './_env';
import adapter from "@lucia-sveltekit/adapter-mongoose";
import * as db from '$lib/db'

const userSchema = new mongoose.Schema(
    {
        _id: String,
        identifier_token: {
            type: String,
            unique: true,
            required: true,
        },
        hashed_password: String,
        email: { type: String, required: true, unique: true }
    },
    { _id: false }
)

export const User = mongoose.model(
    "user",
    userSchema
);

mongoose.model(
    "refresh_token",
    new mongoose.Schema({
        refresh_token: String,
        user_id: String,
    })
);

export const auth = lucia({
    adapter: adapter(mongoose, MONGO_URI),
    secret: LUCIA_SECRET,
    env: dev ? "DEV" : "PROD",
});

