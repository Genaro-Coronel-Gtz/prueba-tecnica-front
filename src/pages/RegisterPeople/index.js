import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Button,
  Stack,
  Typography,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPeople } from "store/slices/person";
import PeopleTable from "./components/PeopleTable";
import ModalForm from "./components/ModalForm";
import AlertMessage from "components/AlertMessage";

const RegisterPeoplePage = () => {
  const dispatch = useDispatch();
  const { people = [] } = useSelector((state) => state.people);
  const [openModal, setOpenModal] = useState(false);
  const initialAlert = {
    message: "",
    open: false,
    type: "info",
  };

  const [alert, setAlert] = useState(initialAlert);

  useEffect(() => {
    dispatch(getPeople());
  }, []);

  const handleCreatePerson = () => {
    setOpenModal(true);
  };

  const alertUpdate = (alertData) => {
    setAlert({
      open: alertData.open,
      message: alertData.message,
      type: alertData.type,
    });
  };

  return (
    <>
      <ModalForm
        alert={alertUpdate}
        person={null}
        open={openModal}
        closeModal={() => setOpenModal(false)}
      />
      <AlertMessage
        message={alert.message}
        type={alert.type}
        open={alert.open}
        close={() => setAlert(initialAlert)}
      />
      <Container component="main">
        <Box
          sx={{
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            paddingX={4}
          >
            <Typography variant="h6">Listado de personas</Typography>
            <Tooltip title="Crear nueva persona" arrow>
              <Button variant="outlined" onClick={handleCreatePerson}>
                Registrar persona
              </Button>
            </Tooltip>
          </Stack>
          <PeopleTable people={people} />
        </Box>
      </Container>
    </>
  );
};

export default RegisterPeoplePage;
