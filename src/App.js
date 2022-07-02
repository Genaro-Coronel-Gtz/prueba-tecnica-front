import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedLayout } from "./components/ProtectedLayout";
import { HomeLayout } from "./components/HomeLayout";
import { HomePage } from "./pages/Home";
import LogsPage from "./pages/Logs";
import LoginPage from "./pages/Login";
import RegisterPeoplePage from "pages/RegisterPeople";
import SignUpPage from "pages/SignUp";

export default function App() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
      </Route>

      <Route path="/dashboard" element={<ProtectedLayout />}>
        <Route path="register" element={<RegisterPeoplePage />} />
        <Route path="logs" element={<LogsPage />} />
      </Route>
    </Routes>
  );
}
