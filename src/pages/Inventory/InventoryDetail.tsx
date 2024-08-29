import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, Link, useLoaderData } from "react-router-dom";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EditIcon from "@mui/icons-material/Edit";
import InventoryTable from "../../components/Inventory/InventoryTable";
import DeleteInventory from "../../components/Inventory/DeleteInventory";
import EditInventoryName from "../../components/Inventory/EditInventoryName";
import AddItem from "../../components/Inventory/AddItem";
import TakeInventory from "../../components/Inventory/TakeInventory";
import { Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { TailSpin } from "react-loader-spinner";
import { fetchAllArchives } from "../../api/archiveApi";
import Archive from "../../components/Inventory/Archive";
import { useInventory } from "../../context/InventoryContext";
import { useItems } from "../../context/ItemsContext";
import { useDistributors } from "../../context/DistributorContext";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { currentInventory, InventoryItem } from "../../types/types";

export default function InventoryDetail() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const inventoryContext = useInventory();
  const itemsContext = useItems();
  const distributorsContext = useDistributors();

  if (!distributorsContext) {
    throw new Error("useInventory must be used within a InventoryProvider");
  }
  if (!inventoryContext) {
    throw new Error("useInventory must be used within a InventoryProvider");
  }
  if (!itemsContext) {
    throw new Error("useItems must be used within a ItemsProvider");
  }
  const { getInventoryData } = inventoryContext;

  const currentInventory = useLoaderData() as currentInventory;

  const { itemDict } = itemsContext;
  const { distributorsDict } = distributorsContext;
  const [loading, setLoading] = useState(true);

  const [tableData, setTableData] = useState<any>([]);

  const loadData = async () => {
    // if (!currentInventory.items) {
    //   await getInventoryData(inventoryId);
    // }
    const data = currentInventory.items;
    if (data && Array.isArray(data)) {
      setTableData(data);
    } else {
      setTableData([]); // Set to an empty array if data is undefined or not an array
    }
    const archive = await fetchAllArchives(currentInventory.inventoryName);
    setArchiveData(archive);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    loadData();
  }, [currentInventory]);

  const [value, setValue] = useState("1");
  const [addItem, setAddItem] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [archiveData, setArchiveData] = useState<any>(null);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAddItem = () => {
    setAddItem(true);
  };

  const handleDelete = () => {
    setDeleteOpen(true);
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setEditOpen(true);
    setAnchorEl(null);
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (archiveData) {
    console.log(archiveData[archiveData.length - 1]);
  }

  const columns = useMemo<MRT_ColumnDef<InventoryItem>[]>(
    () => [
      {
        accessorFn: (row) => itemDict[row.item], // Return the value from itemDict
        id: "item",
        header: "Name",
        size: 250,
        sortingFn: (a, b) => {
          const aValue = itemDict[a.original.item];
          const bValue = itemDict[b.original.item];
          return aValue.localeCompare(bValue); // Sort based on the value from itemDict
        },
        Cell: ({ row }) => (
          <Link
            to={`${row.original._id}`}
            state={{ item: row.original.item }}
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            {itemDict[row.original.item]}
          </Link>
        ),
      },
      {
        accessorFn: (row) => distributorsDict[row.distributor], // Return the value from itemDict
        id: "distributor",
        header: "Distributor",
        size: 100,
        sortingFn: (a, b) => {
          const aValue = distributorsDict[a.original.item] || "";
          const bValue = distributorsDict[b.original.item] || "";
          return aValue.localeCompare(bValue); // Sort based on the value from itemDict
        },
      },
      {
        accessorKey: "unitOfMeasure",
        header: "Unit",
        size: 50,
      },
      {
        accessorKey: "qtyPerUnit",
        header: "Qty/Unit",
        size: 50,
      },
      {
        accessorKey: "par",
        header: "Par",
        size: 50,
      },
      {
        accessorKey: "stock",
        header: "Stock",
        size: 50,
      },
    ],
    [itemDict]
  );

  const table = useMaterialReactTable({
    columns,
    data: tableData || [],
    enablePagination: false,
  });

  return (
    <>
      {loading ? (
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#556cd6"
          ariaLabel="oval-loading"
          wrapperStyle={{ position: "absolute", top: "50%", left: "50%" }}
          wrapperClass=""
        />
      ) : (
        <Container sx={{ padding: "8px" }}>
          <Box display="flex" justifyContent="center" alignItems="center" m={2}>
            <Button
              onClick={() => navigate(-1)}
              sx={{ position: "absolute", left: "1rem" }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </Button>
            <Typography variant="h5">
              {currentInventory.inventoryName}
            </Typography>

            <Button
              onClick={handleClick}
              sx={{ position: "absolute", right: "2rem" }}
            >
              <EditIcon
                fontSize="small"
                sx={{
                  marginLeft: "10px",
                  color: "primary.main",
                  cursor: "pointer",
                  "&:hover": {
                    color: "primary.dark",
                  },
                }}
              />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleEdit}>Edit Inventory</MenuItem>
              <MenuItem onClick={handleDelete}>Delete Inventory</MenuItem>
            </Menu>
          </Box>

          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Items" value="1" />
                <Tab
                  label="Take Inventory"
                  value="2"
                  sx={{ marginLeft: "auto" }}
                />
                <Tab label="Archives" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {mobile ? (
                <InventoryTable />
              ) : (
                table && <MaterialReactTable table={table} />
              )}
              <Button onClick={handleAddItem}>Add Item</Button>
            </TabPanel>
            <TabPanel value="2">
              <TakeInventory
                currentInventory={currentInventory}
                itemDict={itemDict}
                loadData={loadData}
              />
            </TabPanel>
            <TabPanel value="3">
              {archiveData && (
                <Archive itemDict={itemDict} archiveData={archiveData} />
              )}
            </TabPanel>
          </TabContext>

          <DeleteInventory
            open={deleteOpen}
            setOpen={setDeleteOpen}
            inventoryId={currentInventory._id}
          />
          <AddItem
            open={addItem}
            setOpen={setAddItem}
            inventory={currentInventory}
          />

          <EditInventoryName
            open={editOpen}
            setOpen={setEditOpen}
            inventory={currentInventory}
            getInventoryData={getInventoryData}
          />
        </Container>
      )}
    </>
  );
}
