import { shoppingCartInterface } from "../../../Interfaces";
import { SD_Status } from "../../../Utility/SD";

export interface OrderSummaryInterface {
  data: {
    id?: number;
    cartItems?: shoppingCartInterface[];
    cartTotal?: number;
    userId?: string;
    stripePaymentIntentId?: string;
    status?: (typeof SD_Status)[keyof typeof SD_Status];
  };
  userInput: {
    name: string;
    email: string;
    phoneNumber: string;
  };
}
