import React from "react";
import { Header, Footer } from "../Components/Layout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Home, MenuItemDetails, NotFound } from "../Pages";
import { Routes, Route } from "react-router-dom";
import { useGetShoppingCartQuery } from "../Apis/shoppingCartApi";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";

function App() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetShoppingCartQuery(
    "4ab04538-5903-4a34-9964-3d69d98700ca"
  );

  useEffect(() => {
    if (!isLoading) {
      //console.log(data.result);
      dispatch(setShoppingCart(data.result?.cartItems));
    }
  }, [data]);

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
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
