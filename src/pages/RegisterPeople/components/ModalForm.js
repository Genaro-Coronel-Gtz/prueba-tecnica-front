import PropTypes from "prop-types";
import React from "react";
import { Button, TextField, Box, Modal, Tooltip } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { updatePerson, getPeople, createPerson } from "store/slices/person";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  backgroundColor: "background.paper",
  border: "2px solid #grey",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const textFieldStyle = {
  marginBottom: 30,
};

const validationSchema = yup.object({
  name: yup
    .string("Nombre")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .required("EEl nombre es requerido"),
  work_description: yup
    .string("Descripción del trabajo!")
    .min(5, "La descripción debe tener al menos 5 caracteres")
    .required("La descripción del trabajo es requerida"),
});

const ModalForm = ({ open, person, closeModal, alert }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    closeModal();
  };

  const handleUpdatePerson = async (updateData) => {
    let updatedPerson = updateData;
    updatedPerson["id"] = person.id;

    const response = await dispatch(updatePerson(updatedPerson));

    if (!response.error) {
      dispatch(getPeople());
      closeModal();
      alert({
        message: "Persona actualizada correctamente",
        type: "success",
        open: true,
      });
    } else {
      alert({
        message: "Error al actualizar persona",
        type: "error",
        open: true,
      });
    }
  };

  const handleCreatePerson = async (newPerson) => {
    const response = await dispatch(createPerson(newPerson));

    if (!response.error) {
      alert({
        message: "Persona creada correctamente",
        type: "success",
        open: true,
      });
      dispatch(getPeople());
      closeModal();
    } else {
      alert({
        message: "Error al crear persona",
        type: "error",
        open: true,
      });
    }
  };

  const EditForm = () => {
    const formik = useFormik({
      initialValues: {
        name: person ? person.name : "",
        work_description: person ? person.work_description : "",
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        person ? handleUpdatePerson(values) : handleCreatePerson(values);
      },
    });

    return (
      <form onSubmit={formik.handleSubmit}>
        <TextField
          style={textFieldStyle}
          fullWidth
          id="name"
          name="name"
          label="Nombre"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          style={textFieldStyle}
          fullWidth
          id="work_description"
          name="work_description"
          label="Descripción del trabajo"
          value={formik.values.work_description}
          onChange={formik.handleChange}
          error={
            formik.touched.work_description &&
            Boolean(formik.errors.work_description)
          }
          helperText={
            formik.touched.work_description && formik.errors.work_description
          }
        />
        <Tooltip title={person ? "Actualizar persona" : "Crear persona"} arrow>
          <Button color="primary" variant="outlined" fullWidth type="submit">
            {person ? "Actualizar" : "Crear"}
          </Button>
        </Tooltip>
      </form>
    );
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <EditForm />
      </Box>
    </Modal>
  );
};

ModalForm.propTypes = {
  closeModal: PropTypes.func,
  open: PropTypes.bool,
  alert: PropTypes.func,
  person: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    work_description: PropTypes.string,
  }),
};

export default ModalForm;
