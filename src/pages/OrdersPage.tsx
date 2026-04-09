// pages/OrderPage.tsx
import React from 'react';
import { useOrder } from '../contexts/OrderContext';
import Ruppes from '../assets/Ruppes.svg';
import back from "../assets/back.svg";

interface OrderPageProps {
  onBack: () => void;
  onConfirmOrder: () => void;
}

const OrderPage: React.FC<OrderPageProps> = ({ onBack, onConfirmOrder }) => {
  const { orderItems, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useOrder();

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  if (orderItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="px-4 pt-9 pb-2 flex items-center gap-4">
          <button onClick={onBack}>
            <img src={back} alt="back" className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">My Order</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400">Your order is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 pt-9 pb-2 flex items-center gap-4">
        <button onClick={onBack}>
          <img src={back} alt="back" className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold">My Order</h1>
      </div>

      {/* Search and items count */}
      <div className="px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="relative flex-1 mr-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full border rounded-lg py-2 px-4 text-sm"
            />
          </div>
          <span className="text-sm text-gray-500">{getTotalItems()} items</span>
        </div>
      </div>

      {/* Order Items List */}
      <div className="flex-1 px-4 space-y-3 overflow-y-auto pb-28">
        {orderItems.map((item) => (
          <div key={item.id} className="bg-[#F7F7F7] rounded-xl p-4 border border-[#C9C9C9]">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-base">{item.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <img src={Ruppes} alt="₹" className="w-3.5 h-3.5" />
                  <span className="text-sm">{item.price}</span>
                </div>
              </div>
              
              {/* Quantity controls */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-lg"
                >
                  −
                </button>
                <span className="text-base font-semibold min-w-[30px] text-center">
                  {item.quantity.toString().padStart(2, '0')}
                </span>
                <button 
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-lg"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer with total and confirm button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-600">Total</span>
          <span className="text-xl font-bold flex items-center gap-1">
            <img src={Ruppes} alt="₹" className="w-4 h-4" />
            {getTotalPrice()}
          </span>
        </div>
        <button 
          onClick={onConfirmOrder}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default OrderPage;