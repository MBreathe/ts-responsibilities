import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const roomSchema = new Schema({
    name: { type: String, required: true, unique: true },
});

export default models.Room || model('Room', roomSchema);
