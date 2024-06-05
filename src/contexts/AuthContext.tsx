import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  email: string;
}

interface AuthContextProps {
    user: User | null;
    login: (email: string, password: string) => void;
    logout: () => void;
}
  
const AuthContext = createContext<AuthContextProps>({
    user: null,
    login: (email: string, password: string) => {},
    logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    setUser({ email });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
