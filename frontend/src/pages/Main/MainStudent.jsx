import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { enqueueSnackbar, useSnackbar, closeSnackbar } from "notistack";
import { useUserId } from "../../provider/userIdProvider";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../provider/authProvider";

const isValid = true;
// TODO remove, this demo shouldn't need to reset the theme.
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export default function MainStudent(props) {
  const navigate = useNavigate();
  const idActivitate = 1234;
  const [codActivitate, setCodActivitate] = useState("");
  const [ userId ] = useState(props.userId);
  const { enqueueSnackbar } = useSnackbar();
  const { token } = useAuth();

  const [activitati, setActivitati] = useState([]);

  const action = (snackbarId) => (
    <>
      <Button
        style={{ fontColor: "white" }}
        onClick={() => {
          closeSnackbar(snackbarId);
        }}
      >
        Dismiss
      </Button>
    </>
  );
  const handleClickVariant = (variant) => {
    if (variant == "success") {
      enqueueSnackbar(`Connected successfully!`, {
        variant: variant,
        action: action,
      });
    } else if (variant == "error")
      enqueueSnackbar(`Cod de acces invalid!`, {
        variant: variant,
        action: action,
      });
  };

  const handleLoad = (variant) => {
    if (variant == "success") {
      enqueueSnackbar(`Activitati incarcate cu succes!`, {
        variant: variant,
        action: action,
      });
    } else if (variant == "error")
      enqueueSnackbar(`Nu s-au putut incarca activitatile!`, {
        variant: variant,
        action: action,
      });
  };

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  //cand dau getAllById trebuie dat refresh la baza de date mai intai sa vedem daca mai e valid cursul
  const handleConnectClick = async () => {
    //assign student to activity
    //daca nu exista error
    //daca exista success
    const bodyParameters = {
      codAcces: codActivitate,
      StudentId: userId,
    };

    await axios
      .post(
        `http://localhost:8080/api/prezentaActivitate/`,
        bodyParameters,
        config
      )
      .then((res) => {
        console.log(res.data);
        const result = res.data;
        handleClickVariant("success");
        navigate(`/feedbackActivitate/${result.ActivitateId}`)
      })
      .catch((err) => {
        console.log(err.message);
        handleClickVariant("error");

      });
  };

  const getStudentActivities = async () => {
    console.log(userId);
    await axios.get(
      `http://localhost:8080/api/prezentaActivitate/${userId}`,
      config
    ).then(res => {
      console.log(res.data);
      setActivitati(res.data);
      handleLoad('success', action);

    }).catch((err) => {
      console.log(err.message);
      handleLoad('error', action);
    });
  };

  useEffect(() => {
    getStudentActivities();
  }, []);

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('-');
  }
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Bun venit, Student
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Ai fost prezent in total la x activitati.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <TextField
                label="Cod Activitate"
                value={codActivitate}
                onChange={(event) => {
                  setCodActivitate(event.target.value);
                }}
              ></TextField>
              <Button variant="contained" onClick={() => handleConnectClick()}>
                Conectare
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {activitati.map((activitate) => (
              <Grid item key={activitate.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {activitate.tipActivitate} {activitate.materie}
                    </Typography>
                    <Typography>Data: {formatDate(new Date(activitate.data))}</Typography>
                    <Typography>Ora: {new Date(activitate.data).toLocaleTimeString()}</Typography>
                    <Typography>Durata: {activitate.durata} min</Typography>
                    <Typography>Profesor: {activitate.Profesor.nume}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      disabled={( new Date() >= new Date(new Date("2023-04-09T19:20:59.000Z").getTime() + activitate.durata * 1000))}
                      onClick={() => {
                        navigate(`/feedbackActivitate/${activitate.id}`);
                      }}
                    >
                      Feedback
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
