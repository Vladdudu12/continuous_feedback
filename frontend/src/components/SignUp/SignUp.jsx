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
import { FormControl, FormLabel, RadioGroup, Radio, IconButton } from "@mui/material";
import { useState } from "react";
import { enqueueSnackbar, useSnackbar, closeSnackbar } from "notistack";
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export default function SignUp() {
  const [nume, setNume] = useState("");
  const [prenume, setPrenume] = useState("");
  const [materie, setMaterie] = useState("");
  const [legitimatie, setLegitimatie] = useState("");
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const [isProfessor, setIsProfessor] = useState(false);

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const action = snackbarId => (
    <>
      <IconButton onClick={() => closeSnackbar(snackbarId)}>
        <CloseIcon/>
      </IconButton>
    </>
  );
  const handleCreateActivitateNotification = (variant) => {
    if(variant == 'success') {
      enqueueSnackbar(`Utilizator creat cu succes!`,  {variant: variant, action: action});
    } else if(variant == 'error')
    enqueueSnackbar(`A aparut o eroare!`, {variant: variant, action: action});
  };

  const handleSetProfessor = (value) => {
    setMaterie('');
    setLegitimatie('');
    setIsProfessor(value);
  }
  const handleRegister = async (event) => {
    event.preventDefault();

    let persoana = {
      nume: `${nume} ${prenume}`,
      email: email,
      parola: parola,
    };
    if (isProfessor) {
      persoana.materie = materie;
      //add in profesorDB
      console.log(`http://localhost:8080/api/auth/register/${true}`)
      await axios.post(`http://localhost:8080/api/auth/register/${true}`, {persoana})
      .then(res => {
        console.log(res);
        console.log(res.data);
        navigate('/login', {replace: true});
        handleCreateActivitateNotification('success');
      }).catch(() => {
        handleCreateActivitateNotification('error');
      })
    } else {
      persoana.legitimatie = legitimatie;
      //add in StudentDB
      await axios.post(`http://localhost:8080/api/auth/register/${false}`, {persoana})
      .then(res => {
        console.log(res);
        console.log(res.data);
        navigate('/login', {replace: true});
        handleCreateActivitateNotification('success');
      }).catch(() => {
        handleCreateActivitateNotification('error');
      })
    }
    console.log(persoana);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="nume"
                  required
                  fullWidth
                  id="nume"
                  label="Nume"
                  autoFocus
                  value={nume}
                  onChange={(event) => {
                    setNume(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="prenume"
                  label="Prenume"
                  name="prenume"
                  value={prenume}
                  onChange={(event) => {
                    setPrenume(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Adresa Email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="parola"
                  label="Parola"
                  type="password"
                  id="parola"
                  value={parola}
                  onChange={(event) => {
                    setParola(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Calitate:
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    defaultValue="Student"
                  >
                    <FormControlLabel
                      value="Profesor"
                      control={<Radio />}
                      label="Profesor"
                      onChange={(event) => {
                        handleSetProfessor(event.target.value);
                      }}
                    />
                    <FormControlLabel
                      value="Student"
                      control={<Radio />}
                      label="Student"
                      onChange={(event) => {
                        handleSetProfessor(!event.target.value);
                      }}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                      {
                        isProfessor ? (
                          <TextField
                          required
                          fullWidth
                          id="materie"
                          label="Materie"
                          name="materie"
                          autoComplete="materie"
                          value={materie}
                          onChange={(event) => {
                            setMaterie(event.target.value);
                          }}
                        />
                        ) : (
                          <TextField
                          required
                          fullWidth
                          id="legitimatie"
                          label="Legitimatie"
                          name="legitimatie"
                          autoComplete="legitimatie"
                          value={legitimatie}
                          onChange={(event) => {
                            setLegitimatie(event.target.value);
                          }}
                        />
                        )
                      }
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(event) => handleRegister(event)}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Ai deja cont? Conecteaza-te
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
