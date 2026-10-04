import { Card, CardContent, Typography } from "@mui/material";

const User = ({ linkedUser }) => {
  const userStyle = {
    marginTop: 5,
    padding: 5,
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <Card sx={userStyle}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {linkedUser?.name}
        </Typography>
        <Typography>Added blogs</Typography>
        {linkedUser?.blogs?.map((blog) => (
          <li style={{ margin: "0 0 0 1.5rem" }} key={blog.id}>
            {blog.title}
          </li>
        ))}
      </CardContent>
    </Card>
  );
};

export default User;
