import { currencyFormatter } from "../util/formatting";
import Button from "./Button";
import CartContext from "../store/CardContext";
import { useContext } from "react";

export default function MealsItem({ meal }) {
  const ctxcart = useContext(CartContext);
  function mealtoadd() {
    ctxcart.addItem(meal);
  }
  return (
    <div className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={mealtoadd}>Add to card</Button>
        </p>
      </article>
    </div>
  );
}
