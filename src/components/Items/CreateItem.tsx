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

export default function CreateItem(props: any) {
  const { open, setOpen } = props;

  const [dialogStep, setDialogStep] = useState("confirmItemType");
  const [isAlcohol, setIsAlcohol] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    image: "",
    description: "",
    distributor: "",
    itemType: "",
    alcoholType: "",
    alcoholContent: 0,
  });

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setDialogStep("confirmItemType");
      setNewItem({
        name: "",
        image: "",
        description: "",
        distributor: "",
        itemType: "",
        alcoholType: "",
        alcoholContent: 0,
      });
    }, 500);
  };

  const handleItemType = (value: string) => {
    if (value === "Alcohol") {
      setIsAlcohol(true);
      setNewItem({ ...newItem, itemType: value });
    } else if (value === "other") {
      setIsAlcohol(false);
    }
    setDialogStep("createItem");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.itemType === "Alcohol") {
      fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/items/alcohol/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.error("Error:", error));
    } else {
      fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/items/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      })
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
    setNewItem({ ...newItem, [event.target.name]: event.target.value });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setNewItem({
      ...newItem,
      [event.target.name]: event.target.value as string,
    });
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      {dialogStep === "confirmItemType" && (
        <>
          <DialogTitle>Confirm Item Type</DialogTitle>
          <DialogActions>
            <Button onClick={() => handleItemType("Alcohol")}>Alcohol</Button>
            <Button onClick={() => handleItemType("other")}>Other</Button>
          </DialogActions>
        </>
      )}
      {dialogStep === "createItem" && (
        <form onSubmit={handleFormSubmit}>
          <DialogTitle>New Item</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              name="name"
              value={newItem.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              label="Image URL"
              name="image"
              value={newItem.image}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              type="url"
            />
            <TextField
              label="Description"
              name="description"
              value={newItem.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Distributor</InputLabel>
              <Select
                value={newItem.distributor}
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
                    value={newItem.alcoholType}
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
                  value={newItem.alcoholContent}
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
                  value={newItem.itemType}
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
            <Button onClick={() => setDialogStep("confirmItemType")}>
              Back
            </Button>
            <Button type="submit" onSubmit={handleFormSubmit}>
              Submit
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  );
}
