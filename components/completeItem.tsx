import { PencilIcon, TrashIcon } from '@phosphor-icons/react';
import {
    Item,
    ItemContent,
    ItemTitle,
    ItemDescription,
    ItemActions,
    Button,
    ButtonGroup,
} from './ui';
import { SwapIcon } from '@phosphor-icons/react';

type ItemProps = {
    name: string;
    description: string | null | undefined;
};

export function CompleteItem({ name, description }: ItemProps) {
    return (
        <Item variant="outline">
            <ItemContent>
                <ItemTitle>{name}</ItemTitle>
                <ItemDescription>{description}</ItemDescription>
            </ItemContent>
            <ItemActions>
                <ButtonGroup>
                    <Button variant="default" size="icon-sm">
                        <PencilIcon />
                    </Button>
                    <Button variant="secondary" size="icon-sm">
                        <SwapIcon />
                    </Button>
                    <Button variant="destructive" size="icon-sm">
                        <TrashIcon />
                    </Button>
                </ButtonGroup>
            </ItemActions>
        </Item>
    );
}
