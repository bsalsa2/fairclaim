// In-memory database (for demo; replace with real DB like PostgreSQL/MongoDB)
interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}

interface BookedFlight {
  id: string;
  userId: string;
  flightDate: Date;
  route: string;
  airline: string;
  originalPrice: number;
  currentPrice: number;
  savings: number;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: Date;
}

interface TrackedFlight {
  id: string;
  userId: string;
  flightDate: Date;
  route: string;
  airline: string;
  originalPrice: number;
  currentPrice: number;
  priceDrops: { date: Date; price: number }[];
  status: 'tracking' | 'booked' | 'completed';
  createdAt: Date;
}

// In-memory storage
export const users = new Map<string, User>();
export const bookedFlights = new Map<string, BookedFlight>();
export const trackedFlights = new Map<string, TrackedFlight>();

// Initialize with demo data
export function initializeDemoData() {
  const demoUserId = 'user-1';

  users.set(demoUserId, {
    id: demoUserId,
    email: 'demo@example.com',
    password: 'password123', // In production, this would be hashed
    name: 'John Traveler',
    createdAt: new Date('2024-01-01'),
  });

  // Add demo booked flights
  bookedFlights.set('booking-1', {
    id: 'booking-1',
    userId: demoUserId,
    flightDate: new Date('2026-06-27'),
    route: 'BOS → CHS',
    airline: 'Jetblue',
    originalPrice: 189.99,
    currentPrice: 140.0,
    savings: 49.99,
    status: 'active',
    createdAt: new Date('2024-05-01'),
  });

  bookedFlights.set('booking-2', {
    id: 'booking-2',
    userId: demoUserId,
    flightDate: new Date('2026-07-10'),
    route: 'RDU → BWI',
    airline: 'Southwest',
    originalPrice: 165.0,
    currentPrice: 165.0,
    savings: 0,
    status: 'active',
    createdAt: new Date('2024-05-05'),
  });

  // Add demo tracked flights
  trackedFlights.set('tracked-1', {
    id: 'tracked-1',
    userId: demoUserId,
    flightDate: new Date('2026-12-19'),
    route: 'IAD → HND',
    airline: 'United',
    originalPrice: 850.0,
    currentPrice: 820.0,
    priceDrops: [
      { date: new Date('2024-05-01'), price: 850.0 },
      { date: new Date('2024-05-05'), price: 835.0 },
      { date: new Date('2024-05-10'), price: 820.0 },
    ],
    status: 'tracking',
    createdAt: new Date('2024-04-28'),
  });
}

// Helper functions
export function getUserById(userId: string): User | undefined {
  return users.get(userId);
}

export function getUserByEmail(email: string): User | undefined {
  return Array.from(users.values()).find((u) => u.email === email);
}

export function getUserBookedFlights(userId: string): BookedFlight[] {
  return Array.from(bookedFlights.values()).filter(
    (f) => f.userId === userId && f.status !== 'completed'
  );
}

export function getUserTrackedFlights(userId: string): TrackedFlight[] {
  return Array.from(trackedFlights.values()).filter(
    (f) => f.userId === userId && f.status === 'tracking'
  );
}

export function getUserPastFlights(userId: string): BookedFlight[] {
  return Array.from(bookedFlights.values()).filter(
    (f) => f.userId === userId && f.status === 'completed'
  );
}

export function calculateUserStats(userId: string) {
  const booked = getUserBookedFlights(userId);
  const totalSavings = booked.reduce((sum, f) => sum + f.savings, 0);
  const fareDips = booked.filter((f) => f.savings > 0).length;

  return {
    fareDips,
    totalSavings,
    bookedFlightsCount: booked.length,
    trackedFlightsCount: getUserTrackedFlights(userId).length,
  };
}
