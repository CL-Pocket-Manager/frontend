import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// pages
import Home from "./pages/Home";
import Items from "./pages/Items";
import ItemDetail from "./pages/ItemDetail";
import InventorySelect from "./pages/Inventory/InventorySelect";
import InventoryDetail from "./pages/Inventory/InventoryDetail";
import InventoryItemDetail from "./pages/Inventory/InventoryItemDetail";

// api
import {
  fetchAllInventories,
  fetchInventoryById,
  getItemFromInventory,
} from "./api/inventoryApi";
import { fetchItemById, fetchAllItems } from "./api/itemsApi";

// layouts
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route
        path="inventory"
        element={<InventorySelect />}
        loader={async () => {
          return fetchAllInventories();
        }}
      />
      <Route
        path="inventory/:inventoryId"
        element={<InventoryDetail />}
        loader={async ({ params }) => {
          return fetchInventoryById(params.inventoryId as string);
        }}
      />
      <Route
        path="inventory/:inventoryId/:itemId"
        element={<InventoryItemDetail />}
        loader={async ({ params }) => {
          const inventoryItem = await getItemFromInventory(
            params.inventoryId as string,
            params.itemId as string
          );
          const itemDetail = await fetchItemById(inventoryItem.item as string);
          return { itemDetail, inventoryItem };
        }}
      />

      <Route
        path="items"
        element={<Items />}
        loader={async () => {
          return fetchAllItems();
        }}
      />
      <Route
        path="items/:id"
        element={<ItemDetail />}
        loader={async ({ params }) => {
          return fetchItemById(params.id as string);
        }}
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
