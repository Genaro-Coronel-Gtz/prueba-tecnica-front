import React, { useState } from "react";
import PropTypes from "prop-types";
import { createContext, useContext, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signUpUser, setUser } from "store/slices/user";
import AlertMessage from "components/AlertMessage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setContextUser] = useLocalStorage("User", null);
  const [_token, setToken] = useLocalStorage("token", null);

  const initialAlert = {
    message: "",
    open: false,
    type: "error",
  };

  const [alert, setAlert] = useState(initialAlert);

  const { userData = {}, token = "" } = useSelector((state) => state.user);
  useEffect(() => {
    if (Object.keys(userData).length !== 0) {
      setToken(token);
      setContextUser(userData);
      navigate("/dashboard/register", { replace: true });
    }
  }, [userData]);

  const signup = async (data) => {
    dispatch(signUpUser(data));
  };

  const login = async (data) => {
    const response = await dispatch(loginUser(data));
    if (response.data && !response.data.error) {
      dispatch(setUser({ user: response.data }));
    } else {
      setAlert({
        open: true,
        message: "Usuario o clave no validas",
        type: "error",
      });
    }
  };

  const logout = () => {
    setContextUser(null);
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

  return (
    <AuthContext.Provider value={value}>
      <AlertMessage
        message={alert.message}
        type={alert.type}
        open={alert.open}
        close={() => setAlert(initialAlert)}
      />
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element,
};

export const useAuth = () => {
  return useContext(AuthContext);
};
