import React, { useState, useEffect } from 'react';
import QRScanner from './pages/QRScanner';
import LoadingAnim from './pages/LoadingAnim';
import DetailsForm from './pages/DetailsForm';
import Home from './pages/HomePage';
import BreakfastDetails from './pages/BreakfastDetails';
import type{ AppStep, UserData, MealCategory } from './types';
import LunchMenuDetails from './pages/LunchMenuDetails';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('scanner');
  const [userData, setUserData] = useState<UserData>({
    name: '',
    mobile: '',
    guests: '1',
    table: '12'
  });
  const [selectedCategory, setSelectedCategory] = useState<MealCategory>('Breakfast');

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
      {step === 'scanner' && <QRScanner onScan={onScanSuccess} />}
      {step === 'loading' && <LoadingAnim />}
      {step === 'form' && <DetailsForm onSubmit={handleFormSubmit} />}
      {step === 'home' && (
        <Home 
          user={userData} 
          onSelect={(cat: MealCategory) => { 
            setSelectedCategory(cat); 
            setStep('menu'); 
          }} 
        />
      )}
      {step === 'menu' && selectedCategory === 'Breakfast' && (
        <BreakfastDetails 
          category={selectedCategory} 
          userName={userData.name}
          onBack={() => setStep('home')} 
        />
      )}
      { step === 'menu' && selectedCategory === 'Lunch' && (
          <LunchMenuDetails 
           category={selectedCategory}
           userName={userData.name}
          onBack={() => setStep('home')} 
          />
        )}
    </div>
  );
};

export default App;
