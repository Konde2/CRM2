import withAuth from '../components/withAuth';

const Profile = () => {
    return (
        <div>
            <h1>Профиль</h1>
            <p>Здесь будет информация о вашем профиле.</p>
        </div>
    );
};

export default withAuth(Profile);