import React from "react";
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import { AppBar } from "./AppBar";

export const ProtectedLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <AppBar
        pages={[
          { label: "Registro de personas", path: "register" },
          { label: "Logs", path: "logs" },
        ]}
      />
      {outlet}
    </div>
  );
};
