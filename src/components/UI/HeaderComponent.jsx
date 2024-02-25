import { useContext } from "react";
import logoImg from "../../assets/logo.jpg";
import Button from "./Button";
import CartContext from "../store/CardContext";
import UserProgressContext from "../store/UserProgressContext";

export default function HeaderComponent() {
  const userCtx = useContext(UserProgressContext);
  const cardCtx = useContext(CartContext);
  console.log("total", cardCtx);

  const totalCartItem = cardCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCard() {
    userCtx.showCard();
  }
  console.log(totalCartItem);
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Food logo" />
        <h1>Food APP</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCard}>
          Card {totalCartItem}
        </Button>
      </nav>
    </header>
  );
}
