'use client';
import { Button, ItemGroup } from '@/components/ui';
import { CompleteItem } from '@/components/completeItem';
import { PlusIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { fetchUtil } from '@/utils/fetch';

type User = { name: string };
type Task = { name: string; descriotion: string };

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
    const unassignedTasks = [
        { name: 'Task1', description: 'Task1 description' },
        { name: 'Task2', description: 'Task2 description' },
        { name: 'Task3', description: 'Task3 description' },
    ];
    const tasksIlya = [
        { name: 'Task4', description: 'Task4 description' },
        { name: 'Task5', description: 'Task5 description' },
        { name: 'Task6', description: 'Task6 description' },
    ];
    const tasksIlyas = [
        { name: 'Task7', description: 'Task7 description' },
        { name: 'Task8', description: 'Task8 description' },
        { name: 'Task9', description: 'Task9 description' },
    ];

    return (
        <div>
            <div className="px-6 py-2">
                <h1 className="py-4 text-center">Unassigned:</h1>
                <ItemGroup>
                    {unassignedTasks.map((item, index) => {
                        return (
                            <CompleteItem
                                key={index}
                                name={item.name}
                                description={item.description}
                            />
                        );
                    })}
                </ItemGroup>

                {users.map((user, index) => {
                    return (
                        <div key={index}>
                            <h1 className="py-2 text-center">{user.name}:</h1>
                            <ItemGroup>
                                {user.name === 'Ilya'
                                    ? tasksIlya.map((item, index) => {
                                          return (
                                              <CompleteItem
                                                  key={index}
                                                  name={item.name}
                                                  description={item.description}
                                              />
                                          );
                                      })
                                    : tasksIlyas.map((item, index) => {
                                          return (
                                              <CompleteItem
                                                  key={index}
                                                  name={item.name}
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
