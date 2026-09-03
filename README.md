# Responsibilities

CRUD web application to handle shared responsibilities around the house.

## **BACKEND**

## API Map

```
TASKS:
    GET     api/tasks               Get list of all tasks
    GET     api/tasks/:id           Get a task
    POST    api/tasks               Create a task
    UPDATE  api/tasks/:id           Update a task
    DELETE  api/tasks               Delete all tasks
    DELETE  api/tasks/:id           Delete a task

USER:
    GET     api/users               Get list of all users
    GET     api/users/:id           Get a user
    POST    api/users               Create a user
    UPDATE  api/users/:id           Update a user
    DELETE  api/users/:id           Delete a user

ROOM:
    GET     api/rooms               Get list of all rooms
    GET     api/rooms/:id           Get a room
    POST    api/rooms               Create a room
    UPDATE  api/rooms/:id           Update a room
    DELETE  api/rooms/:id           Delete a room
```

## Models

```typescript
// ---
// Split into separate model files
// Double check if required is true or false by deafault and adjust accordingly
// ---
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
            type: String,
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
```

## **FRONTEND**
