export interface Car {
  id: string;
  name: string;
  category: 'Luxury SUV' | 'Executive Sedan' | 'Elite VIP' | 'Premium Off-Road' | 'Budget Sedan';
  pkrRatePerDay: number;
  features: string[];
  image: string;
  specs: {
    engine: string;
    transmission: string;
    fuel: 'Petrol' | 'Diesel' | 'Hybrid' | 'Diesel/Petrol' | 'Petrol/Diesel' | 'Petrol / Hybrid';
    seats: number;
    withDriverOnly: boolean;
  };
  description: string;
}

export interface BookingDetails {
  carId: string;
  fullName: string;
  phone: string;
  pickupDate: string;
  dropoffDate: string;
  pickupLocation: string;
  destination: string;
  withDriver: boolean;
  notes?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  vehicleRented: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}
