import { Schema, model } from 'mongoose';
import { FullUser } from '../types';

const userSchema = new Schema<FullUser>(
    {
        userName: { type: String, require: true },
        password: { type: String, require: true },
        email: { type: String, require: true, unique: true },
    },
    {
        timestamps: true,
    }
);

export default model('user', userSchema);
