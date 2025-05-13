import React, { createContext, useState, useCallback } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartRefreshTrigger, setCartRefreshTrigger] = useState(0);

  const refreshCart = useCallback(() => {
    setCartRefreshTrigger((prev) => prev + 1);
  }, []);

  return (
    <CartContext.Provider value={{ cartRefreshTrigger, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};