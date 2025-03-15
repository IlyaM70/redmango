import { MenuItemList } from "../Components/Page/MenuItems/MenuItemList.tsx";
import { Banner } from "../Components/Page/Common";
function Home() {
  return (
    <div>
      <Banner />
      <div className="container p-2">
        <MenuItemList />
      </div>
    </div>
  );
}

export default Home;
