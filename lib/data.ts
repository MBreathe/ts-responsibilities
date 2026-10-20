import { Room, Task, User } from '@/types';
import dbConnect from './mongodb';
import {
    Task as TaskModel,
    User as UserModel,
    Room as RoomModel,
} from '@/models';

const plain = <T>(docs: unknown): T => JSON.parse(JSON.stringify(docs));

export async function getTasks() {
    await dbConnect();
    return plain<Task[]>(await TaskModel.find().sort({ createdAt: -1 }).lean());
}

export async function getUsers() {
    await dbConnect();
    return plain<User[]>(await UserModel.find().lean());
}

export async function getRooms() {
    await dbConnect();
    return plain<Room[]>(await RoomModel.find().lean());
}
