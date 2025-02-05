import menuItemInterface from "./menuItemInterface";

export default interface cartItemInterface {
  id?: number;
  menuItemId?: number;
  menuItem?: menuItemInterface;
  quantity?: number;
}
