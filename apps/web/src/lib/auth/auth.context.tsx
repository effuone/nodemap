import { ReactNode, useMemo } from 'react';
import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import backendApiInstance from '@/services';
import AuthInterceptor from './auth.interceptor';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LoginData, RegistrationData, UserData } from './auth.types';

interface AuthContextType {
  user: UserData | null;
  register: (data: RegistrationData) => Promise<UserData>;
  login: (data: LoginData) => Promise<UserData>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  getProfile: () => Promise<UserData>;
}

type Props = {
  children?: ReactNode;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();

  const register = async (
    registrationData: RegistrationData
  ): Promise<UserData> => {
    const response = await backendApiInstance.post(
      '/auth/register',
      registrationData
    );
    setUser(response.data);
    navigate('/roadmap');
    return response.data;
  };

  const login = async (loginData: LoginData): Promise<UserData> => {
    const response = await backendApiInstance.post('/auth/login', loginData);
    setUser(response.data);
    navigate('/roadmap');
    return response.data;
  };

  const refresh = async (): Promise<void> => {
    await backendApiInstance.get('/auth/refresh');
  };

  const getProfile = async (): Promise<UserData> => {
    const response = await backendApiInstance.get('/auth/me');
    return response.data;
  };

  const logout = async (): Promise<void> => {
    await backendApiInstance.post('/auth/logout');
    setUser(null);
    navigate('/auth', { replace: true });
  };

  AuthInterceptor(backendApiInstance, logout, refresh);

  const value = useMemo(
    () => ({
      user,
      register,
      login,
      logout,
      getProfile,
      refresh,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
