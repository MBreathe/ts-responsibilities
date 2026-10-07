import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true, unique: true },
});

export default model('User', userSchema);
