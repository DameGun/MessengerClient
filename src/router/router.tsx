import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '@pages/Login';
import RequireAuth from '@pages/RequireAuth';
import RegisterPage from '@pages/Register';
import Layout from '@pages/Layout';
import Chat from '@pages/Chat';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RequireAuth />,
        children: [
            {
                path: '',
                element: <Layout />,
                children: [
                    {
                        index: true,
                        path: 'chat/:chatId',
                        element: <Chat/>
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    }
])