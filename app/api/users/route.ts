import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();

        const users = await User.find({});
        if (users.length === 0) {
            return NextResponse.json(
                { error: 'No users found' },
                { status: 404 }
            );
        }
        return NextResponse.json({ users });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const user = await User.create({ name: body.name });
        if (!user) {
            return NextResponse.json({ error: "Couldn't create a user" });
        }
        return NextResponse.json({ user }, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Couldn't create user" },
            { status: 500 }
        );
    }
}
