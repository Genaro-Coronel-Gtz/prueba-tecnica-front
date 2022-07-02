import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import loginImage from "assets/login.jpg";
import sha256 from "crypto-js/sha256";
import { useFormik } from "formik";
import * as yup from "yup";

const LoginPage = () => {
  const { login } = useAuth();

  const validationSchema = yup.object({
    username: yup
      .string("Ingresa tu usuario")
      .required("El usuario es requerido"),
    password: yup
      .string("Ingres tu clave")
      .min(8, "La clave debe tener al menos 8 caracteres")
      .required("La clave es requerida"),
  });

  const formik = useFormik({
    initialValues: {
      username: "usuario",
      password: "clave",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    login({
      username: values.username,
      password: sha256(values.password).toString(),
    });
  };

  return (
    <Grid
      container
      style={{
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        alignContent: "center",
        marginTop: "7%",
      }}
    >
      <Grid item xs={12} md={4}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            maxWidth: "500px",
            paddingX: { xs: 2, md: 5 },
          }}
        >
          <Avatar sx={{ m: 1, backgroundColor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuario"
              name="username"
              autoFocus
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Clave"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <RouterLink to="/signup">
                  ¿No tienes cuenta? Regístrate aquí.
                </RouterLink>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={loginImage} width="500px" height="auto" alt="login" />
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
