import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import {
  fetchAllItemsShort,
  createAlcoholicItem,
  createItem,
} from "../../api/itemsApi";
import { addItemToInventory } from "../../api/inventoryApi";
import {
  createDistributor,
  fetchAllDistributors,
} from "../../api/distributorApi";
import InventoryItemForm from "../Forms/InventoryItemForm";
import ItemForm from "../Forms/ItemForm";
import DistributorForm from "../Forms/DistributorForm";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AddItem(props: any) {
  const { open, setOpen, inventory } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [allItems, setAllItems] = useState<BaseItem[]>([]);
  const [allDistributors, setAllDistributors] = useState<BaseItem[]>([]);
  const navigate = useNavigate();

  let newItem: any = null;
  let newDistributor: any = null;

  const [itemValue, setItemValue] = useState<BaseItem | null>({
    _id: "",
    name: "",
  });

  const [distributorValue, setDistributorValue] = useState<BaseItem | null>({
    _id: "",
    name: "",
  });

  const [itemData, setItemData] = useState({
    item: "",
    onModel: "",
    unitOfMeasure: "",
    qtyPerUnit: 0,
    costPerUnit: 0,
    distributor: "",
    par: 0,
    stock: 0,
  });

  const [newItemData, setNewItemData] = useState({
    name: itemValue?.inputValue || "",
    image: "",
    description: "",
    itemType: "",
    alcoholType: "",
    alcoholContent: 0,
  });

  const [newDistributorData, setNewDistributorData] = useState({
    name: distributorValue?.inputValue || "",
    website: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  useEffect(() => {
    if (itemValue) {
      setNewItemData({
        ...newItemData,
        name: itemValue.inputValue || itemValue.name,
      });
      setItemData({
        ...itemData,
        item: itemValue._id,
      });
    }
  }, [itemValue]);

  useEffect(() => {
    if (distributorValue) {
      setNewDistributorData({
        ...newDistributorData,
        name: distributorValue.inputValue || distributorValue.name,
      });
      setItemData({
        ...itemData,
        distributor: distributorValue._id,
      });
    }
  }, [distributorValue]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setActiveStep(0);
      setItemData({
        item: "",
        onModel: "",
        unitOfMeasure: "",
        qtyPerUnit: 0,
        costPerUnit: 0,
        distributor: "",
        par: 0,
        stock: 0,
      });
      setItemValue({ _id: "", name: "" });
      setDistributorValue({ _id: "", name: "" });
    }, 500);
  };

  function _renderStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Add New Inventory Item
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: "20px" }}>
              Enter the details for the new item.
            </Typography>
            <form onSubmit={handleFormSubmit} autoComplete="off">
              <InventoryItemForm
                itemData={itemData}
                setItemData={setItemData}
                allItems={allItems}
                allDistributors={allDistributors}
                setActiveStep={setActiveStep}
                itemValue={itemValue}
                setItemValue={setItemValue}
                distributorValue={distributorValue}
                setDistributorValue={setDistributorValue}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  marginTop: "20px",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ marginLeft: "auto" }}
                >
                  Save Item
                </Button>
              </div>
            </form>
          </>
        );
      case 1:
        return (
          <>
            <Button onClick={() => setActiveStep(0)}>Back</Button>
            <form onSubmit={handleItemCreate} autoComplete="off">
              <ItemForm
                isNew={true}
                itemData={newItemData}
                setItemData={setNewItemData}
              />
              <Button type="submit">Create</Button>
            </form>
          </>
        );
      case 2:
        return (
          <>
            <Button onClick={() => setActiveStep(0)}>Back</Button>
            <DistributorForm
              isNew={true}
              distributorData={newDistributorData}
              setDistributorData={setNewDistributorData}
            />
            <Button onClick={handleDistributorCreate}>Create</Button>
          </>
        );
      default:
        return <div>Not Found</div>;
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(itemData);
      if (!inventory || !inventory._id) {
        throw new Error("Inventory ID is undefined");
      }
      await addItemToInventory(inventory._id, itemData);
      console.log("Item added to inventory");
      navigate(0);
    } catch (error) {
      console.error(error);
    }
    if (activeStep === 0) {
      setOpen(false);
    }
  };

  const handleItemCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (newItemData.itemType === "Alcoholic Beverage") {
        newItem = await createAlcoholicItem(newItemData);
        console.log("Alcoholic item created", newItem); // Debug log
      } else {
        newItem = await createItem(newItemData);
        console.log("Item created", newItem); // Debug log
      }
      setActiveStep(0);
    } catch (error) {
      console.error(error);
    }
    console.log("Item created");
    setItemData((prevItemData) => ({
      ...prevItemData,
      item: newItem._id,
    }));
  };

  const handleDistributorCreate = async () => {
    try {
      newDistributor = await createDistributor(newDistributorData);
    } catch (error) {
      console.error(error);
    }
    console.log("Distributor created");
    setItemData((prevItemData) => ({
      ...prevItemData,
      distributor: newDistributor._id,
    }));
    setActiveStep(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      const itemData = await fetchAllItemsShort();
      setAllItems(itemData);
      const distributorData = await fetchAllDistributors();
      setAllDistributors(distributorData);
    };

    fetchData();
  }, []);

  return (
    <Dialog fullWidth open={open} onClose={handleClose} sx={{}}>
      <DialogContent sx={{ margin: "10px" }}>
        <Stepper nonLinear sx={{ width: 0 }} activeStep={activeStep}></Stepper>
        {_renderStepContent(activeStep)}
      </DialogContent>
    </Dialog>
  );
}

interface BaseItem {
  _id: string;
  name: string;
  inputValue?: string;
}
