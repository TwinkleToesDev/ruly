import mysql from 'mysql2/promise';

const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        efficiency INT NOT NULL,
        INDEX idx_role (role),
        INDEX idx_efficiency (efficiency),
        INDEX idx_full_name (full_name)
    );
`;

const dropUsersTable = `DROP TABLE IF EXISTS users;`;

export const up = async (connection: mysql.Pool): Promise<void> => {
    await connection.query(createUsersTable);
};

export const down = async (connection: mysql.Pool): Promise<void> => {
    await connection.query(dropUsersTable);
};