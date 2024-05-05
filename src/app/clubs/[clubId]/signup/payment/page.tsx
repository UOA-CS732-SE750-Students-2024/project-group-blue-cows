import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentPage: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setError(error.message);
      } else {
        // Handle successful payment
      }

      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="card-element">Card Details</label>
          <CardElement id="card-element" options={{}} />
        </div>
        <button type="submit" disabled={!stripe || loading}>
          {loading ? "Processing..." : "Pay"}
        </button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default PaymentPage;
