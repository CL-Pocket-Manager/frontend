import React from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { deleteInventory } from "../../api/inventoryApi";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DeleteInventoryItem(props: any) {
  const { open, setOpen, inventoryId } = props;

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
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
    <Modal open={open} onClose={handleClose}>
      <form onSubmit={handleDelete}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Inventory
          </Typography>
          <Box component="form" sx={{ mt: 2 }}>
            <Typography>
              Are you sure you want to delete this inventory? This action cannot
              be undone.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="outlined"
              sx={{ mr: 1 }}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </Box>
      </form>
    </Modal>
  );
}
