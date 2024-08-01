import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typorgraphy from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import CreateInventory from "../../components/Inventory/CreateInventory";
import { useInventory } from "../../context/InventoryContext";
import { useItems } from "../../context/ItemsContext";

const Item = styled(Paper)(({ theme }) => ({
  background: theme.palette.background.default,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function InventorySelect() {
  const [createOpen, setCreateOpen] = useState(false);
  const navigate = useNavigate();

  const InventoryContext = useInventory();
  if (!InventoryContext) {
    throw new Error("useInventory must be used within a InventoryProvider");
  }
  const { inventoryList, fetchInventories, getInventoryData } =
    InventoryContext;

  const ItemsContext = useItems();
  if (!ItemsContext) {
    throw new Error("useItems must be used within a ItemsProvider");
  }
  const { fetchItems } = ItemsContext;

  if (!inventoryList) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    fetchItems();
    fetchInventories();
  }, []);

  const handleClicked = (id: string) => () => {
    getInventoryData(id);
    navigate(`/inventory/${id}`);
  };

  return (
    <Container>
      {inventoryList?.length > 0 ? (
        <Box
          display="flex"
          alignItems="center"
          height={"80vh"}
          justifyContent="center"
        >
          <Stack spacing={2}>
            {inventoryList.map((inventory) => (
              <Link
                key={inventory._id}
                component="button"
                onClick={handleClicked(inventory._id)}
                underline="none"
              >
                <Item>{inventory.inventoryName}</Item>
              </Link>
            ))}
            <Button variant="contained" onClick={() => setCreateOpen(true)}>
              Create Inventory
            </Button>
          </Stack>
        </Box>
      ) : (
        <>
          <Typorgraphy align="center" variant="h6">
            Please Create Your First Inventory
          </Typorgraphy>
          <Button onClick={() => setCreateOpen(true)}>Create Inventory</Button>
        </>
      )}
      <CreateInventory open={createOpen} setOpen={setCreateOpen} />
    </Container>
  );
}
