import mongoose from 'mongoose';

const { Schema, SchemaTypes, model } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    assignedTasks: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Task',
        },
    ],
});

export default model('User', userSchema);
