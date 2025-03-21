import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { toastNotify } from "../../../Helper";
import { OrderSummaryInterface } from "../Order/OrderSummaryInterface";
import { apiResponseInterface, cartItemInterface } from "../../../Interfaces";
import { useCreateOrderMutation } from "../../../Apis/orderApi";
import { SD_Status } from "../../../Utility/SD";
import { useNavigate } from "react-router-dom";

const PaymentForm = ({ data, userInput }: OrderSummaryInterface) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [createOrder] = useCreateOrderMutation();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect: "if_required",
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      toastNotify("An unexpected error ocurred.", "error");
      setIsProcessing(false);
    } else {
      let grandTotal = 0;
      let totalItems = 0;
      const orderDetailsDto: any = [];
      data.cartItems?.forEach((item: cartItemInterface) => {
        const tempOrderDetail: any = {};
        tempOrderDetail["menuItemId"] = item.menuItem?.id;
        tempOrderDetail["quantity"] = item.quantity;
        tempOrderDetail["itemName"] = item.menuItem?.name;
        tempOrderDetail["price"] = item.menuItem?.price;
        orderDetailsDto.push(tempOrderDetail);
        grandTotal += item.quantity! * item.menuItem?.price!;
        totalItems += item.quantity!;
      });

      const response: apiResponseInterface = await createOrder({
        pickUpName: userInput.name,
        pickUpPhoneNumber: userInput.phoneNumber,
        pickUpEmail: userInput.email,
        applicationUserId: data.userId,
        orderTotal: grandTotal,
        totalItems: totalItems,
        orderDetailsDto: orderDetailsDto,
        stripePaymentIntentId: data.stripePaymentIntentId,
        status:
          result.paymentIntent.status === "succeeded"
            ? SD_Status.CONFIRMED
            : SD_Status.PENDING,
      });

      if (response) {
        if (response.data?.result.status === SD_Status.CONFIRMED) {
          navigate(
            `/order/orderconfirmed/${response.data.result.orderHeaderId}`
          );
        } else {
          navigate("/failed");
        }
      }
    }
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        disabled={!stripe || isProcessing}
        className="btn btn-success mt-5 w-100"
      >
        <span id="button-text">
          {isProcessing ? "Processing..." : "Submit Order"}
        </span>
      </button>
    </form>
  );
};

export default PaymentForm;
