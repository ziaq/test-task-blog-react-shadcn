import { useMutation } from '@tanstack/react-query';

import { login } from '../api/login';
import { useAuthStore } from '../store/auth-store';

export const useLogin = () => {
  const { setAccessToken } = useAuthStore.getState();

  return useMutation({
    mutationFn: login,
    onSuccess: (token) => setAccessToken(token),
  });
};