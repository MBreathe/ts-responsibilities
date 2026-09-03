import { dbConnect } from '@/lib';
import { Room } from '@/models';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();

        const rooms = await Room.find({});
        if (rooms.length === 0) {
            return NextResponse.json(
                { error: 'No rooms found' },
                { status: 404 }
            );
        }
        return NextResponse.json({ rooms });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: 'Failed to fetch rooms' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const { name } = body;
        if (!name) {
            return NextResponse.json(
                { error: 'name is required' },
                { status: 400 }
            );
        }
        const room = await Room.create({ name });
        if (!room) {
            return NextResponse.json(
                { error: "Couldn't create a room" },
                { status: 500 }
            );
        }
        return NextResponse.json({ room }, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Couldn't cerate a room" },
            { status: 500 }
        );
    }
}
