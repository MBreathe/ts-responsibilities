# Responsibilities

CRUD web application to handle shared responsibilities around the house.

## **BACKEND**

## API Map

```
TASKS:
    GET     api/tasks               Get list of all tasks
    GET     api/task/:id            Get a task
    POST    api/task                Create a task
    UPDATE  api/task/:id            Update a task
    DELETE  api/tasks               Delete all tasks
    DELETE  api/task/:id            Delete a task

USER:
    GET     api/users               Get list of all users
    GET     api/user/:id            Get a user
    GET     api/user/:id/tasks      Get a list of tasks assigned to a user
    POST    api/user                Create a user
    UPDATE  api/user/:id            Update a user
    DELETE  api/user/:id            Delete a user

ROOM:
    GET     api/rooms               Get list of all rooms
    GET     api/room/:id            Get a room
    GET     api/room/:id/tasks      Get a list of tasks related to a room
    POST    api/room                Create a room
    UPDATE  api/room/:id            Update a room
    DELETE  api/room/:id            Delete a room
```

## Models

```typescript
// ---
// Split into separate model files
// Double check if required is true or false by deafault and adjust accordingly
// ---
import mongoose from 'mogoose';

const { Schema, SchemaTypes, model } = mongoose;

const userSchema = new Schema({
    name: String,
    assignedTasks: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Task',
            required: false,
        },
    ],
});

const roomSchema = new Schema({
    name: String,
    relatedTasks: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Task',
            required: false,
        },
    ],
});

const taskSchema = new Schema({
    title: String,
    createdOn: {
        type: Date,
        default: Date.now,
        required: true,
    },
    createdBy: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    assignedTo: [
        {
            type: ObjectId,
            ref: 'User',
            required: false,
        },
    ],
    room: {
        type: String,
        ref: 'Room',
        required: false,
    },
    weight: {
        type: Number,
        enum: [0, 1, 2],
        required: true,
    },
    description: String,
});

const User = model('User', userSchema);
const Room = model('Room', roomSchema);
const Task = model('Task', taskSchema);
```

## **FRONTEND**
