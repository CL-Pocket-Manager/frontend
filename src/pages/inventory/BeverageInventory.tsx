import { useLoaderData } from "react-router-dom";

export default function BeverageInventory() {
  const bev: any = useLoaderData();

  return (
    <div>
      <h3>Beverage Inventory</h3>
      <ul>
        {bev.map((item: any) => (
          <li key={item.id}>
            {item.name} - {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export const bevInvenLoader = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_API_BASE_URL}/beverageInventory`
  );

  return res.json();
};
