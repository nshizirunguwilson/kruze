import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'bookings.v1';

export type BookingStatus = 'Upcoming' | 'Completed' | 'Cancelled';

export type Booking = {
  id: string;
  carId: string;
  status: BookingStatus;
  total: number;
  when: string; // human label, e.g. "4 Jul, 10:00 AM"
};

// Seed mirrors the previous static My Bookings mock (by car id).
const SEED: Booking[] = [
  { id: 'b1', carId: 'camry', status: 'Upcoming', total: 650, when: 'Oct 04, 10:00 AM' },
  { id: 'b2', carId: 'land-cruiser', status: 'Completed', total: 1130, when: 'Sep 20, 09:00 AM' },
  { id: 'b3', carId: 'camry', status: 'Completed', total: 650, when: 'Sep 12, 02:00 PM' },
  { id: 'b4', carId: 'rav4', status: 'Cancelled', total: 722, when: 'Sep 08, 11:00 AM' },
  { id: 'b5', carId: 'corolla', status: 'Cancelled', total: 482, when: 'Aug 30, 08:00 AM' },
];

type BookingsContextValue = {
  bookings: Booking[];
  byStatus: (status: BookingStatus) => Booking[];
  addBooking: (b: { carId: string; total: number; when?: string }) => void;
  cancelBooking: (id: string) => void;
  reset: () => void;
};

const BookingsContext = createContext<BookingsContextValue | null>(null);

export function BookingsProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(SEED);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setBookings(JSON.parse(raw) as Booking[]);
      })
      .catch(() => {})
      .finally(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(bookings)).catch(() => {});
  }, [bookings, hydrated]);

  const addBooking = useCallback((b: { carId: string; total: number; when?: string }) => {
    setBookings((prev) => {
      // Guard against double-add (e.g. StrictMode / re-render) for the same car within a tick.
      const id = `b${Date.now()}`;
      if (prev.some((x) => x.id === id)) return prev;
      return [
        { id, carId: b.carId, status: 'Upcoming', total: b.total, when: b.when ?? 'Upcoming trip' },
        ...prev,
      ];
    });
  }, []);

  const cancelBooking = useCallback((id: string) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'Cancelled' } : b)));
  }, []);

  const byStatus = useCallback(
    (status: BookingStatus) => bookings.filter((b) => b.status === status),
    [bookings],
  );

  const reset = useCallback(() => setBookings(SEED), []);

  const value = useMemo<BookingsContextValue>(
    () => ({ bookings, byStatus, addBooking, cancelBooking, reset }),
    [bookings, byStatus, addBooking, cancelBooking, reset],
  );

  return <BookingsContext.Provider value={value}>{children}</BookingsContext.Provider>;
}

export function useBookings() {
  const ctx = useContext(BookingsContext);
  if (!ctx) throw new Error('useBookings must be used within a BookingsProvider');
  return ctx;
}
