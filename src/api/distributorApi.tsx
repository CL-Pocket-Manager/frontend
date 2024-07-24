const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// Get all Distributors
export const fetchAllDistributors = async () => {
  const res = await fetch(`${BASE_URL}/distributor/all`);
  const data = await res.json();
  return data;
};

// Create Distributor
export const createDistributor = async (distributorData: any) => {
  const res = await fetch(`${BASE_URL}/distributor/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(distributorData),
  });
  const data = await res.json();
  return data;
};
