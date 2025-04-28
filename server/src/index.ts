import express, { Request, Response } from 'express';
import cors from 'cors';
import { registerUser, loginUser } from './auth';

const app = express();
app.use(express.json());

// Настройка CORS
app.use(
    cors({
        origin: 'http://localhost:3000', // Разрешаем запросы только с этого домена
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешенные методы HTTP
        allowedHeaders: ['Content-Type', 'Authorization'], // Разрешенные заголовки
    })
);

// Регистрация
app.post('/register', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const userId = await registerUser(email, password);
        res.status(201).json({ message: 'Пользователь зарегистрирован', userId });
    } catch (error) {
        // @ts-ignore
        res.status(400).json({ error: error.message });
    }
});

// Авторизация
app.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const token = await loginUser(email, password);
        res.status(200).json({ token });
    } catch (error) {
        // @ts-ignore
        res.status(400).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));