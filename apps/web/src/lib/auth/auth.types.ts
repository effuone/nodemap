type RegistrationData = {
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

type UserData = {
  id: number;
  email: string;
  userId: number;
};

export type { RegistrationData, LoginData, UserData };
