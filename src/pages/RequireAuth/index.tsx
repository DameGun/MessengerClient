import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Center, Spinner, Text } from '@chakra-ui/react';
import { Tokens } from '@customTypes/authentication';
import { getCookie } from '@helpers/cookies';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useTokensRefreshMutation } from '@services/redux/auth/authApiSlice';
import {
  logout,
  selectCurrentToken,
  selectIsAuthorized,
  setCredentials,
} from '@services/redux/auth/authSlice';

export default function RequireAuth() {
  const token = useAppSelector(selectCurrentToken);
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const [loading, setLoading] = useState(true);
  const [refresh] = useTokensRefreshMutation();
  const dispatch = useAppDispatch();

  async function appMount() {
    setLoading(true);

    if (!token) {
      const accessToken = getCookie('accessToken');
      if (accessToken) {
        dispatch(setCredentials({ accessToken } as Tokens));
      } else {
        const refreshToken = getCookie('refreshToken');
        if (refreshToken) {
          try {
            const tokens = await refresh(refreshToken).unwrap();
            dispatch(setCredentials(tokens));
          } catch (err) {
            console.error('Error occured while trying to refresh auth state:', err);
            dispatch(logout());
          }
        }
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    const id = setTimeout(() => {
      appMount();
    }, 500);

    return () => clearTimeout(id);
  });

  return loading ? (
    <Center h='100vh' flexDirection='column' gap={10}>
      <Spinner size='xl' speed='1s' />
      <Text fontSize='xl'>Loading... Please wait</Text>
    </Center>
  ) : isAuthorized ? (
    <Outlet />
  ) : (
    <Navigate to='/login' replace />
  );
}
