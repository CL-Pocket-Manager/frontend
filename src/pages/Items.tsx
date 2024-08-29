import { Button, Container } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateItem from "../components/Items/CreateItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link, useLoaderData } from "react-router-dom";
import { Item } from "../types/types";

export default function Items() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const items = useLoaderData() as Item[];

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="center" alignItems="center" m={2}>
        <Button
          onClick={() => navigate(-1)}
          sx={{ position: "absolute", left: "1rem" }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </Button>
        <Typography variant="h5">All Items in Database</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, width: 60 }}> </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Item Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item: any) => (
              <TableRow key={item._id}>
                <TableCell style={{ padding: 8 }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "35px",
                      height: "35px",
                      objectFit: "contain",
                    }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <Link
                    to={`/items/${item._id}`}
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    <Typography noWrap variant="body1">
                      {item.name}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{item.itemType}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Create Item
      </Button>
      <CreateItem open={open} setOpen={setOpen} />
    </Container>
  );
}
