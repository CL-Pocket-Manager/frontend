import { Button, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import ItemForm from "../components/Items/ItemForm";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import CreateItem from "../components/Items/CreateItem";
import { fetchAllItems } from "../api/itemsApi";
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
import { Link } from "react-router-dom";

export default function Items() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

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
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item: any) => (
              <TableRow key={item._id}>
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
