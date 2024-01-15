import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useAuth } from "../../provider/authProvider";
import axios from 'axios';

export default function ProfilePage(props) {
  const { idUser } = useParams();
  const [isProfessor, setIsProfessor] = useState(props.isProfessor);
  const [nume, setNume] = useState("");
  const [materie, setMaterie] = useState("");
  const [esteIntegralist, setEsteIntegralist] = useState(true);
  const [legitimatie, setLegitimatie] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const handleMaterieChange = (value) => {
    setMaterie(value);
  }
  const {token} = useAuth();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const getCurrentUser = async() => {
    if(isProfessor === true) {
      await axios.get(
        `http://localhost:8080/api/profesor/${idUser}`,
        config
      ).then(res => {
        //console.log(res.data);
        setNume(res.data.nume);
        setMaterie(res.data.materie);
        setIsLoaded(true);
        //console.log(materieActivitate, tipActivitate, dataActivitate);
      }).catch((err) => {
        console.log(err.message);
        setIsLoaded(false);
      });
    } else {
      await axios.get(
        `http://localhost:8080/api/student/${idUser}`,
        config
      ).then(res => {
        //console.log(res.data);
        setNume(res.data.nume);
        setLegitimatie(res.data.legitimatie);
        setIsLoaded(true);
        //console.log(materieActivitate, tipActivitate, dataActivitate);
      }).catch((err) => {
        console.log(err.message);
        setIsLoaded(false);
      });
    }
  }

  const updateCurrentUser = async() => {
    if(isProfessor === true) {
      await axios.put(
        `http://localhost:8080/api/profesor/${idUser}`,
        {
          nume: nume,
          materie: materie
        },
        config
      ).then(res => {
        console.log(res.data);

        //console.log(materieActivitate, tipActivitate, dataActivitate);
      }).catch((err) => {
        console.log(err.message);
        setIsLoaded(false);
      });
    } else {
      await axios.put(
        `http://localhost:8080/api/student/${idUser}`, 
        {
          nume: nume,
          legitimatie: legitimatie
        },
        config
      ).then(res => {
        console.log(res.data);
        //console.log(materieActivitate, tipActivitate, dataActivitate);
      }).catch((err) => {
        console.log(err.message);
        setIsLoaded(false);
      });
    }

  }

  useEffect(() => {
    getCurrentUser();
  }, []);
  
  const handleEditClick = (event) => {
    setIsEditable(true);
  };

  const handleSaveEditClick = (event) => {
    setIsEditable(false);
    updateCurrentUser();
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          style={{
            margin: "10px",
            width: "25%",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px"
          }}
        >
          <CardContent
            style={{
                padding: "0px"
            }}
          >
            {
              isLoaded ? (
                
                  isProfessor ? (
                  <>
                    <Typography variant="h5" component="div">
                      PROFIL PROFESOR
                    </Typography>
                    <TextField
                      style={{ marginTop: "10px" }}
                      fullWidth={true}
                      label="Nume"
                      id="outlined-basic"
                      variant="outlined"
                      value={nume}
                      onChange={(event) => {
                        setNume(event.target.value);
                      }}
                      disabled={!isEditable}
                    />
                    <TextField
                      style={{ marginTop: "10px" }}
                      fullWidth={true}
                      label="Materie"
                      id="outlined-basic"
                      variant="outlined"
                      value={materie}
                      onChange={(event) => {
                        handleMaterieChange(event.target.value);
                      }}
                      disabled={!isEditable}
                    />
                  </>
                ) : (
                  <>
                    <Typography variant="h5" component="div">
                      PROFIL STUDENT
                    </Typography>
                    <br />
                    <TextField
                      style={{ marginTop: "10px" }}
                      fullWidth={true}
                      label="Name"
                      id="outlined-basic"
                      variant="outlined"
                      value={nume}
                      onChange={(event) => {
                        setNume(event.target.value);
                      }}
                      disabled={!isEditable}
                    />
                    <br />
                    <TextField
                      style={{ marginTop: "10px" }}
                      fullWidth={true}
                      label="Legitimatie"
                      id="outlined-basic"
                      variant="outlined"
                      value={legitimatie}
                      onChange={(event)=> {
                        setLegitimatie(event.target.value);
                      }}
                      disabled={!isEditable}
                    />
                    <br />
                    <TextField
                      style={{ marginTop: "10px" }}
                      fullWidth={true}
                      label="Integralist"
                      id="outlined-basic"
                      variant="outlined"
                      value={esteIntegralist}
                      disabled={true}
                    />
                  </>
              )
    
              ) : (
                <CircularProgress/>
              )
            }
            <CardActions style={{ justifyContent: "end" }}>
              {isEditable ? (
                <Button size="small" onClick={handleSaveEditClick}>
                  Save
                </Button>
              ) : (
                <Button size="small" onClick={handleEditClick}>
                  Edit
                </Button>
              )}
            </CardActions>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}
