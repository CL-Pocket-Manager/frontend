import { useState, useEffect } from "react";
import {
  fetchAllInventories,
  fetchInventoryById,
} from "../../api/inventoryApi";
import Typorgraphy from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import InventorySelect from "../../components/Nav/InventorySelect";
import CreateInventory from "../../components/Inventory/CreateInventory";
import Items from "./Items";
import Archive from "../../components/Inventory/Archive";

export default function Inventory() {
  const [value, setValue] = useState("1");
  const [inventoryList, setInventoryList] = useState<any[]>([]);
  const [currentInventory, setCurrentInventory] = useState<any>({});
  const [archive, setArchive] = useState([]);

  // Get Archive from API call
  const fetchArchive = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_APP_API_BASE_URL}/food/archive`
    );
    const data = await res.json();
    setArchive(data);
  };

  // Get Inventories
  const getInventories = async () => {
    const inventories = await fetchAllInventories();
    setInventoryList(inventories);
  };

  // Get Inventory by ID
  const getInventoryById = async (id: string) => {
    const inventory = await fetchInventoryById(id);
    setCurrentInventory(inventory);
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchInventories = async () => {
      await getInventories();
    };

    fetchInventories();
  }, []);

  useEffect(() => {
    if (inventoryList.length > 0) {
      console.log(inventoryList[0]._id, "inventoryList[0]._id");
      const firstInventoryId = inventoryList[0]._id; // Get the first inventory id
      getInventoryById(firstInventoryId);
    }
  }, [inventoryList]); // This useEffect runs whenever inventoryList changes.

  console.log(currentInventory, "currentInventory");
  console.log(inventoryList, "inventoryList");

  // const food: any = useLoaderData();
  return (
    <Container>
      {inventoryList.length > 0 && (
        <InventorySelect
          inventoryList={inventoryList}
          fetchInventoryById={fetchInventoryById}
        />
      )}

      {currentInventory.inventoryName ? (
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Items" value="1" />
              <Tab label="Archive" value="2" sx={{ marginLeft: "auto" }} />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Items inventory={currentInventory} />
          </TabPanel>
          <TabPanel value="2">
            {archive && <Archive archiveData={archive} />}
          </TabPanel>
          {/* <TabPanel value="3">
            <TakeFoodInventory
              food={food}
              fetchArchive={fetchArchive}
              archive={archive}
            />
          </TabPanel> */}
        </TabContext>
      ) : (
        <>
          <Typorgraphy align="center" variant="h4">
            Please Create an Inventory
          </Typorgraphy>
          <CreateInventory />
        </>
      )}
    </Container>
  );
}
