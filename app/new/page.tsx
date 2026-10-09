'use client';
import {
    Field,
    FieldGroup,
    FieldSet,
    FieldLabel,
    Input,
    Textarea,
    Checkbox,
    FieldLegend,
    Slider,
    FieldDescription,
    Button,
} from '@/components/ui';
import { Room, TaskForm, User, Weight } from '@/types';
import { fetchUtil } from '@/utils';
import { useEffect, useState } from 'react';

export default function Test() {
    const [task, setTask] = useState<TaskForm>({
        title: '',
        createdBy: '6ac62d5af15d58fd29df0ce2', // temporary (Ilya)
        assignedTo: [],
        room: [],
        weight: 1,
        description: '',
    });
    const [users, setUsers] = useState<User[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);

    const toggleChecked = (
        field: 'assignedTo' | 'room',
        id: string,
        checked: boolean
    ) => {
        setTask((prev) => ({
            ...prev,
            [field]: checked
                ? prev[field].includes(id)
                    ? prev[field]
                    : [...prev[field], id]
                : prev[field].filter((v) => v !== id),
        }));
    };

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        const res = await fetch('api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        });

        if (!res.ok) {
            // catch and display error
            return;
        }
    };

    useEffect(() => {
        const fetchAll = async () => {
            setUsers(await fetchUtil('api/users', 'users'));
            setRooms(await fetchUtil('api/rooms', 'rooms'));
        };

        fetchAll();
    }, []);

    return (
        <form
            className="w-full flex justify-center py-3"
            onSubmit={handleSubmit}
        >
            <FieldSet className="w-5/6 max-w-2xl center px-2 py-4 border">
                <h2 className="text-center text-xl">Create a task</h2>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="title">Title</FieldLabel>
                        <Input
                            id="title"
                            autoComplete="off"
                            placeholder="Vacuum"
                            required
                            value={task.title}
                            onChange={(e) => {
                                setTask((prev) => ({
                                    ...prev,
                                    title: e.target.value,
                                }));
                            }}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="description">
                            Description
                        </FieldLabel>
                        <Textarea
                            id="description"
                            autoComplete="off"
                            placeholder="Be thorough with carpets..."
                            className="resize-none"
                            value={task.description}
                            onChange={(e) =>
                                setTask((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                        />
                    </Field>
                </FieldGroup>

                <div className="flex justify-between">
                    <FieldSet className="w-1/2">
                        <FieldLegend>Room(s)</FieldLegend>
                        <FieldGroup className="gap-1">
                            {rooms.map((room) => (
                                <Field key={room._id} orientation="horizontal">
                                    <Checkbox
                                        id={room._id}
                                        checked={task.room.includes(room._id)}
                                        onCheckedChange={(checked) =>
                                            toggleChecked(
                                                'room',
                                                room._id,
                                                checked === true
                                            )
                                        }
                                    />
                                    <FieldLabel htmlFor={room._id}>
                                        {room.name}
                                    </FieldLabel>
                                </Field>
                            ))}
                        </FieldGroup>
                    </FieldSet>

                    <FieldSet className="w-1/2">
                        <FieldLegend>Assignee</FieldLegend>
                        <FieldGroup className="gap-1">
                            {users.map((user) => (
                                <Field key={user._id} orientation="horizontal">
                                    <Checkbox
                                        id={user._id}
                                        checked={task.assignedTo.includes(
                                            user._id
                                        )}
                                        onCheckedChange={(checked) =>
                                            toggleChecked(
                                                'assignedTo',
                                                user._id,
                                                checked === true
                                            )
                                        }
                                    />
                                    <FieldLabel htmlFor={user._id}>
                                        {user.name}
                                    </FieldLabel>
                                </Field>
                            ))}
                        </FieldGroup>
                    </FieldSet>
                </div>

                <FieldSet>
                    <FieldLegend>Weight</FieldLegend>
                    <FieldDescription>
                        Set desired weight to the task (
                        <span className="font-medium tabular-nums">
                            {task.weight}
                        </span>
                        )
                    </FieldDescription>
                    <Slider
                        value={task.weight}
                        onValueChange={(value) => {
                            if (value === 0 || value === 1 || value === 2) {
                                const weight: Weight = value;
                                setTask((prev) => ({
                                    ...prev,
                                    weight: weight,
                                }));
                            }
                        }}
                        max={2}
                        min={0}
                        step={1}
                    />
                </FieldSet>

                <Field orientation="horizontal">
                    <Button type="submit">Submit</Button>
                    <Button type="button" variant="outline">
                        Cancel
                    </Button>
                </Field>
            </FieldSet>
        </form>
    );
}
