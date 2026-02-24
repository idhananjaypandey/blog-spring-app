import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Link
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post("/api/auth/signup", form);
      navigate("/");
    } catch {
      alert("Signup failed");
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
              Create Account 🚀
            </Typography>

            <TextField
              fullWidth
              label="Name"
              margin="normal"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <TextField
              fullWidth
              label="Email"
              margin="normal"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              margin="normal"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, borderRadius: 3 }}
              onClick={handleSignup}
            >
              Sign Up
            </Button>

            <Typography mt={3} align="center">
              Already have an account?{" "}
              <Link
                component="button"
                onClick={() => navigate("/")}
              >
                Login
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}