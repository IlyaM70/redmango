import { shoppingCartInterface } from "../../../Interfaces";

export interface OrderSummaryInterface {
  data: {
    id: number;
    cartItems: shoppingCartInterface[];
    cartTotal: number;
    userId: string;
    stripePaymentIntent: string;
  };
  userInput: {
    name: string;
    email: string;
    phoneNumber: string;
  };
}
