import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions<BaseItem>();

export default function InventoryItemForm(props: any) {
  const { itemData, setItemData, allItems, setActiveStep, value, setValue } =
    props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setItemData({ ...itemData, [name]: value });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const updatedValue = event.target.value as string;
    setItemData({
      ...itemData,
      [event.target.name]: updatedValue,
    });
  };

  return (
    <form>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setValue(newValue);
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue(newValue);
            setActiveStep(1);
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some(
            (option) => inputValue === option.name
          );
          if (inputValue !== "" && !isExisting) {
            filtered.push({
              inputValue,
              name: `Add "${inputValue}"`,
              _id: "",
            });
          }

          return filtered;
        }}
        selectOnFocus
        options={allItems}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.name;
        }}
        renderOption={(props, option) => {
          return <li {...props}>{option.name}</li>;
        }}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter the item name"
            variant="outlined"
            margin="normal"
          />
        )}
      />
      <TextField
        label="Unit of Measure"
        name="unitOfMeasure"
        value={itemData.unitOfMeasure}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        autoComplete="off"
      />
      <TextField
        label="Quantity per Unit"
        name="qtyPerUnit"
        value={itemData.qtyPerUnit}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        autoComplete="off"
      />
      <TextField
        label="Cost per Unit"
        name="costPerUnit"
        value={itemData.costPerUnit}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        autoComplete="off"
      />
      <TextField
        label="Distributor"
        name="distributor"
        value={itemData.distributor}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        autoComplete="off"
      />
      <TextField
        label="Par"
        name="par"
        value={itemData.par}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        autoComplete="off"
      />
    </form>
  );
}

interface BaseItem {
  _id: string;
  name: string;
  inputValue?: string;
}
