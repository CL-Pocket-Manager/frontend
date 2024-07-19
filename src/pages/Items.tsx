import { Button, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import ItemForm from "../components/Items/ItemForm";
import CreateItem from "../components/Items/CreateItem";
import { fetchAllItems } from "../api/itemsApi";
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
    const fetchItems = async () => {
      const fetchedData = await fetchAllItems(); // Assume fetchData is your method to fetch items
      setItems(fetchedData); // Updating state will cause a re-render
    };

    fetchItems();
  }, [open]); // Dependency array, re-run effect if `open` changes

  return (
    <Container>
      <h2>Items</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Type</TableCell>
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
