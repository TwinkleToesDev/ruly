import UserModel from '../models/userModel.js';
import { CreateUserDTO } from '../dtos/userDTO.js';

class UserService {
    private userModel: UserModel;

    constructor() {
        this.userModel = new UserModel();
    }

    public async createUser(userData: CreateUserDTO): Promise<number> {
        // Здесь можно добавить дополнительную бизнес-логику или валидацию
        const userId = await this.userModel.create(userData);
        return userId;
    }
}

export default UserService;