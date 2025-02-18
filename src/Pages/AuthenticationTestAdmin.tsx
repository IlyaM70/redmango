import { withAuthAdmin } from "../HOC";

function AuthenticationTestAdmin() {
  return <div>This page can be accessed by ADMIN users</div>;
}

export default withAuthAdmin(AuthenticationTestAdmin);
