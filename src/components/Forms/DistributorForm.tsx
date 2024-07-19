import React from "react";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

export default function DistributorForm(props: any) {
  const { isNew, distributorData, setDistributorData } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDistributorData({
      ...distributorData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form>
      <Typography>
        {isNew ? "Create New Distributor" : "Edit Distributor"}
      </Typography>

      <TextField
        label="Name"
        name="name"
        value={distributorData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        autoComplete="off"
        required
      />
      <TextField
        label="Website"
        name="website"
        value={distributorData.website}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        autoComplete="off"
      />
      <Typography>Contact</Typography>
      <TextField
        label="Name"
        name="contactName"
        value={distributorData.contactName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        autoComplete="off"
      />
      <TextField
        label="Email"
        name="contactEmail"
        value={distributorData.contactEmail}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        autoComplete="off"
      />
      <TextField
        label="Phone"
        name="contactPhone"
        value={distributorData.contactPhone}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        autoComplete="off"
      />
    </form>
  );
}
