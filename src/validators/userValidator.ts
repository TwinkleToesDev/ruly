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

export const getUserSchema = {
    querystring: {
        type: 'object',
        properties: {
            role: { type: 'string', minLength: 1, maxLength: 255 },
            full_name: { type: 'string', minLength: 1, maxLength: 255 },
            efficiency: { type: 'integer', minimum: 0 },
        },
        additionalProperties: false,
    },
    params: {
        type: 'object',
        properties: {
            id: { type: 'integer', minimum: 1 },
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
                        users: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'integer' },
                                    full_name: { type: 'string' },
                                    role: { type: 'string' },
                                    efficiency: { type: 'integer' },
                                },
                                required: ['id', 'full_name', 'role', 'efficiency'],
                            },
                        },
                    },
                },
            },
        },
    },
};

export const updateUserSchema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'integer', minimum: 1 },
        },
        required: ['id'],
        additionalProperties: false,
    },
    body: {
        type: 'object',
        properties: {
            full_name: { type: 'string', minLength: 1, maxLength: 255 },
            role: { type: 'string', minLength: 1, maxLength: 255 },
            efficiency: { type: 'integer', minimum: 0 },
        },
        minProperties: 1,
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
                        full_name: { type: 'string' },
                        role: { type: 'string' },
                        efficiency: { type: 'integer' },
                    },
                    required: ['id', 'full_name', 'role', 'efficiency'],
                },
            },
        },
    },
};

export const deleteUserSchema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'integer', minimum: 1 },
        },
        additionalProperties: false,
    },
    response: {
        200: {
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                result: {
                    oneOf: [
                        { type: 'object', properties: { id: { type: 'integer' }, full_name: { type: 'string' }, role: { type: 'string' }, efficiency: { type: 'integer' } }, required: ['id', 'full_name', 'role', 'efficiency'] },
                        { type: 'object', additionalProperties: false } // Пустой объект для удаления всех пользователей
                    ]
                }
            },
            required: ['success', 'result'],
        },
    },
};