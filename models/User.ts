import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true, unique: true },
});

export default models.User || model('User', userSchema);
