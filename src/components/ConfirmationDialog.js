import PropTypes from "prop-types";
import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ConfirmationDialog = ({
  close,
  open,
  accept,
  cancel,
  title,
  message,
}) => {
  const handleClose = () => {
    close();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel}>Cancelar</Button>
        <Button onClick={accept} autoFocus>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationDialog.propTypes = {
  accept: PropTypes.func,
  cancel: PropTypes.func,
  close: PropTypes.func,
  message: PropTypes.string,
  open: PropTypes.bool,
  title: PropTypes.string,
};

export default ConfirmationDialog;
