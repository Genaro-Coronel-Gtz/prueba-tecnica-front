import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Container,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableFooter,
  Paper,
  Tooltip,
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Delete, Edit } from "@mui/icons-material";
import ModalForm from "./ModalForm";
import { useDispatch } from "react-redux";
import { deletePerson, getPeople } from "store/slices/person";
import ConfirmationDialog from "components/ConfirmationDialog";
import AlertMessage from "components/AlertMessage";

const PeopleTable = ({ people }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [personSelected, setPersonSelected] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const initialAlert = {
    message: "",
    open: false,
    type: "info",
  };

  const [alert, setAlert] = useState(initialAlert);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (person) => {
    setPersonSelected(person);
    setOpenModal(true);
  };

  const performDelete = async () => {
    const response = await dispatch(deletePerson(personSelected));
    if (!response.error) {
      setShowConfirmation(false);
      setPersonSelected({});
      dispatch(getPeople());
      setAlert({
        open: true,
        message: "Persona eliminada correctamente",
        type: "success",
      });
    } else {
      setAlert({
        open: true,
        message: "Error al eliminar persona",
        type: "error",
      });
    }
  };

  const handleDelete = (person) => {
    setPersonSelected(person);
    setShowConfirmation(true);
  };

  const alertUpdate = (alertData) => {
    setAlert({
      open: alertData.open,
      message: alertData.message,
      type: alertData.type,
    });
  };

  const ActionsTable = ({ person }) => {
    return (
      <Box style={{ display: "flex", direction: "row" }}>
        <Tooltip title="Editar persona" arrow>
          <IconButton onClick={() => handleEdit(person)}>
            <Edit fontSize="small" color="secondary" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar persona" arrow>
          <IconButton onClick={() => handleDelete(person)}>
            <Delete fontSize="small" color="danger" />
          </IconButton>
        </Tooltip>
      </Box>
    );
  };

  ActionsTable.propTypes = {
    person: PropTypes.instanceOf(Object),
  };

  const TablePaginationActions = (props) => {
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          <LastPageIcon />
        </IconButton>
      </Box>
    );
  };

  TablePaginationActions.propTypes = {
    count: PropTypes.number,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    onPageChange: PropTypes.func,
  };

  return (
    <>
      <AlertMessage
        message={alert.message}
        type={alert.type}
        open={alert.open}
        close={() => setAlert(initialAlert)}
      />
      <ModalForm
        alert={alertUpdate}
        person={personSelected}
        open={openModal}
        closeModal={() => setOpenModal(false)}
      />
      <ConfirmationDialog
        open={showConfirmation}
        close={() => setShowConfirmation(false)}
        cancel={() => setShowConfirmation(false)}
        accept={performDelete}
        title="Eliminar persona"
        message={`Estas seguro que deses eliminar la persona ${personSelected.name}`}
      />
      <Container component="main">
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
                  <TableCell align="right">Id</TableCell>
                  <TableCell align="right">Nombre</TableCell>
                  <TableCell align="right">Descripción de trabajo</TableCell>
                  <TableCell align="right">Creación</TableCell>
                  <TableCell align="right">Ultima actualización</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {people.map((person) => (
                  <TableRow
                    key={person.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{person.id}</TableCell>
                    <TableCell align="right">{person.name}</TableCell>
                    <TableCell align="right">
                      {person.work_description}
                    </TableCell>
                    <TableCell align="right">{person.created_at}</TableCell>
                    <TableCell align="right">{person.updated_at}</TableCell>
                    <TableCell align="right">
                      <ActionsTable person={person} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "Todo", value: -1 },
                    ]}
                    colSpan={3}
                    count={people.length}
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
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
};

PeopleTable.propTypes = {
  people: PropTypes.array,
  person: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    work_description: PropTypes.string,
    created_at: PropTypes.instanceOf(Date),
    updated_at: PropTypes.instanceOf(Date),
  }),
};

export default PeopleTable;
