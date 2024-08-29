// Define the InventoryItem type
export interface InventoryItem {
  _id: string;
  item: string; // Reference to either Item or AlcoholItem
  onModel: "Item" | "AlcoholItem"; // Specify the models the item can reference
  unitOfMeasure: string;
  qtyPerUnit: number;
  costPerUnit: number;
  distributor: string;
  par: number;
  stock?: number; // Optional field
}

export interface Archive {
  inventoryName: string;
  items: InventoryItem[];
  archiveDate?: Date;
}

export type currentInventory = {
  _id: string;
  inventoryName: string;
  items: Item[];
};

export interface BaseItem {
  name: string;
  description?: string;
  image?: string;
  itemType:
    | "Food Item"
    | "Alcoholic Beverage"
    | "Non-Alcoholic Beverage"
    | "Supplies";
}

export interface AlcoholItem extends BaseItem {
  itemType: "Alcoholic Beverage";
  alcoholType:
    | "Whiskey"
    | "Agave"
    | "Vodka"
    | "Rum"
    | "Gin"
    | "Beer"
    | "Wine"
    | "Other";
  alcoholContent: number;
}

export type Item = BaseItem | AlcoholItem;

interface Contact {
  name?: string;
  email?: string;
  phone?: string;
}

export interface Distributor {
  name: string;
  website?: string;
  contact?: Contact;
}
