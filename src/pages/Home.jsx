import { useEffect, useState } from "react";
import API from "../api/axios";

import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  TextField
} from "@mui/material";

export default function Home() {

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await API.post("/api/posts", {
        title,
        content
      });

      // Add new post on top instantly
      setPosts([res.data, ...posts]);

      // Clear form
      setTitle("");
      setContent("");

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

            <Typography variant="h6">
              {post.title}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {new Date(post.createdAt).toLocaleString()}
            </Typography>

            <Typography sx={{ mt: 1 }}>
              {post.content}
            </Typography>

          </CardContent>
        </Card>
      ))}

    </Container>
  );
}