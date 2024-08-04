import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { createItem, createAlcoholicItem } from "../../api/itemsApi";
import ItemForm from "../Forms/ItemForm";
import { DialogContent } from "@mui/material";

export default function CreateItem(props: any) {
  const { open, setOpen } = props;

  const initializeItemData = () => ({
    name: "",
    image: "",
    description: "",
    itemType: "",
    alcoholType: "",
    alcoholContent: 0,
  });

  const [itemData, setItemData] = useState(initializeItemData);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      const resetData = initializeItemData();
      setItemData(resetData);
    }, 500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (itemData.itemType === "Alcoholic Beverage") {
      createAlcoholicItem(itemData);
      setOpen(false);
    } else {
      createItem(itemData);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleFormSubmit}>
        <DialogContent>
          <ItemForm
            itemData={itemData}
            setItemData={setItemData}
            isNew={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onSubmit={handleFormSubmit}>
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
