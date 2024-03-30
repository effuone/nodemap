import { useContext } from 'react';
import { AuthContext } from '../auth/auth.context';

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error('No context provided');
  return authContext;
};
