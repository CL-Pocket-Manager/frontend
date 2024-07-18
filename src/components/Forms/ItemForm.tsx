import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";

export default function ItemForm(props: any) {
  const { isNew, itemData, setItemData } = props;
  const [isAlcohol, setIsAlcohol] = useState(
    itemData.itemType === "Alcoholic Beverage"
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemData({ ...itemData, [event.target.name]: event.target.value });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const updatedValue = event.target.value as string;
    setItemData({
      ...itemData,
      [event.target.name]: updatedValue,
    });
    if (event.target.name === "itemType") {
      setIsAlcohol(updatedValue === "Alcoholic Beverage");
    }
  };

  return (
    <form>
      <Typography>{isNew ? "Create New Item" : "Edit Item"}</Typography>

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
