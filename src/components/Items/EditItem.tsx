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

export default function EditItem(props: any) {
  const { editOpen, setEditOpen, item } = props;
  const isAlcohol = item.itemType === "Alcohol";

  const [editItem, setEditItem] = useState({
    name: item.name,
    image: item.image,
    description: item.description,
    distributor: item.distributor,
    itemType: item.itemType,
    alcoholType: item.alcoholType ? item.alcoholType : "",
    alcoholContent: item.alcoholContent ? item.alcoholContent : 0,
  });

  const handleClose = () => {
    setEditOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editItem.itemType === "Alcohol") {
      fetch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/items/alcohol/${
          item._id
        }/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editItem),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.error("Error:", error));
    } else {
      fetch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/items/${item._id}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editItem),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.error("Error:", error));
    }

    console.log("Form submitted");
    handleClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditItem({ ...editItem, [event.target.name]: event.target.value });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setEditItem({
      ...editItem,
      [event.target.name]: event.target.value as string,
    });
  };
  return (
    <Dialog open={editOpen} onClose={handleClose}>
      <form onSubmit={handleFormSubmit}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={editItem.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            label="Image URL"
            name="image"
            value={editItem.image}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            type="url"
          />
          <TextField
            label="Description"
            name="description"
            value={editItem.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Distributor</InputLabel>
            <Select
              value={editItem.distributor}
              label="Distributor"
              name="distributor"
              onChange={handleSelectChange}
              required
            >
              {isAlcohol
                ? [
                    <MenuItem key="Southern" value="Southern">
                      Southern
                    </MenuItem>,
                    <MenuItem key="Empire" value="Empire">
                      Empire
                    </MenuItem>,
                  ]
                : [
                    <MenuItem key="Chef's Warehouse" value="Chef's Warehouse">
                      Chef's Warehouse
                    </MenuItem>,
                    <MenuItem key="Internal" value="Internal">
                      Internal
                    </MenuItem>,
                  ]}
              <MenuItem key="Other" value="Other">
                Other
              </MenuItem>
            </Select>
          </FormControl>
          {isAlcohol ? (
            <>
              <FormControl fullWidth margin="normal">
                <InputLabel>Alcohol Type</InputLabel>
                <Select
                  value={editItem.alcoholType}
                  label="Type"
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
                value={editItem.alcoholContent}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                type="number"
                required
              />
            </>
          ) : (
            <FormControl fullWidth margin="normal">
              <InputLabel>Item Type</InputLabel>
              <Select
                value={editItem.itemType}
                label="Type"
                name="itemType"
                onChange={handleSelectChange}
                required
              >
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Supplies">Supplies</MenuItem>
                <MenuItem value="Beverage">Beverage</MenuItem>
              </Select>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onSubmit={handleFormSubmit}>
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
