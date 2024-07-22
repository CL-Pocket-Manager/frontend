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
import Inventory from "./pages/Inventory/Inventory";
import InventoryDetail from "./pages/Inventory/InventoryDetail";
import InventoryItemDetail from "./pages/Inventory/InventoryItemDetail";

// layouts
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="inventory" element={<Inventory />} />
      <Route path="inventory/:inventoryId" element={<InventoryDetail />} />
      <Route
        path="inventory/:inventoryId/:itemId"
        element={<InventoryItemDetail />}
      />
      <Route path="items" element={<Items />} />
      <Route path="items/:id" element={<ItemDetail />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
