import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const roomSchema = new Schema({
    name: { type: String, required: true, unique: true },
});

export default model('Room', roomSchema);
