import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();   // ✅ DEFINE IT

  const email = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
    window.location.reload(); // refresh state
  };

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        <Typography variant="h6">
          Blog App
        </Typography>

        <div>
          <Button color="inherit">
            {email}
          </Button>

          <Button
            color="inherit"
            onClick={() => navigate("/profile")}
          >
            PROFILE
          </Button>

          <Button
            color="inherit"
            onClick={handleLogout}
          >
            LOGOUT
          </Button>
        </div>

      </Toolbar>
    </AppBar>
  );
}