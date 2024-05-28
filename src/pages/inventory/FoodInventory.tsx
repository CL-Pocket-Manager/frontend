import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import Typorgraphy from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ParStock from "../../components/Inventory/ParStock";
import TakeFoodInventory from "../../components/Inventory/TakeFoodInventory";
import Archive from "../../components/Inventory/Archive";

export default function FoodInventory() {
  const [value, setValue] = useState(0);
  const [food, setFood] = useState([]);
  const [archive, setArchive] = useState([]);

  // Get Archive from API call
  const fetchArchive = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_APP_API_BASE_URL}/food/archive`
    );
    const data = await res.json();
    setArchive(data);
  };

  // Get Food Items from API call
  const fetchFoodItems = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_APP_API_BASE_URL}/food/items`
    );
    const data = await res.json();
    setFood(data);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchFoodItems();
    fetchArchive();
  }, []);

  // const food: any = useLoaderData();
  return (
    <>
      <Typorgraphy align="center" variant="h4">
        Food
      </Typorgraphy>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Par Stock" value="1" />
            <Tab label="Archive" value="2" />
            <Tab label="Take Inventory" value="3" sx={{ marginLeft: "auto" }} />
          </TabList>
        </Box>
        <TabPanel value="1">
          <ParStock food={food} fetchFoodItems={fetchFoodItems} />
        </TabPanel>
        <TabPanel value="2">
          {archive.length > 0 && <Archive item={archive[archive.length - 1]} />}
        </TabPanel>
        <TabPanel value="3">
          <TakeFoodInventory food={food} fetchArchive={fetchArchive} />
        </TabPanel>
      </TabContext>
    </>
  );
}
