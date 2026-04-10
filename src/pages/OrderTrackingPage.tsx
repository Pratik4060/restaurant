import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChefHat, Bell, ChevronLeft } from "lucide-react";
import BottomNav from "../components/BottomNav";

interface TrackOrderPageProps {
  onBack: () => void;
  onViewChange: (view: "menu" | "orders" | "track" | "bill") => void;
  orderPlaced: boolean;
  orderNumber?: string;
  estimatedTime?: string;
  onReadyComplete?: () => void;
}


const TrackOrderPage: React.FC<TrackOrderPageProps> = ({
  onBack,
  onViewChange,
  orderPlaced,
  orderNumber,
  estimatedTime = "15-20",
  onReadyComplete,
}) => {
  // 0: Accepted, 1: Preparing, 2: Ready
  const [currentStep, setCurrentStep] = useState(0);
  const [animationStarted, setAnimationStarted] = useState(false);

  // Steps configuration
  const steps = [
    { id: 0, label: "Accepted" },
    { id: 1, label: "Preparing" },
    { id: 2, label: "Ready" },
  ];

  // Automatic transition through steps after user lands on page
  useEffect(() => {
    if (!orderPlaced) return;

    // Small delay before starting the animation for better UX
    const startTimer = setTimeout(() => {
      setAnimationStarted(true);
    }, 500);

    return () => clearTimeout(startTimer);
  }, [orderPlaced]);

  useEffect(() => {
    if (!animationStarted || !orderPlaced) return;

    // Step 0 -> Step 1 after 2 seconds
    const step1Timer = setTimeout(() => {
      setCurrentStep(1);
    }, 2000);

    // Step 1 -> Step 2 after 2.5 seconds
    const step2Timer = setTimeout(() => {
      setCurrentStep(2);
    }, 4500);

    return () => {
      clearTimeout(step1Timer);
      clearTimeout(step2Timer);
    };
  }, [animationStarted]);

useEffect(() => {
  if (!orderPlaced || currentStep !== 2 || !onReadyComplete) return;

  const billTimer = setTimeout(() => {
    onReadyComplete();
  }, 1200);

  return () => clearTimeout(billTimer);
}, [currentStep, orderPlaced, onReadyComplete]);

  // Helper function to get status text and styling for each step
  const getStepStatus = (stepId: number) => {
    // Accepted step (index 0) - Always shows "Completed" with green background
    if (stepId === 0) {
      return {
        subLabel: "Completed",
        statusTextClass: "text-green-500",
        labelClass: "text-gray-800",
      };
    }

    // Preparing step (index 1)
    if (stepId === 1) {
      if (currentStep >= 1) {
        // When Preparing is active, show "In Progress..."
        return {
          subLabel: "In Progress...",
          statusTextClass: "text-orange-500",
          labelClass: "text-gray-800",
        };
      } else {
        // Pending state
        return {
          subLabel: "Preparing",
          statusTextClass: "text-gray-400",
          labelClass: "text-gray-300",
        };
      }
    }

    // Ready step (index 2)
    if (stepId === 2) {
      if (currentStep >= 2) {
        // When Ready is active, show "In Progress..."
        return {
          subLabel: "In Progress...",
          statusTextClass: "text-red-500",
          labelClass: "text-gray-800",
        };
      } else {
        // Pending state
        return {
          subLabel: "Ready",
          statusTextClass: "text-gray-400",
          labelClass: "text-gray-300",
        };
      }
    }

    return {
      subLabel: "",
      statusTextClass: "text-gray-400",
      labelClass: "text-gray-300",
    };
  };

  // Get icon background color class based on step - matching the image exactly
  const getIconBgClass = (stepId: number) => {
    // Accepted - always green
    if (stepId === 0) {
      return "bg-green-500 text-white";
    }

    // Preparing - orange when active or past (always orange in the image)
    if (stepId === 1 && currentStep >= 1) {
      return "bg-orange-500 text-white";
    }

    // Ready - RED when active (as shown in the image)
    if (stepId === 2 && currentStep >= 2) {
      return "bg-red-500 text-white";
    }

    // Pending state - gray
    return "bg-gray-100 text-gray-300";
  };

  // Animation variants for text transitions
  const textVariant = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  };

  // Get icon component based on step
  const getIcon = (stepId: number) => {
    switch (stepId) {
      case 0:
        return CheckCircle;
      case 1:
        return ChefHat;
      case 2:
        return Bell;
      default:
        return CheckCircle;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans select-none">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 flex justify-between items-center">
        <button onClick={onBack} className="p-1">
          <ChevronLeft size={28} className="text-gray-700" />
        </button>
        <button className="p-2">
          <Bell size={24} className="text-gray-700" />
        </button>
      </div>

      <div className="flex flex-col items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Order Status</h1>
        <div className="w-24 h-1 bg-orange-400 mt-1 rounded-full" />
      </div>

      <div className="flex-1 px-6">
        {!orderPlaced ? (
          <div className="max-w-sm mx-auto mt-16 border border-orange-200 rounded-[32px] p-6 text-center shadow-sm bg-white">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              No order yet
            </h2>
            <p className="text-gray-500 text-sm font-medium">
              Place an order first to track it.
            </p>
          </div>
        ) : (
          <>
            <p className="text-center text-gray-400 font-medium mb-6">
              We'll notify you when your order is ready!
            </p>

            {/* Tracking Card - matches the design from images */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="border border-orange-200 rounded-[32px] p-6 max-w-sm mx-auto shadow-sm bg-white"
            >
              <div className="text-center mb-8">
                <h2 className="text-xl font-bold text-gray-900">
                  Order#{orderNumber || "12"}
                </h2>
                <p className="text-gray-500 text-sm font-medium">5 items</p>
              </div>

              <div className="relative space-y-8">
                {steps.map((step, idx) => {
                  const Icon = getIcon(step.id);
                  const status = getStepStatus(step.id);
                  const isActive = currentStep === step.id;
                  const iconBgClass = getIconBgClass(step.id);

                  return (
                    <div
                      key={step.id}
                      className="flex items-start gap-4 relative"
                    >
                      {/* Connecting Line */}
                      {idx < steps.length - 1 && (
                        <div className="absolute left-5 top-10 w-[4px] h-12 bg-gray-300">
                          <motion.div />
                        </div>
                      )}

                      {/* Icon Node with smooth transitions */}
                      <motion.div
                        initial={false}
                        animate={{
                          scale: isActive ? 1.1 : 1,
                        }}
                        transition={{
                          duration: 0.3,
                          type: "spring",
                          stiffness: 400,
                        }}
                        className={`w-11 h-11 rounded-full flex items-center justify-center z-10 shadow-sm transition-all duration-300 ${iconBgClass}`}
                      >
                        <Icon size={22} strokeWidth={1.8} />
                      </motion.div>

                      {/* Text Section with AnimatePresence for smooth sublabel changes */}
                      <div className="flex flex-col justify-center flex-1">
                        <motion.p
                          initial={false}
                          animate={{
                            color:
                              step.id === 0 ||
                              (step.id === 1 && currentStep >= 1) ||
                              (step.id === 2 && currentStep >= 2)
                                ? "#1f2937"
                                : "#d1d5db",
                          }}
                          transition={{ duration: 0.3 }}
                          className="text-lg font-bold leading-tight"
                        >
                          {step.label}
                        </motion.p>
                        <AnimatePresence mode="wait">
                          <motion.p
                            key={`${step.id}-${status.subLabel}`}
                            variants={textVariant}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.25 }}
                            className={`text-xs font-semibold ${status.statusTextClass}`}
                          >
                            {status.subLabel}
                          </motion.p>
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}

                {/* Estimated Time Section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="pt-6 border-t border-gray-100 flex items-center justify-center gap-2"
                >
                  <span className="text-gray-400 text-sm font-medium">
                    Estimated time
                  </span>
                  <span className="text-orange-500 text-lg font-bold">
                    {estimatedTime} Mins
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </div>

      <BottomNav activeView="track" onViewChange={onViewChange} />
    </div>
  );
};

export default TrackOrderPage;
