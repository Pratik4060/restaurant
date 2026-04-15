import React, { useState } from 'react';
import { Star, Minus, Plus } from 'lucide-react';
import { useOrder } from '../contexts/OrderContext';
import BottomNav from './BottomNav';
import Ruppes from '../assets/Ruppes.svg';
import back from '../assets/back.svg';
import alarm from '../assets/alarm-clock 1.svg';
import bell1 from '../assets/bell1.svg';
import blackorder from '../assets/BlackOrder.svg';
import heart from '../assets/heart.svg';

interface ItemDetailPageProps {
  item: {
    id: number;
    name: string;
    price: number;
    rating?: number;
    description?: string;
    time?: string;
    image?: string;
    category?: string;
    isVeg?: boolean;
    isSpicy?: boolean;
    calories?: string;
  };
  onBack: () => void;
  onNavigateToMenu?: () => void;
  onNavigateToOrders?: () => void;
  onNavigateToTracking?: () => void;
}

const ItemDetailPage: React.FC<ItemDetailPageProps> = ({
  item,
  onBack,
  onNavigateToMenu,
  onNavigateToOrders,
  onNavigateToTracking,
}) => {
  const { addToOrder, updateQuantity, getItemQuantity } = useOrder();
  const [draftQuantity, setDraftQuantity] = useState(1);
  const currentQuantity = getItemQuantity(item.id);
  const quantity = currentQuantity > 0 ? currentQuantity : draftQuantity;

  const handleNavChange = (view: 'menu' | 'orders' | 'track' | 'bill') => {
    if (view === 'menu') {
      if (onNavigateToMenu) {
        onNavigateToMenu();
      } else {
        onBack();
      }
    } else if (view === 'orders') {
      onNavigateToOrders?.();
    } else if (view === 'track') {
      onNavigateToTracking?.();
    }
  };

  const handleQuantityChange = (type: 'increment' | 'decrement') => {
    if (type === 'increment') {
      const newQuantity = quantity + 1;
      if (currentQuantity > 0) {
        updateQuantity(item.id, newQuantity);
      } else {
        setDraftQuantity(newQuantity);
      }
      return;
    }

    if (quantity > 1) {
      const newQuantity = quantity - 1;
      if (currentQuantity > 0) {
        updateQuantity(item.id, newQuantity);
      } else {
        setDraftQuantity(newQuantity);
      }
      return;
    }

    if (currentQuantity > 0) {
      updateQuantity(item.id, 0);
    }
  };

  const handleAddToOrder = () => {
    if (currentQuantity > 0) {
      updateQuantity(item.id, quantity);
    } else {
      addToOrder({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity,
        image: item.image || '',
      });
    }

    onNavigateToTracking?.();
  };

  const isAdded = currentQuantity > 0;

  return (
    <div className="montserrat min-h-screen bg-white flex flex-col">
      <div className="px-2 pt-9 pb-2 flex justify-between">
        <button onClick={onBack} className="text-2xl font-medium">
          <img src={back} alt="back" />
        </button>
        <div className="flex gap-3">
          <div className="relative">
            <button type="button" className="text-xl flex gap-4">
              <img src={heart} alt="heart" />
              <img src={bell1} alt="notifications" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <h1 className="text-[24px] font-bold border-b-4 border-orange-400 pb-1">
          {item.name}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        <div className="px-5 mt-4 mb-4 flex justify-center">
          <div className="w-80 h-80 rounded-xl overflow-hidden bg-gray-100">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
                <span className="text-lg font-semibold text-orange-700">No image</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center border border-yellow-500 w-45 gap-2 px-4 py-2 rounded-[14px] font-semibold">
            <span>Price:</span>
            <img src={Ruppes} alt="Rs." className="w-4 h-4" />
            <span className="text-xl">{item.price}</span>
          </div>
        </div>

        <div className="flex justify-end">
          {item.rating && (
            <div className="flex items-center gap-2 px-2 py-1 rounded-lg mr-4">
              <Star className="text-yellow-400" fill="#facc15" />
              <span className="text-[18px] font-medium">{item.rating}</span>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-4">
          {item.description && (
            <div className="px-5 mb-4">
              <p className="text-gray-600 leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          )}
        </div>

        <div className="flex mt-15 justify-between items-center px-5 mb-6">
          {item.time && (
            <div className="flex items-center gap-2 text-black">
              <img src={alarm} alt="alarm" />
              <span className="text-md font-semibold">Time: {item.time}</span>
            </div>
          )}

          <div
            onClick={(event) => event.stopPropagation()}
            className="flex items-center gap-2 bg-white rounded-sm px-3 border border-gray-200 w-40 h-10 justify-between"
          >
            <button
              type="button"
              onClick={() => handleQuantityChange('decrement')}
              className="text-black w-6 h-6 flex items-center justify-center bg-white rounded"
              disabled={quantity <= 0}
            >
              <Minus />
            </button>

            <span className="text-black text-sm font-semibold min-w-[20px]">
              {quantity.toString().padStart(2, '0')}
            </span>

            <button
              type="button"
              onClick={() => handleQuantityChange('increment')}
              className="text-black w-6 h-6 flex items-center justify-center bg-orange-300 rounded"
            >
              <Plus />
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-16 left-0 right-0 bg-white border-gray-200 px-5 py-3 shadow-lg">
        <button
          type="button"
          onClick={handleAddToOrder}
          className="w-full bg-[linear-gradient(119.95deg,#BEA178_9.89%,#56390F_97.57%)] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <span>{isAdded ? 'Update Order' : 'Add to Order'}</span>
          <img
            src={blackorder}
            alt="order"
            className="w-5 h-5 brightness-0 invert"
          />
        </button>
      </div>

      <BottomNav activeView="menu" onViewChange={handleNavChange} />
    </div>
  );
};

export default ItemDetailPage;
