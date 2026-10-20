import { ItemGroup } from '@/components/ui';
import { TaskItem } from '@/components/TaskItem';
import TaskDialog from '@/components/TaskDialog';
import { getRooms, getTasks, getUsers } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function Home() {
    const [tasks, users, rooms] = await Promise.all([
        getTasks(),
        getUsers(),
        getRooms(),
    ]);

    return (
        <div>
            <ItemGroup className="px-6 py-2">
                {tasks.map((task) => (
                    <TaskItem
                        key={task._id}
                        task={task}
                        users={users}
                        rooms={rooms}
                    />
                ))}
            </ItemGroup>

            <TaskDialog users={users} rooms={rooms} />
        </div>
    );
}
