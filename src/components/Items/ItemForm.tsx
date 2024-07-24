import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function ItemForm(props: any) {
  const { open, setOpen, isNew, item } = props;
  const initializeItemData = (item: any) => ({
    isAlcohol: item ? item.itemType === "Alcoholic Beverage" : false,
    itemData: {
      name: item ? item.name : "",
      image: item ? item.image : "",
      description: item ? item.description : "",
      itemType: item ? item.itemType : "",
      alcoholType: item && item.alcoholType ? item.alcoholType : "",
      alcoholContent: item && item.alcoholContent ? item.alcoholContent : 0,
    },
  });

  const initialData = initializeItemData(item);
  const [isAlcohol, setIsAlcohol] = useState(initialData.isAlcohol);
  const [itemData, setItemData] = useState(initialData.itemData);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      const resetData = initializeItemData(item);
      setIsAlcohol(resetData.isAlcohol);
      setItemData(resetData.itemData);
    }, 500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    const path =
      itemData.itemType === "Alcoholic Beverage" ? "/items/alcohol" : "/items";
    const action = isNew ? "/create" : `/${item._id}/update`;
    const url = `${baseUrl}${path}${action}`;
    const method = isNew ? "POST" : "PUT";

    performFetch(url, method, itemData);
    console.log("Form submitted");
    handleClose();
  };

  const performFetch = (url: string, method: string, data: any) => {
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemData({ ...itemData, [event.target.name]: event.target.value });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const updatedValue = event.target.value as string;
    setItemData({
      ...itemData,
      [event.target.name]: updatedValue,
    });
    setIsAlcohol(updatedValue === "Alcoholic Beverage");
  };

  return (
    // <Dialog open={open} onClose={handleClose}>
    <form onSubmit={handleFormSubmit}>
      <DialogTitle>{isNew ? "Create Item" : "Edit Item"}</DialogTitle>
      <TextField
        label="Name"
        name="name"
        value={itemData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        autoComplete="off"
        required
      />
      <TextField
        label="Image URL"
        name="image"
        value={itemData.image}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        type="url"
        autoComplete="off"
      />
      <TextField
        label="Description"
        name="description"
        value={itemData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        autoComplete="off"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Item Type</InputLabel>
        <Select
          value={itemData.itemType}
          label="Item Type"
          name="itemType"
          onChange={handleSelectChange}
          required
        >
          <MenuItem value="Food Item">Food Item</MenuItem>
          <MenuItem value="Supplies">Supplies</MenuItem>
          <MenuItem value="Non-Alcoholic Beverage">
            Non-Alcoholic Beverage
          </MenuItem>
          <MenuItem value="Alcoholic Beverage">Alcoholic Beverage</MenuItem>{" "}
        </Select>
      </FormControl>
      {isAlcohol && (
        <>
          <FormControl fullWidth margin="normal">
            <InputLabel>Alcohol Type</InputLabel>
            <Select
              value={itemData.alcoholType}
              label="Alcohol Type"
              name="alcoholType"
              onChange={handleSelectChange}
              required
            >
              <MenuItem value="Whiskey">Whiskey</MenuItem>
              <MenuItem value="Agave">Agave</MenuItem>
              <MenuItem value="Vodka">Vodka</MenuItem>
              <MenuItem value="Rum">Rum</MenuItem>
              <MenuItem value="Gin">Gin</MenuItem>
              <MenuItem value="Beer">Beer</MenuItem>
              <MenuItem value="Wine">Wine</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Alcohol Content"
            name="alcoholContent"
            value={itemData.alcoholContent}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            type="number"
            required
          />
        </>
      )}
    </form>
  );
}
