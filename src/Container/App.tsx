import "../index.css";
import { Header, Footer } from "../Components/Layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AccessDenied,
  Home,
  Login,
  MenuItemDetails,
  NotFound,
  Register,
  ShoppingCart,
  AuthenticationTest,
  AuthenticationTestAdmin,
  Payment,
  OrderConfirmed,
  MyOrders,
  OrderDetails,
  AllOrders,
  MenuItemList,
  MenuItemUpsert,
} from "../Pages";
import { Routes, Route } from "react-router-dom";
import { useGetShoppingCartQuery } from "../Apis/shoppingCartApi";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";
import { userInterface } from "../Interfaces";
import { jwtDecode } from "jwt-decode";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import { RootState } from "../Storage/Redux/store";

function App() {
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(true);
  const userData: userInterface = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const { data, isLoading } = useGetShoppingCartQuery(userData.id, {
    skip: skip,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { fullName, id, email, role }: userInterface = jwtDecode(token);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setShoppingCart(data?.result?.cartItems));
    }
  }, [data]);

  useEffect(() => {
    if (userData.id) {
      setSkip(false);
    }
  }, [userData]);

  return (
    <div className="">
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/menuItemDetails/:menuItemId"
            element={<MenuItemDetails />}
          ></Route>
          <Route path="/shoppingCart" element={<ShoppingCart />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/authentication"
            element={<AuthenticationTest />}
          ></Route>
          <Route
            path="/authorization"
            element={<AuthenticationTestAdmin />}
          ></Route>
          <Route path="/accessDenied" element={<AccessDenied />}></Route>
          <Route
            path="/order/orderconfirmed/:id"
            element={<OrderConfirmed />}
          ></Route>
          <Route path="/order/myOrders" element={<MyOrders />}></Route>
          <Route
            path="/order/orderDetails/:id"
            element={<OrderDetails />}
          ></Route>
          <Route path="/order/allOrders" element={<AllOrders />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route
            path="/menuitem/menuitemlist"
            element={<MenuItemList />}
          ></Route>
          <Route
            path="/menuitem/menuitemupsert/:id"
            element={<MenuItemUpsert />}
          ></Route>
          <Route
            path="/menuitem/menuitemupsert"
            element={<MenuItemUpsert />}
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
