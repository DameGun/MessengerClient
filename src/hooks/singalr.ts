import { useAppSelector } from './redux';
import { selectCurrentToken } from '@services/redux/auth/authSlice';
import { getSignalRConnection } from '@services/signalr/hub';
import { useEffect, useState } from 'react';

export function useSignalRConnection() {
  const token = useAppSelector(selectCurrentToken)!;
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function mount() {
      await getSignalRConnection(token);
      setLoading(false);
    }

    mount();
  }, [token]);

  return { isLoading };
}
