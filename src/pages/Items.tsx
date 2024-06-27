import { Button, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateItem from "../components/Items/CreateItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

export default function Items() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/items/all`)
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <Container>
      <h2>Items</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Distributor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item: any) => (
              <TableRow
                key={item._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <Link to={`/items/${item._id}`}>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                </Link>
                <TableCell align="right">{item.itemType}</TableCell>
                <TableCell align="right">{item.distributor}</TableCell>
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
