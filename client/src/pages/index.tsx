import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <h1>Личный кабинет</h1>
            <Link href="/login">Вход</Link>
            <br />
            <Link href="/register">Регистрация</Link>
        </div>
    );
}