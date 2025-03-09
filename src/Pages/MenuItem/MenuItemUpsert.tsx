import { useEffect, useState } from "react";
import { inputHelper, toastNotify } from "../../Helper";
import { useCreateMenuItemMutation } from "../../Apis/menuItemApi";
import { useNavigate } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";
function MenuItemUpsert() {
  const menuItemData = {
    name: "",
    description: "",
    specialTag: "",
    category: "",
    price: "",
  };

  const [imageToStore, setImageToStore] = useState<File | string>("");
  const [imageToDisplay, setImageToDisplay] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [createMenuItem] = useCreateMenuItemMutation();
  const navigate = useNavigate();

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
    const file = e.target.files && e.target.files[0];

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

      setImageToStore(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const imgUrl = e.target?.result as string;
        setImageToDisplay(imgUrl);
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!imageToStore) {
      toastNotify("Please upload an image", "error");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("Name", menuItemInputs.name);
    formData.append("Description", menuItemInputs.description);
    formData.append("SpecialTag", menuItemInputs.specialTag);
    formData.append("Category", menuItemInputs.category);
    formData.append("Price", menuItemInputs.price);
    formData.append("File", imageToStore);

    const response = await createMenuItem(formData);
    if (response) {
      toastNotify("MenuItem created successfully", "success");
      navigate("/menuItem/menuitemlist");
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className="px-2 text-success">Add Menu Item</h3>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
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
              accept="image/*"
              name="image"
              required
            />
            <div className="row">
              <div className="col-6">
                {" "}
                <button
                  type="submit"
                  className="btn btn-success mt-3 form-control"
                >
                  Submit
                </button>
              </div>
              <div className="col-6">
                <button
                  onClick={() => navigate(-1)}
                  className="btn btn-secondary mt-3 form-control"
                >
                  Back
                </button>
              </div>
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
