import { withAuth } from "../../HOC";

import { useGetAllOrdersQuery } from "../../Apis/orderApi";
import { OrderList } from "../../Components/Page/Order";
import { MainLoader } from "../../Components/Page/Common";

function MyOrders() {
  const { data, isLoading } = useGetAllOrdersQuery("");

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <OrderList isLoading={isLoading} orderData={data.result} />
      )}
    </>
  );
}

export default withAuth(MyOrders);
