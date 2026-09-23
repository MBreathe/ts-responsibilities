export type Params = { params: Promise<{ id: string }> };

export type User = {
    _id: string;
    name: string;
    assignedTasks: string[];
};

type Weight = 0 | 1 | 2;

export type Task = {
    _id: string;
    title: string;
    createdBy: string;
    assignedTo: string[];
    room: string[];
    weight: Weight;
    description: string;
    createdOn: string;
};

export type Room = {
    _id: string;
    name: string;
    assignedTasks: string[];
};
