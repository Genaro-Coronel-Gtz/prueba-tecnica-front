import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// import { Link as RouterLink } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";

const LogsPage = () => {
  //  const { login } = useAuth();

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span>Logs</span>
      </Box>
    </Container>
  );
};

export default LogsPage;
