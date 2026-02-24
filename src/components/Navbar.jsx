import { AppBar, Toolbar, Typography, Button } from "@mui/material";

function Navbar() {

  const email = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }}>
          Blog App
        </Typography>

        <Typography sx={{ mr: 2 }}>
          {email}
        </Typography>

        <Button color="inherit" onClick={handleLogout}>
          LOGOUT
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;