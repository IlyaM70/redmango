import { withAuth } from "../../HOC";

import { useGetAllOrdersQuery } from "../../Apis/orderApi";
import { OrderList } from "../../Components/Page/Order";
import { MainLoader } from "../../Components/Page/Common";
import { useEffect, useState } from "react";
import { inputHelper } from "../../Helper";
import { SD_Status } from "../../Utility/SD";
import { orderHeaderInterface } from "../../Interfaces";

function MyOrders() {
  const { data, isLoading } = useGetAllOrdersQuery("");
  const [orderData, setOrderData] = useState([]);
  const [filters, setFilters] = useState({ searchString: "", status: "" });
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
    const tempData = data.result.filter((orderData: orderHeaderInterface) => {
      if (
        (orderData.pickUpName &&
          orderData.pickUpName.includes(filters.searchString)) ||
        (orderData.pickUpEmail &&
          orderData.pickUpEmail.includes(filters.searchString)) ||
        (orderData.pickUpPhoneNumber &&
          orderData.pickUpPhoneNumber.includes(filters.searchString))
      ) {
        return orderData;
      }
    });

    const finalArray = tempData.filter((orderData: orderHeaderInterface) => {
      if (filters.status !== "") {
        if (orderData.status === filters.status) {
          return orderData;
        }
      }
    });
    if (finalArray.length > 0) {
      setOrderData(finalArray);
    } else {
      setOrderData(tempData);
    }
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
