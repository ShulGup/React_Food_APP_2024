import React, { createContext, useState } from "react";

const UserProgressContext = createContext({
  progress: "",
  showCard: () => {},
  hideCard: () => {},
  showCheckOut: () => {},
  hideCheckOut: () => {},
});

export function UserprogressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");

  const showCard = () => {
    setUserProgress("cart");
  };

  const hideCard = () => {
    setUserProgress("");
  };

  const showCheckOut = () => {
    setUserProgress("checkout");
  };

  const hideCheckOut = () => {
    setUserProgress("");
  };

  const contextValue = {
    progress: userProgress,
    showCard,
    hideCard,
    showCheckOut,
    hideCheckOut,
  };

  return (
    <UserProgressContext.Provider value={contextValue}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;
