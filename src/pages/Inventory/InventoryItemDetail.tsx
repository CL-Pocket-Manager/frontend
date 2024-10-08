import React, { useState } from "react";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditInventoryItem from "../../components/Inventory/EditInventoryItem";
import DeleteInventoryItem from "../../components/Inventory/DeleteInventoryItem";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Item, InventoryItem, AlcoholItem } from "../../types/types";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const placeholderImg =
  "data:image/png;base64,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";

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function InventoryItemDetail() {
  const [expanded, setExpanded] = React.useState(false);
  const { itemDetail, inventoryItem } = useLoaderData() as {
    itemDetail: Item;
    inventoryItem: InventoryItem;
  };

  const [inventoryItemData, setInventoryItemData] =
    useState<InventoryItem>(inventoryItem);

  const navigate = useNavigate();
  const params = useParams();
  // id of the current inventory
  const inventoryId = params.inventoryId;
  // id of the item from the current inventory
  const itemId = params.itemId;

  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setDeleteMode(true);
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={() => navigate(-1)} sx={{ margin: 1 }}>
        <ArrowBackIosNewIcon fontSize="small" />
      </Button>

      <Box my={4} mx={2} display="flex" justifyContent="center">
        <Card sx={{ width: 350 }}>
          <CardHeader
            action={
              <>
                <IconButton aria-label="settings" onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleEdit}>Edit Item</MenuItem>
                  <MenuItem onClick={handleDelete}>Remove Item</MenuItem>
                </Menu>
              </>
            }
            title={itemDetail.name}
            subheader={itemDetail.itemType}
          />
          <CardMedia
            component="img"
            height="194"
            image={itemDetail.image ? itemDetail.image : placeholderImg}
            alt="image of item"
            sx={{ objectFit: "contain" }}
          />
          <CardContent>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <Typography variant="body1" color="text.secondary">
                Par Level
              </Typography>

              <Typography variant="body1" color="text.secondary">
                Current Stock
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontWeight: 600 }}
              >
                {inventoryItem.par}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontWeight: 600 }}
              >
                {inventoryItem.stock}
              </Typography>
            </div>

            <div
              style={{ borderBottom: "1px solid #e4e4e4", margin: "16px 0" }}
            ></div>
            {itemDetail.itemType === "Alcoholic Beverage" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <Typography variant="body1" color="text.secondary">
                  Alcohol Type
                </Typography>

                <Typography variant="body1" color="text.secondary">
                  Alcohol Content
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontWeight: 600 }}
                >
                  {(itemDetail as AlcoholItem).alcoholType}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontWeight: 600 }}
                >
                  {(itemDetail as AlcoholItem).alcoholContent}%
                </Typography>
              </div>
            )}
          </CardContent>
          <CardActions disableSpacing>
            <Typography variant="body1" color="text.secondary">
              Description
            </Typography>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {itemDetail.description}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
        <EditInventoryItem
          open={editMode}
          setOpen={setEditMode}
          name={itemDetail.name}
          inventory={inventoryId}
          inventoryItemData={inventoryItemData}
          setInventoryItemData={setInventoryItemData}
        />
        <DeleteInventoryItem
          open={deleteMode}
          setOpen={setDeleteMode}
          itemId={itemId}
          inventoryId={inventoryId}
        />
      </Box>
    </>
  );
}
