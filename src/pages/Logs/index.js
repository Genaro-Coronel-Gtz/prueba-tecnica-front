import React, { useEffect } from "react";
import { Container, Box, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getLogs } from "store/slices/log";
import LogsTable from "./components/LogsTable";

const LogsPage = () => {
  const dispatch = useDispatch();
  const { logs = [] } = useSelector((state) => state.logs);

  useEffect(() => {
    dispatch(getLogs());
  }, []);

  return (
    <>
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
            <Typography variant="h6">Listado de logs</Typography>
          </Stack>
          <LogsTable logs={logs} />
        </Box>
      </Container>
    </>
  );
};

export default LogsPage;
