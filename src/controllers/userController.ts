import { FastifyRequest, FastifyReply } from 'fastify';
import UserService from '../services/UserService.js';
import { CreateUserDTO } from '../dtos/userDTO.js';

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
}

export default UserController;