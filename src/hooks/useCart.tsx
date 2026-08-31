import { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { Product, CartItem, CartContextType } from '../types';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setItems((currentItems: CartItem[]) => {
      const existingItem = currentItems.find((item: CartItem) => item.id === product.id);
      
      if (existingItem) {
        return currentItems.map((item: CartItem) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentItems, { ...product, quantity: 1 } as CartItem];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((currentItems: CartItem[]) => 
      currentItems.filter((item: CartItem) => item.id !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setItems((currentItems: CartItem[]) =>
      currentItems.map((item: CartItem) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = useMemo(() => 
    items.reduce((total: number, item: CartItem) => total + item.quantity, 0), 
  [items]);

  const totalPrice = useMemo(() => 
    items.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0), 
  [items]);

  const contextValue = useMemo(() => ({
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  }), [items, totalItems, totalPrice]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};