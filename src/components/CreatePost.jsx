import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import API from "../api/axios";

export default function CreatePost({ refresh }) {
  const [form, setForm] = useState({ title: "", content: "" });

  const createPost = async () => {
    await API.post("/api/posts", form);
    setForm({ title: "", content: "" });
    refresh();
  };

  return (
    <Box mb={3}>
      <TextField fullWidth label="Title" margin="normal"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <TextField fullWidth multiline rows={4} label="What's on your mind?"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })} />
      <Button variant="contained" onClick={createPost}>
        Post
      </Button>
    </Box>
  );
}