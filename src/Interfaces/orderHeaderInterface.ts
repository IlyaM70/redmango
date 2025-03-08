import orderDetailInterface from "./orderDetailInterface";
import { SD_Status } from "../Utility/SD";
export default interface orderHeaderInterface {
  orderHeaderId?: number;
  pickUpName?: string;
  pickUpPhoneNumber?: string;
  pickupEmail?: string;
  applicationUserId?: string;
  user?: any;
  orderTotal?: number;
  orderDate: Date;
  stripePaymentIntentId: string;
  status: (typeof SD_Status)[keyof typeof SD_Status];
  totalItems?: number;
  orderDetails?: orderDetailInterface[];
}
