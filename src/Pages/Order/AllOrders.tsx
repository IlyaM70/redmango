import { withAuth } from "../../HOC";

import { useGetAllOrdersQuery } from "../../Apis/orderApi";
import { OrderList } from "../../Components/Page/Order";
import { MainLoader } from "../../Components/Page/Common";
import { useEffect, useState } from "react";
import { inputHelper } from "../../Helper";
import { SD_Status } from "../../Utility/SD";
import { orderHeaderInterface } from "../../Interfaces";

function MyOrders() {
  const [filters, setFilters] = useState({ searchString: "", status: "" });
  const [orderData, setOrderData] = useState([]);
  const [apiFilters, setApiFilters] = useState({
    searchString: "",
    status: "",
  });
  const { data, isLoading } = useGetAllOrdersQuery({
    ...(apiFilters.searchString && { searchString: apiFilters.searchString }),
    ...(apiFilters.status && { status: apiFilters.status }),
  });
  const filterOptions = [
    "All",
    SD_Status.PENDING,
    SD_Status.CONFIRMED,
    SD_Status.BEING_COOKED,
    SD_Status.READY_FOR_PICKUP,
    SD_Status.COMPLETED,
    SD_Status.CANCELLED,
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempValue = inputHelper(e, filters);
    setFilters(tempValue);
  };

  const handleFilters = () => {
    setApiFilters({
      searchString: filters.searchString,
      status: filters.status,
    });
  };

  useEffect(() => {
    if (data) {
      setOrderData(data.result);
    }
  }, [data]);

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <>
          <div className="d-flex align-items-center justify-content-between mx-5 mt-5">
            <h1 className="text-success">Orders List</h1>
            <div className="d-flex" style={{ width: "40%" }}>
              <input
                type="text"
                className="form-control mx-2"
                placeholder="Search name, email or phone"
                onChange={handleChange}
                name="searchString"
              />
              <select
                className="form-select mx-2 w-50"
                onChange={handleChange}
                name="status"
              >
                {filterOptions.map((item, index) => (
                  <option key={index} value={item === "All" ? "" : item}>
                    {item}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-outline-success"
                onClick={handleFilters}
              >
                Search
              </button>
            </div>
          </div>
          <OrderList isLoading={isLoading} orderData={orderData} />
        </>
      )}
    </>
  );
}

export default withAuth(MyOrders);
