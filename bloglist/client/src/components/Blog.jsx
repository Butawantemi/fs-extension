import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useBlogs } from "../stores/BlogStore";
import { useState } from "react";

const Blog = ({ blog, handleUpdateLike, removeBlog, user, isBroken }) => {
  const [comment, setComment] = useState("");
  const setBlogComment = useBlogs((state) => state.setBlogComment);
  const navigate = useNavigate();

  if (isBroken) {
    throw new Error("something went wrong");
  }
  if (!blog) {
    return null;
  }

  const blogStyle = {
    marginTop: 5,
    padding: 5,
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    setBlogComment(blog.id, comment);
    setComment("");
  };

  const handleRemoveBlog = () => {
    removeBlog(blog);
    navigate("/");
  };

  const loggedInUserId = user?.id;

  return (
    <Card sx={blogStyle} data-testid="blog">
      <CardContent>
        <Typography variant="h4">{blog?.title}</Typography>
        <Typography variant="h6">by {blog?.author}</Typography>
        <Typography variant="h6" color="inherit">
          <a href={blog?.url}>{blog?.url}</a>
        </Typography>
        <Typography variant="h6">Added by {blog?.user?.username}</Typography>
        <Typography variant="h6">
          {blog?.likes} likes
          {user && (
            <Button
              sx={{ margin: 2 }}
              variant="outlined"
              onClick={() => handleUpdateLike(blog)}
            >
              like
            </Button>
          )}
          {loggedInUserId && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleRemoveBlog(blog)}
            >
              remove
            </Button>
          )}
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
          comments
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleAddComment}
        >
          <Typography>
            <TextField
              label="Add a comment..."
              variant="outlined"
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              sx={{
                marginLeft: "0.8rem",
                padding: "0.9rem",
                background: "",
              }}
              variant="contained"
              type="submit"
            >
              Add comment
            </Button>
          </Typography>
        </Box>
        <Box sx={{ marginTop: "1rem" }}>
          {!blog?.comments || blog.comments?.length === 0 ? (
            <Typography>No comment yet..</Typography>
          ) : (
            <ul>
              {blog?.comments?.map((c, index) => {
                return <li key={index}>{c}</li>;
              })}
            </ul>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Blog;
