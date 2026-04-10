import React from "react";
import { ChevronLeft } from "lucide-react";
import BottomNav from "../components/BottomNav";
import { useOrder } from "../contexts/OrderContext";
import bell from "../assets/bell.svg";
import Ruppes from "../assets/Ruppes.svg";

interface BillPageProps {
  onBack: () => void;
  onViewChange: (view: "menu" | "orders" | "track" | "bill") => void;
  orderPlaced: boolean;
  tableNumber?: string;
  orderNumber?: string;
}

const BillPage: React.FC<BillPageProps> = ({
  onBack,
  onViewChange,
  orderPlaced,
  tableNumber = "12",
  orderNumber = "1234",
}) => {
  const { orderItems, getTotalPrice } = useOrder();

  const subtotal = getTotalPrice();
  const gst = Math.round(subtotal * 0.05);
  const totalAmount = subtotal + gst;

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex flex-col">
      <div className="px-4 pt-12 pb-4 flex justify-between items-center">
        <button onClick={onBack} className="p-1">
          <ChevronLeft size={28} className="text-gray-700" />
        </button>

        <h1 className="text-[24px] font-semibold text-black border-b-4 border-orange-400 pb-1">
          Payment
        </h1>

        <button className="p-1">
          <img src={bell} alt="bell" className="h-6 w-6 invert" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-28">
        <div className="max-w-sm mx-auto">
          {!orderPlaced ? (
            <div className="bg-white rounded-[28px] border border-orange-200 shadow-sm px-5 py-10 mt-16 text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                No bill available
              </h2>
              <p className="text-sm text-gray-500 font-medium">
                Place an order first to view the bill.
              </p>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-[28px] border border-orange-200 shadow-sm px-5 py-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-[22px] bg-[#F6F6F6] shadow-sm flex items-center justify-center mb-4">
                    <span className="text-orange-500 font-bold text-lg">
                      Zonix
                    </span>
                  </div>

                  <h2 className="text-lg font-semibold text-black">
                    Order Summary
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Order #{orderNumber} • Table #{tableNumber}
                  </p>
                </div>

                <div className="my-6 flex justify-center">
                  <div className="w-28 h-28 rounded-full bg-[#D9DDF8] relative flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center rotate-[-12deg]">
                      <div className="text-center">
                        <p className="text-[10px] text-gray-500 font-semibold">
                          Receipt
                        </p>
                        <img
                          src={Ruppes}
                          alt="rupees"
                          className="w-4 h-4 mx-auto mt-1"
                        />
                      </div>
                    </div>
                    <div className="absolute right-2 top-2 w-7 h-7 rounded-full bg-[#4A3A2A]" />
                  </div>
                </div>

                <div className="border-t border-dashed border-gray-300 pt-4 space-y-4">
                  {orderItems.length === 0 ? (
                    <p className="text-center text-gray-400 text-sm">
                      No items added yet
                    </p>
                  ) : (
                    orderItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start justify-between gap-4"
                      >
                        <div className="flex-1">
                          <p className="text-sm text-gray-800 leading-5">
                            • {item.name} x {item.quantity}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <img
                            src={Ruppes}
                            alt="rupees"
                            className="w-3.5 h-3.5"
                          />
                          <span className="text-sm text-gray-800">
                            {(item.price * item.quantity).toLocaleString(
                              "en-IN",
                            )}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="border-t border-dashed border-gray-300 mt-6 pt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Subtotal</span>
                    <div className="flex items-center gap-1 text-sm text-gray-700">
                      <img src={Ruppes} alt="rupees" className="w-3.5 h-3.5" />
                      <span>{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">GST(5) %</span>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <img
                        src={Ruppes}
                        alt="rupees"
                        className="w-3.5 h-3.5 opacity-50"
                      />
                      <span>{gst.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <span className="text-base font-semibold text-[#18B65B]">
                      Total Amount
                    </span>
                    <div className="flex items-center gap-1 text-base font-semibold text-[#18B65B]">
                      <img src={Ruppes} alt="rupees" className="w-4 h-4" />
                      <span>{totalAmount.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[24px] mt-5 px-4 py-5 border border-gray-100 shadow-sm">
                <h3 className="text-sm font-semibold text-black mb-4">
                  Select The Payment Method
                </h3>

                <div className="space-y-4">
                  <button className="w-full rounded-2xl bg-[#EFEFEF] px-4 py-4 flex items-center gap-3 text-left">
                    <div className="w-8 h-8 rounded-lg bg-[#FFB129] flex items-center justify-center text-white text-xs font-bold">
                      QR
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      UPI
                    </span>
                  </button>

                  <button className="w-full rounded-2xl bg-[#EFEFEF] px-4 py-4 flex items-center gap-3 text-left">
                    <div className="w-8 h-8 rounded-lg bg-[#FFB129] flex items-center justify-center text-white text-xs font-bold">
                      CC
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      Card
                    </span>
                  </button>

                  <button className="w-full rounded-2xl bg-[#EFEFEF] px-4 py-4 flex items-center gap-3 text-left">
                    <div className="w-8 h-8 rounded-lg bg-[#FFB129] flex items-center justify-center text-white text-xs font-bold">
                      ₹
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      Pay at Counter / Cash
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <BottomNav activeView="bill" onViewChange={onViewChange} />
    </div>
  );
};

export default BillPage;
