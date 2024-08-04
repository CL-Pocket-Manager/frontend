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
import ErrorPage from "./pages/ErrorPage";

// layouts
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} errorElement={<ErrorPage />} />
      <Route
        path="inventory"
        element={<InventorySelect />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="inventory/:inventoryId"
        element={<InventoryDetail />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="inventory/:inventoryId/:itemId"
        element={<InventoryItemDetail />}
        errorElement={<ErrorPage />}
      />
      <Route path="items" element={<Items />} errorElement={<ErrorPage />} />
      <Route
        path="items/:id"
        element={<ItemDetail />}
        errorElement={<ErrorPage />}
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
