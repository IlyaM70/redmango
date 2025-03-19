import { withAuth } from "../../HOC";
import { useGetAllOrdersQuery } from "../../Apis/orderApi";
import { OrderList } from "../../Components/Page/Order";
import { MainLoader } from "../../Components/Page/Common";
import { useEffect, useState } from "react";
import { inputHelper } from "../../Helper";
import { SD_Status } from "../../Utility/SD";

function MyOrders() {
  const [filters, setFilters] = useState({ searchString: "", status: "" });
  const [orderData, setOrderData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageOptions, setPageOptions] = useState({
    pageNumber: 1,
    pageSize: 5,
  });
  const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize);

  const [apiFilters, setApiFilters] = useState({
    searchString: "",
    status: "",
  });

  const { data, isLoading } = useGetAllOrdersQuery({
    ...(apiFilters.searchString && { searchString: apiFilters.searchString }),
    ...(apiFilters.status && { status: apiFilters.status }),
    ...(pageOptions.pageNumber && { pageNumber: pageOptions.pageNumber }),
    ...(pageOptions.pageSize && { pageSize: pageOptions.pageSize }),
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
      setOrderData(data.apiResponse.result);
      const { TotalRecords } = JSON.parse(data.totalRecords);
      setTotalRecords(TotalRecords);
    }
  }, [data]);

  const getPageDetails = () => {
    const dataStartNumber =
      (pageOptions.pageNumber - 1) * pageOptions.pageSize + 1;
    const dataEndNumber = pageOptions.pageNumber * pageOptions.pageSize;

    return `${dataStartNumber}-${
      dataEndNumber < totalRecords ? dataEndNumber : totalRecords
    } of ${totalRecords}`;
  };

  function handlePageOptionsChange(direction: string, pageSize?: number) {
    if (direction === "prev") {
      setPageOptions({
        ...pageOptions,
        pageNumber: pageOptions.pageNumber - 1,
      });
    } else if (direction === "next") {
      setPageOptions({
        ...pageOptions,
        pageNumber: pageOptions.pageNumber + 1,
      });
    } else if (direction === "change") {
      setPageOptions({
        ...pageOptions,
        pageSize: pageSize ? pageSize : 5,
      });
    }
  }

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
          <div className="d-flex mx-5 justify-content-end align-items-center">
            <div>Rows per page:</div>
            <div>
              <select
                className="form-select mx-2"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  handlePageOptionsChange("change", Number(e.target.value));
                  setCurrentPageSize(Number(e.target.value));
                }}
                style={{ width: "80px" }}
                value={currentPageSize}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <div className="mx-2">{getPageDetails()}</div>
            <button
              disabled={pageOptions.pageNumber === 1}
              className="btn btn-outline-primary  px-3 mx-2"
              onClick={() => handlePageOptionsChange("prev")}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <button
              disabled={
                pageOptions.pageNumber ===
                Math.ceil(totalRecords / pageOptions.pageSize)
              }
              className="btn btn-outline-primary  px-3 mx-2"
              onClick={() => handlePageOptionsChange("next")}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default withAuth(MyOrders);
