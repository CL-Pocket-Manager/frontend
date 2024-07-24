import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import NativeSelect from "@mui/material/NativeSelect";
import Box from "@mui/material/Box";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { Typography } from "@mui/material";

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

  const handleIncrease = (name: string, value: number) => {
    console.log(name, value);
    setItemData({ ...itemData, [name]: value + 1 });
  };

  const handleDecrease = (name: string, value: number) => {
    console.log(name, value);
    if (value === 0) {
      return;
    }
    setItemData({ ...itemData, [name]: value - 1 });
  };

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

  return (
    <>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        Item Name
      </Typography>

      <Autocomplete
        size="small"
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
            label="Enter item name"
            variant="outlined"
            margin="normal"
            required
          />
        )}
      />
      <div
        style={{ borderBottom: "1px solid #e4e4e4", margin: "10px 0" }}
      ></div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          rowGap: "20px",
          columnGap: "16px",
          margin: "16px 0 28px",
        }}
      >
        <div>
          <Typography
            textAlign={"center"}
            variant="body2"
            sx={{ fontWeight: 600, marginBottom: "10px" }}
          >
            Unit of Measure
          </Typography>
          <FormControl fullWidth>
            <Select
              size="small"
              name="unitOfMeasure"
              displayEmpty
              renderValue={(selected) => {
                if (selected === "") {
                  return <span style={{ color: "#666" }}>Select Unit</span>;
                } else {
                  return selected;
                }
              }}
              value={itemData.unitOfMeasure}
              onChange={handleSelectChange}
              placeholder="Unit of Measure"
              required
            >
              <MenuItem value="Each">Each</MenuItem>
              <MenuItem value="Case">Case</MenuItem>
              <MenuItem value="Liter">Liter</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <Typography
            textAlign={"center"}
            variant="body2"
            sx={{ fontWeight: 600, marginBottom: "10px" }}
          >
            Quantity Per Unit
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <RemoveCircleIcon
              onClick={() => handleDecrease("qtyPerUnit", itemData.qtyPerUnit)}
              style={{
                color: itemData.qtyPerUnit > 0 ? "#35a0a8" : "#888",
                transition: "transform 0.8s ease, opacity 0.2s ease",
              }}
            />
            <span>{itemData.qtyPerUnit}</span>

            <AddCircleIcon
              onClick={() => handleIncrease("qtyPerUnit", itemData.qtyPerUnit)}
              style={{
                color: "#35a0a8",
                transition: "transform 0.8s ease, opacity 0.2s ease",
              }}
            />
          </Box>
        </div>
        <div>
          <Typography
            textAlign={"center"}
            variant="body2"
            sx={{ fontWeight: 600, marginBottom: "10px" }}
          >
            Par Level
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <RemoveCircleIcon
              onClick={() => handleDecrease("par", itemData.par)}
              style={{
                color: itemData.par > 0 ? "#35a0a8" : "#888",
                transition: "transform 0.8s ease, opacity 0.2s ease",
              }}
            />
            <span>{itemData.par}</span>

            <AddCircleIcon
              onClick={() => handleIncrease("par", itemData.par)}
              style={{
                color: "#35a0a8",
                transition: "transform 0.8s ease, opacity 0.2s ease",
              }}
            />
          </Box>
        </div>
        <div>
          <Typography
            textAlign={"center"}
            variant="body2"
            sx={{ fontWeight: 600, marginBottom: "10px" }}
          >
            Stock
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <RemoveCircleIcon
              onClick={() => handleDecrease("stock", itemData.stock)}
              style={{
                color: itemData.stock > 0 ? "#35a0a8" : "#888",
                transition: "transform 0.8s ease, opacity 0.2s ease",
              }}
            />
            <span>{itemData.stock}</span>

            <AddCircleIcon
              onClick={() => handleIncrease("stock", itemData.stock)}
              style={{
                color: "#35a0a8",
                transition: "transform 0.8s ease, opacity 0.2s ease",
              }}
            />
          </Box>
        </div>

        {/* <TextField
          label="Quantity per Unit"
          name="qtyPerUnit"
          value={itemData.qtyPerUnit}
          onChange={handleChange}
          type="number"
          fullWidth
          variant="outlined"
          inputProps={{ min: "0" }}
        /> */}
        {/* <TextField
          label="Cost per Unit"
          name="costPerUnit"
          value={itemData.costPerUnit}
          onChange={handleChange}
          type="number"
          fullWidth
          margin="normal"
          variant="outlined"
        /> */}
      </div>
      <div
        style={{ borderBottom: "1px solid #e4e4e4", margin: "10px 0" }}
      ></div>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        Distributor
      </Typography>
      <Autocomplete
        size="small"
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
      {/* <TextField
          label="Par"
          name="par"
          value={itemData.par}
          onChange={handleChange}
          type="number"
          fullWidth
          margin="normal"
          variant="outlined"
        /> */}
    </>
  );
}

interface BaseItem {
  _id: string;
  name: string;
  inputValue?: string;
}
