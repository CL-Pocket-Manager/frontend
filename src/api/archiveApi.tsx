const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// Get all Archives
export const fetchAllArchives = async () => {
  const res = await fetch(`${BASE_URL}/archive/all`);
  const data = await res.json();
  return data;
};

// Create Archive
export const createArchive = async (archiveData: any) => {
  if (!archiveData.inventoryName) {
    throw new Error("inventoryName is required");
  }
  const res = await fetch(`${BASE_URL}/archive/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(archiveData),
  });
  const data = await res.json();
  return data;
};
