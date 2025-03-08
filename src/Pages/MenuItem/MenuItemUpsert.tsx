import { useState } from "react";
import { inputHelper } from "../../Helper";

function MenuItemUpsert() {
  const menuItemData = {
    name: "",
    description: "",
    specialTag: "",
    category: "",
    price: 0,
  };

  const [menuItemInputs, setMenuItemInputs] = useState(menuItemData);
  const handleMenuItemInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, menuItemInputs);
    setMenuItemInputs(tempData);
  };

  return (
    <div className="container border mt-5 p-5">
      <h3 className="offset-2 px-2 text-success">Add Product</h3>
      <form method="post" encType="multipart/form-data">
        <div className="row mt-3">
          <div className="col-md-5 offset-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="name"
              onChange={handleMenuItemInput}
              value={menuItemInputs.name}
            />
            <textarea
              className="form-control mt-3"
              placeholder="Enter Description"
              name="description"
              onChange={handleMenuItemInput}
              value={menuItemInputs.description}
            ></textarea>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Special Tag"
              name="specialTag"
              onChange={handleMenuItemInput}
              value={menuItemInputs.specialTag}
            />
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Category"
              name="category"
              onChange={handleMenuItemInput}
              value={menuItemInputs.category}
            />
            <input
              type="number"
              className="form-control mt-3"
              required
              placeholder="Enter Price"
              name="price"
              onChange={handleMenuItemInput}
              value={menuItemInputs.price}
            />
            <input type="file" className="form-control mt-3" />
            <div className="text-center">
              <button
                type="submit"
                style={{ width: "50%" }}
                className="btn btn-success mt-5"
              >
                Submit
              </button>
            </div>
          </div>
          <div className="col-md-5 text-center">
            <img
              src="https://picsum.photos/id/180/150/150?blur=1"
              style={{ width: "100%", borderRadius: "30px" }}
              alt=""
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default MenuItemUpsert;
