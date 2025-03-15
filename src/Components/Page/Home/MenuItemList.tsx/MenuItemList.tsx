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
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [categoryList, setCategoryList] = useState([""]);
  const { data, isLoading } = useGetMenuItemsQuery(null);
  const dispath = useDispatch();

  const searchValue = useSelector(
    (state: RootState) => state.menuItemStore.search
  );

  useEffect(() => {
    if (data && data.result) {
      const tempMenuItems = handleFilters(selectedCategory, searchValue);
      setMenuItems(tempMenuItems);
    }
  }, [searchValue]);

  useEffect(() => {
    if (!isLoading) {
      dispath(setMenuItem(data.result));
      setMenuItems(data.result);

      const tempCategoryList = ["All"];
      data.result.forEach((item: menuItemInterface) => {
        if (!tempCategoryList.includes(item.category)) {
          tempCategoryList.push(item.category);
        }
      });
      setCategoryList(tempCategoryList);
    }
  }, [isLoading]);

  const handleCategoryClick = (i: number) => {
    const buttons = document.querySelectorAll(".custom-buttons");
    let localCategory;
    buttons.forEach((button, index) => {
      if (index === i) {
        button.classList.add("active");
        if (index === 0) {
          localCategory = "All";
        } else {
          localCategory = categoryList[index];
        }
        setSelectedCategory(localCategory);
        const tempArray = handleFilters(localCategory, searchValue);
        setMenuItems(tempArray);
      } else {
        button.classList.remove("active");
      }
    });
  };

  const handleFilters = (category: string, search: string) => {
    let tempMenuItems =
      category === "All"
        ? [...data.result]
        : data.result.filter(
            (item: menuItemInterface) =>
              item.category.toUpperCase() === category.toUpperCase()
          );
    if (search) {
      tempMenuItems = tempMenuItems.filter(
        (item: menuItemInterface) =>
          item.name.toUpperCase().includes(search.toUpperCase()) ||
          item.description.toUpperCase().includes(search.toUpperCase())
      );
    }

    return tempMenuItems;
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="container row">
      <div className="my-3">
        <ul className="nav w-100 d-flex justify-content-center">
          {categoryList.map((category: string, index: number) => (
            <li className="nav-item" key={index}>
              <button
                className={`nav-link p-0 pb-2 fs-5 custom-buttons ${
                  index === 0 && "active"
                }`}
                onClick={() => handleCategoryClick(index)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {menuItems.length > 0 &&
        menuItems.map((menuItem: menuItemInterface, index: number) => (
          <MenuItemCard menuItem={menuItem} key={index} />
        ))}
    </div>
  );
}

export default MenuItemList;
