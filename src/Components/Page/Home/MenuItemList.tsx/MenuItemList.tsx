import { useEffect, useState } from "react";
import { menuItemInterface } from "../../../../Interfaces";
import MenuItemCard from "./MenuItemCard";
import { useGetMenuItemsQuery } from "../../../../Apis/menuItemApi";
import { useDispatch, useSelector } from "react-redux";
import { setMenuItem } from "../../../../Storage/Redux/menuItemSlice";
import { MainLoader } from "../../Common";
import { RootState } from "../../../../Storage/Redux/store";

function MenuItemList() {
  const [menuItems, setMenuItems] = useState<menuItemInterface[]>([]);
  const { data, isLoading } = useGetMenuItemsQuery(null);
  const dispath = useDispatch();

  const searchValue = useSelector(
    (state: RootState) => state.menuItemStore.search
  );

  useEffect(() => {
    if (data && data.result) {
      const tempMenuItems = handleFilters(searchValue);
      setMenuItems(tempMenuItems);
    }
  }, [searchValue]);

  useEffect(() => {
    if (!isLoading) {
      dispath(setMenuItem(data.result));
      setMenuItems(data.result);
    }
  }, [isLoading]);

  const handleFilters = (search: string) => {
    let tempMenuItems = [...data.result];

    if (search) {
      tempMenuItems = tempMenuItems.filter(
        (item: menuItemInterface) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    return tempMenuItems;
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="container row">
      {menuItems.length > 0 &&
        menuItems.map((menuItem: menuItemInterface, index: number) => (
          <MenuItemCard menuItem={menuItem} key={index} />
        ))}
    </div>
  );
}

export default MenuItemList;
