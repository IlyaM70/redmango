import { useEffect, useState } from "react";
import { menuItemInterface } from "../../../../Interfaces";
import MenuItemCard from "./MenuItemCard";
import { useGetMenuItemsQuery } from "../../../../Apis/menuItemApi";
import { useDispatch, UseDispatch } from "react-redux";
import { setMenuItem } from "../../../../Storage/Redux/menuItemSlice";

function MenuItemList() {
  //const [menuItems, setMenuItems] = useState<menuItemInterface[]>([]);

  const { data, isLoading } = useGetMenuItemsQuery(null);
  const dispath = useDispatch();

  useEffect(() => {
    if (!isLoading) {
      dispath(setMenuItem(data.result));
    }
  }, [isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container row">
      {data.result.length > 0 &&
        data.result.map((menuItem: menuItemInterface, index: number) => (
          <MenuItemCard menuItem={menuItem} key={index} />
        ))}
    </div>
  );
}

export default MenuItemList;
