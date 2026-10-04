import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";

const Users = ({ users }) => {
  console.log(users);

  const theaderStyle = {
    fontWeight: "bold",
    fontSize: "1.05rem",
  };

  return (
    <div>
      <h1>Users</h1>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={theaderStyle}>Name</TableCell>
              <TableCell sx={theaderStyle}>Username</TableCell>
              <TableCell sx={theaderStyle}>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
