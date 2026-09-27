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
import { useState } from 'react';

export default function Test() {
    const [weight, setWeight] = useState(1);

    return (
        <form className="w-full flex justify-center py-3">
            <FieldSet className="w-1/2 center px-2 py-4 border">
                <h2 className="text-center text-xl">Create a task</h2>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="title">Title</FieldLabel>
                        <Input
                            id="title"
                            autoComplete="off"
                            placeholder="Vacuum"
                            required
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
                        />
                    </Field>
                </FieldGroup>

                <div className="flex justify-between">
                    <FieldSet className="w-1/2">
                        <FieldLegend>Room(s)</FieldLegend>
                        <FieldGroup className="gap-1">
                            <Field orientation="horizontal">
                                <Checkbox id="living-room" />
                                <FieldLabel htmlFor="living-room">
                                    Living room
                                </FieldLabel>
                            </Field>
                            <Field orientation="horizontal">
                                <Checkbox id="bedroom" />
                                <FieldLabel htmlFor="bedroom">
                                    Bedroom
                                </FieldLabel>
                            </Field>
                            <Field orientation="horizontal">
                                <Checkbox id="bathroom" />
                                <FieldLabel htmlFor="bathroom">
                                    Bathroom
                                </FieldLabel>
                            </Field>
                        </FieldGroup>
                    </FieldSet>

                    <FieldSet className="w-1/2">
                        <FieldLegend>Assignee</FieldLegend>
                        <FieldGroup className="gap-1">
                            <Field orientation="horizontal">
                                <Checkbox id="ilya" />
                                <FieldLabel htmlFor="ilya">Ilya</FieldLabel>
                            </Field>
                            <Field orientation="horizontal">
                                <Checkbox id="ilyas" />
                                <FieldLabel htmlFor="ilyas">Ilyas</FieldLabel>
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                </div>

                <FieldSet>
                    <FieldLegend>Weight</FieldLegend>
                    <FieldDescription>
                        Set desired weight to the task (
                        <span className="font-medium tabular-nums">
                            {weight}
                        </span>
                        )
                    </FieldDescription>
                    <Slider
                        value={weight}
                        onValueChange={(value) => setWeight(value as number)}
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
