import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Box textAlign="center" display="flex" flexDirection="column" gap={2}>
          <Typography variant="h4" gutterBottom>
            Welcome to Pocket Manager
          </Typography>
          <Typography variant="h6" gutterBottom>
            Simplify Your Inventory Management
          </Typography>
          <Typography variant="body1">
            Running a bar or restaurant is a complex job, and keeping track of
            inventory shouldn’t add to your stress. With Pocket Manager, you can
            streamline your inventory management process, saving time and
            reducing waste.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
