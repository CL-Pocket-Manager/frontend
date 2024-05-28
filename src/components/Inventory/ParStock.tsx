import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function ParStock(props: any) {
  const { food, fetchFoodItems } = props;
  const [editMode, setEditMode] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    unit: "",
    qtyPerUnit: 0,
    par: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem({ ...newItem, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/food/item/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });

    if (!response.ok) {
      console.error("Failed to create new food item");
      return;
    }

    const createdItem = await response.json();
    console.log("Created new food item:", createdItem);
    // Add code here to handle the form submission

    setNewItem({
      name: "",
      unit: "",
      qtyPerUnit: 0,
      par: 0,
    });

    fetchFoodItems();
  };
  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <Button onClick={() => setEditMode(!editMode)}>
        {editMode ? "Save" : "Edit"}
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Food Item</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">
                Unit
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">
                Qty/Unit
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">
                Par
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {food.map((item: any) => (
              <TableRow
                key={item._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="right">{item.unit}</TableCell>
                <TableCell align="right">{item.qtyPerUnit}</TableCell>
                <TableCell align="right">{item.par}</TableCell>
              </TableRow>
            ))}
            {editMode && (
              <TableRow>
                <TableCell>
                  <TextField
                    name="name"
                    value={newItem.name}
                    onChange={handleChange}
                    type="text"
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    name="unit"
                    value={newItem.unit}
                    onChange={handleChange}
                    type="text"
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    name="qtyPerUnit"
                    value={newItem.qtyPerUnit}
                    onChange={handleChange}
                    type="number"
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    name="par"
                    value={newItem.par}
                    onChange={handleChange}
                    type="number"
                  />
                </TableCell>
                <TableCell align="right">
                  <Button onClick={handleSubmit}>Add</Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
