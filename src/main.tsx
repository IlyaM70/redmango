import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./Container/App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Storage";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer />
      <App />
    </BrowserRouter>
  </Provider>
);
