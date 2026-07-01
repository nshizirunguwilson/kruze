import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { CARS } from '@/data/cars';

const STORAGE_KEY = 'favorites.v1';

/** Cars seeded as favorites in the catalog, used until the user changes anything. */
const seed = new Set(CARS.filter((c) => c.favorite).map((c) => c.id));

type FavoritesContextValue = {
  ids: Set<string>;
  isFavorite: (id: string) => boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  reset: () => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<Set<string>>(seed);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted favorites once on mount.
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setIds(new Set(JSON.parse(raw) as string[]));
      })
      .catch(() => {})
      .finally(() => setHydrated(true));
  }, []);

  // Persist on every change (after the initial hydrate so we never clobber storage).
  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...ids])).catch(() => {});
  }, [ids, hydrated]);

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setIds((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const reset = useCallback(() => setIds(new Set(seed)), []);

  const value = useMemo<FavoritesContextValue>(
    () => ({ ids, isFavorite: (id) => ids.has(id), toggle, remove, reset }),
    [ids, toggle, remove, reset],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within a FavoritesProvider');
  return ctx;
}
