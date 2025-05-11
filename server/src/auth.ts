import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from './db';

const SECRET_KEY = process.env.JWT_SECRET || '8f7a2b3e9c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f';

// Регистрация пользователя
export const registerUser = async (email: string, password: string) => {
    try {
        // Проверка входных данных
        if (!email || !password) {
            throw new Error('Email и пароль обязательны' + email + password );
        }

        // Хэширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // Проверка, существует ли пользователь с таким email
        const checkQuery = 'SELECT * FROM users WHERE email = $1';
        const checkResult = await pool.query(checkQuery, [email]);

        if (checkResult.rows.length > 0) {
            throw new Error('Пользователь с таким email уже существует');
        }

        // Добавление пользователя в базу данных
        const query = 'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id';
        const values = [email, hashedPassword];
        const result = await pool.query(query, values);

        return result.rows[0].id;
    } catch (error) {
        console.error('Ошибка при регистрации:', error);
        throw error; // Передаем ошибку дальше для обработки в маршруте
    }
};

// Авторизация пользователя
export const loginUser = async (email: string, password: string) => {
    try {
        // Проверка входных данных
        if (!email || !password) {
            throw new Error('Email и пароль обязательны');
        }

        // Поиск пользователя по email
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await pool.query(query, [email]);

        if (result.rows.length === 0) {
            throw new Error('Пользователь с таким email не найден');
        }

        const user = result.rows[0];

        // Проверка пароля
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            throw new Error('Неверный пароль');
        }

        // Создание JWT-токена
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
        return token;
    } catch (error) {
        console.error('Ошибка при авторизации:', error);
        throw error; // Передаем ошибку дальше для обработки в маршруте
    }
};