import { dbConnect } from '@/lib';
import { Task } from '@/models';
import { Params } from '@/types';
import { validateTaskParams } from '@/utils';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

async function getTask(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
            error: NextResponse.json(
                { error: 'Invalid ID format' },
                { status: 400 }
            ),
        };
    }
    await dbConnect();
    const task = await Task.findById(id);
    if (!task) {
        return {
            error: NextResponse.json({ error: 'Not found' }, { status: 404 }),
        };
    }
    return { task };
}

export async function GET(_request: NextRequest, { params }: Params) {
    const { id } = await params;
    const { task, error } = await getTask(id);
    if (error) return error;
    return NextResponse.json({ task });
}

export async function PATCH(request: NextRequest, { params }: Params) {
    const { id } = await params;
    const { task, error } = await getTask(id);
    if (error) return error;

    const body = await request.json();
    if (!body || Object.keys(body).length === 0) {
        return NextResponse.json(
            { error: 'No fields provided to update' },
            { status: 400 }
        );
    }
    const result = validateTaskParams(body, { partial: true });
    if (!result.valid) {
        return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const updateFields: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(result.data)) {
        if (value !== undefined) updateFields[key] = value;
    }

    try {
        await task.updateOne(
            { $set: updateFields },
            { new: true, runValidators: true }
        );
        return new NextResponse(null, { status: 204 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}

export async function DELETE({ params }: Params) {
    const { id } = await params;
    const { task, error } = await getTask(id);
    if (error) return error;

    try {
        await task.deleteOne();
        return new NextResponse(null, { status: 204 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
}
