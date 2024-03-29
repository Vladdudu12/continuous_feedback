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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateActivitate from "../../components/CreateActivitate/CreateActivitate";
import copy from "copy-to-clipboard";
import { CircularProgress, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { enqueueSnackbar, useSnackbar, closeSnackbar } from "notistack";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../provider/authProvider";
import CloseIcon from "@mui/icons-material/Close";
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export default function MainProfesor(props) {
  const [isCreate, setIsCreate] = useState(false);
  const [codAcces, setCodAcces] = useState("1234515");
  const [userId] = useState(props.userId);
  const navigate = useNavigate();
  const { token } = useAuth();
  const [result, setResult] = useState({});
  const [loaded, setLoaded] = useState(false);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  function handleCreateButtonClick() {
    setIsCreate(true);
  }

  function handleListaButtonClick() {
    setIsCreate(false);
  }

  const copyToClipboard = (text) => {
    copy(text);
    handleCopyToClipboardNotification();
    console.log("copied text " + text);
  };

  const { enqueueSnackbar } = useSnackbar();
  const action = (snackbarId) => (
    <>
      <IconButton onClick={() => closeSnackbar(snackbarId)}>
        <CloseIcon />
      </IconButton>
    </>
  );

  const getProfessorActivities = async () => {
    //console.log(userId);
    await axios
      .get(`http://localhost:8080/api/activitate/all/${userId}`, config)
      .then((res) => {
        //console.log(res.data);
        setResult(res.data);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err.message);
        setLoaded(false);
      });
  };

  useEffect(() => {
    getProfessorActivities();
  }, []);

  const addActivitateToList = (activitate) => {
    result.activitati.push(activitate);
  };

  const handleCopyToClipboardNotification = () => {
    enqueueSnackbar(`Cod Acces copiat cu succes`, {
      variant: "success",
      action: action,
    });
  };

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }
  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("-");
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}

        {loaded ? (
          <>
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
                  Bun venit, Prof. Web
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  Ati sustinut un total de {result.activitati.length} activitati
                  si ati primit {result.feedback.flat().length} feedback-uri din
                  partea studentilor.
                </Typography>
                <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                >
                  <Button
                    variant="contained"
                    disabled={isCreate}
                    onClick={handleCreateButtonClick}
                  >
                    Creare Activitate
                  </Button>
                  <Button
                    variant="contained"
                    disabled={!isCreate}
                    onClick={handleListaButtonClick}
                  >
                    Lista Activitati
                  </Button>
                </Stack>
              </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="md">
              {/* End hero unit */}
              {isCreate ? (
                <div>
                  <CreateActivitate
                    func={addActivitateToList}
                    userId={userId}
                  />
                </div>
              ) : (
                <div>
                  <Grid container spacing={4}>
                    {result.activitati.map((activitate) => (
                      <Grid item key={activitate.id} xs={12} sm={6} md={4}>
                        <Card
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {activitate.tipActivitate} {activitate.materie}
                            </Typography>
                            <Typography>
                              Data: {formatDate(new Date(activitate.data))}
                            </Typography>
                            <Typography>
                              Ora:{" "}
                              {new Date(activitate.data).toLocaleTimeString()}
                            </Typography>
                            <Typography>
                              Durata: {activitate.durata} min
                            </Typography>
                            <Typography>
                              Cod Acces: {activitate.codAcces}
                              <IconButton
                                onClick={() => {
                                  copyToClipboard(activitate.codAcces);
                                }}
                              >
                                <ContentCopyIcon />
                              </IconButton>
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button
                              size="small"
                              id={`${activitate.id}`}
                              onClick={() => {
                                navigate(`/listaPrezenta/${activitate.id}`);
                              }}
                            >
                              Prezenta
                            </Button>
                            <Button
                              id={`${1234}`}
                              size="small"
                              onClick={() => {
                                navigate(
                                  `/listaFeedback/${activitate.id}`
                                );
                              }}
                            >
                              Feedback
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              )}
            </Container>
          </>
        ) : (
          <CircularProgress />
        )}
      </main>
    </ThemeProvider>
  );
}
