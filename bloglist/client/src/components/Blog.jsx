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

const Blog = ({ blog, handleUpdateLike, removeBlog, user }) => {
  const [comment, setComment] = useState("");
  const setBlogComment = useBlogs((state) => state.setBlogComment);
  const navigate = useNavigate();

  if (!blog || !blog.user) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>something went wrong</h2>
      </div>
    );
  }

  const blogStyle = {
    marginTop: 5,
    padding: 5,
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (comment.trim() === "") return;
    setBlogComment(blog.id, comment);
    setComment("");
  };

  const handleRemoveBlog = () => {
    removeBlog(blog);
    navigate("/");
  };

  const loggedInUserId = user?.id || user?._id;
  const blogCreatorId = blog.user?.id || blog.user?._id || blog.user;
  const showRemoveButton =
    loggedInUserId && blogCreatorId && loggedInUserId === blogCreatorId;

  return (
    <Card sx={blogStyle} data-testid="blog">
      <CardContent>
        <Typography variant="h4">{blog.title}</Typography>
        <Typography variant="h6">by {blog.author}</Typography>
        <Typography variant="h6" color="inherit">
          <a href={blog.url} target="_blank" rel="noreferrer">
            {blog.url}
          </a>
        </Typography>

        <Typography variant="h6">Added by {blog.user.username}</Typography>

        <Typography variant="h6">
          {blog.likes} likes
          {user && (
            <Button
              sx={{ margin: 2 }}
              variant="outlined"
              onClick={() => handleUpdateLike(blog)}
            >
              like
            </Button>
          )}
          {showRemoveButton && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleRemoveBlog(blog)}
            >
              remove
            </Button>
          )}
        </Typography>

        <Typography
          variant="h5"
          sx={{ marginBottom: "1rem", marginTop: "2rem" }}
        >
          comments
        </Typography>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleAddComment}
          sx={{ marginBottom: "2rem" }}
        >
          <TextField
            label="Add a comment..."
            variant="outlined"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            size="small"
          />
          <Button
            sx={{
              marginLeft: "0.8rem",
              padding: "0.55rem 1.5rem",
            }}
            variant="contained"
            type="submit"
          >
            Add comment
          </Button>
        </Box>

        <Box sx={{ marginTop: "1rem" }}>
          {!blog.comments || blog.comments.length === 0 ? (
            <Typography
              variant="body1"
              sx={{ color: "gray", fontStyle: "italic" }}
            >
              No comment yet..
            </Typography>
          ) : (
            <ul>
              {blog.comments.map((c, index) => (
                <li key={`${index}-${c}`} style={{ marginTop: "0.5rem" }}>
                  <Typography component="span" variant="body1">
                    {c}
                  </Typography>
                </li>
              ))}
            </ul>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Blog;
