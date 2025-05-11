import withAuth from '../components/withAuth';

const Dashboard = () => {
    return (
        <div>
            <h1>Личный кабинет</h1>
            <p>Добро пожаловать в ваш личный кабинет!</p>
            <button onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/';
            }}>
                Выйти
            </button>
        </div>
    );
};

export default withAuth(Dashboard);