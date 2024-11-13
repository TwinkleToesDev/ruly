import connection from '../config/db.js';
import { User } from '../models/User.js';

export class UserRepository {
    async createUser(user: User): Promise<number> {
        const query = 'INSERT INTO users (full_name, role, efficiency) VALUES (?, ?, ?)';
        const [result] = await connection.execute(query, [user.fullName, user.role, user.efficiency]);

        return (result as any).insertId;
    }
}