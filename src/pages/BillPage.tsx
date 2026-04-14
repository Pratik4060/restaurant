import React, { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import BottomNav from "../components/BottomNav";
import { useOrder } from "../contexts/OrderContext";
import bell from "../assets/bell.svg";
import Ruppes from "../assets/Ruppes.svg";
import bill1 from "../assets/bill1.svg";
import PaymentMethodButton from "../components/payment/PaymentMethodButton";
import UPIPaymentPanel from "../components/payment/UPIPaymentPanel";
import CardPaymentPanel from "../components/payment/CardPaymentPanel";
import CashPaymentPanel from "../components/payment/CashPaymentPanel";
import PaymentSuccessPage from "./PaymentSuccessPage";
import scan from "../assets/scan.svg";
import counter from "../assets/counter.svg";

interface BillPageProps {
  onBack: () => void;
  onViewChange: (view: "menu" | "orders" | "track" | "bill") => void;
  orderPlaced: boolean;
  tableNumber: string;
  orderNumber?: string;
}

type PaymentMethod = "upi" | "card" | "cash" | null;

const PAYMENT_API_BASE = `${window.location.protocol}//${window.location.hostname}:3001`;

const BillPage: React.FC<BillPageProps> = ({
  onBack,
  onViewChange,
  orderPlaced,
  tableNumber,
  orderNumber = "1234",
}) => {
  const { orderItems, getTotalPrice, clearOrder, resetPlacedOrder, markOrderPaid } = useOrder();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [paid, setPaid] = useState(false);

  const subtotal = getTotalPrice();
  const gst = Math.round(subtotal * 0.05);
  const totalAmount = subtotal + gst;

  useEffect(() => {
    if (!paymentMethod || !orderPlaced) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${PAYMENT_API_BASE}/api/payments/${orderNumber}`);
        const data = await res.json();

        if (data?.paid) {
          markOrderPaid(orderNumber);
          setPaid(true);
          clearInterval(interval);
        }
      } catch {
        // ignore polling errors for now
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [markOrderPaid, orderNumber, orderPlaced, paymentMethod]);

  const startPaymentRecord = async () => {
    try {
      await fetch(`${PAYMENT_API_BASE}/api/payments/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber, tableNumber }),
      });
    } catch {
      // ignore for now
    }
  };

  if (paid) {
    return (
      <PaymentSuccessPage
        orderNumber={orderNumber}
        tableNumber={tableNumber}
        onBack={() => {
          clearOrder();
          resetPlacedOrder();
          setPaid(false);
          setPaymentMethod(null);
        }}
        onViewChange={onViewChange}
      />
    );
  }

  if (paymentMethod === "upi") {
    return (
      <UPIPaymentPanel
        orderNumber={orderNumber}
        tableNumber={tableNumber}
        onBack={() => setPaymentMethod(null)}
      />
    );
  }

  if (paymentMethod === "card") {
    return (
      <CardPaymentPanel
        orderNumber={orderNumber}
        tableNumber={tableNumber}
        onBack={() => setPaymentMethod(null)}
        onPaid={async () => {
          await fetch(`${PAYMENT_API_BASE}/api/payments/${orderNumber}/paid`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tableNumber }),
          });
          markOrderPaid(orderNumber);
          setPaid(true);
        }}
      />
    );
  }

  if (paymentMethod === "cash") {
    return (
      <CashPaymentPanel
        orderNumber={orderNumber}
        tableNumber={tableNumber}
        onBack={() => setPaymentMethod(null)}
      />
    );
  }

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
                  <div className="w-20 h-20 rounded-[22px] bg-white shadow-sm flex items-center justify-center mb-4">
                    <img src={bill1} alt="bill" />
                  </div>

                  <h2 className="text-lg font-semibold text-black">
                    Order Summary
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Order #{orderNumber} - Table #{tableNumber}
                  </p>
                </div>

                <div className="my-6 flex justify-center">
                  <img src={bill1} alt="bill" />
                </div>

                <div className="pt-4 space-y-3">
                  {orderItems.length === 0 ? (
                    <p className="text-center text-gray-400 text-sm">
                      No items added yet
                    </p>
                  ) : (
                    <>
                      <div className="flex items-center justify-between border-b border-dashed border-gray-800">
                        <p className="text-xl text-gray font-medium w-1/2">Item</p>
                        <p className="text-xl text-gray font-medium w-1/4 text-center">Qty</p>
                        <p className="text-xl text-gray font-medium w-1/4 text-right">Price</p>
                      </div>

                      {orderItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <p className="text-sm text-gray-800 w-1/2">{item.name}</p>
                          <p className="text-sm text-gray-600 w-1/4 text-center">
                            {item.quantity}
                          </p>
                          <div className="flex items-center justify-end gap-1 w-1/4">
                            <img src={Ruppes} alt="rupees" className="w-3.5 h-3.5" />
                            <span className="text-sm text-gray-800">
                              {(item.price * item.quantity).toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      ))}
                    </>
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
                  <PaymentMethodButton
                    icon={scan}
                    label="UPI"
                    onClick={async () => {
                      setPaymentMethod("upi");
                      await startPaymentRecord();
                    }}
                  />

                  <PaymentMethodButton
                    icon={scan}
                    label="Card"
                    onClick={async () => {
                      setPaymentMethod("card");
                      await startPaymentRecord();
                    }}
                  />

                  <PaymentMethodButton
                    icon={counter}
                    label="Pay at Counter / Cash"
                    onClick={() => setPaymentMethod("cash")}
                  />
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
