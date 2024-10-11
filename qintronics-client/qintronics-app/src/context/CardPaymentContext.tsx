import React, { createContext, useState, useContext } from 'react';

interface CardData {
  cardHolderName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

interface CardPaymentContextProps {
  cardData: CardData;
  setCardData: React.Dispatch<React.SetStateAction<CardData>>;
  handleSubmit: (
    cardHolderName: string,
    cardNumber: string,
    expirationDate: string,
    cvv: string
  ) => void;
  orderAmount: number;
}

const CardPaymentContext = createContext<CardPaymentContextProps | undefined>(undefined);

export const CardPaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cardData, setCardData] = useState<CardData>({
    cardHolderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });
  const [orderAmount] = useState(0);

  const handleSubmit = (
    cardHolderName: string,
    cardNumber: string,
    expirationDate: string,
    cvv: string
  ) => {
    console.log(`Card Holder Name: ${cardHolderName}`);
    console.log(`Card Number: ${cardNumber}`);
    console.log(`Expiration Date: ${expirationDate}`);
    console.log(`CVV: ${cvv}`);
  };

  return (
    <CardPaymentContext.Provider
      value={{ cardData, setCardData, handleSubmit, orderAmount }}
    >
      {children}
    </CardPaymentContext.Provider>
  );
};

export const useCardPayment = () => {
  const context = useContext(CardPaymentContext);
  if (!context) {
    throw new Error('useCardPayment must be used within a CardPaymentProvider');
  }
  return context;
};
