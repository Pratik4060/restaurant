import React, {
  createContext,
  useEffect,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
}

export type OrderStatus = "placed" | "preparing" | "ready" | "paid";

export interface OrderHistoryRecord {
  orderNumber: string;
  tableNumber: string;
  items: OrderItem[];
  subtotal: number;
  gst: number;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

interface OrderContextType {
  orderItems: OrderItem[];
  orderPlaced: boolean;
  orderNumber: string;
  orderHistory: OrderHistoryRecord[];
  addToOrder: (item: OrderItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearOrder: () => void;
  placeOrder: (meta?: { tableNumber?: string }) => string;
  resetPlacedOrder: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getItemQuantity: (id: number) => number;
  updateOrderStatus: (orderNumber: string, status: OrderStatus) => void;
  markOrderPaid: (orderNumber: string) => void;
  getOrderByNumber: (orderNumber: string) => OrderHistoryRecord | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);
const ORDER_HISTORY_KEY = "restaurant-order-history";

const normalizeHistory = (records: OrderHistoryRecord[]): OrderHistoryRecord[] => {
  const latestByOrder = new Map<string, OrderHistoryRecord>();

  for (const record of records) {
    const existing = latestByOrder.get(record.orderNumber);
    if (!existing) {
      latestByOrder.set(record.orderNumber, record);
      continue;
    }

    const existingTime = new Date(existing.updatedAt).getTime();
    const recordTime = new Date(record.updatedAt).getTime();

    if (recordTime >= existingTime) {
      latestByOrder.set(record.orderNumber, record);
    }
  }

  return [...latestByOrder.values()].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
};

const loadHistory = (): OrderHistoryRecord[] => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(ORDER_HISTORY_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as OrderHistoryRecord[];
    return Array.isArray(parsed) ? normalizeHistory(parsed) : [];
  } catch {
    return [];
  }
};

export const OrderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [orderHistory, setOrderHistory] = useState<OrderHistoryRecord[]>(loadHistory);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.localStorage.setItem(
      ORDER_HISTORY_KEY,
      JSON.stringify(normalizeHistory(orderHistory)),
    );
  }, [orderHistory]);

  const getOrderTotals = (items: OrderItem[]) => {
    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    const gst = Math.round(subtotal * 0.05);
    return {
      subtotal,
      gst,
      totalAmount: subtotal + gst,
    };
  };

  const addToOrder = (item: OrderItem) => {
    setOrderItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i,
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

    setOrderItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const removeItem = (id: number) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearOrder = () => setOrderItems([]);

  const placeOrder = (meta?: { tableNumber?: string }) => {
    if (orderPlaced && orderNumber) {
      return orderNumber;
    }

    const newOrderNumber = Math.floor(Math.random() * 1000).toString();
    const itemsSnapshot = orderItems.map((item) => ({ ...item }));
    const { subtotal, gst, totalAmount } = getOrderTotals(itemsSnapshot);
    const now = new Date().toISOString();

    setOrderNumber(newOrderNumber);
    setOrderPlaced(true);
    setOrderHistory((prev) =>
      normalizeHistory([
        {
          orderNumber: newOrderNumber,
          tableNumber: meta?.tableNumber || "12",
          items: itemsSnapshot,
          subtotal,
          gst,
          totalAmount,
          status: "placed",
          createdAt: now,
          updatedAt: now,
        },
        ...prev,
      ]),
    );

    return newOrderNumber;
  };

  const resetPlacedOrder = () => {
    setOrderPlaced(false);
    setOrderNumber("");
  };

  const updateOrderStatus = (targetOrderNumber: string, status: OrderStatus) => {
    if (!targetOrderNumber) return;

    const now = new Date().toISOString();

    setOrderHistory((prev) =>
      normalizeHistory(
        prev.map((entry) =>
          entry.orderNumber === targetOrderNumber
            ? { ...entry, status, updatedAt: now }
            : entry,
        ),
      ),
    );
  };

  const markOrderPaid = (targetOrderNumber: string) => {
    if (!targetOrderNumber) return;

    const snapshot = orderItems.map((item) => ({ ...item }));
    const { subtotal, gst, totalAmount } = getOrderTotals(snapshot);
    const now = new Date().toISOString();
    let recordFound = false;

    setOrderHistory((prev) =>
      normalizeHistory(
        prev.map((entry) => {
          if (entry.orderNumber !== targetOrderNumber) return entry;

          recordFound = true;
          return {
            ...entry,
            items: entry.items.length > 0 ? entry.items : snapshot,
            subtotal: entry.subtotal || subtotal,
            gst: entry.gst || gst,
            totalAmount: entry.totalAmount || totalAmount,
            status: "paid",
            updatedAt: now,
          };
        }),
      ),
    );

    if (!recordFound && targetOrderNumber) {
      setOrderHistory((prev) => [
        {
          orderNumber: targetOrderNumber,
          tableNumber: "12",
          items: snapshot,
          subtotal,
          gst,
          totalAmount,
          status: "paid",
          createdAt: now,
          updatedAt: now,
        },
        ...prev,
      ]);
    }
  };

  const getOrderByNumber = (targetOrderNumber: string) =>
    orderHistory.find((entry) => entry.orderNumber === targetOrderNumber);

  const getTotalPrice = () => {
    return orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const getTotalItems = () => {
    return orderItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getItemQuantity = (id: number) => {
    const item = orderItems.find((i) => i.id === id);
    return item?.quantity || 0;
  };

  return (
    <OrderContext.Provider
      value={{
        orderItems,
        orderPlaced,
        orderNumber,
        orderHistory,
        addToOrder,
        updateQuantity,
        removeItem,
        clearOrder,
        placeOrder,
        resetPlacedOrder,
        getTotalPrice,
        getTotalItems,
        getItemQuantity,
        updateOrderStatus,
        markOrderPaid,
        getOrderByNumber,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within OrderProvider");
  }
  return context;
};
