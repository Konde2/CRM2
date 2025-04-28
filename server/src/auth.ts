import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from './db';

const SECRET_KEY = process.env.JWT_SECRET || 'secret';

// Регистрация пользователя
export const registerUser = async (email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id';
    const values = [email, hashedPassword];
    const result = await pool.query(query, values);
    return result.rows[0].id;
};

// Авторизация пользователя
export const loginUser = async (email: string, password: string) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
        throw new Error('Пользователь не найден');
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
        throw new Error('Неверный пароль');
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    return token;
};