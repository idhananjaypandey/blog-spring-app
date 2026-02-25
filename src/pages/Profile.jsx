import { useEffect, useState } from "react";
import API from "../api/axios";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Card,
  CardContent,
  TextField,
} from "@mui/material";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");

  // form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // =============================
  // FETCH USER
  // =============================
  const fetchUser = async () => {
    try {
      const res = await API.get("/api/user/me");
      setUser(res.data);
      setName(res.data.name || "");
      setEmail(res.data.email || "");
      setPhone(res.data.phone || "");
    } catch (err) {
      console.error(err);
    }
  };

  // =============================
  // FETCH USER POSTS
  // =============================
  const fetchPosts = async () => {
    try {
      const res = await API.get("/api/posts/me");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchPosts();
  }, []);

  // =============================
  // DELETE POST
  // =============================
  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/posts/${id}`);
      setPosts(posts.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // =============================
  // UPDATE PROFILE
  // =============================
  const handleUpdateProfile = async () => {
    try {
      await API.put("/api/user/update", {
        name,
        email,
        phone,
        currentPassword,
        newPassword,
      });

      alert("Profile updated successfully");
      fetchUser();
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      alert(err.response?.data || "Update failed");
    }
  };

  // =============================
  // LOADING SAFE GUARD
  // =============================
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: "flex", height: "100vh", pt: "64px" }}>
      {/* =============================
          SIDEBAR (FIXED)
      ============================== */}
      <Box
        sx={{
          width: 250,
          position: "fixed",
          top: 64,
          bottom: 0,
          left: 0,
          bgcolor: "#f5f5f5",
          borderRight: "1px solid #ddd",
          p: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Dashboard
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <List>
          <ListItem disablePadding>
            <ListItemButton
              selected={activeTab === "posts"}
              onClick={() => setActiveTab("posts")}
            >
              <ListItemText primary="All My Posts" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              selected={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
            >
              <ListItemText primary="Profile Settings" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Saved Posts" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Notifications" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Security Settings" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* =============================
          CONTENT AREA (SCROLLABLE)
      ============================== */}
      <Box
        sx={{
          flexGrow: 1,
          ml: "250px",
          p: 4,
          overflowY: "auto",
        }}
      >
        {/* =============================
            PROFILE SETTINGS TAB
        ============================== */}
        {activeTab === "profile" && (
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Profile Settings
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle1" gutterBottom>
                Change Password
              </Typography>

              <TextField
                fullWidth
                type="password"
                label="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                type="password"
                label="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Button variant="contained" onClick={handleUpdateProfile}>
                Save Changes
              </Button>
            </CardContent>
          </Card>
        )}

        {/* =============================
            ALL MY POSTS TAB
        ============================== */}
        {activeTab === "posts" && (
          <>
            <Typography variant="h6" sx={{ mb: 3 }}>
              My Posts
            </Typography>

            {posts.length === 0 && (
              <Typography>No posts found.</Typography>
            )}

            {posts.map((post) => (
              <Card key={post.id} sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6">{post.title}</Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {new Date(post.createdAt).toLocaleString()}
                  </Typography>

                  <Typography sx={{ mb: 2 }}>{post.content}</Typography>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
}