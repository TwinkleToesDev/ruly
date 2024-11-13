import { FastifyInstance } from 'fastify';
import UserController from '../controllers/userController.js';
import { createUserSchema } from '../validators/userValidator.js';

export default async function userRoutes(fastify: FastifyInstance) {
    const userController = new UserController();

    fastify.route({
        method: 'POST',
        url: '/create',
        schema: createUserSchema,
        handler: userController.createUser,
    });

    // Здесь можно добавить другие маршруты (GET, PATCH, DELETE)
}