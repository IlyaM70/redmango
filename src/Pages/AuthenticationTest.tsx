import { withAuth } from "../HOC";

function AuthenticationTest() {
  return <div>This page can be accessed by all logged in users</div>;
}

export default withAuth(AuthenticationTest);
