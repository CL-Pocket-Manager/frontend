import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { fetchAllItemsShort } from "../../api/itemsApi";

export default function InventoryTable(props: any) {
  const { inventory } = props;
  const [inventoryItems, setInventoryItems] = useState<any>(inventory.items);
  const [itemDict, setItemDict] = useState<any>({});

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

  return (
    <>
      {inventoryItems && (
        <Box display="flex" flexDirection="column" alignItems="flex-start">
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
                </TableRow>
              </TableHead>
              <TableBody>
                {inventoryItems.map((item: any) => (
                  <TableRow
                    key={item._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <>
                      <Link to={`${item._id}`} state={{ item: item.item }}>
                        <TableCell component="th" scope="row">
                          {itemDict[item.item]}
                        </TableCell>
                      </Link>
                      <TableCell align="right">{item.unitOfMeasure}</TableCell>
                      <TableCell align="right">{item.qtyPerUnit}</TableCell>
                      <TableCell align="right">{item.par}</TableCell>
                    </>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
}
