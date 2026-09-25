'use client';
import { Button, ItemGroup } from '@/components/ui';
import { PlusIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { fetchUtil } from '@/utils';
import { TaskItem } from '@/components/TaskItem';
import { Task, User } from '@/types';

export default function Home() {
    const [users, setUsers] = useState<User[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetchAll = async () => {
            setTasks(await fetchUtil('api/tasks', 'tasks'));
            setUsers(await fetchUtil('api/users', 'users'));
        };

        fetchAll();
    }, []);

    const handleDelete = async (id: string) => {
        setTasks((prev) => prev.filter((task) => task._id !== id));
    };
    const handleUpdate = async (updatedTask: Task) => {
        setTasks((prev) =>
            prev.map((task) =>
                task._id === updatedTask._id ? updatedTask : task
            )
        );
    };

    return (
        <div>
            <ItemGroup className="px-6 py-2">
                {tasks.map((item) => {
                    return (
                        <TaskItem
                            key={item._id}
                            task={item}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                        />
                    );
                })}
            </ItemGroup>

            <Button
                variant="outline"
                size="icon-lg"
                className="fixed right-6 bottom-6"
            >
                <PlusIcon />
            </Button>
        </div>
    );
}
