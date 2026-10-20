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
    Dialog,
    DialogTrigger,
    DialogContent,
} from '@/components/ui';
import { Room, Task, TaskForm, User } from '@/types';
import { PlusIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type TaskDialogProps = {
    users: User[];
    rooms: Room[];
    existingTask?: Task;
    variant?: React.ComponentProps<typeof Button>['variant'];
    size?: React.ComponentProps<typeof Button>['size'];
    icon?: React.ReactNode;
    className?: string;
};

const EMPTY_TASK: TaskForm = {
    title: '',
    createdBy: '6ac62d5af15d58fd29df0ce2', // temporary (Ilya)
    assignedTo: [],
    room: [],
    weight: 1,
    description: '',
};

const toForm = (t?: Task): TaskForm =>
    t
        ? {
              title: t.title,
              createdBy: t.createdBy,
              description: t.description,
              weight: t.weight,
              room: t.room,
              assignedTo: t.assignedTo,
          }
        : EMPTY_TASK;

export default function TaskDialog({
    users,
    rooms,
    existingTask,
    variant = 'outline',
    size = 'icon-lg',
    icon = <PlusIcon />,
    className = 'fixed right-6 bottom-6 cursor-pointer',
}: TaskDialogProps) {
    const router = useRouter();

    const isEdit = existingTask !== undefined;
    const [open, setOpen] = useState(false);
    const [task, setTask] = useState<TaskForm>(toForm(existingTask));
    const [error, setError] = useState<string | null>(null);

    const handleOpenChange = (next: boolean) => {
        setOpen(next);
        if (next) {
            setTask(toForm(existingTask));
            setError(null);
        }
    };

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

    useEffect(() => {
        console.log(error);
    }, [error]);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        const res = await fetch(
            existingTask ? `/api/tasks/${existingTask._id}` : '/api/tasks',
            {
                method: existingTask ? 'PATCH' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    isEdit ? { ...task, createdBy: undefined } : task
                ),
            }
        );

        if (!res.ok) {
            const data = await res.json().catch(() => null);
            setError(data?.error ?? 'An error occurred');
            return;
        }

        setOpen(false);
        router.refresh();
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger
                render={
                    <Button variant={variant} size={size} className={className}>
                        {icon}
                    </Button>
                }
            />
            <DialogContent>
                <form
                    className="w-full flex justify-center"
                    onSubmit={handleSubmit}
                >
                    <FieldSet className="w-5/6 max-w-2xl center ">
                        <h2 className="text-center text-xl">
                            {isEdit ? 'Edit task' : 'Create a task'}
                        </h2>
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
                                        <Field
                                            key={room._id}
                                            orientation="horizontal"
                                        >
                                            <Checkbox
                                                id={room._id}
                                                checked={task.room.includes(
                                                    room._id
                                                )}
                                                onCheckedChange={(
                                                    checked: boolean
                                                ) =>
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
                                        <Field
                                            key={user._id}
                                            orientation="horizontal"
                                        >
                                            <Checkbox
                                                id={user._id}
                                                checked={task.assignedTo.includes(
                                                    user._id
                                                )}
                                                onCheckedChange={(
                                                    checked: boolean
                                                ) =>
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
                                    if (
                                        value === 0 ||
                                        value === 1 ||
                                        value === 2
                                    ) {
                                        setTask((prev) => ({
                                            ...prev,
                                            weight: value,
                                        }));
                                    }
                                }}
                                max={2}
                                min={0}
                                step={1}
                            />
                        </FieldSet>

                        <Field orientation="horizontal">
                            <Button type="submit">
                                {isEdit ? 'Save' : 'Submit'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                        </Field>
                    </FieldSet>
                </form>
            </DialogContent>
        </Dialog>
    );
}
