import React from "react";
import PropTypes from "prop-types";
import { createContext, useContext, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signUpUser } from "store/slices/user";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useLocalStorage("User", null);
  const [_token, setToken] = useLocalStorage("token", null);

  const { userData = {}, token = "" } = useSelector((state) => state.user);
  useEffect(() => {
    if (Object.keys(userData).length !== 0) {
      setToken(token);
      setUser(userData);
      navigate("/dashboard/register", { replace: true });
    }
  }, [userData]);

  const signup = async (data) => {
    dispatch(signUpUser(data));
  };

  const login = async (data) => {
    dispatch(loginUser(data));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      _token,
      signup,
    }),
    [user, _token, login]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.element,
};

export const useAuth = () => {
  return useContext(AuthContext);
};
