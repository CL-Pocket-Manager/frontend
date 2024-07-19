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

// Add Item to Inventory
export const addItemToInventory = async (inventoryId: string, item: any) => {
  console.log(inventoryId, item);
  const res = await fetch(`${BASE_URL}/inventory/${inventoryId}/add-item`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  const data = await res.json();
  return data;
};

// Get Item from an Inventory
export const getItemFromInventory = async (
  inventoryId: string,
  itemId: string
) => {
  const res = await fetch(
    `${BASE_URL}/inventory/${inventoryId}/items/${itemId}`
  );
  const data = await res.json();
  return data;
};
