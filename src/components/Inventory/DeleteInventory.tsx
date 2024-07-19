import React from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import { deleteInventory } from "../../api/inventoryApi";

export default function DeleteInventoryItem(props: any) {
  const { deleteOpen, setDeleteOpen, inventoryId } = props;

  const navigate = useNavigate();

  const handleClose = () => {
    setDeleteOpen(false);
  };

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      deleteInventory(inventoryId);
    } catch (error) {
      console.error(error);
    }
    console.log("Inventory Deleted");
    handleClose();
    navigate(-1);
  };

  return (
    <Dialog open={deleteOpen} onClose={handleClose}>
      <form onSubmit={handleDelete}>
        <DialogTitle>Delete Inventory</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this inventory? This action cannot
            be undone.
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
