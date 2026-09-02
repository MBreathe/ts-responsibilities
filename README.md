# Responsibilities

CRUD web application to handle shared responsibilities around the house.

## **BACKEND**

## API Map

```
first:
    GET     /               get
    POST    /               post
    UPDATE  /               update
    DELETE  /               delete

second:
    GET     /               get
    POST    /               post
    UPDATE  /               update
    DELETE  /               delete
```

## Models

```typescript
// REFERENCE
const blog = new Schema(
    {
        title: String,
        slug: String,
        published: Boolean,
        author: String,
        content: String,
        tags: [String],
        comments: [
            {
                user: String,
                content: String,
                votes: Number,
            },
        ],
    },
    {
        timestamps: true,
    }
);
```

## **FRONTEND**

_TODO: fill the rest_
