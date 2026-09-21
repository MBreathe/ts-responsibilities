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
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from './ui';
import { SwapIcon } from '@phosphor-icons/react';
import { useState } from 'react';

type ItemProps = {
    title: string;
    description: string | null | undefined;
};

export function TaskItem({ title, description }: ItemProps) {
    const [user, setUser] = useState('');

    return (
        <Item variant="outline">
            <ItemContent>
                <ItemTitle>{title}</ItemTitle>
                <ItemDescription>{description}</ItemDescription>
            </ItemContent>
            <ItemActions>
                <ButtonGroup>
                    <Button variant="default" size="icon-sm">
                        <PencilIcon />
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger
                            render={
                                <Button variant="secondary" size="icon-sm">
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
                                <DropdownMenuRadioGroup
                                    value={user}
                                    onValueChange={setUser}
                                >
                                    <DropdownMenuRadioItem value="Ilya">
                                        Ilya
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Ilyas">
                                        Ilyas
                                    </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button variant="destructive" size="icon-sm">
                        <TrashIcon />
                    </Button>
                </ButtonGroup>
            </ItemActions>
        </Item>
    );
}
