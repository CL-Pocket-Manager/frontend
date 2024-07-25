import { useEffect } from "react";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

export default function TakeInventory(props: any) {
  const { inventoryItems, itemDict } = props;
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [items, setItems] = useState<any>(null);

  useEffect(() => {
    const resetStock = () => {
      if (inventoryItems) {
        const reSetItems = inventoryItems.map((item: any) => ({
          ...item,
          stock: 0,
        }));
        setItems(reSetItems);
      }
    };
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

  const handleSubmit = () => {
    console.log(items);
    console.log("Inventory submitted");
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
    </>
  );
}
