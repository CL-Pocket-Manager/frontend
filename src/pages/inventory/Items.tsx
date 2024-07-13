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

export default function Items(props: any) {
  const { items } = props;
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<any>({});
  const [newItem, setNewItem] = useState({
    name: "",
    unit: "",
    qtyPerUnit: 0,
    par: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem({ ...newItem, [event.target.name]: event.target.value });
  };

  const handleEditClick = (item: any) => {
    setEditItemId(item._id);
    setEditFormData({
      name: item.name,
      unit: item.unit,
      qtyPerUnit: item.qtyPerUnit,
      par: item.par,
    });
  };

  const handleSaveClick = () => {
    // Update the item in your state or backend
    const updatedItems = items.map((item: any) => {
      if (item._id === editItemId) {
        return { ...item, ...editFormData };
      }
      return item;
    });
    console.log(updatedItems);
    setEditItemId(null); // Exit edit mode
  };

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch(
      `${import.meta.env.VITE_APP_API_BASE_URL}/food/item/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      }
    );

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
              <TableCell sx={{ fontWeight: 600 }}>Item</TableCell>
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
            {items.map((item: any) => (
              <TableRow
                key={item._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                {editItemId === item._id ? (
                  <>
                    <TableCell component="th" scope="row">
                      <TextField
                        name="name"
                        value={editFormData.name}
                        onChange={handleUpdate}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        name="unit"
                        value={editFormData.unit}
                        onChange={handleUpdate}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        name="qtyPerUnit"
                        value={editFormData.qtyPerUnit}
                        onChange={handleUpdate}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        name="par"
                        value={editFormData.par}
                        onChange={handleUpdate}
                      />
                    </TableCell>

                    <Button
                      style={{ position: "absolute" }}
                      onClick={handleSaveClick}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell align="right">{item.unit}</TableCell>
                    <TableCell align="right">{item.qtyPerUnit}</TableCell>
                    <TableCell align="right">{item.par}</TableCell>

                    <Button
                      style={{ position: "absolute" }}
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </Button>
                  </>
                )}
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
      <Button>Add Item</Button>
    </Box>
  );
}
