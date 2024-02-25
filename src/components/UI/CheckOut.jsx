import { currencyFormatter } from "../util/formatting";
import Model from "./Model";
import React, { useContext } from "react";
import CartContext from "../store/CardContext";
import UserProgressContext from "../store/UserProgressContext";
import Input from "./Input";
import Button from "./Button";
import useHttp from "../hooks/useHttps";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function CheckOut() {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserProgressContext);
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);
  const cardTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleHideCheckOut = () => {
    userCtx.hideCheckOut();
  };

  const handleFinish = () => {
    userCtx.hideCheckOut();
    cartCtx.clearCart();
    clearData();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    console.log(customerData);

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  };

  let actions = (
    <>
      <Button textOnly onClick={handleHideCheckOut}>
        Close
      </Button>
      <Button type="submit">Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Model open={userCtx.progress === "checkout"} onClose={handleFinish}>
        <h2>Success !</h2>
        <p>Your order was submitted successfully</p>
        <p>
          We will get back to you with more details via email within the next fw
          minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Model>
    );
  }

  return (
    <Model open={userCtx.progress === "checkout"} onClose={handleHideCheckOut}>
      <form onSubmit={handleSubmit}>
        <h2>CheckOut</h2>
        <p>Total Amount: {currencyFormatter.format(cardTotal)}</p>
        <Input label="Full Name" type="text" id="full-name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="Street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="faled to fetch" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Model>
  );
}
