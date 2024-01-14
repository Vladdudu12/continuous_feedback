import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function ProfilePage(props) {
  const { idUser } = useParams();
  const [isProfessor, setIsProfessor] = useState(props.isProfessor);
  const [nume, setNume] = useState("Dudu Vlad");
  const [materie, setMaterie] = useState("Web");
  const [esteIntegralist, setEsteIntegralist] = useState(true);
  const [legitimatie, setLegitimatie] = useState("1232555");
  const [isEditable, setIsEditable] = useState(false);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const handleEditClick = (event) => {
    setIsEditable(true);
  };

  const handleSaveEditClick = (event) => {
    setIsEditable(false);
    if(isProfessor) { 
        //modifica
        // nume
        // materie
    } else {
        //modifica
        //nume
        //legitimatie
    }
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
            {isProfessor ? (
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
                    setMaterie(event.target.value);
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
            )}
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
