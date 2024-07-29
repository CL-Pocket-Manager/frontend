import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ReportTable from "../../utils/ReportTable";
import { PDFDownloadLink } from "@react-pdf/renderer";

export default function ArchivedTable(props: any) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const { archive, itemDict } = props;

  const shortDate = new Date(archive.archiveDate)
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
    .replace(/\//g, "_");

  return (
    <TableContainer sx={{ flex: "0 0 100%", minWidth: 0 }} component={Paper}>
      <Typography align="center" variant="h5">
        {new Date(archive.archiveDate).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Typography>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={handleOpen}>View Details</Button>
        <PDFDownloadLink
          document={<ReportTable data={archive} itemDict={itemDict} />}
          fileName={`Bk_Food_${shortDate}.pdf`}
        >
          <Button>Download</Button>
        </PDFDownloadLink>
      </div>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Item</TableCell>
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
          {archive.items.map(
            (item: any) =>
              item.stock < item.par && (
                <TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {itemDict[item.item]}
                  </TableCell>
                  <TableCell align="right">{item.unitOfMeasure}</TableCell>
                  <TableCell align="right">{item.qtyPerUnit}</TableCell>
                  <TableCell align="right">{item.par - item.stock}</TableCell>
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
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
                <TableCell sx={{ fontWeight: 600 }}>Item</TableCell>
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
              {archive.items.map((item: any) => (
                <TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {itemDict[item.item]}
                  </TableCell>
                  <TableCell align="right">{item.unitOfMeasure}</TableCell>
                  <TableCell align="right">{item.qtyPerUnit}</TableCell>
                  <TableCell align="right">{item.par}</TableCell>
                  <TableCell align="right">{item.stock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Dialog>
    </TableContainer>
  );
}
