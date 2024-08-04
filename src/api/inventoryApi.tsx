const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// INVENTORIES //

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

// Delete Inventory
export const deleteInventory = async (inventoryId: string) => {
  const res = await fetch(`${BASE_URL}/inventory/${inventoryId}/delete`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};

// Update Inventory Name
export const updateInventoryName = async (
  inventoryId: string,
  inventoryName: string
) => {
  const res = await fetch(`${BASE_URL}/inventory/${inventoryId}/update-name`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inventoryName }),
  });
  const data = await res.json();
  return data;
};

// Update Inventory Items
export const updateInventoryItems = async (inventoryId: string, items: any) => {
  const res = await fetch(`${BASE_URL}/inventory/${inventoryId}/update-items`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items }),
  });
  const data = await res.json();
  return data;
};

// Get All Inventories
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

// INVENTORY ITEMS //

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

// Update an item in an Inventory
export const updateItemInInventory = async (inventoryId: string, item: any) => {
  const res = await fetch(
    `${BASE_URL}/inventory/${inventoryId}/update-item/${item._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }
  );
  const data = await res.json();
  return data;
};

// Remove Item from Inventory
export const removeItemFromInventory = async (
  inventoryId: string,
  itemId: string
) => {
  const res = await fetch(
    `${BASE_URL}/inventory/${inventoryId}/remove-item/${itemId}`,
    {
      method: "DELETE",
    }
  );
  const data = await res.json();
  return data;
};
