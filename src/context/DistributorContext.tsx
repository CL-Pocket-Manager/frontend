import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { fetchAllDistributors } from "../api/distributorApi";

// Define the context type
interface DistributorsContextType {
  distributorsDict: any;
  fetchDistributors: () => Promise<void>;
}

// Create the context
const DistributorsContext = createContext<DistributorsContextType | undefined>(
  undefined
);

// Create a provider component
export const DistributorsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [distributorsDict, setDistributorsDict] = useState<any>({});

  const fetchDistributors = async () => {
    const distributors = await fetchAllDistributors();
    const dictionary = distributors.reduce((acc: any, item: any) => {
      acc[item._id] = item.name;
      return acc;
    }, {});
    setDistributorsDict(dictionary);
  };

  useEffect(() => {
    fetchDistributors();
  }, []);

  return (
    <DistributorsContext.Provider
      value={{
        distributorsDict,
        fetchDistributors,
      }}
    >
      {children}
    </DistributorsContext.Provider>
  );
};

// Custom hook to use the InventoryContext
export const useDistributors = () => {
  return useContext(DistributorsContext);
};
