
import { useState } from 'react';
import type { NewWish, Wish } from '../types';
import css from './WishForm.module.css';
export function WishForm({ initial, onSubmit }: { initial?: Partial<Wish>; onSubmit: (payload: NewWish | Partial<NewWish>) => void }) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [price, setPrice] = useState<number>(initial?.price ?? 0);
  const [date, setDate] = useState(initial?.date ?? new Date().toISOString().slice(0,10));
  const [image, setImage] = useState(initial?.image ?? '');
  return (
    <form className={css.form} onSubmit={(e) => { e.preventDefault(); onSubmit({ title, description, price, date, image } as any); }}>
      <h3 className={css.title}>{initial?.id ? 'Оновити побажання' : 'Нове побажання'}</h3>
      <input className={css.input} placeholder="Назва" value={title} onChange={e=>setTitle(e.target.value)} required />
      <textarea className={css.textarea} placeholder="Опис" value={description} onChange={e=>setDescription(e.target.value)} required />
      <div className={css.row}>
        <input className={css.input} type="number" placeholder="Ціна" value={price} onChange={e=>setPrice(Number(e.target.value))} required />
        <input className={css.input} type="date" value={date} onChange={e=>setDate(e.target.value)} required />
      </div>
      <input className={css.input} placeholder="URL зображення" value={image} onChange={e=>setImage(e.target.value)} required />
      <div className={css.actions}>
        <button type="submit" className={css.submit}>Зберегти</button>
      </div>
    </form>
  );
}
