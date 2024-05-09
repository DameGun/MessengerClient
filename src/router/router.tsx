import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '@pages/Login';
import App from '@pages/Layout';
import RequireAuth from '@pages/RequireAuth';
import RegisterPage from '@pages/Register';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RequireAuth />,
        children: [
            {
                path: "",
                element: <App />
            }
        ]
    },
    {
        path: 'login',
        element: <LoginPage />
    },
    {
        path: 'register',
        element: <RegisterPage />
    }
])