// contexts/OrderContext.tsx
import React, { createContext, useContext, useState, type ReactNode } from 'react';

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
}

interface OrderContextType {
  orderItems: OrderItem[];
  addToOrder: (item: OrderItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearOrder: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getItemQuantity: (id: number) => number;
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
      return [...prev, { ...item, quantity: item.quantity }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setOrderItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setOrderItems(prev => prev.filter(item => item.id !== id));
  };

  const clearOrder = () => setOrderItems([]);

  const getTotalPrice = () => {
    return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return orderItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getItemQuantity = (id: number) => {
    const item = orderItems.find(i => i.id === id);
    return item?.quantity || 0;
  };

  return (
    <OrderContext.Provider value={{
      orderItems,
      addToOrder,
      updateQuantity,
      removeItem,
      clearOrder,
      getTotalPrice,
      getTotalItems,
      getItemQuantity
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