import React from "react";
import PropTypes from "prop-types";
import { Snackbar, Alert } from "@mui/material";

const AlertMessage = ({
  open,
  close,
  message,
  vertical = "top",
  horizontal = "center",
  type = "info",
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={close}
      anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
    >
      <Alert onClose={close} severity={type}>
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
  type: PropTypes.string,
};

export default AlertMessage;
