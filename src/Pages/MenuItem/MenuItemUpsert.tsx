import { useState } from "react";
import { inputHelper, toastNotify } from "../../Helper";

function MenuItemUpsert() {
  const menuItemData = {
    name: "",
    description: "",
    specialTag: "",
    category: "",
    price: 0,
  };

  const [imageToStore, setImageToStore] = useState<any>();
  const [imageToDisplay, setImageToDisplay] = useState<string>("");

  const [menuItemInputs, setMenuItemInputs] = useState(menuItemData);
  const handleMenuItemInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, menuItemInputs);
    setMenuItemInputs(tempData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imgType = file.type.split("/")[1];
      const validImgTypes = ["png", "jpeg", "jpg"];

      const isImageTypeValid = validImgTypes.filter((e) => {
        return e === imgType;
      });

      if (file.size > 1000 * 1024) {
        setImageToStore("");
        toastNotify("File must be less then 1 MB", "error");
        return;
      }

      if (isImageTypeValid.length === 0) {
        setImageToStore("");
        toastNotify("File must be in jpeg, jpg or png format", "error");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageToStore(file);
      reader.onload = (e) => {
        const imgUrl = e.target?.result as string;
        setImageToDisplay(imgUrl);
      };
    }
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
            <input
              type="file"
              className="form-control mt-3"
              onChange={handleFileChange}
            />
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
              src={imageToDisplay}
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
