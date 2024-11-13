import mysql from 'mysql2/promise';

const users = [
  { full_name: 'Alice Johnson', role: 'admin', efficiency: 85 },
  { full_name: 'Bob Smith', role: 'user', efficiency: 75 },
  { full_name: 'Charlie Brown', role: 'user', efficiency: 80 },
  { full_name: 'Diana Prince', role: 'moderator', efficiency: 90 },
  { full_name: 'Edward Nygma', role: 'user', efficiency: 65 },
  { full_name: 'Fiona Gallagher', role: 'user', efficiency: 70 },
  { full_name: 'George Costanza', role: 'user', efficiency: 60 },
  { full_name: 'Hannah Abbott', role: 'moderator', efficiency: 85 },
  { full_name: 'Isaac Newton', role: 'user', efficiency: 95 },
  { full_name: 'Jackie Chan', role: 'admin', efficiency: 88 }
];

export const seed = async (connection: mysql.Pool): Promise<void> => {
  for (const user of users) {
    await connection.query(
        `INSERT INTO users (full_name, role, efficiency)
       VALUES (?, ?, ?)`,
        [user.full_name, user.role, user.efficiency]
    );
  }
};