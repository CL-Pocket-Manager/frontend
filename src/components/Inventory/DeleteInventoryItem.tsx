import React from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import { removeItemFromInventory } from "../../api/inventoryApi";
import { useInventory } from "../../context/InventoryContext";

export default function DeleteInventoryItem(props: any) {
  const { open, setOpen, itemId, inventoryId } = props;

  const inventoryContext = useInventory();
  if (!inventoryContext) {
    throw new Error("useInventory must be used within a InventoryProvider");
  }
  const { getInventoryData } = inventoryContext;

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await removeItemFromInventory(inventoryId, itemId);
      getInventoryData(inventoryId);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
    console.log("Item Deleted");
    handleClose();
    navigate(-1);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleDelete}>
        <DialogTitle>Remove Item</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove this item from your inventory?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onSubmit={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
