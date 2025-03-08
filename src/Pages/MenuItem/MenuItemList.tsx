import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMenuItem } from "../../Storage/Redux/menuItemSlice";
import { MainLoader } from "../../Components/Page/Common";
import { useGetMenuItemsQuery } from "../../Apis/menuItemApi";
import { menuItemInterface } from "../../Interfaces";

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
    <div className="table p-5">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="text-success">MenuItem List</h1>
        <button className="btn btn-success">Add New</button>
      </div>
      <div className="p-2">
        <div className="row border">
          <div className="col-1">Image</div>
          <div className="col-1">ID</div>
          <div className="col-2">Name</div>
          <div className="col-2">Category</div>
          <div className="col-1">Price</div>
          <div className="col-2">Special Tag</div>
          <div className="col-1">Action</div>
        </div>
        {data.result.length > 0 &&
          data.result.map((menuItem: menuItemInterface, index: number) => (
            <div className="row border" key={index}>
              <div className="col-1">
                <img
                  src={menuItem.image}
                  alt="no content"
                  style={{ width: "100%", maxWidth: "120px" }}
                />
              </div>
              <div className="col-1">{menuItem.id}</div>
              <div className="col-2">{menuItem.name}</div>
              <div className="col-2">{menuItem.category}</div>
              <div className="col-1">${menuItem.price}</div>
              <div className="col-2">{menuItem.specialTag}</div>
              <div className="col-1">
                <button className="btn btn-success">
                  <i className="bi bi-pencil-fill"></i>
                </button>
                <button className="btn btn-danger mx-2">
                  <i className="bi bi-trash-fill"></i>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MenuItemList;
