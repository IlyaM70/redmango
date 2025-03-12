import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMenuItem } from "../../Storage/Redux/menuItemSlice";
import { MainLoader } from "../../Components/Page/Common";
import {
  useDeleteMenuItemMutation,
  useGetMenuItemsQuery,
} from "../../Apis/menuItemApi";
import { menuItemInterface } from "../../Interfaces";
import { useNavigate } from "react-router-dom";
import { toastNotify } from "../../Helper";
import { toast } from "react-toastify";

function MenuItemList() {
  const { data, isLoading } = useGetMenuItemsQuery(null);
  const [deleteMenuItem] = useDeleteMenuItemMutation();
  const dispath = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      dispath(setMenuItem(data.result));
    }
  }, [isLoading]);

  const handleDelete = async (id: number) => {
    toast.promise(
      deleteMenuItem(id),
      {
        pending: "Deleting Menu Item...",
        error: "Error deleting Menu Item",
        success: "Menu Item deleted successfully",
      },
      {
        theme: "dark",
      }
    );
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="table p-5">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="text-success">MenuItem List</h1>
        <button
          className="btn btn-success"
          onClick={() => navigate(`/menuitem/menuitemupsert`)}
        >
          Add New Menu Item
        </button>
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
                <button
                  className="btn btn-success"
                  onClick={() =>
                    navigate(`/menuitem/menuitemupsert/${menuItem.id}`)
                  }
                >
                  <i className="bi bi-pencil-fill"></i>
                </button>
                <button
                  onClick={() => handleDelete(menuItem.id)}
                  className="btn btn-danger mx-2"
                >
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
