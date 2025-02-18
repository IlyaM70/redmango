import { Navigate } from "react-router-dom";

const withAuth = (Component: React.ComponentType) => {
  return (props: any) => {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      return <Navigate to="/login" />;
    }
    return <Component {...props} />;
  };
};

export default withAuth;
