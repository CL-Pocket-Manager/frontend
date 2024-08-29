import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
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

type InventoryItem = {
  _id: string;
  inventoryName: string;
};

export default function InventorySelect() {
  const [createOpen, setCreateOpen] = useState(false);
  const navigate = useNavigate();

  const inventoryList = useLoaderData() as InventoryItem[];

  const handleClicked = (id: string) => () => {
    navigate(`/inventory/${id}`);
  };

  console.log(inventoryList);

  return (
    <Container>
      {inventoryList.length > 0 ? (
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
