import { useContext,useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register, logout } from "../services/auth.api.js";
import { getMe } from "../services/auth.api.js";

export const useAuth = () => {
  
  const context = useContext(AuthContext);

  const {
    isUserLoggedIn,
    setIsUserLoggedIn,
    loading,
    setLoading,
  } = context;

  const handleLogin = async ({ email, password }) => {

    setLoading(true);

    try {
      const data = await login({ email, password });
      setIsUserLoggedIn(data.user);
      return data;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ email, password, username }) => {
  setLoading(true);

  try {
    const data = await register({ email, password, username });

    if (data?.user) {
      setIsUserLoggedIn(data.user);
    }

    return data;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    setLoading(false);
  }
};

  const handleLogout = async () => {
    setLoading(true);

    try {
      const data = await logout();
      setIsUserLoggedIn(null);
      return data;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const getandSetUser = async () => {
    try {
      const data = await getMe();

      if (data?.user) {
        setIsUserLoggedIn(data.user);
      } else {
        setIsUserLoggedIn(null);
      }
    } catch (err) {
      console.log(err);
      setIsUserLoggedIn(null);
    } finally {
      setLoading(false);
    }
  };

  getandSetUser();
}, []);

  return {
    user: isUserLoggedIn,
    isUserLoggedIn,
    loading,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
