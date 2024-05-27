import { Center, Spinner, Text } from "@chakra-ui/react";
import { getCookie } from "@helpers/cookies";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useTokensRefreshMutation } from "@services/redux/auth/authApiSlice";
import {
  selectCurrentToken,
  selectIsAuthorized,
  setCredentials,
} from "@services/redux/auth/authSlice";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {
  const token = useAppSelector(selectCurrentToken);
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const [loading, setLoading] = useState(true);
  const [refresh] = useTokensRefreshMutation();
  const dispatch = useAppDispatch();

  async function appMount() {
    setLoading(true);

    if (!token) {
      const accessToken = getCookie("accessToken");
      if (accessToken) {
        dispatch(setCredentials({ accessToken }));
      } else {
        const refreshToken = getCookie("refreshToken");
        if (refreshToken) {
          const tokens = await refresh(refreshToken).unwrap();
          dispatch(setCredentials(tokens));
        }
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    const id = setTimeout(() => appMount(), 500);

    return () => clearTimeout(id);
  }, []);

  return loading ? (
    <Center h="100vh" flexDirection="column" gap={10}>
      <Spinner size="xl" speed="1s" />
      <Text fontSize="xl">Loading... Please wait</Text>
    </Center>
  ) : isAuthorized ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}
