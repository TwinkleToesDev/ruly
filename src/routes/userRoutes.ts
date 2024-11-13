import { FastifyInstance } from 'fastify';
import UserController from '../controllers/userController.js';
import { createUserSchema, getUserSchema, updateUserSchema, deleteUserSchema } from '../validators/userValidator.js';

export default async function userRoutes(fastify: FastifyInstance) {
    const userController = new UserController();

    fastify.route({
        method: 'POST',
        url: '/create',
        schema: createUserSchema,
        handler: userController.createUser,
    });

    fastify.route({
        method: 'GET',
        url: '/get',
        schema: getUserSchema,
        handler: userController.getUsers,
    });

    fastify.route({
        method: 'GET',
        url: '/get/:id',
        schema: getUserSchema,
        handler: userController.getUserById,
    });

    fastify.route({
        method: 'PATCH',
        url: '/update/:id',
        schema: updateUserSchema,
        handler: userController.updateUser,
    });

    fastify.route({
        method: 'DELETE',
        url: '/delete/:id',
        schema: deleteUserSchema,
        handler: userController.deleteUserById,
    });

    fastify.route({
        method: 'DELETE',
        url: '/delete',
        schema: deleteUserSchema,
        handler: userController.deleteAllUsers,
    });
}