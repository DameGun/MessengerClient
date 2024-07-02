import { useEffect, useState } from 'react';
import { selectCurrentToken } from '@services/redux/auth/authSlice';
import { getSignalRConnection } from '@services/signalr/hub';
import { useAppSelector } from './redux';

export function useSignalRConnection() {
  const token = useAppSelector(selectCurrentToken)!;
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function mount() {
      await getSignalRConnection(token);
    }

    mount()
      .then(() => setLoading(false))
      .catch(console.error);
  }, [token]);

  return { isLoading };
}
