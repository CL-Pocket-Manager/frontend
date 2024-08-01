import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Typography } from "@mui/material";
import { useInventory } from "../../context/InventoryContext";
import { useItems } from "../../context/ItemsContext";
import { useParams } from "react-router-dom";

export default function InventoryTable() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const params = useParams();
  const inventoryId = params.inventoryId;

  const inventoryContext = useInventory();
  const itemsContext = useItems();
  if (!inventoryContext) {
    throw new Error("useInventory must be used within a InventoryProvider");
  }
  if (!itemsContext) {
    throw new Error("useItems must be used within a ItemsProvider");
  }
  const { currentInventory, getInventoryData } = inventoryContext;
  const { itemDict } = itemsContext;

  if (inventoryId && currentInventory.items === undefined) {
    getInventoryData(inventoryId);
  }

  return (
    <>
      {currentInventory.items &&
        (mobile ? (
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <TableContainer component={Paper}>
              <Table size="small" aria-label="simple table">
                <TableHead>
                  <TableRow selected>
                    <TableCell sx={{ fontWeight: 600 }}>Item</TableCell>

                    <TableCell sx={{ fontWeight: 600 }} align="center">
                      Par
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="center">
                      Stock
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentInventory.items.map((item: any) => (
                    <TableRow key={item._id}>
                      <>
                        <TableCell>
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
                        <TableCell align="center">{item.stock}</TableCell>
                      </>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <TableContainer component={Paper}>
              <Table
                size="small"
                sx={{ minWidth: 650 }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow selected>
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentInventory.items.map((item: any) => (
                    <TableRow key={item._id}>
                      <>
                        <TableCell align="left">
                          <Link
                            to={`${item._id}`}
                            state={{ item: item.item }}
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            {itemDict[item.item]}
                          </Link>
                        </TableCell>

                        <TableCell align="right">
                          {item.unitOfMeasure}
                        </TableCell>
                        <TableCell align="right">{item.qtyPerUnit}</TableCell>
                        <TableCell align="right">{item.par}</TableCell>
                      </>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ))}
    </>
  );
}
