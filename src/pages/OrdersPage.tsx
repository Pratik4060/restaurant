// OrdersPage.tsx
import React from 'react';
import { useOrder } from '../contexts/OrderContext';
import OrderCard from '../components/Ordercard';
import BottomNav from '../components/BottomNav';
import back from "../assets/back.svg";
import search from "../assets/search.svg";
import microphone from "../assets/microphone.svg";
import Ruppes from '../assets/Ruppes.svg';
import bell from '../assets/bell.svg'


interface OrderPageProps {
  onBack: () => void;
  onConfirmOrder: () => void;
  onViewChange: (view: 'menu' | 'orders' | 'track' | 'bill') => void;
}

const OrderPage: React.FC<OrderPageProps> = ({ onBack, onConfirmOrder,onViewChange }) => {
  const { orderItems, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useOrder();

  const handleIncrement = (id: number) => {
    const item = orderItems.find(item => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const handleDecrement = (id: number) => {
    const item = orderItems.find(item => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    } else if (item && item.quantity === 1) {
      removeItem(id);
    }
  };

  const handleRemove = (id: number) => {
    removeItem(id);
  };

  const handleConfirmClick = () => {
    console.log('Order confirmed with items:', orderItems);
    onConfirmOrder(); // Call the parent's confirm handler to navigate to tracking
  };

  if (orderItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#ECECEC];
;
 flex flex-col">
        <div className="px-2 pt-9 pb-2 flex justify-between">
          <button onClick={onBack}>
            <img src={back} alt="back" />
          </button>
          <div className="flex gap-3">
            <div className="relative">
              <button className="text-xl">🛒</button>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <h1 className="text-[24px] font-bold border-b-4 border-orange-400 pb-1">
            My Order
          </h1>
        </div>

        <div className="px-5 py-3">
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              <img src={search} alt="search" className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search your order"
              className="w-full border-b py-2 pl-10 pr-10 text-sm focus:outline-none focus:border-orange-400"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2">
              <img src={microphone} alt="microphone" className="w-4 h-4" />
            </span>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center pb-20">
          <p className="text-gray-400">Your order is empty</p>
        </div>

<BottomNav activeView="orders" onViewChange={onViewChange} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECECEC] flex flex-col">
      <div className="px-2 pt-9 pb-2 flex justify-between">
        <button onClick={onBack}>
          <img src={back} alt="back" />
        </button>
        <div className="flex gap-3">
          <div className="relative">
            <button className="text-xl">
              <img src={bell} alt="bell" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <h1 className="text-[24px]  montserrat font-bold border-b-4 border-orange-400 pb-1">
          My Order
        </h1>
      </div>

      <div className="px-5 py-3">
        <div className="relative w-full  bg-white rounded-xl">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 ">
            <img src={search} alt="search" className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search  "
            className="w-full montserrat  py-3 pl-10 pr-10 text-sm focus:outline-none placeholder:text-black "
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            <img src={microphone} alt="microphone" className="w-4 h-4" />
          </span>
        </div>
      </div>

      <div className="px-7 py-6 ">
        <div className="flex justify-start ">
          <span className=" montserrat text-sm text-black font-semibold">{getTotalItems()} items</span>
        </div>
      </div>

      <div className="flex-1 px-5 py-3 overflow-y-auto pb-32">
        {orderItems.map((item) => (
          <OrderCard
            key={item.id}
            item={item}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onRemove={handleRemove}
            variant="default"
            showRemoveButton={true}
          />
        ))}
      </div>

{/* Footer with GST and Total calculation */}
      <div className=" montserrat fixed bottom-16 left-0 right-0 bg-[#F2F7FA] border-t-1 border-orange-400 rounded-t-[40px] px-10 py-6 ">
        
        {/* GST Section */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400 font-medium text-lg">GST(5) %</span>
          <div className="flex items-center gap-1 text-gray-400">
            <img src={Ruppes} alt="₹" className="w-4 h-4 opacity-40" />
            <span className="text-xl font-medium">
              {(getTotalPrice() * 0.05).toFixed(0)}
            </span>
          </div>
        </div>

        {/* Total Section */}
        <div className="flex justify-between items-center mb-6 ">
          <span className="text-black font-bold text-xl">Total</span>
          <div className="flex items-center gap-1 text-black">
            <img src={Ruppes} alt="₹" className="w-5 h-5" />
            <span className="text-2xl font-extrabold">
              {(getTotalPrice() * 1.05).toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Confirm Order Button */}
        <button 
          onClick={handleConfirmClick}
          className="w-full bg-[#FF9F29] text-black py-4 rounded-2xl font-semibold text-xl shadow-lg shadow-orange-100 active:scale-[0.98] transition-all"
        >
          Confirm Order
        </button>
      </div>

<BottomNav activeView="orders" onViewChange={onViewChange} />
    </div>
  );
};

export default OrderPage;