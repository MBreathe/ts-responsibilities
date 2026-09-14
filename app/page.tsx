'use client';
import { Button } from '@/components/ui/button';
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemTitle,
} from '@/components/ui/item';
import { PencilIcon, TrashIcon } from '@phosphor-icons/react';

export default function Home() {
    const unassignedTasks = [
        { name: 'Task1', description: 'Task1 description' },
        { name: 'Task2', description: 'Task2 description' },
        { name: 'Task3', description: 'Task3 description' },
    ];
    const users = [{ name: 'Ilya' }, { name: 'Ilyas' }];
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
        <div className="p-5">
            <h1 className="p-2">Unassigned:</h1>
            <ItemGroup>
                {unassignedTasks.map((item, index) => {
                    return (
                        <Item variant="outline" key={index}>
                            <ItemContent>
                                <ItemTitle>{item.name}</ItemTitle>
                                <ItemDescription>
                                    {item.description}
                                </ItemDescription>
                            </ItemContent>
                            <ItemActions>
                                <Button variant="default" size="sm">
                                    <PencilIcon />
                                </Button>
                                <Button variant="destructive" size="sm">
                                    <TrashIcon />
                                </Button>
                            </ItemActions>
                        </Item>
                    );
                })}
            </ItemGroup>

            {users.map((user, index) => {
                return (
                    <div key={index}>
                        <h1 className="p-2">{user.name}:</h1>
                        <ItemGroup>
                            {user.name === 'Ilya'
                                ? tasksIlya.map((item, index) => {
                                      return (
                                          <Item variant="outline" key={index}>
                                              <ItemContent>
                                                  <ItemTitle>
                                                      {item.name}
                                                  </ItemTitle>
                                                  <ItemDescription>
                                                      {item.description}
                                                  </ItemDescription>
                                              </ItemContent>
                                              <ItemActions>
                                                  <Button
                                                      variant="default"
                                                      size="sm"
                                                  >
                                                      <PencilIcon />
                                                  </Button>
                                                  <Button
                                                      variant="destructive"
                                                      size="sm"
                                                  >
                                                      <TrashIcon />
                                                  </Button>
                                              </ItemActions>
                                          </Item>
                                      );
                                  })
                                : tasksIlyas.map((item, index) => {
                                      return (
                                          <Item variant="outline" key={index}>
                                              <ItemContent>
                                                  <ItemTitle>
                                                      {item.name}
                                                  </ItemTitle>
                                                  <ItemDescription>
                                                      {item.description}
                                                  </ItemDescription>
                                              </ItemContent>
                                              <ItemActions>
                                                  <Button
                                                      variant="default"
                                                      size="sm"
                                                  >
                                                      <PencilIcon />
                                                  </Button>
                                                  <Button
                                                      variant="destructive"
                                                      size="sm"
                                                  >
                                                      <TrashIcon />
                                                  </Button>
                                              </ItemActions>
                                          </Item>
                                      );
                                  })}
                        </ItemGroup>
                    </div>
                );
            })}
        </div>
    );
}
