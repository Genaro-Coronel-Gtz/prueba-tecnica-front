import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import home from "assets/home.png";
import { Typography, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  const goToPath = (path) => {
    navigate(path, { replace: true });
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack direction="column" justifyContent="center" textAlign="center">
          <Typography variant="h4">Prueba técnica para Fracttal</Typography>
          <Typography variant="body1">Genaro Coronel</Typography>
        </Stack>

        <Stack
          mt={4}
          justifyContent="center"
          textAlign="center"
          alignItems="center"
        >
          <img src={home} alt="home/image" width="80%" />
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          mt={2}
        >
          <Button
            sx={{ width: 200 }}
            fullWidth
            variant="contained"
            onClick={() => goToPath("/login")}
            color="primary"
          >
            Login
          </Button>
          <Button
            sx={{
              marginLeft: { xs: 0, sm: 10 },
              marginTop: {
                xs: 3,
                sm: 0,
              },
              width: 200,
            }}
            fullWidth
            variant="contained"
            onClick={() => goToPath("/signup")}
            color="primary"
          >
            Registro
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};
