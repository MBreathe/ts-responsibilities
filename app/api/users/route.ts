import { dbConnect } from '@/lib';
import { User } from '@/models';
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
        const { name } = body;
        if (!name) {
            return NextResponse.json(
                { error: 'name is required' },
                { status: 400 }
            );
        }
        const user = await User.create({ name });
        if (!user) {
            return NextResponse.json(
                { error: "Couldn't create a user" },
                { status: 500 }
            );
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
