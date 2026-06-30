import { Car, Review, FAQ } from './types';

export const FLEET: Car[] = [
  {
    id: 'honda-city',
    name: 'Honda City',
    category: 'Budget Sedan',
    pkrRatePerDay: 6000,
    features: [
      '4-Seater Comfort',
      'Professional Driver Service',
      'Fuel Cost Excluded',
      'Clean white sedan parked indoors',
      'Ideal for comfortable city travel & business trips'
    ],
    image: '/src/assets/images/honda_city_white_1782839333991.jpg',
    specs: {
      engine: '1.2L i-VTEC',
      transmission: 'CVT Automatic',
      fuel: 'Petrol',
      seats: 4,
      withDriverOnly: true
    },
    description: 'Honda City available for rent in Islamabad, Rawalpindi, and Lahore – clean white sedan parked indoors, ideal for comfortable city travel and business trips.'
  },
  {
    id: 'toyota-gli',
    name: 'Toyota GLI',
    category: 'Budget Sedan',
    pkrRatePerDay: 6000,
    features: [
      '4-Seater Family Car',
      'Chauffeur-Driven Service',
      'Fuel Cost Excluded',
      'Parked on beautifully manicured green lawn',
      'Perfect for family trips and daily executive commutes'
    ],
    image: '/src/assets/images/toyota_gli_white_1782839354205.jpg',
    specs: {
      engine: '1.3L VVT-i',
      transmission: 'Automatic / Manual',
      fuel: 'Petrol',
      seats: 4,
      withDriverOnly: true
    },
    description: 'Toyota Corolla GLi available for rent in Islamabad, Rawalpindi, and Lahore – white sedan parked on green lawn, perfect for comfortable family trips and daily travel.'
  },
  {
    id: 'toyota-grande',
    name: 'Toyota Grande',
    category: 'Executive Sedan',
    pkrRatePerDay: 8000,
    features: [
      '4-Seater Premium Sedan',
      'Chauffeur-Driven Included',
      'Fuel Cost Excluded',
      'White color luxury sedan',
      'Sunroof, leather interior and state-of-the-art drive'
    ],
    image: '/src/assets/images/toyota_grande_1782836361048.jpg',
    specs: {
      engine: '1.8L Altis Dual VVT-i',
      transmission: '7-speed CVT-i Sport',
      fuel: 'Petrol',
      seats: 4,
      withDriverOnly: true
    },
    description: 'Toyota Corolla Grande white color luxury sedan for rent in Islamabad, Rawalpindi, and Lahore with modern features and comfortable drive'
  },
  {
    id: 'honda-civic',
    name: 'Honda Civic',
    category: 'Executive Sedan',
    pkrRatePerDay: 13000,
    features: [
      '4-Seater Premium Sports Sedan',
      'With Expert Chauffeur',
      'Fuel Cost Excluded',
      'Stylish white design & modern chassis layout',
      'Ideal for elite business travel & wedding ceremonies'
    ],
    image: '/src/assets/images/honda_civic_white_1782839372317.jpg',
    specs: {
      engine: '1.5L Turbocharged',
      transmission: 'Automatic Sport CVT',
      fuel: 'Petrol',
      seats: 4,
      withDriverOnly: true
    },
    description: 'Honda Civic available for rent in Islamabad, Rawalpindi, and Lahore – stylish white sedan with modern design, ideal for executive travel and comfortable city rides.'
  },
  {
    id: 'hyundai-sonata',
    name: 'Hyundai Sonata',
    category: 'Executive Sedan',
    pkrRatePerDay: 15000,
    features: [
      '4-Seater Luxury Cabin',
      'With Professional Driver',
      'Fuel Cost Excluded',
      'Front-view pristine white modern architecture',
      'Panoramic sunroof, ambient lights & tech console'
    ],
    image: '/src/assets/images/hyundai_sonata_white_1782839420856.jpg',
    specs: {
      engine: '2.5L DOHC Smartstream',
      transmission: '6-Speed Shifttronic',
      fuel: 'Petrol',
      seats: 4,
      withDriverOnly: true
    },
    description: 'Front view of white Hyundai Sonata luxury sedan for rent in Islamabad, Rawalpindi and Lahore. Best in class luxury and VIP comfort.'
  },
  {
    id: 'toyota-fortuner',
    name: 'Toyota Fortuner',
    category: 'Premium Off-Road',
    pkrRatePerDay: 16000,
    features: [
      '7-Seater Spacious SUV',
      'With Highly Competent Driver',
      'Fuel Cost Excluded',
      'High road elevation, outstanding visibility',
      'Perfect for rugged long distance tours & company visits'
    ],
    image: '/src/assets/images/toyota_fortuner_white_1782839389083.jpg',
    specs: {
      engine: '2.7L Petrol / 2.8L Diesel',
      transmission: '6-Speed Automatic 4x4',
      fuel: 'Diesel/Petrol',
      seats: 7,
      withDriverOnly: true
    },
    description: 'Toyota Fortuner available for car rental service in Islamabad, Rawalpindi, and Lahore, shown as a stylish and comfortable SUV suitable for city travel and long trips.'
  },
  {
    id: 'toyota-prado',
    name: 'Toyota Prado',
    category: 'Premium Off-Road',
    pkrRatePerDay: 16000,
    features: [
      '7-Seater Executive Cabin',
      'Chauffeur-Driven Protocols',
      'Fuel Cost Excluded',
      'Stunning luxurious black exterior finish',
      'Ultimate ride quality & terrain adaptability'
    ],
    image: '/src/assets/images/toyota_prado_black_1782839405277.jpg',
    specs: {
      engine: '3.0L Turbo Diesel / 2.7L Petrol',
      transmission: 'Automatic with low-range transfer',
      fuel: 'Diesel',
      seats: 7,
      withDriverOnly: true
    },
    description: 'Toyota Land Cruiser Prado available for premium car rental services in Islamabad, Rawalpindi, and Lahore, featuring a luxurious black exterior ideal for comfortable city rides and long-distance travel.'
  },
  {
    id: 'toyota-land-cruiser',
    name: 'Toyota Land Cruiser',
    category: 'Elite VIP',
    pkrRatePerDay: 25000,
    features: [
      '7-Seater Elite Protocol SUV',
      'VIP Guard/Chauffeur Escort Compatible',
      'Fuel Cost Excluded',
      'Primacy status black exterior parked at executive villa',
      'Prestige indicator, extreme luxury and safety armor'
    ],
    image: '/src/assets/images/land_cruiser_v8_1782836320221.jpg',
    specs: {
      engine: '4.6L V8 / 3.5L Twin-Turbo V6',
      transmission: '8-Speed/10-Speed Automatic 4WD',
      fuel: 'Petrol/Diesel',
      seats: 7,
      withDriverOnly: true
    },
    description: 'Toyota Land Cruiser for rent in Islamabad, Rawalpindi, and Lahore, featuring a luxurious black exterior parked at a modern house, perfect for comfortable city travel and premium rental experience.'
  },
  {
    id: 'audi-a6',
    name: 'Audi A6',
    category: 'Elite VIP',
    pkrRatePerDay: 32000,
    features: [
      '4-Seater Premium German Sedan',
      'Chauffeur of Absolute Discretion',
      'Fuel Cost Excluded',
      'Front-view white executive prestige body',
      'Matrix LEDs, Virtual Cockpit & Air Suspension'
    ],
    image: '/src/assets/images/audi_a6_white_1782839438456.jpg',
    specs: {
      engine: '2.0L TFSI Turbocharged',
      transmission: '7-Speed S-Tronic Dual-Clutch',
      fuel: 'Petrol',
      seats: 4,
      withDriverOnly: true
    },
    description: 'Front view of white Audi A6 luxury sedan available for rent in Islamabad Rawalpindi and Lahore. Experience true European engineering with full VIP protocol.'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Sarmad Ali',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Booked a Toyota Land Cruiser V8 for our cousin’s wedding protocol. The car was in showroom condition, completely spotless. The driver was extremely well-mannered and professional. Best service in Rawalpindi Saddar.',
    vehicleRented: 'Toyota Land Cruiser V8'
  },
  {
    id: 'rev-2',
    author: 'Dr. Faiza Khan',
    rating: 5,
    date: '1 month ago',
    comment: 'Extremely reliable agency. We rented a Toyota Prado with a driver for our family tour to Hunza and Skardu. The driver was highly experienced in handling dangerous mountain terrain. Highly recommended for Northern areas travel.',
    vehicleRented: 'Toyota Prado TX.L'
  },
  {
    id: 'rev-3',
    author: 'Waqas Malik',
    rating: 5,
    date: '3 weeks ago',
    comment: 'Great experience renting the Corolla Grande for self-drive. Transparent terms, minimal paperwork, and very cooperative staff near GPO Chowk Saddar. Will definitely rent again.',
    vehicleRented: 'Toyota Corolla Altis Grande'
  },
  {
    id: 'rev-4',
    author: 'Sikandar Hayat',
    rating: 5,
    date: '2 months ago',
    comment: 'Professional protocol service. We requested Range Rover Vogue for foreign delegates visiting our company. They were highly impressed with the service and security coordination. Outstanding!',
    vehicleRented: 'Range Rover Vogue'
  },
  {
    id: 'rev-5',
    author: 'Zainab Qureshi',
    rating: 5,
    date: '1 month ago',
    comment: 'Excellent customer service. They are open 24/7 as advertised. Handled our urgent midnight booking request in just 30 minutes! Truly professional brothers.',
    vehicleRented: 'Honda Civic RS Turbo'
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'faq-1',
    question: 'Are cars rented with fuel included?',
    answer: 'No, the rental rates do not include fuel. All cars are supplied with a pre-agreed level of fuel (usually a full or half tank) and must be returned with the same level. Fuel expenses during the rental period are borne by the client.'
  },
  {
    id: 'faq-2',
    question: 'What documents are required to rent a vehicle?',
    answer: 'For Pakistani citizens: A valid CNIC, a valid driving license (if self-drive is chosen), and a verified reference or security deposit. For Overseas Pakistanis and Foreign nationals: Valid passport, international driving license, and visa documents.'
  },
  {
    id: 'faq-3',
    question: 'How do chauffeur-driven/protocol services work?',
    answer: 'Our professional chauffeurs are fully trained, verified, and familiar with both urban and difficult mountain routes. They work standard 12-hour shifts. Meals and overnight accommodation for the driver are either arranged by the client or covered through a small standard daily allowance (usually 1,500 - 2,500 PKR/night for out-station tours).'
  },
  {
    id: 'faq-4',
    question: 'Can we rent these cars for wedding events and decoration?',
    answer: 'Absolutely! We specialize in premium wedding car rentals. You can rent our Land Cruisers, Range Rovers, or Civics. We can also coordinate with top decorators in Saddar Rawalpindi to deliver the car fully decorated, or you can have it decorated at your own venue.'
  },
  {
    id: 'faq-5',
    question: 'Do you offer airport pickups and dropoffs?',
    answer: 'Yes, we provide 24/7 dedicated airport transfers between Islamabad International Airport (ISB) and anywhere in Rawalpindi, Islamabad, or surrounding areas (Peshawar, Jhelum, Mirpur, Abbottabad).'
  }
];

export const CONTACT_INFO = {
  name: 'H&M Brothers Rental And tourism',
  rating: 4.9,
  reviewsCount: 42,
  phone: '0348 5144199',
  phoneFormatted: '+92 348 5144199',
  address: 'Gpo chowk, near Ubl Bank, Saddar, Rawalpindi, 46000',
  hours: 'Open 24 hours',
  city: 'Rawalpindi',
  whatsappUrl: 'https://wa.me/923485144199'
};
