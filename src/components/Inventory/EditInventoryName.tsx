import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { updateInventoryName } from "../../api/inventoryApi";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  padding: "20px",
};

export default function EditInventoryName(props: any) {
  const { open, setOpen, inventory, getInventoryData } = props;
  const [inventoryName, setInventoryName] = useState(
    inventory?.inventoryName || ""
  );
  const handleClose = () => setOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInventoryName(e.target.value);
  };

  const handleUpdate = async () => {
    const updatedInventory = await updateInventoryName(
      inventory._id,
      inventoryName
    );
    console.log(updatedInventory);
    getInventoryData();
    if (!updatedInventory) {
      console.error("Error creating inventory");
    }
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Name
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
              autoComplete="off"
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
                onClick={handleUpdate}
              >
                Update
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
