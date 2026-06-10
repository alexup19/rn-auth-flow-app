import { useState } from 'react';
import { useLogin } from 'hooks';

export function useLoginScreen() {
  const { flowState, login, reset } = useLogin();
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password');

  const isLoading = flowState.phase === 'loading';
  const isError = flowState.phase === 'error';
  const errorMessage = isError ? flowState.message : undefined;

  const handleSubmit = () => {
    login({ email, password });
  };

  const fillDemoAccount = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password');
    reset();
  };

  return {
    email,
    password,
    isLoading,
    isError,
    errorMessage,
    setEmail,
    setPassword,
    handleSubmit,
    fillDemoAccount,
  };
}