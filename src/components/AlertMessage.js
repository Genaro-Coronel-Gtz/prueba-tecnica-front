import React from "react";
import PropTypes from "prop-types";
import { Snackbar, Alert } from "@mui/material";

const AlertMessage = ({
  open,
  close,
  message,
  vertical = "top",
  horizontal = "center",
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={close}
      anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
    >
      <Alert onClose={close} severity="error">
        {message}
      </Alert>
    </Snackbar>
  );
};

AlertMessage.propTypes = {
  close: PropTypes.func,
  horizontal: PropTypes.string,
  message: PropTypes.string,
  open: PropTypes.bool,
  vertical: PropTypes.string,
};
