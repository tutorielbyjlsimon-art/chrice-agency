import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Location {
  name: string;
  code: string;
  terminal?: string;
  time: string;
}

export interface Flight {
  id: string;
  airline: string;
  airlineLogo?: string;
  logo?: string;
  tags?: string[];
  departure: Location;
  arrival: Location;
  duration: string;
  price: number;
  currency: string;
  class?: 'Economy' | 'Business' | 'First';
  carbonEmission?: number;
}

export type Currency = 'EUR' | 'USD' | 'GBP' | 'JPY';
const rates: Record<Currency, number> = { EUR: 1, USD: 1.08, GBP: 0.85, JPY: 165 };
const symbols: Record<Currency, string> = { EUR: '€', USD: '$', GBP: '£', JPY: '¥' };

interface BookingState {
  searchParams: any | null;
  selectedFlight: Flight | null;
  passengerInfo: { firstName: string; lastName: string; email: string } | null;
  isOffline: boolean;
  forcePaymentError: boolean;
  currency: Currency;
}

interface BookingContextType {
  state: BookingState;
  setSearchParams: (params: any) => void;
  setSelectedFlight: (flight: Flight) => void;
  setPassengerInfo: (info: any) => void;
  toggleOffline: () => void;
  togglePaymentError: () => void;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceInEur: number) => string;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<BookingState>({
    searchParams: null,
    selectedFlight: null,
    passengerInfo: null,
    isOffline: false,
    forcePaymentError: false,
    currency: 'EUR'
  });

  const setSearchParams = (params: any) => setState(prev => ({ ...prev, searchParams: params }));
  const setSelectedFlight = (flight: Flight) => setState(prev => ({ ...prev, selectedFlight: flight }));
  const setPassengerInfo = (info: any) => setState(prev => ({ ...prev, passengerInfo: info }));
  const toggleOffline = () => setState(prev => ({ ...prev, isOffline: !prev.isOffline }));
  const togglePaymentError = () => setState(prev => ({ ...prev, forcePaymentError: !prev.forcePaymentError }));
  const setCurrency = (c: Currency) => setState(prev => ({ ...prev, currency: c }));

  const formatPrice = (priceInEur: number) => {
    const converted = Math.round(priceInEur * rates[state.currency]);
    return `${converted} ${symbols[state.currency]}`;
  };

  return (
    <BookingContext.Provider value={{ state, setSearchParams, setSelectedFlight, setPassengerInfo, toggleOffline, togglePaymentError, setCurrency, formatPrice }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within BookingProvider');
  return context;
};
