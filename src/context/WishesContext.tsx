
import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import type { Wish, Filters, NewWish } from '../types';
import { useApi } from '../api/useApi';

interface WishesContextValue {
  wishes: Wish[];
  isLoading: boolean;
  error: string | null;
  page: number;
  setPage: (p: number) => void;
  limit: number;
  total: number;
  filters: Filters;
  setFilters: (f: Filters) => void;
  refresh: () => Promise<void>;
  createWish: (payload: NewWish) => Promise<void>;
  updateWish: (id: number, payload: Partial<NewWish>) => Promise<void>;
  deleteWish: (id: number) => Promise<void>;
  snackbar: { type: 'success'|'error'|null; message: string };
  clearSnackbar: () => void;
}

const WishesContext = createContext<WishesContextValue | null>(null);

export function WishesProvider({ children }: { children: React.ReactNode }) {
  const api = useApi();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<Filters>({ dateOrder: 'newest', priceOrder: 'high' });
  const [snackbar, setSnackbar] = useState<{ type: 'success'|'error'|null; message: string }>({ type: null, message: '' });

  const load = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { items, total } = await api.list(page, limit, filters);
      setWishes(items);
      setTotal(total);
    } catch (e: any) {
      setError(e.message || 'Error');
      setSnackbar({ type: 'error', message: 'Помилка завантаження' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { load(); }, [page, filters]);

  const refresh = async () => { await load(); };

  const createWish = async (payload: NewWish) => {
    try {
      await api.create(payload);
      setSnackbar({ type: 'success', message: 'Додано' });
      await load();
    } catch (e: any) {
      setSnackbar({ type: 'error', message: 'Помилка додавання' });
    }
  };

  const updateWish = async (id: number, payload: Partial<NewWish>) => {
    try {
      await api.update(id, payload);
      setSnackbar({ type: 'success', message: 'Оновлено' });
      await load();
    } catch (e: any) {
      setSnackbar({ type: 'error', message: 'Помилка оновлення' });
    }
  };

  const deleteWish = async (id: number) => {
    try {
      await api.remove(id);
      setSnackbar({ type: 'success', message: 'Видалено' });
      await load();
    } catch (e: any) {
      setSnackbar({ type: 'error', message: 'Помилка видалення' });
    }
  };

  const clearSnackbar = () => setSnackbar({ type: null, message: '' });

  const value = useMemo<WishesContextValue>(() => ({
    wishes, isLoading, error, page, setPage, limit, total, filters, setFilters,
    refresh, createWish, updateWish, deleteWish, snackbar, clearSnackbar
  }), [wishes, isLoading, error, page, limit, total, filters, snackbar]);

  return <WishesContext.Provider value={value}>{children}</WishesContext.Provider>;
}

export function useWishes() {
  const ctx = useContext(WishesContext);
  if (!ctx) throw new Error('useWishes must be used within WishesProvider');
  return ctx;
}
