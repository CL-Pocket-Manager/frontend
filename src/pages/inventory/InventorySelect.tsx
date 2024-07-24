import { useState, useEffect } from "react";
import { fetchAllInventories } from "../../api/inventoryApi";
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

const Item = styled(Paper)(({ theme }) => ({
  background: theme.palette.background.default,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function InventorySelect() {
  const navigate = useNavigate();
  const [inventoryList, setInventoryList] = useState<any[]>([]);
  const [createOpen, setCreateOpen] = useState(false);

  // Get Inventories
  const getInventories = async () => {
    const inventories = await fetchAllInventories();
    setInventoryList(inventories);
  };

  useEffect(() => {
    const fetchInventories = async () => {
      await getInventories();
    };

    fetchInventories();
  }, []);

  if (!inventoryList) {
    return <div>Loading...</div>;
  }

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
                component="button" // Change this to 'button' to make it clickable without href
                onClick={() => navigate(`/inventory/${inventory._id}`)} // Use navigate here underline="none"
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
