import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { createInventory } from "../../api/inventoryApi";

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

export default function CreateInventory() {
  const [inventoryName, setInventoryName] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInventoryName(e.target.value);
  };

  const handleCreate = async () => {
    const newInventory = await createInventory(inventoryName);
    console.log(newInventory);
    setInventoryName("");
    if (!newInventory) {
      console.error("Error creating inventory");
    }
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Create Inventory</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Pocket Manager
          </Typography>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              required
              id="inventory-name"
              label="Inventory Name"
              fullWidth
              margin="normal"
              value={inventoryName}
              onChange={handleInputChange}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                variant="outlined"
                sx={{ mr: 1 }}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreate}
              >
                Create
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
