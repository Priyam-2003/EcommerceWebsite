import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);
export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState(() => {
    const storedCart = localStorage.getItem("cartItem");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  const addToCart = (product, quantity) => {
    const itemInCart = cartItem.find((item) => item.id === product.id);
    if (itemInCart) {
      const updatedCart = cartItem.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );
      setCartItem(updatedCart);
      toast.success("Product quantity increase!");
    } else {
      setCartItem((prev) => [...prev, { ...product, quantity: quantity }]);
      toast.success("Product is added to cart!");
    }
  };
  const updateQuantity = (productId, action) => {
    setCartItem(
      cartItem
        .map((item) => {
          if (item.id === productId) {
            let newUnit = item.quantity;
            if (action === "increase") {
              newUnit = newUnit + 1;
              toast.success("Product quantity increase!");
            } else if (action === "decrease") {
              newUnit = newUnit - 1;
              toast.success("Product quantity decrease!");
            }
            return newUnit > 0 ? { ...item, quantity: newUnit } : null;
          }
          return item;
        })
        .filter((item) => item != null),
    );
  };
  const deleteItem = (id) => {
    setCartItem(
      cartItem.filter((item) => {
        return item.id != id;
      }),
    );
    toast.error("Product is deleted from cart!");
  };
  return (
    <CartContext.Provider
      value={{ cartItem, setCartItem, addToCart, updateQuantity, deleteItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
