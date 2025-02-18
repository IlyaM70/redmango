import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { SD_Roles } from "../Utility/SD";

const withAuthAdmin = (Component: React.ComponentType) => {
  return (props: any) => {
    const accessToken = localStorage.getItem("token") ?? "";

    if (accessToken) {
      const decodedToken: {
        role: string;
      } = jwtDecode(accessToken);

      if (decodedToken.role !== SD_Roles.ADMIN) {
        return <Navigate to="/accessDenied" />;
      }
    } else {
      return <Navigate to="/login" />;
    }

    return <Component {...props} />;
  };
};

export default withAuthAdmin;
