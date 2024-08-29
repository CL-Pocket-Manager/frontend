const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// GET all Items
export const fetchAllItems = async () => {
  const res = await fetch(`${BASE_URL}/items/all`);
  const data = await res.json();
  return data;
};

// GET all Items with just the name and id
export const fetchAllItemsShort = async () => {
  const res = await fetch(`${BASE_URL}/items/all-short`);
  const data = await res.json();
  return data;
};

// GET Item by ID
export const fetchItemById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/items/${id}`);
  const data = await res.json();
  console.log(data);
  return data;
};

// GET Item by ID with just the name and id
export const fetchItemByIdShort = async (id: string) => {
  const res = await fetch(`${BASE_URL}/items/${id}/short`);
  const data = await res.json();
  return data;
};

// GET Items by Keyword
export const searchItemsByKeyword = async (keyword: string) => {
  const res = await fetch(`${BASE_URL}/items/search/${keyword}`);
  const data = await res.json();
  return data;
};

// Create Item
export const createItem = async (item: any) => {
  const res = await fetch(`${BASE_URL}/items/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  const data = await res.json();
  return data;
};

// Create Alcoholic Item
export const createAlcoholicItem = async (item: any) => {
  const res = await fetch(`${BASE_URL}/items/alcohol/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  const data = await res.json();
  return data;
};

// Update Item
export const updateItem = async (item: any) => {
  const res = await fetch(`${BASE_URL}/items/${item._id}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  const data = await res.json();
  return data;
};

// Update Alcoholic Item
export const updateAlcoholicItem = async (item: any) => {
  const res = await fetch(`${BASE_URL}/items/alcohol/${item._id}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  const data = await res.json();
  return data;
};
