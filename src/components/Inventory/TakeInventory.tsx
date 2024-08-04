import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { createArchive, fetchAllArchives } from "../../api/archiveApi";
import { updateInventoryItems } from "../../api/inventoryApi";
import ReportTable from "../../utils/ReportTable";

export default function TakeInventory(props: any) {
  const { itemDict, currentInventory } = props;
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);
  const [fetchComplete, setFetchComplete] = useState(false);

  const inventoryId = currentInventory._id;
  const inventoryItems = currentInventory.items;
  const inventoryName = currentInventory.inventoryName;
  const [archiveData, setArchiveData] = useState<any>(null);

  const [items, setItems] = useState<any>(null);

  const resetStock = () => {
    if (inventoryItems) {
      const reSetItems = inventoryItems.map((item: any) => ({
        ...item,
        stock: 0,
      }));
      setItems(reSetItems);
    }
  };

  useEffect(() => {
    resetStock();
  }, [inventoryItems]);

  const handleDecreaseStock = (id: any) => {
    const updatedItems = items.map((item: any) => {
      if (item._id === id && item.stock > 0) {
        return { ...item, stock: item.stock - 1 };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleIncreaseStock = (id: any) => {
    const updatedItems = items.map((item: any) => {
      if (item._id === id) {
        return { ...item, stock: item.stock + 1 };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleSubmit = async () => {
    setOpen(true);

    const archiveData = {
      inventoryName,
      items,
    };

    console.log(items);
    // Create Archive
    await createArchive(archiveData);
    // Update Stock values
    await updateInventoryItems(inventoryId, items);

    const archives = await fetchAllArchives(inventoryName);
    setArchiveData(archives);
    console.log(archives);
    setFetchComplete(true);
    console.log("Inventory submitted");
    resetStock();
  };

  return (
    <>
      {items &&
        (mobile ? (
          <TableContainer component={Paper}>
            <Table aria-label="simple table" sx={{ padding: "12px" }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }} align="center">
                    Item
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="center">
                    Par
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="center">
                    Stock
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items &&
                  items.map((item: any) => (
                    <TableRow key={item._id}>
                      <TableCell component="th" scope="row">
                        <Link
                          to={`${item._id}`}
                          state={{ item: item.item }}
                          style={{
                            textDecoration: "none",
                            color: "black",
                          }}
                        >
                          <Typography
                            noWrap
                            variant="body1"
                            style={{ maxWidth: "140px" }}
                          >
                            {itemDict[item.item]}
                          </Typography>
                        </Link>
                      </TableCell>
                      <TableCell align="center">{item.par}</TableCell>
                      <TableCell align="center">
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          gap={1}
                        >
                          <RemoveCircleIcon
                            onClick={() => handleDecreaseStock(item._id)}
                            style={{
                              color: item.stock > 0 ? "#35a0a8" : "#888",
                              transition:
                                "transform 0.8s ease, opacity 0.2s ease",
                            }}
                          />
                          <span>{item.stock}</span>

                          <AddCircleIcon
                            onClick={() => handleIncreaseStock(item._id)}
                            style={{
                              color: "#35a0a8",
                              transition:
                                "transform 0.8s ease, opacity 0.2s ease",
                            }}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
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
                {items.map((item: any) => (
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
                    <TableCell align="right">
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        gap={1}
                      >
                        <RemoveCircleIcon
                          onClick={() => handleDecreaseStock(item._id)}
                          style={{
                            color: item.stock > 0 ? "#35a0a8" : "#888",
                            transition:
                              "transform 0.8s ease, opacity 0.2s ease",
                          }}
                        />
                        <span>{item.stock}</span>

                        <AddCircleIcon
                          onClick={() => handleIncreaseStock(item._id)}
                          style={{
                            color: "#35a0a8",
                            transition:
                              "transform 0.8s ease, opacity 0.2s ease",
                          }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ))}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ width: "-webkit-fill-available" }}
      >
        Submit
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Inventory Submitted</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Inventory has been submitted successfully.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
          {fetchComplete && (
            <PDFDownloadLink
              document={
                <ReportTable
                  data={archiveData[archiveData.length - 1]}
                  itemDict={itemDict}
                />
              }
              fileName={`Thief_${inventoryName}_${
                archiveData[archiveData.length - 1].archiveDate.split("T")[0]
              }.pdf`}
            >
              <Button>Download</Button>{" "}
            </PDFDownloadLink>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
