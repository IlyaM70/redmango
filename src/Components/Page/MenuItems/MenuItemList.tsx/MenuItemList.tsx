import { useEffect } from "react";
import { menuItemInterface } from "../../../../Interfaces";
import MenuItemCard from "./MenuItemCard";
import { useGetMenuItemsQuery } from "../../../../Apis/menuItemApi";
import { useDispatch } from "react-redux";
import { setMenuItem } from "../../../../Storage/Redux/menuItemSlice";
import { MainLoader } from "../../Common";

function MenuItemList() {
  const { data, isLoading } = useGetMenuItemsQuery(null);
  const dispath = useDispatch();

  useEffect(() => {
    if (!isLoading) {
      dispath(setMenuItem(data.result));
    }
  }, [isLoading]);

  if (isLoading) {
    return <MainLoader />;
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
