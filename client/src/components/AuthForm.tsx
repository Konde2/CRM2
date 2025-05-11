import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';

interface AuthFormProps {
    mode: 'login' | 'register';
}

const AuthForm = ({ mode }: AuthFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/${mode}`, { email, password });
            const token = response.data.token;

            // Сохраняем токен в cookies
            Cookies.set('token', token, { expires: 1 }); // Токен будет храниться 1 день

            // Перенаправляем на страницу личного кабинета
            window.location.href = '/dashboard';
        } catch (error: any) {
            setMessage(error.response?.data?.error || 'Произошла ошибка');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{mode === 'login' ? 'Вход' : 'Регистрация'}</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">{mode === 'login' ? 'Войти' : 'Зарегистрироваться'}</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default AuthForm;