import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { dbConnect } from '@/lib';
import { Task, User } from '@/models';
import type { Params } from '@/types';

async function getUser(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
            error: NextResponse.json(
                { error: 'Invalid ID format' },
                { status: 400 }
            ),
        };
    }
    await dbConnect();
    const user = await User.findById(id);
    if (!user) {
        return {
            error: NextResponse.json({ error: 'Not found' }, { status: 404 }),
        };
    }
    return { user };
}

export async function GET(_request: NextRequest, { params }: Params) {
    const { id } = await params;
    const { user, error } = await getUser(id);
    if (error) return error;
    return NextResponse.json({ user });
}

export async function PATCH(request: NextRequest, { params }: Params) {
    const { id } = await params;
    const { user, error } = await getUser(id);
    if (error) return error;

    const body = await request.json();
    try {
        await user.updateOne({ name: body.name });
        return new NextResponse(null, { status: 204 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
    const { id } = await params;
    const { user, error } = await getUser(id);
    if (error) return error;

    if (await Task.exists({ createdBy: user._id })) {
        return NextResponse.json(
            { error: 'User has created tasks' },
            { status: 409 }
        );
    }

    const session = await mongoose.startSession();

    try {
        await session.withTransaction(async () => {
            await Task.updateMany(
                { assignedTo: user._id },
                { $pull: { assignedTo: user._id } },
                { session }
            );
            await user.deleteOne({ session });
        });
        return new NextResponse(null, { status: 204 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    } finally {
        await session.endSession();
    }
}
