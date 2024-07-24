import React, { useEffect } from "react";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportTable from "../../utils/ReportTable";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { fetchAllItemsShort } from "../../api/itemsApi";

export default function TakeInventory(props: any) {
  const { inventory, open, setOpen } = props;
  console.log(inventory);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [itemDict, setItemDict] = useState<any>({});
  const [fetchComplete, setFetchComplete] = useState(false);

  const [inventoryItems, setInventoryItems] = useState<any>(inventory.items);
  const [items, setItems] = useState<any>();

  useEffect(() => {
    const fetchItems = async () => {
      const items = await fetchAllItemsShort();
      const dictionary = items.reduce((acc: any, item: any) => {
        acc[item._id] = item.name;
        return acc;
      }, {});
      setItemDict(dictionary);
      setInventoryItems(inventory.items);
    };

    fetchItems();
  }, [inventory]);

  useEffect(() => {
    const resetStock = () => {
      if (inventory) {
        const reSetItems = inventory.map((item: any) => ({
          ...item,
          stock: 0,
        }));
        setItems(reSetItems);
      }
    };
    resetStock();
  }, [inventory]);

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

  const handleStockChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const updatedFoodItems = items.map((item: any) => {
      if (item._id === id) {
        return {
          ...item,
          stock: Number(event.target.value),
        };
      }
      return item;
    });

    setItems(updatedFoodItems);
  };

  const handleSubmit = () => {
    setOpen(true);
    // Send the updated items to the server and save in Archive Collection
    //   fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/food/archive/create`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(items),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log(data);
    //       fetchArchive();
    //     })
    //     .then(() => {
    //       setFetchComplete(true); // Set fetchComplete to true after fetch operation and any subsequent operations are complete
    //     })
    //     .catch((error) => console.error("Error:", error));

    //   fetchArchive();
    //   setItems(inventory.map((item: any) => ({ ...item, stock: 0 }))); // Reset stock values
    // };

    // console.log(archive[archive.length - 1].date);

    console.log("Inventory submitted");
  };

  return (
    <>
      {mobile ? (
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
              {inventory.map((item: any) => (
                <TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.item}
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
                          transition: "transform 0.8s ease, opacity 0.2s ease",
                        }}
                      />
                      <span>{item.stock}</span>

                      <AddCircleIcon
                        onClick={() => handleIncreaseStock(item._id)}
                        style={{
                          color: "#35a0a8",
                          transition: "transform 0.8s ease, opacity 0.2s ease",
                        }}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ width: "-webkit-fill-available" }}
      >
        Submit
      </Button>
      {/* <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Inventory Submitted</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Inventory has been submitted successfully.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
          {/* {fetchComplete && (
              <PDFDownloadLink
                document={<ReportTable data={archive[archive.length - 1]} />}
                fileName={`Bk_Food_${
                  archive[archive.length - 1].date.split("T")[0]
                }.pdf`}
              >
                <Button>Download</Button>
              </PDFDownloadLink>
            )} */}
      {/* </DialogActions>
      </Dialog> */}
    </>
  );
}
