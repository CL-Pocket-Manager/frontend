import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { updateItem, updateAlcoholicItem } from "../../api/itemsApi";
import ItemForm from "../Forms/ItemForm";
import { DialogContent } from "@mui/material";

export default function EditItem(props: any) {
  const { open, setEditOpen, itemData, setItemData } = props;

  const handleClose = () => {
    setEditOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (itemData.itemType === "Alcoholic Beverage") {
      updateAlcoholicItem(itemData);
      handleClose();
    } else {
      updateItem(itemData);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <ItemForm itemData={itemData} setItemData={setItemData} isNew={false} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleFormSubmit}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}
