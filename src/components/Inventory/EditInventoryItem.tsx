import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Typography } from "@mui/material";
import { updateItemInInventory } from "../../api/inventoryApi";

export default function EditInventoryItem(props: any) {
  const {
    open,
    setOpen,
    name,
    inventory,
    inventoryItemData,
    setInventoryItemData,
  } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setInventoryItemData({ ...inventoryItemData, [name]: value });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const updatedValue = event.target.value as string;
    console.log(updatedValue);
    setInventoryItemData({
      ...inventoryItemData,
      [event.target.name]: updatedValue,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call API to update inventory item
      updateItemInInventory(inventory, inventoryItemData);
      console.log("Inventory item updated");
    } catch (error) {
      console.error(error);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Typography>Edit Inventory Item</Typography>
        <Typography>{name}</Typography>
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Unit of Measure</InputLabel>
            <Select
              label="Unit of Measure"
              name="unitOfMeasure"
              value={inventoryItemData.unitOfMeasure}
              onChange={handleSelectChange}
            >
              <MenuItem value="Each">Each</MenuItem>
              <MenuItem value="Case">Case</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Quantity per Unit"
            name="qtyPerUnit"
            value={inventoryItemData.qtyPerUnit}
            onChange={handleChange}
            type="number"
            fullWidth
            margin="normal"
            variant="outlined"
            inputProps={{ min: "0" }}
          />
          <TextField
            label="Cost per Unit"
            name="costPerUnit"
            value={inventoryItemData.costPerUnit}
            onChange={handleChange}
            type="number"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Par"
            name="par"
            value={inventoryItemData.par}
            onChange={handleChange}
            type="number"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Stock"
            name="stock"
            value={inventoryItemData.stock}
            onChange={handleChange}
            type="number"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit">Update</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
