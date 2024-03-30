import { useOutlet } from 'react-router-dom';
import { AuthProvider } from './auth.context';

export const AuthProvidingLayout = () => {
  const outlet = useOutlet();

  return <AuthProvider>{outlet}</AuthProvider>;
};
