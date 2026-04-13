import React, { useEffect, useState } from 'react';
import QRScanner from './pages/QRScanner';
import LoadingAnim from './pages/LoadingAnim';
import DetailsForm from './pages/DetailsForm';
import Home from './pages/HomePage';
import BreakfastDetails from './pages/BreakfastDetails';
import LunchMenuDetails from './pages/LunchMenuDetails';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import type { AppStep, UserData, MealCategory, FoodType } from './types';
import { useOrder } from './contexts/OrderContext';

const getTableNumberFromUrl = (): string => {
  const params = new URLSearchParams(window.location.search);
  const rawTable = params.get('table') ?? '';
  const digits = rawTable.replace(/\D/g, '');
  return digits || '12';
};

const App: React.FC = () => {
  const { clearOrder, resetPlacedOrder } = useOrder();
  const params = new URLSearchParams(window.location.search);

  const isPaymentSuccess = params.get('payment') === 'success';
  const isQrEntry = params.has('table');

  const tableNumber = getTableNumberFromUrl();
  const [step, setStep] = useState<AppStep>(
    isQrEntry ? 'loading' : 'scanner'
  );

  const [userData, setUserData] = useState<UserData>({
    name: '',
    mobile: '',
    guests: '1',
    table: tableNumber,
  });

  const [selectedCategory, setSelectedCategory] = useState<MealCategory>('Breakfast');
  const [selectedFoodType, setSelectedFoodType] = useState<FoodType>('Veg');

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

  const onScanSuccess = (): void => setStep('loading');

  if (isPaymentSuccess) {
    return (
      <PaymentSuccessPage
        orderNumber={params.get('order') || '1234'}
        tableNumber={userData.table}
        onBack={() => {
          window.location.href = '/';
        }}
        onViewChange={() => {}}
      />
    );
  }


  return (
    <div className="min-h-screen w-full">
      {step === 'scanner' && <QRScanner onScan={onScanSuccess} />}
      {step === 'loading' && <LoadingAnim />}
      {step === 'form' && (
        <DetailsForm onSubmit={handleFormSubmit} tableNumber={tableNumber} />
      )}

      {step === 'home' && (
        <Home
          user={userData}
          foodType={selectedFoodType}
          onFoodTypeChange={setSelectedFoodType}
          onSelect={(cat: MealCategory) => {
            clearOrder();
            resetPlacedOrder();
            setSelectedCategory(cat);
            setStep('menu');
          }}
        />
      )}

      {step === 'menu' && selectedCategory === 'Breakfast' && (
        <BreakfastDetails
          key={`${selectedCategory}-${selectedFoodType}`}
          category={selectedCategory}
          userName={userData.name}
          foodType={selectedFoodType}
          onBack={() => setStep('home')}
        />
      )}

      {step === 'menu' &&
        (selectedCategory === 'Lunch' || selectedCategory === 'Dinner') && (
          <LunchMenuDetails
            key={`${selectedCategory}-${selectedFoodType}`}
            category={selectedCategory}
            userName={userData.name}
            foodType={selectedFoodType}
            onBack={() => setStep('home')}
          />
        )}
    </div>
  );
};

export default App;
