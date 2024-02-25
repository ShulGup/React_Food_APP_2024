import Cart from "./components/UI/Cart";
import CheckOut from "./components/UI/CheckOut";
import HeaderComponent from "./components/UI/HeaderComponent";
import Meals from "./components/UI/Meals";
import { CartContextProvider } from "./components/store/CardContext";
import { UserprogressContextProvider } from "./components/store/UserProgressContext";

function App() {
  return (
    <UserprogressContextProvider>
      <CartContextProvider>
        <HeaderComponent />
        <Meals />
        <Cart />
        <CheckOut />
      </CartContextProvider>
    </UserprogressContextProvider>
  );
}

export default App;
