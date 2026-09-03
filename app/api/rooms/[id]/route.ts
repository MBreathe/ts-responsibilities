import { dbConnect } from '@/lib';
import { Room } from '@/models';
import { Params } from '@/types';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

async function getRoom(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
            error: NextResponse.json(
                { error: 'Invalid ID format' },
                { status: 400 }
            ),
        };
    }
    await dbConnect();
    const room = await Room.findById(id);
    if (!room) {
        return {
            error: NextResponse.json({ error: 'Not found' }, { status: 404 }),
        };
    }
    return { room };
}

export async function GET(_request: NextRequest, { params }: Params) {
    const { id } = await params;
    const { room, error } = await getRoom(id);
    if (error) return error;
    return NextResponse.json({ room });
}

export async function PATCH(request: NextRequest, { params }: Params) {
    const { id } = await params;
    const { room, error } = await getRoom(id);
    if (error) return error;

    const body = await request.json();
    try {
        await room.updateOne({ name: body.name });
        return new NextResponse(null, { status: 204 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
    const { id } = await params;
    const { room, error } = await getRoom(id);
    if (error) return error;

    try {
        await room.deleteOne();
        return new NextResponse(null, { status: 204 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
}
