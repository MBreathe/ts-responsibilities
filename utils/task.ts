import mongoose from 'mongoose';

type TaskInput = {
    title?: unknown;
    createdBy?: unknown;
    assignedTo?: unknown;
    room?: unknown;
    weight?: unknown;
    description?: unknown;
};

type ValidationResult =
    | {
          valid: true;
          data: {
              title: string;
              createdBy: string;
              assignedTo?: string[];
              room?: string[];
              weight: 0 | 1 | 2;
              description?: string;
          };
      }
    | { valid: false; error: string };

export function validateTaskParams(
    body: TaskInput,
    options: { partial?: boolean } = {}
): ValidationResult {
    const { partial = false } = options;
    const { title, createdBy, assignedTo, room, weight, description } = body;

    // Required fields potentially skipped in PATCH
    if (!partial) {
        if (!createdBy) {
            return { valid: false, error: 'createdBy is required' };
        }
        if (weight === undefined || weight === null) {
            return { valid: false, error: 'weight is required' };
        }
    }

    if (createdBy !== undefined) {
        if (
            typeof createdBy !== 'string' ||
            !mongoose.Types.ObjectId.isValid(createdBy)
        ) {
            return { valid: false, error: 'Invalid createdBy ID' };
        }
    }

    if (assignedTo !== undefined && assignedTo !== null) {
        if (
            !Array.isArray(assignedTo) ||
            !assignedTo.every(
                (id) =>
                    typeof id === 'string' &&
                    mongoose.Types.ObjectId.isValid(id)
            )
        ) {
            return { valid: false, error: 'Invalid assignedTo IDs' };
        }
    }

    if (room !== undefined && room !== null) {
        if (
            !Array.isArray(room) ||
            !room.every(
                (id) =>
                    typeof id === 'string' &&
                    mongoose.Types.ObjectId.isValid(id)
            )
        ) {
            return { valid: false, error: 'Invalid room IDs' };
        }
    }

    if (weight !== undefined) {
        if (![0, 1, 2].includes(weight as number)) {
            return { valid: false, error: 'weight must be 0, 1, or 2' };
        }
    }

    if (title !== undefined && typeof title !== 'string') {
        return { valid: false, error: 'title must be a string' };
    }

    if (description !== undefined && typeof description !== 'string') {
        return { valid: false, error: 'description must be a string' };
    }

    return {
        valid: true,
        data: {
            title: title as string,
            createdBy: createdBy as string,
            assignedTo: assignedTo as string[] | undefined,
            room: room as string[] | undefined,
            weight: weight as 0 | 1 | 2,
            description: description as string | undefined,
        },
    };
}
