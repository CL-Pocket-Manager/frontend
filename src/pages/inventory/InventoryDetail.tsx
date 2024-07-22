import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
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
import { Typography } from "@mui/material";

export default function InventoryDetail() {
  const navigate = useNavigate();
  const params = useParams();
  // id of the current inventory
  const inventoryId = params.inventoryId;

  const [value, setValue] = useState("1");
  const [addItem, setAddItem] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [currentInventory, setCurrentInventory] = useState<any>({});

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

  useEffect(() => {
    getInventoryData();
  }, [inventoryId]);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box m={1}>
        <Button onClick={() => navigate(-1)} variant="contained">
          <ArrowBackIosNewIcon fontSize="small" />
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" m={2}>
        <Typography variant="h4">{currentInventory.inventoryName}</Typography>
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
          onClick={() => setEditOpen(true)}
        />
      </Box>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Items" value="1" />
            <Tab label="Archive" value="2" sx={{ marginLeft: "auto" }} />
          </TabList>
        </Box>
        <TabPanel value="1">
          <InventoryTable inventory={currentInventory} />
          <Button onClick={handleAddItem}>Add Item</Button>
        </TabPanel>
        <TabPanel value="2">
          {/* {archive && <Archive archiveData={archive} />} */}
        </TabPanel>
        {/* <TabPanel value="3">
            <TakeFoodInventory
              food={food}
              fetchArchive={fetchArchive}
              archive={archive}
            />
          </TabPanel> */}
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

      {currentInventory.inventoryName && (
        <EditInventoryName
          open={editOpen}
          setOpen={setEditOpen}
          inventory={currentInventory}
          getInventoryData={getInventoryData}
        />
      )}
    </Container>
  );
}
