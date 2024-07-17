import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { fetchAllItemsShort } from "../../api/itemsApi";
import InventoryItemForm from "../Forms/InventoryItemForm";
import ItemForm from "../Forms/ItemForm";

export default function AddItem(props: any) {
  const { open, setOpen } = props;
  const [activeStep, setActiveStep] = useState(0);
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
      setNewItemData({
        ...newItemData,
        name: value.inputValue || value.name,
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

  const handleNext = () => {
    setActiveStep(1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setItemData({ ...itemData, [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // if (value && value.inputValue) {
    //   try {
    //     const newItem = await createNewItemInDb(value.inputValue);

    //     setItemData(prevItemData => ({
    //       ...prevItemData,
    //       item: newItem._id,
    //     }));

    //     await createNewInventoryItem(itemData);

    //   } catch (error) {
    //     console.error("Error creating new item", error);
    //   }
    // }
    // else {
    //   try {
    //     await createNewInventoryItem(itemData);
    //   } catch (error) {
    //     console.error("Error creating new inventory item", error);
    // }

    console.log("Form submitted");
    setOpen(false);
  };

  const handleItemCreate = () => {
    console.log("Item created");
    setOpen(false);
  };

  // useEffect(() => {
  //   if (!value) {
  //     return;
  //   }
  //   setItemData({
  //     ...itemData,
  //     item: value.inputValue ? value.inputValue : value._id,
  //   });
  // }, [value]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllItemsShort();
      setAllItems(data);
    };

    fetchData();
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {_renderStepContent(activeStep)}
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={handleNext}>Next</Button>
      </DialogActions>
    </Dialog>
  );
}

interface BaseItem {
  _id: string;
  name: string;
  inputValue?: string;
}
