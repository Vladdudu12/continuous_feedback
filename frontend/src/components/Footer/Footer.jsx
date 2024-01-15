import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      Dumitru-Ene Cristian & Dumitrescu Vlad-Eduard | {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

export default function Footer() {
  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Feedback 4 Days
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Proiect Tehnologii Web - Continuous Feedback
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
