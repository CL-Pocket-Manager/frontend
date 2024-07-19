import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { fetchItemById } from "../../api/itemsApi";
import { getItemFromInventory } from "../../api/inventoryApi";
import EditInventoryItem from "../../components/Inventory/EditInventoryItem";
import DeleteInventoryItem from "../../components/Inventory/DeleteInventoryItem";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
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
  const [deleteMode, setDeleteMode] = useState(false);

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

  const handleDelete = () => {
    setDeleteMode(true);
  };

  return (
    <>
      {itemDetail ? (
        <Box margin={1}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={() => navigate(-1)} variant="contained">
              <ArrowBackIosNewIcon />
            </Button>
            <Button onClick={handleDelete} variant="contained">
              <DeleteForeverIcon />
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
          <Accordion sx={{ border: "2px solid #999" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Description
            </AccordionSummary>
            <AccordionDetails>{itemDetail.description}</AccordionDetails>
          </Accordion>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                border: "2px solid #999",
                borderRadius: "6px",
                padding: "4px 8px",
              }}
            >
              <Typography variant="h6" textAlign={"center"}>
                Par: {inventoryItem.par}
              </Typography>
            </div>
            <div
              style={{
                border: "2px solid #999",
                borderRadius: "6px",
                padding: "4px 8px",
              }}
            >
              <Typography variant="h6" textAlign={"center"}>
                Stock: {inventoryItem.stock}
              </Typography>
            </div>
            <Button onClick={handleEdit} variant="contained">
              <EditIcon />
            </Button>
          </div>
          {itemDetail.itemType === "Alcoholic Beverage" ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
                gap: "10px",
              }}
            >
              <div
                style={{
                  border: "2px solid #999",
                  borderRadius: "6px",
                  padding: "4px 8px",
                }}
              >
                <Typography variant="h6" textAlign={"center"}>
                  Alcohol Type: {itemDetail.alcoholType}
                </Typography>
              </div>
              <div
                style={{
                  border: "2px solid #999",
                  borderRadius: "6px",
                  padding: "4px 8px",
                }}
              >
                <Typography variant="h6" textAlign={"center"}>
                  Alcohol Content: {itemDetail.alcoholContent}
                </Typography>
              </div>
            </div>
          ) : (
            <Typography variant="h6" textAlign={"center"}>
              Type: {itemDetail.itemType}
            </Typography>
          )}
          <EditInventoryItem
            open={editMode}
            setOpen={setEditMode}
            name={itemDetail.name}
            inventory={inventoryId}
            inventoryItemData={inventoryItem}
            setInventoryItemData={setInventoryItem}
          />
          <DeleteInventoryItem
            open={deleteMode}
            setOpen={setDeleteMode}
            itemId={itemId}
            inventoryId={inventoryId}
          />
        </Box>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}
