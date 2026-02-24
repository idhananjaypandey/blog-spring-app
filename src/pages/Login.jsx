import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const res = await API.post("/api/auth/login", form);

    localStorage.setItem("token", res.data);
    localStorage.setItem("email", form.email);

    // 🔥 Force refresh so App.jsx re-checks token
    window.location.href = "/";

  } catch {
    alert("Invalid Credentials");
  }
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ borderRadius: 4, boxShadow: 5 }}>
          <CardContent sx={{ p: 5 }}>
            <Typography variant="h4" fontWeight="bold" mb={3} align="center">
              Welcome Back 👋
            </Typography>

            <TextField
              fullWidth
              label="Email"
              margin="normal"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              margin="normal"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, borderRadius: 3 }}
              onClick={handleLogin}
            >
              Login
            </Button>

            <Typography mt={3} align="center">
              Don't have an account?{" "}
              <Link component="button" onClick={() => navigate("/signup")}>
                Sign up
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
