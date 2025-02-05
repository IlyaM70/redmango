import cartItemInterface from "./cartItemInterface";

export default interface shoppingCartModel {
  id?: number;
  userId?: string;
  cartItems?: cartItemInterface[];
  cartTotal?: number;
  stripePaymentIntentId?: any;
  clientSecret?: any;
}
