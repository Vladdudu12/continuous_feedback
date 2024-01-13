import { Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {Button} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function ProfilePage(props) {
    const {idUser} = useParams();
    const [isProfessor, setIsProfessor] = useState(props.isProfessor)
    const [nume, setNume] = useState("Dudu Vlad");
    const [materie, setMaterie] = useState("Web");
    const [esteIntegralist, setEsteIntegralist] = useState(true);

    const darkTheme = createTheme({
        palette: {
          mode: "dark",
        },
      });
      
    return (
        <ThemeProvider theme={darkTheme}>
        <CssBaseline />
  
        <Card 
            style={{width: "80%", alignItems: "center", justifyContent: "center"}}
        >
            <CardContent>
                <CardHeader>
                    {
                        isProfessor ? (
                            <h1>PROFIL PROFESOR</h1>
                        ) : (
                            <h1>PROFIL STUDENT</h1>
                        )
                    }
                </CardHeader>
                    {
                        isProfessor ? (
                            <>
                            <Typography>Nume:{nume}</Typography>
                            <Typography>Materie:{materie}</Typography>
                            </>
                            ) : (
                                <>
                                <Typography>Nume:{nume}</Typography>
                                <Typography>Legitimatie:{materie}</Typography>
                                <Typography>Integralist?:{esteIntegralist}</Typography>
                                </>
                            )
                    }
                <CardActions>
                    <Button size="small">Edit</Button>
                </CardActions>
            </CardContent>
        </Card>
        </ThemeProvider>
    );
}