// components/OrderCard.tsx
import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import Ruppes from '../assets/Ruppes.svg';

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
  category?: string;
}

interface OrderCardProps {
  item: OrderItem;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onRemove?: (id: number) => void;
  variant?: 'default' | 'compact' | 'detailed';
  showRemoveButton?: boolean;
  className?: string;
}

const OrderCard: React.FC<OrderCardProps> = ({ 
  item, 
  onIncrement, 
  onDecrement, 
  onRemove,
  variant = 'default',
  showRemoveButton = true,
  className = ''
}) => {
  const { id, name, price, quantity, image,  } = item;

  const getCardDimensions = () => {
    switch(variant) {
      case 'compact':
        return {
          container: 'p-3',
          image: 'w-16 h-16',
          title: 'text-base',
          price: 'text-sm',
          buttonSize: 'w-7 h-7',
          iconSize: 14
        };
      case 'detailed':
        return {
          container: 'p-5',
          image: 'w-28 h-28',
          title: 'text-xl',
          price: 'text-lg',
          buttonSize: 'w-9 h-9',
          iconSize: 18
        };
      default:
        return {
          container: 'p-4',
          image: 'w-20 h-20',
          title: 'text-lg',
          price: 'text-base',
          buttonSize: 'w-8 h-8',
          iconSize: 16
        };
    }
  };

  const dimensions = getCardDimensions();

  return (
    <div className={`bg-[#F7F7F7] rounded-xl border border-[#C9C9C9] ${dimensions.container} ${className}`}>
      <div className="flex items-center gap-4">
        {/* Product Image - Only show if image exists */}
        {image && (
          <div className={`${dimensions.image} flex-shrink-0`}>
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}

        {/* Item Details */}
        <div className="flex-1 min-w-0">
          <h3 className={`${dimensions.title} font-semibold text-gray-900 truncate`}>
            {name}
          </h3>
          
          
          <div className="flex items-center gap-1 mt-2">
            <img src={Ruppes} alt="₹" className="w-3.5 h-3.5" />
            <span className={`${dimensions.price} text-gray-700`}>{price}</span>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex flex-col items-end gap-2">
          {/* Remove Button */}
          {showRemoveButton && onRemove && (
            <button 
              onClick={() => onRemove(id)}
              className="text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors"
              aria-label="Remove item"
            >
              <Trash2 size={dimensions.iconSize} />
            </button>
          )}

          {/* Quantity Controller */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
            <button 
              onClick={() => onDecrement(id)}
              className={`px-3 py-1.5 hover:bg-gray-100 text-gray-600 transition-colors`}
              aria-label="Decrease quantity"
            >
              <Minus size={dimensions.iconSize} strokeWidth={2} />
            </button>
            
            <span className={`px-3 py-1 text-base font-medium min-w-[40px] text-center`}>
              {quantity.toString().padStart(2, '0')}
            </span>

            <button 
              onClick={() => onIncrement(id)}
              className={`px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white transition-colors`}
              aria-label="Increase quantity"
            >
              <Plus size={dimensions.iconSize} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;