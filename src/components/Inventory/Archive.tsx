import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";

export default function Archive(props: { item: any }) {
  const { item } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Typography align="center" variant="h5">
        {new Date(item.date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Typography>
      <Button onClick={handleOpen}>View Details</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Food Item</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">
                Unit
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">
                Qty/Unit
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">
                Need
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {item.archive.map(
              (item: any) =>
                item.stock < item.par && (
                  <TableRow
                    key={item._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell align="right">{item.unit}</TableCell>
                    <TableCell align="right">{item.qtyPerUnit}</TableCell>
                    <TableCell align="right">{item.par - item.stock}</TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Food Item</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">
                  Unit
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">
                  Qty/Unit
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">
                  Par
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">
                  Stock
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {item.archive.map((item: any) => (
                <TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">{item.unit}</TableCell>
                  <TableCell align="right">{item.qtyPerUnit}</TableCell>
                  <TableCell align="right">{item.par}</TableCell>
                  <TableCell align="right">{item.stock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Dialog>
    </>
  );
}
