import { dbConnect } from '@/lib';
import { Task } from '@/models';
import { validateTaskParams } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();

        const tasks = await Task.find({}).exec();
        if (tasks.length === 0) {
            return NextResponse.json(
                { error: 'No tasks found' },
                { status: 404 }
            );
        }
        return NextResponse.json({ tasks });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: 'Failed to fetch tasks' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();

        const result = validateTaskParams(body);
        if (!result.valid) {
            return NextResponse.json({ error: result.error }, { status: 400 });
        }

        const task = await Task.create(result.data);
        return NextResponse.json({ task }, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Couldn't create task" },
            { status: 500 }
        );
    }
}
