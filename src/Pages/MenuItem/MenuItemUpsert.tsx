import { useEffect, useState } from "react";
import { inputHelper, toastNotify } from "../../Helper";
import {
  useCreateMenuItemMutation,
  useGetMenuItemByIdQuery,
  useUpdateMenuItemMutation,
} from "../../Apis/menuItemApi";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";
import { SD_Categories } from "../../Utility/SD";
function MenuItemUpsert() {
  const Categories = [
    SD_Categories.APPETIZER,
    SD_Categories.ENTREE,
    SD_Categories.DESSERT,
    SD_Categories.BEVERAGES,
  ];

  const menuItemData = {
    name: "",
    description: "",
    specialTag: "",
    category: Categories[0],
    price: "",
  };

  const [imageToStore, setImageToStore] = useState<File | string>("");
  const [imageToDisplay, setImageToDisplay] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [createMenuItem] = useCreateMenuItemMutation();
  const [updateMenuItem] = useUpdateMenuItemMutation();

  const navigate = useNavigate();
  const [menuItemInputs, setMenuItemInputs] = useState(menuItemData);
  const { id } = useParams();
  const { data } = useGetMenuItemByIdQuery(id);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        name: data.result.name,
        description: data.result.description,
        specialTag: data.result.specialTag,
        category: data.result.category,
        price: data.result.price,
      };
      setMenuItemInputs(tempData);
      setImageToDisplay(data.result.image);
    }
  }, [data]);

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

    if (!imageToStore && !id) {
      toastNotify("Please upload an image", "error");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("Name", menuItemInputs.name);
    formData.append("Description", menuItemInputs.description ?? "");
    formData.append("SpecialTag", menuItemInputs.specialTag ?? "");
    formData.append("Category", menuItemInputs.category ?? "");
    formData.append("Price", menuItemInputs.price);
    if (imageToStore) {
      formData.append("File", imageToStore);
    }

    let response;
    if (id) {
      //update
      formData.append("Id", id);
      console.log(formData.get("Description"));

      response = await updateMenuItem({ data: formData, id });
      toastNotify("MenuItem updated successfully", "success");
    } else {
      //create
      response = await createMenuItem(formData);
      toastNotify("MenuItem created successfully", "success");
    }
    if (response) {
      navigate("/menuItem/menuitemlist");
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className="px-2 text-success">{id ? "Edit" : "Add"} Menu Item</h3>
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
            <select
              className="form-control mt-3"
              name="category"
              onChange={handleMenuItemInput}
              value={menuItemInputs.category}
            >
              {Categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
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
            />
            <div className="row">
              <div className="col-6">
                {" "}
                <button
                  type="submit"
                  className="btn btn-success mt-3 form-control"
                >
                  {id ? "Update" : "Create"}
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
