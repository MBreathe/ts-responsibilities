import mongoose from 'mongoose';

const { Schema, SchemaTypes, model } = mongoose;

const roomSchema = new Schema({
    name: String,
    assignedTasks: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Task',
            required: false,
        },
    ],
});

export default model('Room', roomSchema);
