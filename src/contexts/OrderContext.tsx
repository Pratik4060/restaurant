// contexts/OrderContext.tsx
import React, { createContext, useContext, useState, type ReactNode } from 'react';

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface OrderContextType {
  orderItems: OrderItem[];
  addToOrder: (item: OrderItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearOrder: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const addToOrder = (item: OrderItem) => {
    setOrderItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setOrderItems(prev => 
      quantity === 0 
        ? prev.filter(i => i.id !== id)
        : prev.map(i => i.id === id ? { ...i, quantity } : i)
    );
  };

  const removeItem = (id: number) => {
    setOrderItems(prev => prev.filter(i => i.id !== id));
  };

  const clearOrder = () => setOrderItems([]);

  const getTotalPrice = () => {
    return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return orderItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <OrderContext.Provider value={{
      orderItems,
      addToOrder,
      updateQuantity,
      removeItem,
      clearOrder,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within OrderProvider');
  }
  return context;
};