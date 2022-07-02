import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Container,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableFooter,
  Paper,
  Stack,
} from "@mui/material";
import { formatDate } from "helpers/functions";
import chrome from "assets/chrome.png";
import firefox from "assets/firefox.png";
import incognito from "assets/incognito.png";
import safari from "assets/safari.png";
import opera from "assets/opera.png";
import brave from "assets/brave.png";
import postman from "assets/postman.png";
import insomnia from "assets/insomnia.png";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import HelpIcon from "@mui/icons-material/Help";

const LogsTable = ({ logs }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const browserIcon = (browser) => {
    let icon = "";

    switch (browser) {
      case "Chrome":
      case "chrome":
        icon = chrome;
        break;
      case "Firefox":
      case "firefox":
        icon = firefox;
        break;
      case "Brave":
      case "brave":
        icon = brave;
        break;
      case "Opera":
      case "opera":
        icon = opera;
        break;
      case "Safari":
      case "safari":
        icon = safari;
        break;
      case "Insomnia":
      case "insomnia":
        icon = insomnia;
        break;
      case "Postman":
      case "postman":
        icon = postman;
        break;
      default:
        icon = incognito;
    }
    return icon;
  };

  const actionIcon = (action) => {
    let icon = "";

    switch (action) {
      case "Crear":
        icon = <AddCircleIcon sx={{ fontSize: 22 }} />;
        break;
      case "Eliminar":
        icon = <DeleteIcon sx={{ fontSize: 22 }} />;
        break;
      case "Actualizar":
        icon = <UpgradeIcon sx={{ fontSize: 22 }} />;
        break;
      default:
        icon = <HelpIcon sx={{ fontSize: 22 }} />;
    }
    return icon;
  };

  return (
    <Container component="main" sx={{ marginBottom: 10 }}>
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Acción</TableCell>
                <TableCell align="center">Ip</TableCell>
                <TableCell align="center">Navegador</TableCell>
                <TableCell align="center">Persona</TableCell>
                <TableCell align="center">Fecha y hora de log</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? logs.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : logs
              ).map((log) => (
                <TableRow
                  key={log.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{log.id}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={2}>
                      <span style={{ marginRight: 5 }}> {log.action} </span>
                      {actionIcon(log.action)}
                    </Stack>
                  </TableCell>
                  <TableCell align="center">{log.ip}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={2}>
                      <img
                        src={browserIcon(log.navigator)}
                        width="20px"
                        height="20px"
                      />
                      <span style={{ marginLeft: 10 }}> {log.navigator} </span>
                    </Stack>
                  </TableCell>
                  <TableCell align="center">{log.person_name}</TableCell>
                  <TableCell align="center">
                    {formatDate(log.created_at)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={logs.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "Filas por pagina",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="Personas por página"
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

LogsTable.propTypes = {
  logs: PropTypes.array,
};

export default LogsTable;
