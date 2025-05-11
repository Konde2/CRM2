import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (Component: any) => {
    const AuthenticatedComponent = (props: any) => {
        const router = useRouter();

        useEffect(() => {
            const token = Cookies.get('token'); // Читаем токен из cookies
            if (!token) {
                router.push('/login');
            }
        }, []);

        return <Component {...props} />;
    };

    return AuthenticatedComponent;
};

export default withAuth;