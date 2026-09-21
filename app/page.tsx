'use client';
import { Button, ItemGroup } from '@/components/ui';
import { PlusIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { fetchUtil } from '@/utils/fetch';
import { TaskItem } from '@/components/TaskItem';

type User = { name: string };
type Task = { title: string; description: string };

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
    const tasksIlya = [
        { title: 'Task4', description: 'Task4 description' },
        { title: 'Task5', description: 'Task5 description' },
        { title: 'Task6', description: 'Task6 description' },
    ];
    const tasksIlyas = [
        { title: 'Task7', description: 'Task7 description' },
        { title: 'Task8', description: 'Task8 description' },
        { title: 'Task9', description: 'Task9 description' },
    ];

    return (
        <div>
            <div className="px-6 py-2">
                <h2 className="py-4 text-center">Unassigned:</h2>
                <ItemGroup>
                    {tasks.map((item, index) => {
                        return (
                            <TaskItem
                                key={index}
                                title={item.title}
                                description={item.description}
                            />
                        );
                    })}
                </ItemGroup>

                {users.map((user, index) => {
                    return (
                        <div key={index}>
                            <h2 className="py-2 text-center">{user.name}:</h2>
                            <ItemGroup>
                                {user.name === 'Ilya'
                                    ? tasksIlya.map((item, index) => {
                                          return (
                                              <TaskItem
                                                  key={index}
                                                  title={item.title}
                                                  description={item.description}
                                              />
                                          );
                                      })
                                    : tasksIlyas.map((item, index) => {
                                          return (
                                              <TaskItem
                                                  key={index}
                                                  title={item.title}
                                                  description={item.description}
                                              />
                                          );
                                      })}
                            </ItemGroup>
                        </div>
                    );
                })}
            </div>
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
