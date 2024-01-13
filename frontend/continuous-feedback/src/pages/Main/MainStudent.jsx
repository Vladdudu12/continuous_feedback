import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const isValid = true;
// TODO remove, this demo shouldn't need to reset the theme.
const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
export default function MainStudent() {
  const navigate = useNavigate();
  const idActivitate = 1234;
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
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
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Ai fost prezent in total la x activitati.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
            <TextField label="Cod Activitate"></TextField>
              <Button variant="contained">Conectare</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Curs Webtech
                    </Typography>
                    <Typography>
                      Data: 12.12.2022
                    </Typography>
                    <Typography>
                      Ora: 15:30
                    </Typography>
                    <Typography>
                      Durata: 130 min
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                    size="small" 
                    disabled={!isValid}
                    onClick={() => {
                      navigate(`/feedbackActivitate/${idActivitate}`)
                    }}
                    >Feedback</Button>
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