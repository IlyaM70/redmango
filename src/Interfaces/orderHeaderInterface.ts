import orderDetailInterface from "./orderDetailInterface";

export default interface orderHeaderInterface {
  orderHeaderId?: number;
  pickupName?: string;
  pickupPhoneNumber?: string;
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
