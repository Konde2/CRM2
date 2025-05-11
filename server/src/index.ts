import express from 'express';
import cors from 'cors';
import { registerUser, loginUser } from './auth';
import protectedRoutes from './routes/protected'; // Импортируем защищенные маршруты

const app = express();

// Middleware для обработки JSON
app.use(express.json());

app.use('/api', protectedRoutes);

// Настройка CORS
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', '*']
    })
);

// Маршрут для регистрации
app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('Received data:', req.body); // Логируем полученные данные

        if (!email || !password) {
            return res.status(400).json({ error: 'Email и пароль обязательны' });
        }

        const userId = await registerUser(email, password);
        res.status(201).json({ message: 'Пользователь зарегистрирован', userId });
    } catch (error: any) {
        console.error('Ошибка в /register:', error.message);
        res.status(400).json({ error: error.message });
    }
});

// Маршрут для авторизации
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email и пароль обязательны' });
        }

        const token = await loginUser(email, password);
        res.status(200).json({ token });
    } catch (error: any) {
        console.error('Ошибка в /login:', error.message);
        res.status(400).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));