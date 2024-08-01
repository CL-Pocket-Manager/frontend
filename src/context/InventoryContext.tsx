import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { fetchAllInventories, fetchInventoryById } from "../api/inventoryApi";

// Define the shape of the inventory data
interface Inventory {
  _id: string;
  inventoryName: string;
  // Add other fields as necessary
}

// Define the context type
interface InventoryContextType {
  inventoryList: Inventory[];
  fetchInventories: () => Promise<void>;
  currentInventory: any;
  getInventoryData: (id: string) => Promise<void>;
}

// Create the context
const InventoryContext = createContext<InventoryContextType | undefined>(
  undefined
);

// Create a provider component
export const InventoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [inventoryList, setInventoryList] = useState<Inventory[]>([]);
  const [currentInventory, setCurrentInventory] = useState<any>({});

  const getInventoryData = async (id: string) => {
    const inventory = await fetchInventoryById(id);
    setCurrentInventory(inventory);
  };

  const fetchInventories = async () => {
    const inventories = await fetchAllInventories();
    setInventoryList(inventories);
  };

  useEffect(() => {
    fetchInventories();
  }, []);

  return (
    <InventoryContext.Provider
      value={{
        inventoryList,
        fetchInventories,
        currentInventory,
        getInventoryData,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

// Custom hook to use the InventoryContext
export const useInventory = () => {
  return useContext(InventoryContext);
};
