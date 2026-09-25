import { PencilIcon, TrashIcon } from '@phosphor-icons/react';
import {
    Item,
    ItemContent,
    ItemTitle,
    ItemDescription,
    ItemActions,
    Button,
    ButtonGroup,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    Badge,
    ItemFooter,
    DropdownMenuCheckboxItem,
} from './ui';
import { SwapIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { fetchUtil } from '@/utils';
import { Room, Task, User } from '@/types';

type ItemProps = {
    task: Task;
    onDelete: (id: string) => void;
    onUpdate: (task: Task) => void;
};

export function TaskItem({ task, onDelete, onUpdate }: ItemProps) {
    const [users, setUsers] = useState<User[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        const fetchAll = async () => {
            setRooms(await fetchUtil('api/rooms', 'rooms'));
            setUsers(await fetchUtil('api/users', 'users'));
        };

        fetchAll();
    }, []);

    const toggleAssignee = async (userId: string) => {
        const isAssigned = task.assignedTo.includes(userId);
        const updatedAssignedTo = isAssigned
            ? task.assignedTo.filter((id) => id !== userId)
            : [...task.assignedTo, userId];

        const prevAssignedTo = task.assignedTo;

        onUpdate({ ...task, assignedTo: updatedAssignedTo });

        const result = fetchUtil(`api/tasks/${task._id}`, undefined, {
            method: 'PATCH',
            body: JSON.stringify({ assignedTo: updatedAssignedTo }),
        });

        // safeguard revert
        if (result === undefined) {
            onUpdate({ ...task, assignedTo: prevAssignedTo });
        }
    };

    return (
        <Item variant="outline" className="my-2">
            <ItemContent>
                <ItemTitle className="text-2xl">{task.title}</ItemTitle>
                <div className="flex w-full flex-wrap gap-2">
                    {task.assignedTo.map((asignee) => {
                        return (
                            <Badge key={asignee}>
                                {
                                    users.find((user) => user._id === asignee)
                                        ?.name
                                }
                            </Badge>
                        );
                    })}
                    {task.room.map((assignedRoom) => {
                        return (
                            <Badge key={assignedRoom} variant="secondary">
                                {
                                    rooms.find(
                                        (room) => room._id === assignedRoom
                                    )?.name
                                }
                            </Badge>
                        );
                    })}
                </div>

                <ItemDescription className="mt-3">
                    {task.description}
                </ItemDescription>

                <ItemFooter>
                    {new Date(task.createdOn).toDateString()}
                </ItemFooter>
            </ItemContent>
            <ItemActions>
                <ButtonGroup>
                    <Button
                        variant="default"
                        size="icon-sm"
                        className="cursor-pointer"
                    >
                        <PencilIcon />
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger
                            render={
                                <Button
                                    variant="secondary"
                                    size="icon-sm"
                                    className="cursor-pointer"
                                >
                                    <SwapIcon />
                                </Button>
                            }
                        />
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuLabel className="text-xs">
                                    Assign
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {users.map((user) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={user._id}
                                            checked={task.assignedTo.includes(
                                                user._id
                                            )}
                                            onCheckedChange={() =>
                                                toggleAssignee(user._id)
                                            }
                                            onSelect={(e) => e.preventDefault()}
                                            className="cursor-pointer"
                                        >
                                            {user.name}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                        variant="destructive"
                        size="icon-sm"
                        className="cursor-pointer"
                        onClick={async () => {
                            await fetchUtil(
                                `api/tasks/${task._id}`,
                                undefined,
                                {
                                    method: 'DELETE',
                                }
                            );
                            onDelete(task._id);
                            console.log(
                                `Task with ID: ${task._id} was deleted`
                            );
                        }}
                    >
                        <TrashIcon />
                    </Button>
                </ButtonGroup>
            </ItemActions>
        </Item>
    );
}
