import UserModel from '../models/userModel.js';
import {CreateUserDTO, GetUsersQueryDTO, UpdateUserDTO, UserDTO} from '../dtos/userDTO.js';

class UserService {
    private userModel: UserModel;

    constructor() {
        this.userModel = new UserModel();
    }

    public async createUser(userData: CreateUserDTO): Promise<number> {
        return await this.userModel.create(userData);
    }

    public async getUsers(filters: GetUsersQueryDTO): Promise<UserDTO[]> {
        return await this.userModel.findAll(filters);
    }

    public async getUserById(id: number): Promise<UserDTO | null> {
        return await this.userModel.findById(id);
    }

    public async updateUser(id: number, updateData: UpdateUserDTO): Promise<UserDTO | null> {
        const existingUser = await this.userModel.findById(id);
        if (!existingUser) {
            return null;
        }

        return await this.userModel.update(id, updateData);
    }

    public async deleteUserById(id: number): Promise<UserDTO | null> {
        const existingUser = await this.userModel.findById(id);
        if (!existingUser) {
            return null;
        }

        await this.userModel.deleteById(id);

        return existingUser;
    }

    public async deleteAllUsers(): Promise<void> {
        await this.userModel.deleteAll();
    }
}

export default UserService;