import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import AddItem from "../../components/Inventory/AddItem";
import { fetchAllItemsShort } from "../../api/itemsApi";

export default function Items(props: any) {
  const { inventory } = props;
  const inventoryItems = inventory.items;
  const [itemDict, setItemDict] = useState<any>({});
  const [editMode, setEditMode] = useState(false);
  const [addItem, setAddItem] = useState(false);
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<any>({});
  const [newItem, setNewItem] = useState({
    name: "",
    unit: "",
    qtyPerUnit: 0,
    par: 0,
  });

  useEffect(() => {
    const fetchItems = async () => {
      const items = await fetchAllItemsShort();
      const dictionary = items.reduce((acc: any, item: any) => {
        acc[item._id] = item.name;
        return acc;
      }, {});
      setItemDict(dictionary);
    };

    fetchItems();
  }, [inventory]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem({ ...newItem, [event.target.name]: event.target.value });
  };

  const handleAddItem = () => {
    setAddItem(true);
    console.log(addItem);
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
    const updatedItems = inventoryItems.map((item: any) => {
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
            {inventoryItems.map((item: any) => (
              <TableRow
                key={item._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <>
                  <Link
                    to={`${inventory._id}/${item._id}`}
                    state={{ item: item.item }}
                  >
                    <TableCell component="th" scope="row">
                      {itemDict[item.item]}
                    </TableCell>
                  </Link>
                  <TableCell align="right">{item.unitOfMeasure}</TableCell>
                  <TableCell align="right">{item.qtyPerUnit}</TableCell>
                  <TableCell align="right">{item.par}</TableCell>
                </>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={handleAddItem}>Add Item</Button>
      <AddItem open={addItem} setOpen={setAddItem} inventory={inventory} />
    </Box>
  );
}
