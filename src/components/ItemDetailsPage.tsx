// components/ItemDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useOrder } from '../contexts/OrderContext';
import { Star, Clock, Minus, Plus } from 'lucide-react';
import BottomNav from './BottomNav';
import Ruppes from '../assets/Ruppes.svg';
import back from "../assets/back.svg";

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
  onNavigateToTracking?: () => void; // Add this prop
}

const ItemDetailPage: React.FC<ItemDetailPageProps> = ({ 
  item, 
  onBack, 
  onNavigateToMenu,
  onNavigateToOrders,
  onNavigateToTracking // Receive the tracking navigation
}) => {
  const { addToOrder, updateQuantity, getItemQuantity, getTotalItems } = useOrder();
  const [quantity, setQuantity] = useState(1);
  const currentQuantity = getItemQuantity(item.id);

  // Sync local quantity with global quantity when component mounts
  useEffect(() => {
    if (currentQuantity > 0) {
      setQuantity(currentQuantity);
    }
  }, [currentQuantity]);

  const handleNavChange = (view: "menu" | "orders" | "track" | "bill") => {
    if (view === 'menu') {
      if (onNavigateToMenu) {
        onNavigateToMenu();
      } else {
        onBack();
      }
    } else if (view === 'orders') {
      if (onNavigateToOrders) {
        onNavigateToOrders();
      }
    } else if (view === 'track') {
      if (onNavigateToTracking) {
        onNavigateToTracking();
      }
    }
  };

  const handleQuantityChange = (type: 'increment' | 'decrement') => {
    if (type === 'increment') {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      updateQuantity(item.id, newQuantity);
    } else if (type === 'decrement' && quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(item.id, newQuantity);
    } else if (type === 'decrement' && quantity === 1) {
      setQuantity(0);
      updateQuantity(item.id, 0);
    }
  };

  const handleAddToOrder = () => {
    if (currentQuantity > 0) {
      // Update to the new quantity
      updateQuantity(item.id, quantity);
    } else {
      // Add new item
      addToOrder({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: quantity,
        image: item.image || ''
      });
    }
    
    // Navigate to tracking page after adding to order
    if (onNavigateToTracking) {
      onNavigateToTracking();
    }
  };

  const isAdded = currentQuantity > 0 || quantity > 0;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-2 pt-9 pb-2 flex justify-between">
        <button onClick={onBack} className="text-2xl font-medium">
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

      {/* Title with underline */}
      <div className="flex justify-center">
        <h1 className="text-[24px] font-bold border-b-4 border-orange-400 pb-1">
          Item Details
        </h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Product Image */}
        <div className="px-5 mt-4 mb-4">
          <div className="w-full h-64 rounded-xl overflow-hidden bg-gray-100">
            {item.image ? (
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
                <span className="text-6xl">🍽️</span>
              </div>
            )}
          </div>
        </div>

        {/* Veg/Non-Veg Indicator */}
        <div className="px-5 mb-2">
          {item.isVeg !== undefined && (
            <div className={`w-4 h-4 rounded-full ${item.isVeg ? 'border-green-500 border-2' : 'border-red-500 border-2'}`}>
              <div className={`w-2 h-2 rounded-full mx-auto mt-0.5 ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
            </div>
          )}
        </div>

        {/* Item Name */}
        <div className="px-5 mb-2">
          <h1 className="text-2xl font-bold text-gray-900">{item.name}</h1>
        </div>

        {/* Price and Rating */}
        <div className="px-5 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <img src={Ruppes} alt="₹" className="w-4 h-4" />
            <span className="text-xl font-semibold text-gray-900">{item.price}</span>
          </div>
          
          {item.rating && (
            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
              <Star size={14} className="text-green-600 fill-green-600" />
              <span className="text-sm font-medium text-green-600">{item.rating}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {item.description && (
          <div className="px-5 mb-4">
            <p className="text-gray-600 leading-relaxed text-sm">
              {item.description}
            </p>
          </div>
        )}

        {/* Time and Additional Info */}
        <div className="px-5 mb-6">
          {item.time && (
            <div className="flex items-center gap-2 text-gray-500">
              <Clock size={16} />
              <span className="text-sm">Time: {item.time}</span>
            </div>
          )}
          {item.calories && (
            <div className="flex items-center gap-2 text-gray-500 mt-2">
              <span className="text-sm">🔥 {item.calories} kcal</span>
            </div>
          )}
        </div>

        {/* Quantity Selector */}
        <div className="px-5 mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Quantity</h3>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white w-fit">
            <button 
              onClick={() => handleQuantityChange('decrement')}
              className="px-4 py-2 hover:bg-gray-100 text-gray-600 transition-colors"
              disabled={quantity <= 0}
            >
              <Minus size={18} strokeWidth={2} />
            </button>
            
            <span className="px-6 py-2 text-base font-medium min-w-[50px] text-center">
              {quantity.toString().padStart(2, '0')}
            </span>

            <button 
              onClick={() => handleQuantityChange('increment')}
              className="px-4 py-2 hover:bg-gray-100 text-gray-600 transition-colors"
            >
              <Plus size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Add to Order Button */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 px-5 py-3 shadow-lg">
        <button 
          onClick={handleAddToOrder}
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
        >
          {isAdded ? `Update Order • ₹${item.price * quantity}` : `Add to Order • ₹${item.price * quantity}`}
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeView="menu" onViewChange={handleNavChange} />
    </div>
  );
};

export default ItemDetailPage;