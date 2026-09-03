import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

type Params = { params: Promise<{ id: string }> };

export default async function getUser(id: string) {
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

export async function GET(request: NextRequest, { params }: Params) {
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

export async function DELETE(request: NextRequest, { params }: Params) {
    const { id } = await params;
    const { user, error } = await getUser(id);
    if (error) return error;

    try {
        await user.deleteOne();
        return new NextResponse(null, { status: 204 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Delete dailed' }, { status: 500 });
    }
}
