import db from '../config/db.js';
import {
    CreateUserDTO,
    GetUsersQueryDTO,
    UserDTO,
    UpdateUserDTO
} from '../dtos/userDTO.js';
import {ResultSetHeader, RowDataPacket} from 'mysql2';

class UserModel {
    public async create(userData: CreateUserDTO): Promise<number> {
        const { full_name, role, efficiency } = userData;
        const [result] = await db.execute<ResultSetHeader>(
            'INSERT INTO users (full_name, role, efficiency) VALUES (?, ?, ?)',
            [full_name, role, efficiency]
        );
        return result.insertId;
    }

    public async findAll(filters: GetUsersQueryDTO): Promise<UserDTO[]> {
        let query = 'SELECT id, full_name, role, efficiency FROM users';
        const queryParams: any[] = [];

        const filterConditions: string[] = [];
        if (filters.role) {
            filterConditions.push('role = ?');
            queryParams.push(filters.role);
        }
        if (filters.full_name) {
            filterConditions.push('full_name = ?');
            queryParams.push(filters.full_name);
        }
        if (filters.efficiency) {
            filterConditions.push('efficiency = ?');
            queryParams.push(filters.efficiency);
        }

        if (filterConditions.length > 0) {
            query += ' WHERE ' + filterConditions.join(' AND ');
        }

        const [rows] = await db.execute<RowDataPacket[]>(query, queryParams);
        return rows as UserDTO[];
    }

    public async findById(id: number): Promise<UserDTO | null> {
        const [rows] = await db.execute<RowDataPacket[]>(
            'SELECT id, full_name, role, efficiency FROM users WHERE id = ?',
            [id]
        );
        if (rows.length === 0) {
            return null;
        }
        return rows[0] as UserDTO;
    }

    public async update(id: number, updateData: UpdateUserDTO): Promise<UserDTO> {
        const fields: string[] = [];
        const values: any[] = [];

        if (updateData.full_name !== undefined) {
            fields.push('full_name = ?');
            values.push(updateData.full_name);
        }
        if (updateData.role !== undefined) {
            fields.push('role = ?');
            values.push(updateData.role);
        }
        if (updateData.efficiency !== undefined) {
            fields.push('efficiency = ?');
            values.push(updateData.efficiency);
        }

        values.push(id);

        const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
        const [result] = await db.execute<ResultSetHeader>(query, values);

        const updatedUser = await this.findById(id);

        if (!updatedUser) {
            throw new Error('Failed to retrieve updated user');
        }

        return updatedUser;
    }

    public async deleteById(id: number): Promise<void> {
        await db.execute<ResultSetHeader>('DELETE FROM users WHERE id = ?', [id]);
    }

    public async deleteAll(): Promise<void> {
        await db.execute<ResultSetHeader>('DELETE FROM users');
    }
}

export default UserModel;