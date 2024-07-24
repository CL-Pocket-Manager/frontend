import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EditIcon from "@mui/icons-material/Edit";
import { fetchInventoryById } from "../../api/inventoryApi";
import InventoryTable from "../../components/Inventory/InventoryTable";
import DeleteInventory from "../../components/Inventory/DeleteInventory";
import EditInventoryName from "../../components/Inventory/EditInventoryName";
import AddItem from "../../components/Inventory/AddItem";
import TakeInventory from "../../components/Inventory/TakeInventory";
import { Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function InventoryDetail() {
  const navigate = useNavigate();
  const params = useParams();
  // id of the current inventory
  const inventoryId = params.inventoryId;

  const [value, setValue] = useState("1");
  const [addItem, setAddItem] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [takeOpen, setTakeOpen] = useState(true);
  const [currentInventory, setCurrentInventory] = useState<any>({});

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const getInventoryData = async () => {
    if (typeof inventoryId === "string") {
      const inventory = await fetchInventoryById(inventoryId);
      setCurrentInventory(inventory);
      console.log("data has been fetched");
    } else {
      console.error("Inventory ID is undefined");
      navigate("/inventory");
    }
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

  useEffect(() => {
    getInventoryData();
  }, [inventoryId]);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (!currentInventory) {
    return <div>Loading...</div>;
  }

  return (
    <Container sx={{ padding: "8px" }}>
      <Box display="flex" justifyContent="center" alignItems="center" m={2}>
        <Button
          onClick={() => navigate(-1)}
          sx={{ position: "absolute", left: "1rem" }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </Button>
        <Typography variant="h5">{currentInventory.inventoryName}</Typography>

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
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Items" value="1" />
            <Tab label="Take Inventory" value="2" sx={{ marginLeft: "auto" }} />
          </TabList>
        </Box>
        <TabPanel value="1">
          <InventoryTable inventory={currentInventory} />
          <Button onClick={handleAddItem}>Add Item</Button>
        </TabPanel>
        <TabPanel value="2">
          <TakeInventory
            open={takeOpen}
            setOpen={setTakeOpen}
            inventory={currentInventory.items}
          />
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
        getInventoryData={getInventoryData}
      />

      <EditInventoryName
        open={editOpen}
        setOpen={setEditOpen}
        inventory={currentInventory}
        getInventoryData={getInventoryData}
      />
    </Container>
  );
}
