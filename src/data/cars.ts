import { ImageSourcePropType } from 'react-native';

export type BodyType = 'SUV' | 'Sedan' | 'Pickup';

export type Car = {
  id: string;
  name: string;
  type: BodyType;
  pricePerHour: number;
  rating: number;
  reviews: number;
  transmission: 'Automatic' | 'Manual' | 'CVT';
  fuel: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  seats: number;
  popular: boolean;
  favorite: boolean;
  description: string;
  /** 3/4 front view used on cards and list rows. */
  card: ImageSourcePropType;
  /** Clean side profile used as the detail hero. */
  hero: ImageSourcePropType;
  /** All angles for the detail gallery / thumbnail strip. */
  gallery: ImageSourcePropType[];
};

const img = {
  bz: {
    front: require('../../assets/cars/models/bz/front.png'),
    lf: require('../../assets/cars/models/bz/left-front.png'),
    lr: require('../../assets/cars/models/bz/left-rear.png'),
    rear: require('../../assets/cars/models/bz/rear.png'),
    side: require('../../assets/cars/models/bz/side.png'),
  },
  camry: {
    front: require('../../assets/cars/models/camry/front.png'),
    lf: require('../../assets/cars/models/camry/left-front.png'),
    lr: require('../../assets/cars/models/camry/left-rear.png'),
    rear: require('../../assets/cars/models/camry/rear.png'),
    side: require('../../assets/cars/models/camry/side.png'),
  },
  chr: {
    front: require('../../assets/cars/models/chr/front.png'),
    lf: require('../../assets/cars/models/chr/left-front.png'),
    lr: require('../../assets/cars/models/chr/left-rear.png'),
    rear: require('../../assets/cars/models/chr/rear.png'),
    side: require('../../assets/cars/models/chr/side.png'),
  },
  corolla: {
    front: require('../../assets/cars/models/corolla/front.png'),
    lf: require('../../assets/cars/models/corolla/left-front.png'),
    lr: require('../../assets/cars/models/corolla/left-rear.png'),
    rear: require('../../assets/cars/models/corolla/rear.png'),
    side: require('../../assets/cars/models/corolla/side.png'),
  },
  crown: {
    front: require('../../assets/cars/models/crown/front.png'),
    lf: require('../../assets/cars/models/crown/left-front.png'),
    lr: require('../../assets/cars/models/crown/left-rear.png'),
    rear: require('../../assets/cars/models/crown/rear.png'),
    side: require('../../assets/cars/models/crown/side.png'),
  },
  landcruiser: {
    front: require('../../assets/cars/models/landcruiser/front.png'),
    lf: require('../../assets/cars/models/landcruiser/left-front.png'),
    lr: require('../../assets/cars/models/landcruiser/left-rear.png'),
    rear: require('../../assets/cars/models/landcruiser/rear.png'),
    side: require('../../assets/cars/models/landcruiser/side.png'),
  },
  prius: {
    front: require('../../assets/cars/models/prius/front.png'),
    lf: require('../../assets/cars/models/prius/left-front.png'),
    lr: require('../../assets/cars/models/prius/left-rear.png'),
    rear: require('../../assets/cars/models/prius/rear.png'),
    side: require('../../assets/cars/models/prius/side.png'),
  },
  rav4: {
    front: require('../../assets/cars/models/rav4/front.png'),
    lf: require('../../assets/cars/models/rav4/left-front.png'),
    lr: require('../../assets/cars/models/rav4/left-rear.png'),
    rear: require('../../assets/cars/models/rav4/rear.png'),
    side: require('../../assets/cars/models/rav4/side.png'),
  },
  tacoma: {
    front: require('../../assets/cars/models/tacoma/front.png'),
    lf: require('../../assets/cars/models/tacoma/left-front.png'),
    lr: require('../../assets/cars/models/tacoma/left-rear.png'),
    rear: require('../../assets/cars/models/tacoma/rear.png'),
    side: require('../../assets/cars/models/tacoma/side.png'),
  },
} as const;

const gallery = (m: keyof typeof img): ImageSourcePropType[] => [
  img[m].lf,
  img[m].front,
  img[m].lr,
  img[m].rear,
  img[m].side,
];

