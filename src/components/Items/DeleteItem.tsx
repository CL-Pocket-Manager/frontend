import React from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

export default function EditItem(props: any) {
  const { deleteOpen, setDeleteOpen, item } = props;

  const handleClose = () => {
    setDeleteOpen(false);
  };

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/items/${item._id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
    console.log("Item Deleted");
    handleClose();
  };

  return (
    <Dialog open={deleteOpen} onClose={handleClose}>
      <form onSubmit={handleDelete}>
        <DialogTitle>Delete Item</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this item?</Typography>
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
