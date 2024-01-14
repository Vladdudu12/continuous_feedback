import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { enqueueSnackbar, useSnackbar, closeSnackbar } from "notistack";
import { useState } from "react";
import { FormControl } from "@mui/material";
import { FormLabel } from "@mui/material";
import { RadioGroup } from "@mui/material";
import { Radio } from "@mui/material";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useAuth } from "../../provider/authProvider";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function CreateActivitate(props) {
  const [materie, setMaterie] = useState("");
  const [codAcces, setCodAcces] = useState("");
  const [dataOra, setDataOra] = useState(new Date());
  const [durata, setDurata] = useState(0);
  const [esteCurs, setEsteCurs] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { token } = useAuth();
  const [userId] = useState(props.userId);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const action = (snackbarId) => (
    <>
      <IconButton onClick={() => closeSnackbar(snackbarId)}>
        <CloseIcon />
      </IconButton>
    </>
  );
  const handleCreateActivitateNotification = (variant) => {
    if (variant == "success") {
      enqueueSnackbar(`Activitate creata cu succes!`, {
        variant: variant,
        action: action,
      });
    } else if (variant == "error")
      enqueueSnackbar(`Datele introduse sunt gresite!`, {
        variant: variant,
        action: action,
      });
  };

  const handleCreateActivitateClick = async (event) => {
    event.preventDefault();
    const activitate = {
      materie: materie,
      codAcces: codAcces,
      data: dataOra,
      durata: durata,
      tipActivitate: esteCurs ? "Curs" : "Seminar",
      ProfesorId: userId,
    };

    console.log(activitate);
    await axios
      .post(`http://localhost:8080/api/activitate/`, activitate, config)
      .then((res) => {
        console.log(res.data);
        handleCreateActivitateNotification("success");
        props.func(activitate);
        setMaterie("");
        setCodAcces("");
        setDataOra(new Date());
        setDurata(0);

      })
      .catch((err) => {
        console.log(err.message);
        handleCreateActivitateNotification("error");
      });
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Creare Activitate
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="materie"
              label="Materie"
              name="materie"
              autoComplete="materie"
              autoFocus
              value={materie}
              onChange={(event) => {
                setMaterie(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="cod-acces"
              label="Cod Acces"
              id="codAcces"
              autoComplete="cod-acces"
              value={codAcces}
              onChange={(event) => {
                setCodAcces(event.target.value);
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                style={{ marginTop: 10 }}
                label="Data si Ora Activitatii"
                slotProps={{ textField: { fullWidth: true } }}
                value={dayjs(dataOra)}
                onChange={(newValue) => {
                  setDataOra(newValue);
                }}
              />
            </LocalizationProvider>
            <br />

            <TextField
              margin="normal"
              required
              fullWidth
              name="durata"
              label="Durata (minute)"
              id="durata"
              autoComplete="30"
              value={durata}
              onChange={(event) => {
                setDurata(event.target.value);
              }}
            />
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Tipul Activitatii
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="Curs"
                  control={<Radio />}
                  label="Curs"
                  onChange={(event) => {
                    setEsteCurs(event.target.value);
                  }}
                />
                <FormControlLabel
                  value="Seminar"
                  control={<Radio />}
                  label="Seminar"
                />
              </RadioGroup>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(event) => handleCreateActivitateClick(event)}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
