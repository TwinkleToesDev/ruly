export const createUserSchema = {
    body: {
        type: 'object',
        required: ['full_name', 'role', 'efficiency'],
        properties: {
            full_name: { type: 'string', minLength: 1, maxLength: 255 },
            role: { type: 'string', minLength: 1, maxLength: 255 },
            efficiency: { type: 'integer', minimum: 0 },
        },
        additionalProperties: false,
    },
    response: {
        200: {
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                result: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                    },
                },
            },
        },
    },
};