import logo from "../../Assests/Images/mango.png";
import { NavLink, useNavigate } from "react-router-dom";
import { cartItemInterface, userInterface } from "../../Interfaces";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import {
  emptyUserState,
  setLoggedInUser,
} from "../../Storage/Redux/userAuthSlice";
import { SD_Roles } from "../../Utility/SD";

function Header() {
  const shoppingCartFromStore: cartItemInterface[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );

  const userData: userInterface = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedInUser({ ...emptyUserState }));
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <NavLink className="nav-link" aria-current="page" to="/">
            <img src={logo} style={{ height: "40px" }} className="m-1" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              {userData.role != SD_Roles.ADMIN ? (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/order/myOrders"
                  >
                    Orders
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Admin panel
                  </a>
                  <ul className="dropdown-menu">
                    <li
                      onClick={() => navigate("menuitem/menuitemlist")}
                      className="dropdown-item"
                      style={{ cursor: "pointer" }}
                    >
                      Menu Item List
                    </li>
                    <li
                      className="dropdown-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("order/myorders")}
                    >
                      My Orders
                    </li>
                    <li
                      className="dropdown-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("order/allorders")}
                    >
                      All Orders
                    </li>
                  </ul>
                </li>
              )}

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/shoppingCart"
                >
                  <i className="bi bi-cart"></i>{" "}
                  {userData.id && `(${shoppingCartFromStore.length})`}
                </NavLink>
              </li>

              <div className="d-flex" style={{ marginLeft: "auto" }}>
                {userData.id && (
                  <>
                    <li className="nav-item">
                      <button
                        className="nav-link nav-link-active"
                        style={{
                          cursor: "pointer",
                          background: "transparent",
                          border: "0",
                        }}
                      >
                        Welcome, {userData.fullName}
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        onClick={handleLogout}
                        className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                        style={{
                          border: "none",
                          height: "40px",
                          width: "100px",
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}

                {!userData.id && (
                  <>
                    <li className="nav-item text-white">
                      <NavLink className="nav-link" to="/register">
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item text-white">
                      <NavLink
                        className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                        style={{
                          border: "none",
                          height: "40px",
                          width: "100px",
                        }}
                        to="/login"
                      >
                        Login
                      </NavLink>
                    </li>
                  </>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
