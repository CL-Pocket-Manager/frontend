import { useState, useEffect } from "react";
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

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleFormSubmit = (e: React.FormEvent) => {
    console.log("Form submitted");
    setOpen(false);
  };

  useEffect(() => {
    const loadSuggestions = async () => {
      if (!inputValue) return setSuggestions([]);
      try {
        const response = await fetch(`/search-items?term=${inputValue}`);
        if (!response.ok) throw new Error("Network response was not ok.");
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    loadSuggestions();
  }, [inputValue]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleFormSubmit}>
        <DialogTitle>New Item</DialogTitle>
        <DialogContent>
          <TextField
            label="Item"
            name="Item"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit" onSubmit={handleFormSubmit}>
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
