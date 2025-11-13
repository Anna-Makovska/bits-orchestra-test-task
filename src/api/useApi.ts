
import { useCallback } from 'react';
import type { Wish, NewWish } from '../types';

const API = 'http://localhost:3001/wishes';

export function useApi() {
  const list = useCallback(async (page = 1, limit = 9, filters?: { dateOrder?: 'newest'|'oldest'; priceOrder?: 'high'|'low' }) => {
    const url = `${API}?_page=${page}&_limit=${limit}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch wishes');
    const total = Number(res.headers.get('X-Total-Count') || '0');
    const data: Wish[] = await res.json();
    let result = [...data];
    if (filters?.dateOrder) {
      result.sort((a, b) => (filters.dateOrder === 'newest' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)));
    }
    if (filters?.priceOrder) {
      result.sort((a, b) => (filters.priceOrder === 'high' ? b.price - a.price : a.price - b.price));
    }
    return { items: result, total };
  }, []);

  const getOne = useCallback(async (id: number) => {
    const res = await fetch(`${API}/${id}`);
    if (!res.ok) throw new Error('Wish not found');
    return res.json() as Promise<Wish>;
  }, []);

  const create = useCallback(async (payload: NewWish) => {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Create failed');
    return res.json() as Promise<Wish>;
  }, []);

  const update = useCallback(async (id: number, payload: Partial<NewWish>) => {
    const res = await fetch(`${API}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Update failed');
    return res.json() as Promise<Wish>;
  }, []);

  const remove = useCallback(async (id: number) => {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete failed');
    return true;
  }, []);

  return { list, getOne, create, update, remove };
}
