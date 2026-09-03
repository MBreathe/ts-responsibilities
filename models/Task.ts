import mongoose from 'mongoose';

const { Schema, SchemaTypes, model } = mongoose;

const taskSchema = new Schema({
    title: String,
    createdOn: {
        type: Date,
        default: Date.now,
        required: true,
    },
    createdBy: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    assignedTo: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'User',
            required: false,
        },
    ],
    room: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Room',
            required: false,
        },
    ],
    weight: {
        type: Number,
        enum: [0, 1, 2],
        required: true,
    },
    description: String,
});

export default model('Task', taskSchema);
