import { useContext } from "react";
import CartContext from "../store/CardContext";
import Model from "./Model";
import { currencyFormatter } from "../util/formatting";
import UserProgressContext from "../store/UserProgressContext";
import Button from "./Button";
import CartItem from "./CartItem";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserProgressContext);
  console.log("checkout userctx", userCtx);
  const cardTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleHideCard = () => {
    userCtx.hideCard();
  };

  const handleGoToCheckout = () => {
    userCtx.showCheckOut(); // Use the correct function name
    console.log("checkout");
  };
  return (
    <Model className="cart" open={userCtx.progress === "cart"}>
      <h3>Your Card</h3>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cardTotal)}</p>
      <p className="modal-actions">
        <span>Button</span>
        <Button textOnly onClick={handleHideCard}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Model>
  );
}
