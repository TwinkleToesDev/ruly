import db from '../config/db.js';
import { CreateUserDTO } from '../dtos/userDTO.js';
import { ResultSetHeader } from 'mysql2';

class UserModel {
    public async create(userData: CreateUserDTO): Promise<number> {
        const { full_name, role, efficiency } = userData;
        const [result] = await db.execute<ResultSetHeader>(
            'INSERT INTO users (full_name, role, efficiency) VALUES (?, ?, ?)',
            [full_name, role, efficiency]
        );
        return result.insertId;
    }
}

export default UserModel;