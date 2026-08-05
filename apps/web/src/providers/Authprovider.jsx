import { useEffect, useMemo, useState } from "react";
import AuthContext from "../context/AuthContext";
import tokenManager from "../utils/tokenManager";
import authService from "../services/auth.service";



const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = ({ user, accessToken }) => {
    tokenManager.setToken(accessToken);
    setUser(user);
  };

  const logout = () => {
    tokenManager.clearToken();
    setUser(null);
    setLoading(false);
  };

  const updateAccessToken = (accessToken) => {
    tokenManager.setToken(accessToken);
  };

useEffect(() => {


  const restoreSession = async () => {

    try {
      const response = await authService.refreshToken();

    

      const { accessToken, user } = response.data.data;

      tokenManager.setToken(accessToken);

      setUser(user);
    } catch (error) {
      console.error("❌ Refresh Failed:", error);

      tokenManager.clearToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  restoreSession();
}, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      login,
      logout,
      updateAccessToken,
      setUser,
      setLoading,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;