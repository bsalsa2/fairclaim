// Advanced in-memory database with real-world models
// In production, connect to PostgreSQL/MongoDB

import crypto from 'crypto';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  avatar?: string;
  preferences: {
    autoRefaring: boolean;
    emailNotifications: boolean;
    pushNotifications: boolean;
  };
  stats: {
    totalSavings: number;
    fareDips: number;
    flightsTracked: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Flight {
  id: string;
  userId: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: Date;
  arrivalTime: Date;
  duration: number; // in minutes
  stops: number;
  status: 'booked' | 'tracking' | 'completed' | 'cancelled';
  cabin: 'economy' | 'premium' | 'business' | 'first';
  createdAt: Date;
}

export interface FlightPrice {
  id: string;
  flightId: string;
  price: number;
  baseFare: number;
  taxes: number;
  fees: number;
  timestamp: Date;
  source: string;
}

export interface Booking {
  id: string;
  userId: string;
  flightId: string;
  originalPrice: number;
  currentPrice: number;
  basePrice: number;
  totalSavings: number;
  passengers: number;
  cabin: 'economy' | 'premium' | 'business' | 'first';
  bookingReference: string;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: Date;
  priceHistory: FlightPrice[];
}

export interface PriceAlert {
  id: string;
  userId: string;
  flightId: string;
  targetPrice: number;
  triggered: boolean;
  createdAt: Date;
}

// In-memory storage
export const database = {
  users: new Map<string, User>(),
  flights: new Map<string, Flight>(),
  bookings: new Map<string, Booking>(),
  priceHistories: new Map<string, FlightPrice[]>(),
  priceAlerts: new Map<string, PriceAlert>(),
};

// Helper functions
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export function generateId(prefix: string): string {
  return `${prefix}-${crypto.randomBytes(12).toString('hex')}`;
}

export function generateBookingReference(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export function createUser(email: string, password: string, name: string): User {
  const user: User = {
    id: generateId('usr'),
    email,
    passwordHash: hashPassword(password),
    name,
    preferences: {
      autoRefaring: true,
      emailNotifications: true,
      pushNotifications: false,
    },
    stats: {
      totalSavings: 0,
      fareDips: 0,
      flightsTracked: 0,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  database.users.set(user.id, user);
  return user;
}

export function getUserByEmail(email: string): User | undefined {
  return Array.from(database.users.values()).find((u) => u.email === email);
}

export function getUserById(userId: string): User | undefined {
  return database.users.get(userId);
}

export function createBooking(
  userId: string,
  flightId: string,
  passengers: number,
  originalPrice: number,
  cabin: 'economy' | 'premium' | 'business' | 'first' = 'economy'
): Booking {
  const booking: Booking = {
    id: generateId('bkg'),
    userId,
    flightId,
    originalPrice,
    currentPrice: originalPrice,
    basePrice: originalPrice * 0.8,
    totalSavings: 0,
    passengers,
    cabin,
    bookingReference: generateBookingReference(),
    status: 'active',
    createdAt: new Date(),
    priceHistory: [
      {
        id: generateId('ph'),
        flightId,
        price: originalPrice,
        baseFare: originalPrice * 0.8,
        taxes: originalPrice * 0.15,
        fees: originalPrice * 0.05,
        timestamp: new Date(),
        source: 'booking',
      },
    ],
  };

  database.bookings.set(booking.id, booking);
  database.priceHistories.set(booking.id, booking.priceHistory);

  // Update user stats
  const user = getUserById(userId);
  if (user) {
    user.stats.flightsTracked += 1;
    user.updatedAt = new Date();
  }

  return booking;
}

export function updateFlightPrice(bookingId: string, newPrice: number): Booking | null {
  const booking = database.bookings.get(bookingId);
  if (!booking) return null;

  const priceHistory = database.priceHistories.get(bookingId) || [];
  const savings = booking.originalPrice - newPrice;

  if (savings > 0) {
    const user = getUserById(booking.userId);
    if (user) {
      user.stats.totalSavings += savings;
      user.stats.fareDips += 1;
      user.updatedAt = new Date();
    }
  }

  booking.currentPrice = newPrice;
  booking.totalSavings = savings > 0 ? savings : 0;

  const newPriceRecord: FlightPrice = {
    id: generateId('ph'),
    flightId: booking.flightId,
    price: newPrice,
    baseFare: newPrice * 0.8,
    taxes: newPrice * 0.15,
    fees: newPrice * 0.05,
    timestamp: new Date(),
    source: 'price-update',
  };

  priceHistory.push(newPriceRecord);
  database.priceHistories.set(bookingId, priceHistory);
  database.bookings.set(bookingId, booking);

  return booking;
}

export function getUserBookings(userId: string, status?: string): Booking[] {
  return Array.from(database.bookings.values()).filter((b) => {
    if (b.userId !== userId) return false;
    if (status && b.status !== status) return false;
    return true;
  });
}

export function getUserStats(userId: string) {
  const user = getUserById(userId);
  if (!user) return null;

  const bookings = getUserBookings(userId, 'active');
  const trackedFlights = bookings.length;
  const totalSavings = bookings.reduce((sum, b) => sum + b.totalSavings, 0);
  const fareDips = bookings.filter((b) => b.totalSavings > 0).length;

  return {
    totalSavings,
    fareDips,
    trackedFlights,
    nextFlightDate: bookings.length > 0 ? bookings[0].createdAt : null,
  };
}

// Initialize demo data
export function initializeAdvancedDemo() {
  // Create demo user
  const user = createUser('demo@example.com', 'password123', 'John Traveler');

  // Create demo bookings
  const booking1 = createBooking(user.id, 'flg-001', 1, 189.99);
  const booking2 = createBooking(user.id, 'flg-002', 1, 165.0);

  // Simulate price changes
  setTimeout(() => {
    updateFlightPrice(booking1.id, 140.0);
    updateFlightPrice(booking2.id, 145.0);
  }, 100);
}