export const CARS: Car[] = [
  {
    id: 'land-cruiser',
    name: 'Toyota Land Cruiser',
    type: 'SUV',
    pricePerHour: 45,
    rating: 4.9,
    reviews: 4956,
    transmission: 'Automatic',
    fuel: 'Diesel',
    seats: 7,
    popular: true,
    favorite: true,
    description:
      'The Land Cruiser pairs legendary off-road capability with a refined cabin. Full-time four-wheel drive, a torque-rich diesel, and seating for seven make it ideal for long trips and rough terrain alike.',
    card: img.landcruiser.lf,
    hero: img.landcruiser.side,
    gallery: gallery('landcruiser'),
  },
  {
    id: 'camry',
    name: 'Toyota Camry',
    type: 'Sedan',
    pricePerHour: 25,
    rating: 4.8,
    reviews: 3120,
    transmission: 'Automatic',
    fuel: 'Hybrid',
    seats: 5,
    popular: true,
    favorite: true,
    description:
      'A comfortable, fuel-sipping hybrid sedan with a quiet ride and generous trunk space. The Camry is a dependable choice for daily commutes and weekend getaways.',
    card: img.camry.lf,
    hero: img.camry.side,
    gallery: gallery('camry'),
  },
  {
    id: 'rav4',
    name: 'Toyota RAV4',
    type: 'SUV',
    pricePerHour: 28,
    rating: 4.7,
    reviews: 2870,
    transmission: 'Automatic',
    fuel: 'Hybrid',
    seats: 5,
    popular: true,
    favorite: false,
    description:
      'A versatile compact SUV with all-wheel drive and an efficient hybrid powertrain. The RAV4 balances city agility with the space and ground clearance for any adventure.',
    card: img.rav4.lf,
    hero: img.rav4.side,
    gallery: gallery('rav4'),
  },
  {
    id: 'corolla',
    name: 'Toyota Corolla',
    type: 'Sedan',
    pricePerHour: 18,
    rating: 4.6,
    reviews: 5210,
    transmission: 'CVT',
    fuel: 'Petrol',
    seats: 5,
    popular: true,
    favorite: false,
    description:
      'The best-selling compact sedan in the world. The Corolla is easy to drive, remarkably economical, and packed with modern safety features for stress-free city driving.',
    card: img.corolla.lf,
    hero: img.corolla.side,
    gallery: gallery('corolla'),
  },
  {
    id: 'crown',
    name: 'Toyota Crown',
    type: 'Sedan',
    pricePerHour: 35,
    rating: 4.8,
    reviews: 1480,
    transmission: 'Automatic',
    fuel: 'Hybrid',
    seats: 5,
    popular: false,
    favorite: true,
    description:
      'A bold, elevated sedan with a premium hybrid drivetrain and a striking raised stance. The Crown delivers a smooth, upscale ride with standout presence.',
    card: img.crown.lf,
    hero: img.crown.side,
    gallery: gallery('crown'),
  },
  {
    id: 'bz4x',
    name: 'Toyota bZ4X',
    type: 'SUV',
    pricePerHour: 32,
    rating: 4.7,
    reviews: 980,
    transmission: 'Automatic',
    fuel: 'Electric',
    seats: 5,
    popular: true,
    favorite: false,
    description:
      'Toyota’s all-electric SUV with instant torque, a spacious cabin, and a long driving range. The bZ4X makes zero-emission travel effortless and quiet.',
    card: img.bz.lf,
    hero: img.bz.side,
    gallery: gallery('bz'),
  },
  {
    id: 'chr',
    name: 'Toyota C-HR',
    type: 'SUV',
    pricePerHour: 22,
    rating: 4.5,
    reviews: 1760,
    transmission: 'CVT',
    fuel: 'Hybrid',
    seats: 5,
    popular: false,
    favorite: false,
    description:
      'A sharply styled subcompact crossover with a frugal hybrid engine. The C-HR turns heads while keeping running costs low and parking easy.',
    card: img.chr.lf,
    hero: img.chr.side,
    gallery: gallery('chr'),
  },
  {
    id: 'prius',
    name: 'Toyota Prius',
    type: 'Sedan',
    pricePerHour: 20,
    rating: 4.6,
    reviews: 4030,
    transmission: 'CVT',
    fuel: 'Hybrid',
    seats: 5,
    popular: false,
    favorite: false,
    description:
      'The hybrid that started it all, now sleeker and more efficient than ever. The Prius offers class-leading fuel economy with a smooth, refined drive.',
    card: img.prius.lf,
    hero: img.prius.side,
    gallery: gallery('prius'),
  },
  {
    id: 'tacoma',
    name: 'Toyota Tacoma',
    type: 'Pickup',
    pricePerHour: 30,
    rating: 4.8,
    reviews: 2240,
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    popular: true,
    favorite: false,
    description:
      'A rugged midsize pickup built for work and play. The Tacoma combines a tough frame and capable bed with everyday drivability and strong resale value.',
    card: img.tacoma.lf,
    hero: img.tacoma.side,
    gallery: gallery('tacoma'),
  },
];

export const BODY_TYPES: (BodyType | 'All')[] = ['All', 'Sedan', 'SUV', 'Pickup'];

export const popularCars = CARS.filter((c) => c.popular);
export const favoriteCars = CARS.filter((c) => c.favorite);

export const getCar = (id: string) => CARS.find((c) => c.id === id);

export const formatPrice = (n: number) => `$${n.toFixed(2)}`;
