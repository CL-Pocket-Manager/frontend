import React from "react";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

export default function FoodInventory(props: any) {
  const { food, setOpen, fetchArchive } = props;
  const [foodItems, setFoodItems] = useState(
    food.map((item: any) => ({ ...item, stock: 0 }))
  );

  const handleStockChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const updatedFoodItems = foodItems.map((item: any) => {
      if (item._id === id) {
        return {
          ...item,
          stock: Number(event.target.value),
        };
      }
      return item;
    });

    setFoodItems(updatedFoodItems);
  };

  const handleSubmit = () => {
    // Send the updated foodItems to the server and save in Archive Collection
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/food/archive/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foodItems),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));

    fetchArchive();
    setFoodItems(food.map((item: any) => ({ ...item, stock: 0 }))); // Reset stock values
    setOpen(false);
  };

  return (
    <>
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
              <TableCell sx={{ fontWeight: 600 }} align="right">
                Stock
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {food.map((item: any) => (
              <TableRow
                key={item._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="right">{item.unit}</TableCell>
                <TableCell align="right">{item.qtyPerUnit}</TableCell>
                <TableCell align="right">{item.par}</TableCell>
                <TableCell align="right">
                  <TextField
                    id="outlined-number"
                    type="number"
                    size="small"
                    style={{ maxWidth: "80px" }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleStockChange(e, item._id)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ width: "-webkit-fill-available" }}
      >
        Submit
      </Button>
    </>
  );
}
