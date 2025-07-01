export interface AuthResponse {
  token: string;
  user: {
    _id: string;
    email: string;
    role: 'user' | 'admin';
  };
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  confirmPassword: string;
}
