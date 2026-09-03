import mongoose from 'mongoose';

const { Schema, SchemaTypes, model } = mongoose;

const roomSchema = new Schema({
    name: { type: String, required: true },
    assignedTasks: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Task',
        },
    ],
});

export default model('Room', roomSchema);
