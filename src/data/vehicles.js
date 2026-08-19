import { IMAGES } from './images';

export const VEHICLE_CATEGORIES = [
  { id: 'all', name: 'All Vehicles', icon: 'grid_view' },
  { id: 'bikes', name: 'Bikes & Scooters', icon: 'two_wheeler' },
  { id: 'cars', name: 'Cars', icon: 'directions_car' }
];

export const BIKE_SUBCATEGORIES = [
  { id: 'scooter', name: 'Scooters' },
  { id: 'commuter', name: 'Commuter Bikes' },
  { id: 'premium', name: 'Premium / Cruiser' },
  { id: 'street', name: 'Street / Sports' }
];

export const CAR_SUBCATEGORIES = [
  { id: 'hatchback', name: 'Hatchbacks' },
  { id: 'sedan', name: 'Sedans' },
  { id: 'suv', name: 'SUVs & Compact SUVs' }
];

export const VEHICLES_DATA = [
  {
    id: 'v-1',
    name: 'Honda Activa 6G',
    category: 'bikes',
    subcategory: 'scooter',
    type: 'Scooter',
    fuel: 'Petrol',
    transmission: 'Automatic',
    capacity: '2 Passengers',
    badge: 'Popular Choice',
    status: 'Coming Soon',
    location: 'Shivpuri City Center',
    tagline: 'Ideal for smooth daily errands and city travel across Shivpuri.',
    image: IMAGES.vehicles.hondaActiva
  },
  {
    id: 'v-2',
    name: 'TVS Jupiter 125',
    category: 'bikes',
    subcategory: 'scooter',
    type: 'Scooter',
    fuel: 'Petrol',
    transmission: 'Automatic',
    capacity: '2 Passengers',
    badge: 'Utility Focus',
    status: 'Coming Soon',
    location: 'Madhav Chowk, Shivpuri',
    tagline: 'Spacious under-seat storage with high mileage for everyday commutes.',
    image: IMAGES.vehicles.tvsJupiter
  },
  {
    id: 'v-3',
    name: 'Hero Splendor Plus',
    category: 'bikes',
    subcategory: 'commuter',
    type: 'Commuter Bike',
    fuel: 'Petrol',
    transmission: 'Manual',
    capacity: '2 Passengers',
    badge: 'High Mileage',
    status: 'Coming Soon',
    location: 'Jhansi Road, Shivpuri',
    tagline: 'Reliable, highly fuel-efficient bike for reliable city and highway trips.',
    image: IMAGES.vehicles.heroSplendor
  },
  {
    id: 'v-4',
    name: 'Royal Enfield Classic 350',
    category: 'bikes',
    subcategory: 'premium',
    type: 'Cruiser Bike',
    fuel: 'Petrol',
    transmission: 'Manual',
    capacity: '2 Passengers',
    badge: 'Premium Ride',
    status: 'Coming Soon',
    location: 'Circular Road, Shivpuri',
    tagline: 'Iconic tourer perfect for long weekend rides to Madhav National Park.',
    image: IMAGES.vehicles.royalEnfield
  },
  {
    id: 'v-5',
    name: 'Yamaha MT-15',
    category: 'bikes',
    subcategory: 'street',
    type: 'Street Bike',
    fuel: 'Petrol',
    transmission: 'Manual',
    capacity: '2 Passengers',
    badge: 'Agile Performance',
    status: 'Coming Soon',
    location: 'Court Road, Shivpuri',
    tagline: 'Sporty and responsive street bike for swift local travel.',
    image: IMAGES.vehicles.yamahaMT15
  },
  {
    id: 'v-6',
    name: 'Maruti Suzuki Swift',
    category: 'cars',
    subcategory: 'hatchback',
    type: 'Hatchback Car',
    fuel: 'Petrol',
    transmission: 'Manual',
    capacity: '5 Passengers',
    badge: 'City Favorite',
    status: 'Coming Soon',
    location: 'Physical Road, Shivpuri',
    tagline: 'Comfortable hatchback easy to navigate and park anywhere in Shivpuri.',
    image: IMAGES.vehicles.marutiSwift
  },
  {
    id: 'v-7',
    name: 'Tata Punch',
    category: 'cars',
    subcategory: 'hatchback',
    type: 'Compact SUV',
    fuel: 'Petrol',
    transmission: 'Manual / AMT',
    capacity: '5 Passengers',
    badge: '5-Star Safety',
    status: 'Coming Soon',
    location: 'AB Road, Shivpuri',
    tagline: 'Sturdy compact SUV with high ground clearance for local road conditions.',
    image: IMAGES.vehicles.tataPunch
  },
  {
    id: 'v-8',
    name: 'Hyundai Creta',
    category: 'cars',
    subcategory: 'suv',
    type: 'Mid-size SUV',
    fuel: 'Petrol / Diesel',
    transmission: 'Automatic',
    capacity: '5 Passengers',
    badge: 'Premium Comfort',
    status: 'Coming Soon',
    location: 'Shivpuri Center',
    tagline: 'Feature-loaded SUV ideal for family trips and business visits.',
    image: IMAGES.vehicles.hyundaiCreta
  },
  {
    id: 'v-9',
    name: 'Honda City',
    category: 'cars',
    subcategory: 'sedan',
    type: 'Sedan Car',
    fuel: 'Petrol',
    transmission: 'Automatic',
    capacity: '5 Passengers',
    badge: 'Executive Class',
    status: 'Coming Soon',
    location: 'Collectorate Area, Shivpuri',
    tagline: 'Spacious executive sedan providing maximum highway comfort.',
    image: IMAGES.vehicles.hondaCity
  }
];
