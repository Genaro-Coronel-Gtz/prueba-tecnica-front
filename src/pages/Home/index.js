import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export const HomePage = () => {
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
        <Link to="/login">Login</Link>
        <Link to="/signup">Registrar Cuenta</Link>
      </Box>
    </Container>
  );
};
