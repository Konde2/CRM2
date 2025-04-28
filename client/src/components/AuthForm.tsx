import React, { useState } from 'react';
import axios from 'axios';

interface AuthFormProps {
    mode: 'login' | 'register';
}

const AuthForm = ({ mode }: AuthFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setMessage('Пожалуйста, заполните все поля');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5000/${mode}`, { email, password });
            setMessage(response.data.message || 'Успешно!');
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