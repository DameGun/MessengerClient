import { createBrowserRouter } from 'react-router-dom';
import Chat from '@pages/Chat';
import Layout from '@pages/Layout';
import LoginPage from '@pages/Login';
import RegisterPage from '@pages/Register';
import RequireAuth from '@pages/RequireAuth';

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
            path: 'c/:chatId',
            element: <Chat />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);
