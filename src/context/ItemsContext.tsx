import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { fetchAllItemsShort } from "../api/itemsApi";

// Define the context type
interface ItemsContextType {
  itemDict: any;
  fetchItems: () => Promise<void>;
}

// Create the context
const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

// Create a provider component
export const ItemsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [itemDict, setItemDict] = useState<any>({});

  const fetchItems = async () => {
    const items = await fetchAllItemsShort();
    const dictionary = items.reduce((acc: any, item: any) => {
      acc[item._id] = item.name;
      return acc;
    }, {});
    setItemDict(dictionary);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <ItemsContext.Provider
      value={{
        itemDict,
        fetchItems,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

// Custom hook to use the InventoryContext
export const useItems = () => {
  return useContext(ItemsContext);
};
