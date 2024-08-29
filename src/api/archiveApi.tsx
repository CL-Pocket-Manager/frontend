import { Archive } from "../types/types";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// Get all Archives
export const fetchAllArchives = async (inventoryName?: string) => {
  const url = new URL(`${BASE_URL}/archive/all`);
  if (inventoryName) {
    url.searchParams.append("inventoryName", inventoryName);
  }
  const res = await fetch(url.toString());
  const data = await res.json();
  return data;
};

// Create Archive
export const createArchive = async (archiveData: Archive) => {
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
