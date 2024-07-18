import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import {
  fetchAllItemsShort,
  createAlcoholicItem,
  createItem,
} from "../../api/itemsApi";
import { addItemToInventory } from "../../api/inventoryApi";
import InventoryItemForm from "../Forms/InventoryItemForm";
import ItemForm from "../Forms/ItemForm";
import { Typography } from "@mui/material";

export default function AddItem(props: any) {
  const { open, setOpen, inventory } = props;
  const [activeStep, setActiveStep] = useState(0);
  let newItem: any = null;
  const [value, setValue] = useState<BaseItem | null>({
    _id: "",
    name: "",
  });
  const [allItems, setAllItems] = useState<BaseItem[]>([]);
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
    name: value?.inputValue || "",
    image: "",
    description: "",
    itemType: "",
    alcoholType: "",
    alcoholContent: 0,
  });

  useEffect(() => {
    if (value) {
      console.log(value);
      setNewItemData({
        ...newItemData,
        name: value.inputValue || value.name,
      });
      setItemData({
        ...itemData,
        item: value._id,
      });
    }
  }, [value]);

  const steps = ["Inventory Item", "Add Item"];

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setActiveStep(0);
    }, 500);
  };

  function _renderStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <>
            <Typography>Add Item to Inventory</Typography>
            <InventoryItemForm
              itemData={itemData}
              setItemData={setItemData}
              allItems={allItems}
              setActiveStep={setActiveStep}
              value={value}
              setValue={setValue}
            />
            <Button onClick={handleFormSubmit}>Submit</Button>
          </>
        );
      case 1:
        return (
          <>
            <Button onClick={() => setActiveStep(0)}>Back</Button>
            <ItemForm
              isNew={true}
              itemData={newItemData}
              setItemData={setNewItemData}
            />
            <Button onClick={handleItemCreate}>Create</Button>
          </>
        );
      default:
        return <div>Not Found</div>;
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      addItemToInventory(inventory._id, itemData);
      console.log("Item added to inventory");
    } catch (error) {
      console.error(error);
    }
    setOpen(false);
  };

  const handleItemCreate = async () => {
    try {
      if (newItemData.itemType === "Alcoholic Beverage") {
        newItem = await createAlcoholicItem(newItemData);
      } else {
        newItem = await createItem(newItemData);
      }
    } catch (error) {
      console.error(error);
    }
    console.log("Item created");
    setActiveStep(0);
  };

  useEffect(() => {
    if (newItem) {
      let newItemID = newItem._id;
      setItemData((prevItemData) => ({
        ...prevItemData,
        item: newItemID,
      }));
    }
  }, [newItem]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllItemsShort();
      setAllItems(data);
    };

    fetchData();
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>{/* <StepLabel>{label}</StepLabel> */}</Step>
          ))}
        </Stepper>
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
