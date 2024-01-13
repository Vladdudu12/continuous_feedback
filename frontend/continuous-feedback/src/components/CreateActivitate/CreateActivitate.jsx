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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // TODO remove, this demo shouldn't need to reset the theme.
import { DateTimePicker } from "@mui/x-date-pickers";
import RadioGroup from "../RadioGroup/RadioGroupActivitati";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export default function CreateActivitate() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
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
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="materie"
              label="Materie"
              name="materie"
              autoComplete="materie"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="cod-acces"
              label="Cod Acces"
              id="codAcces"
              autoComplete="cod-acces"
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker 
                style={{marginTop: 10}}
                label="Data si Ora Activitatii"
                slotProps={{ textField: { fullWidth: true } }}
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
            />
            <RadioGroup/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
