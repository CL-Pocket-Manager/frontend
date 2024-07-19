import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import DeleteItem from "../components/Items/DeleteItem";
import EditItem from "../components/Items/EditItem";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState<any>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // fetch item details by id
  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/items/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, [id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Button onClick={() => navigate(-1)} variant="contained">
        <ArrowBackIosNewIcon />
      </Button>
      <Card sx={{ display: "flex", padding: 2, marginTop: 3 }}>
        <CardMedia
          sx={{ height: 140, width: 140, padding: 1 }}
          image={item.image}
          title="Image of Item"
        />
        {/* <img src={item.image} alt="Image of Item" /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
          <div>
            <Typography variant="h6" color="text.secondary">
              Distributor: {item.distributor}
            </Typography>
            {item.itemType === "Alcohol" ? (
              <>
                <Typography variant="h6" color="text.secondary">
                  Alcohol Type: {item.alcoholType}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Alcohol Content: {item.alcoholContent}
                </Typography>
              </>
            ) : (
              <Typography variant="h6" color="text.secondary">
                Type: {item.itemType}
              </Typography>
            )}
          </div>
          <CardActions>
            <Button size="small" onClick={() => setEditOpen(true)}>
              Edit
            </Button>
            <Button size="small" onClick={() => setDeleteOpen(true)}>
              Delete
            </Button>
          </CardActions>
        </CardContent>
      </Card>
      <EditItem
        open={editOpen}
        setEditOpen={setEditOpen}
        itemData={item}
        setItemData={setItem}
      />
      <DeleteItem
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        item={item}
      />
    </Container>
  );
}
