import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions<BaseItem>();

export default function InventoryItemForm(props: any) {
  const {
    itemData,
    setItemData,
    allItems,
    setActiveStep,
    itemValue,
    setItemValue,
    distributorValue,
    setDistributorValue,
    allDistributors,
  } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setItemData({ ...itemData, [name]: value });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const updatedValue = event.target.value as string;
    console.log(updatedValue);
    setItemData({
      ...itemData,
      [event.target.name]: updatedValue,
    });
  };

  console.log(itemValue);

  return (
    <>
      <Autocomplete
        value={itemValue}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setItemValue(newValue);
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setItemValue(newValue);
            setActiveStep(1);
          } else {
            setItemValue(newValue);
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
            required
          />
        )}
      />
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel>Unit of Measure</InputLabel>
        <Select
          label="Unit of Measure"
          name="unitOfMeasure"
          value={itemData.unitOfMeasure}
          onChange={handleSelectChange}
        >
          <MenuItem value="Each">Each</MenuItem>
          <MenuItem value="Case">Case</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Quantity per Unit"
        name="qtyPerUnit"
        value={itemData.qtyPerUnit}
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
        value={itemData.costPerUnit}
        onChange={handleChange}
        type="number"
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Autocomplete
        value={distributorValue}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setDistributorValue(newValue);
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setDistributorValue(newValue);
            setActiveStep(2);
          } else {
            setDistributorValue(newValue);
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
        options={allDistributors}
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
            label="Enter the Distributor"
            variant="outlined"
            margin="normal"
            required
          />
        )}
      />
      <TextField
        label="Par"
        name="par"
        value={itemData.par}
        onChange={handleChange}
        type="number"
        fullWidth
        margin="normal"
        variant="outlined"
      />
    </>
  );
}

interface BaseItem {
  _id: string;
  name: string;
  inputValue?: string;
}
