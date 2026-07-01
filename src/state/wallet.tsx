import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'wallet.v1';
const SEED_BALANCE = 12000;

export type Txn = {
  id: string;
  title: string;
  date: string;
  amount: number; // positive = credit, negative = debit
  group: string; // 'Today' | 'Yesterday' | a date label
};

const SEED_TXNS: Txn[] = [
  { id: 't1', title: 'Money Added to Wallet', date: '24 October | 7:30 AM', amount: 500, group: 'Today' },
  { id: 't2', title: 'Booking No #34234', date: '23 October | 5:30 AM', amount: -500, group: 'Yesterday' },
  { id: 't3', title: 'Refund for Booking #34234', date: '22 October | 7:30 AM', amount: 500, group: '22 September 2023' },
  { id: 't4', title: 'Booking #34234', date: '22 October | 7:30 AM', amount: -250, group: '22 September 2023' },
  { id: 't5', title: 'Booking #34234', date: '22 October | 7:30 AM', amount: -250, group: '22 September 2023' },
];

type WalletContextValue = {
  balance: number;
  transactions: Txn[];
  addMoney: (amount: number) => void;
  spend: (amount: number, title: string) => void;
  reset: () => void;
};

const WalletContext = createContext<WalletContextValue | null>(null);

const now = () => {
  const d = new Date();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let h = d.getHours();
  const ampm = h < 12 ? 'AM' : 'PM';
  h = h % 12 === 0 ? 12 : h % 12;
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${d.getDate()} ${months[d.getMonth()]} | ${h}:${mm} ${ampm}`;
};

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState(SEED_BALANCE);
  const [transactions, setTransactions] = useState<Txn[]>(SEED_TXNS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) {
          const data = JSON.parse(raw) as { balance: number; transactions: Txn[] };
          if (typeof data.balance === 'number') setBalance(data.balance);
          if (Array.isArray(data.transactions)) setTransactions(data.transactions);
        }
      })
      .catch(() => {})
      .finally(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ balance, transactions })).catch(() => {});
  }, [balance, transactions, hydrated]);

  const addMoney = useCallback((amount: number) => {
    if (!amount || amount <= 0) return;
    setBalance((b) => b + amount);
    setTransactions((t) => [
      { id: `t${Date.now()}`, title: 'Money Added to Wallet', date: now(), amount, group: 'Today' },
      ...t,
    ]);
  }, []);

  const spend = useCallback((amount: number, title: string) => {
    if (!amount || amount <= 0) return;
    setBalance((b) => b - amount);
    setTransactions((t) => [
      { id: `t${Date.now()}`, title, date: now(), amount: -amount, group: 'Today' },
      ...t,
    ]);
  }, []);

  const reset = useCallback(() => {
    setBalance(SEED_BALANCE);
    setTransactions(SEED_TXNS);
  }, []);

  const value = useMemo<WalletContextValue>(
    () => ({ balance, transactions, addMoney, spend, reset }),
    [balance, transactions, addMoney, spend, reset],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within a WalletProvider');
  return ctx;
}
