import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { fetchItemById } from "../../api/itemsApi";
import { getItemFromInventory } from "../../api/inventoryApi";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function InventoryItemDetail() {
  const navigate = useNavigate();
  const params = useParams();
  // id of the current inventory
  const inventoryId = params.inventoryId;
  // id of the item from the current inventory
  const itemId = params.itemId;

  const location = useLocation();
  // id of the item from the db
  const { item } = location.state;

  const [itemDetail, setItemDetail] = useState<any>({});
  const [inventoryItem, setInventoryItem] = useState<any>({});

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (inventoryId && itemId) {
        // Fetch item data
        const fetchedItem = await fetchItemById(item);
        setItemDetail(fetchedItem);
        const fetchedInventoryItem = await getItemFromInventory(
          inventoryId,
          itemId
        );
        setInventoryItem(fetchedInventoryItem);
      }
    };
    fetchData();
  }, [item]);

  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <>
      {itemDetail ? (
        <Box margin={1}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={() => navigate(-1)} variant="contained">
              <ArrowBackIosNewIcon />
            </Button>
            <Button onClick={handleEdit} variant="contained">
              <EditIcon />
            </Button>
          </div>
          <Typography variant="h3" textAlign={"center"}>
            {itemDetail.name}
          </Typography>
          <img
            src={itemDetail.image}
            alt="Image of Item"
            style={{
              margin: "0px auto",
              width: "100%",
              height: "300px",
              objectFit: "contain",
              padding: "10px",
              borderRadius: "10px",
              border: "2px solid #999",
            }}
          />
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Description
            </AccordionSummary>
            <AccordionDetails>{itemDetail.description}</AccordionDetails>
          </Accordion>
          <Typography variant="h6" textAlign={"center"}>
            Unit: {inventoryItem.unitOfMeasure}
          </Typography>
          <Typography variant="h6" textAlign={"center"}>
            Quantity: {inventoryItem.qtyPerUnit}
          </Typography>
          <Typography variant="h6" textAlign={"center"}>
            Par: {inventoryItem.par}
          </Typography>
          {itemDetail.itemType === "Alcoholic Beverage" ? (
            <>
              <Typography variant="h6" textAlign={"center"}>
                Alcohol Type: {itemDetail.alcoholType}
              </Typography>
              <Typography variant="h6" textAlign={"center"}>
                Alcohol Content: {itemDetail.alcoholContent}
              </Typography>
            </>
          ) : (
            <Typography variant="h6" textAlign={"center"}>
              Type: {itemDetail.itemType}
            </Typography>
          )}
        </Box>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}
