import menuItemInterface from "./menuItemInterface";

export default interface orderDetailInterface {
  orderDetailId?: number;
  orderHeaderId?: number;
  menuItemId?: number;
  menuItem?: menuItemInterface;
  quantity?: number;
  itemName?: string;
  price?: number;
}
