import * as React from 'react';
import axios from 'axios'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../../provider/authProvider';
import { useNavigate } from 'react-router-dom';
import { FormControl, FormLabel, RadioGroup, Radio, IconButton } from "@mui/material";
import { useState } from 'react';
import { useIsProfessor } from '../../provider/isProfessorProvider';
import { enqueueSnackbar, useSnackbar, closeSnackbar } from "notistack";
import CloseIcon from '@mui/icons-material/Close';
import { useUserId } from '../../provider/userIdProvider';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
export default function SignIn() {

  const [email, setEmail] = useState('');
  const [parola, setParola] = useState('');
  const {isProfessor, setIsProfessor} = useIsProfessor();
  const [isProfessor_, setIsProfessor_] = useState();
  const {userId, setUserId} = useUserId();
  const {setToken} = useAuth();
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
      enqueueSnackbar(`Login Successfully!`,  {variant: variant, action: action});
    } else if(variant == 'error')
    enqueueSnackbar(`Utilizator inexistent!`, {variant: variant, action: action});
  };



  const handleLogin = async () => {
    const authPerson = {
      email: email,
      parola: parola
    }
    //console.log(authPerson);
    if(isProfessor_) {
      await axios.post(`http://localhost:8080/api/auth/login/${true}`, {authPerson})
      .then(res => {
        const response = res.data;
        //console.log(email, parola);
        if(response.success == true) {
          setToken(response.data.token);
          setIsProfessor(response.data.isProfessor);
          setUserId(response.data.userId)
          handleCreateActivitateNotification('success');
          navigate('/', {replace: true});
        } else {
          handleCreateActivitateNotification('error');
        }
      }).catch(() => {
        handleCreateActivitateNotification('error');
      })
    }
    else {
      await axios.post(`http://localhost:8080/api/auth/login/${false}`, {authPerson})
      .then(res => {
        const response = res.data;
        if(response.success == true) {
          setToken(response.data.token);
          setIsProfessor(response.data.isProfessor);
          setUserId(response.data.userId);
          navigate('/', {replace: true});          
          handleCreateActivitateNotification('success');
        } else {
          handleCreateActivitateNotification('error');
        }
      }).catch(() => {
        handleCreateActivitateNotification('error');
      })

    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => {
                setParola(event.target.value);
              }}
            />
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
                        setIsProfessor_(event.target.value);
                      }}
                    />
                    <FormControlLabel
                      value="Student"
                      control={<Radio />}
                      label="Student"
                      onChange={(event) => {
                        setIsProfessor_(!event.target.value);
                      }}
                    />
                  </RadioGroup>
                </FormControl>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleLogin()}
            >
              Autentificare
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Nu ai cont? Inregistreaza-te"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}