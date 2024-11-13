import { FastifyRequest, FastifyReply } from 'fastify';
import UserService from '../services/UserService.js';
import {
    CreateUserDTO,
    GetUsersQueryDTO,
    UserDTO,
    UpdateUserDTO
} from '../dtos/userDTO.js';

class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public createUser = async (
        request: FastifyRequest<{ Body: CreateUserDTO }>,
        reply: FastifyReply
    ): Promise<void> => {
        try {
            const userData = request.body;
            const userId = await this.userService.createUser(userData);
            reply.send({ success: true, result: { id: userId } });
        } catch (error: any) {
            reply.status(500).send({ success: false, result: { error: error.message } });
        }
    };

    public getUsers = async (
        request: FastifyRequest<{ Querystring: GetUsersQueryDTO }>,
        reply: FastifyReply
    ): Promise<void> => {
        try {
            const filters = request.query;
            const users = await this.userService.getUsers(filters);
            reply.send({ success: true, result: { users } });
        } catch (error: any) {
            reply.status(500).send({ success: false, result: { error: error.message } });
        }
    };

    public getUserById = async (
        request: FastifyRequest<{ Params: { id: number } }>,
        reply: FastifyReply
    ): Promise<void> => {
        try {
            const userId = request.params.id;
            const user = await this.userService.getUserById(userId);
            if (!user) {
                reply.status(404).send({ success: false, result: { error: 'User not found' } });
                return;
            }
            reply.send({ success: true, result: { users: [user] } });
        } catch (error: any) {
            reply.status(500).send({ success: false, result: { error: error.message } });
        }
    };

    public updateUser = async (
        request: FastifyRequest<{ Params: { id: number }; Body: UpdateUserDTO }>,
        reply: FastifyReply
    ): Promise<void> => {
        try {
            const userId = request.params.id;
            const updateData = request.body;

            const updatedUser = await this.userService.updateUser(userId, updateData);

            if (!updatedUser) {
                reply.status(404).send({ success: false, result: { error: 'User not found' } });
                return;
            }

            reply.send({ success: true, result: updatedUser });
        } catch (error: any) {
            reply.status(500).send({ success: false, result: { error: error.message } });
        }
    };

    public deleteUserById = async (
        request: FastifyRequest<{ Params: { id: number } }>,
        reply: FastifyReply
    ): Promise<void> => {
        try {
            const userId = request.params.id;
            const deletedUser = await this.userService.deleteUserById(userId);

            if (!deletedUser) {
                reply.status(404).send({ success: false, result: { error: 'User not found' } });
                return;
            }

            reply.send({ success: true, result: deletedUser });
        } catch (error: any) {
            reply.status(500).send({ success: false, result: { error: error.message } });
        }
    };

    public deleteAllUsers = async (
        request: FastifyRequest,
        reply: FastifyReply
    ): Promise<void> => {
        try {
            await this.userService.deleteAllUsers();
            reply.send({ success: true, result: {} });
        } catch (error: any) {
            reply.status(500).send({ success: false, result: { error: error.message } });
        }
    }
}

export default UserController;