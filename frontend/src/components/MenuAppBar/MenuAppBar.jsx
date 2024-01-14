import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import { useAuth } from "../../provider/authProvider";
const studentPages = ["Conectare Activitate"];
const professorPages = ["Creare Activitate", "Lista Activitati"];
let pages = [];
const settings = ["Profil", "Logout"];
const idProfessor = 12455;
function MenuAppBar(props) {
  const { token } = useAuth();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <AppBar position="static">
          <Container maxWidth="auto" style={{ margin: 0 }}>
            <Toolbar disableGutters style={{ justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  onClick={() => {
                    navigate("/", { shallow: true });
                  }}
                >
                  <AdbIcon
                    sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                  />
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    Feedback 4 Days
                  </Typography>
                </Button>
              </div>

              <div
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => {
                  navigate("/", { shallow: true });
                }}
              >
                <Button
                  onClick={() => {
                    navigate("/", { shallow: true });
                  }}
                >
                  <AdbIcon
                    sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                  />
                  <Typography
                    variant="h5"
                    noWrap
                    sx={{
                      mr: 2,
                      display: { xs: "flex", md: "none" },
                      flexGrow: 1,
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    Feedback 4 Days
                  </Typography>
                </Button>
              </div>

              {token ? (
                <Box sx={{ flexGrow: 0 }} style={{ float: "left" }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem
                      component={Link}
                      to={`/profile/${idProfessor}`}
                      key="Profil"
                      onClick={handleCloseUserMenu}
                    >
                      <Typography textAlign="center">Profil</Typography>
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to={`/logout`}
                      key="Logout"
                      onClick={handleCloseUserMenu}
                    >
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              ) : (
                <></>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </main>
    </ThemeProvider>
  );
}
export default MenuAppBar;
