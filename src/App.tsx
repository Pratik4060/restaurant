import React, { useState, useEffect } from 'react';
import QRScanner from './pages/QRScanner';
import LoadingAnim from './pages/LoadingAnim';
import DetailsForm from './pages/DetailsForm';
import Home from './pages/HomePage';
import BreakfastDetails from './pages/BreakfastDetails';
import type{ AppStep, UserData, MealCategory, FoodType } from './types';
import LunchMenuDetails from './pages/LunchMenuDetails';
import { useOrder } from './contexts/OrderContext';

const App: React.FC = () => {
  const { clearOrder, resetPlacedOrder } = useOrder();
  const [step, setStep] = useState<AppStep>('scanner');
  const [userData, setUserData] = useState<UserData>({
    name: '',
    mobile: '',
    guests: '1',
    table: '12'
  });
  const [selectedCategory, setSelectedCategory] = useState<MealCategory>('Breakfast');
const [selectedFoodType, setSelectedFoodType] = useState<FoodType>("Veg");

  const onScanSuccess = (): void => setStep('loading');

  useEffect(() => {
    if (step === 'loading') {
      const timer = setTimeout(() => setStep('form'), 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleFormSubmit = (data: UserData): void => {
    setUserData(data);
    setStep('home');
  };

  return (
    <div className="min-h-screen w-full">
      {step === "scanner" && <QRScanner onScan={onScanSuccess} />}
      {step === "loading" && <LoadingAnim />}
      {step === "form" && <DetailsForm onSubmit={handleFormSubmit} />}
      {step === "home" && (
        <Home
          user={userData}
          foodType={selectedFoodType}
          onFoodTypeChange={setSelectedFoodType}
          onSelect={(cat: MealCategory) => {
            clearOrder();
            resetPlacedOrder();
            setSelectedCategory(cat);
            setStep("menu");
          }}
        />
      )}
      {step === "menu" && selectedCategory === "Breakfast" && (
        <BreakfastDetails
          key={`${selectedCategory}-${selectedFoodType}`}
          category={selectedCategory}
          userName={userData.name}
          foodType={selectedFoodType}
          onBack={() => setStep("home")}
        />
      )}
      {step === "menu" &&
        (selectedCategory === "Lunch" || selectedCategory === "Dinner") && (
          <LunchMenuDetails
            key={`${selectedCategory}-${selectedFoodType}`}
            category={selectedCategory}
            userName={userData.name}
            foodType={selectedFoodType}
            onBack={() => setStep("home")}
          />
        )}
    </div>
  );
};

export default App;
