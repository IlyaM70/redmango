import orderDetailInterface from "./orderDetailInterface";

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
  status: string;
  totalItems?: number;
  orderDetails?: orderDetailInterface[];
}
