import { createContext, ReactNode, useState } from "react";
import axios, { AxiosInstance } from "axios";
import { User } from "../common/interfaces/user.interface";

type AuthContextProviderType = {
  children: ReactNode | ReactNode[];
};

type AuthContextType = {
  instance: AxiosInstance | undefined;
  user?: User | null;
};

const defaultValues: AuthContextType = {
  instance: undefined,
  user: null,
};

export const AuthContext = createContext<AuthContextType>(defaultValues);

export default function AuthProvider({ children }: AuthContextProviderType) {
  const [user, setUser] = useState<User | null>(null);
  const instance = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
      "Content-Type": "application/json",
    },
  });
  instance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      setUser(response.data);
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response) {
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            try {
              const response = await instance.post("/auth/refresh-tokens", {
                refreshToken,
              });
              localStorage.setItem("accessToken", response.data.accessToken);
              localStorage.setItem("refreshToken", response.data.refreshToken);
              return instance(originalRequest);
            } catch (error: any) {
              if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
              }

              return Promise.reject(error);
            }
          }
        }
        if (error.response.status === 403 && error.response.data) {
          return Promise.reject(error.response.data);
        }
      }
      return Promise.reject(error);
    }
  );

  return (
    <AuthContext.Provider
      value={{
        instance,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
