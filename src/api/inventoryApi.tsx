const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// Get all Inventories
export const fetchAllInventories = async () => {
  const res = await fetch(`${BASE_URL}/inventory/all`);
  const data = await res.json();
  return data;
};

// Get Inventory by ID
export const fetchInventoryById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/inventory/${id}`);
  const data = await res.json();
  return data;
};

// Create Inventory
export const createInventory = async (inventoryName: string) => {
  const res = await fetch(`${BASE_URL}/inventory/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inventoryName }),
  });
  const data = await res.json();
  return data;
};
