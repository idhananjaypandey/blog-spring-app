import { useEffect, useState } from "react";
import API from "../api/axios";

import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [editingId, setEditingId] = useState(null);

  const loggedInEmail = localStorage.getItem("email");

  // 🔥 Fetch posts
  const fetchPosts = async () => {
    try {
      const res = await API.get("/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 Create post
  const handlePost = async () => {
    if (!title || !content) return;

    try {
      if (editingId) {
        const res = await API.put(`/api/posts/${editingId}`, {
          title,
          content,
        });

        setPosts(posts.map((p) => (p.id === editingId ? res.data : p)));

        setEditingId(null);
      } else {
        const res = await API.post("/api/posts", {
          title,
          content,
        });

        setPosts([res.data, ...posts]);
      }

      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setEditingId(post.id);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/posts/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* 🔥 POST FORM */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button variant="contained" onClick={handlePost}>
            POST
          </Button>
        </CardContent>
      </Card>

      {/* 🔥 POSTS BELOW */}
      {posts.map((post) => (
        <Card key={post.id} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="subtitle2" color="primary">
              Posted by {post.username}
            </Typography>

            <Typography variant="h6">{post.title}</Typography>

            <Typography variant="body2" color="text.secondary">
              {new Date(post.createdAt).toLocaleString()}
            </Typography>

            <Typography sx={{ mt: 1, mb: 2 }}>{post.content}</Typography>

            {/* 🔥 SHOW BUTTONS ONLY IF OWNER */}
            {post.email === loggedInEmail && (
              <>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ mr: 2 }}
                  onClick={() => handleEdit(post)}
                >
                  Edit
                </Button>

                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
