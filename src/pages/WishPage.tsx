
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import type { Wish, NewWish } from '../types';
import { useApi } from '../api/useApi';
import { Modal } from '../components/Modal';
import { WishForm } from '../components/WishForm';
import css from './WishPage.module.css';

export default function WishPage() {
  const { id } = useParams();
  const wishId = Number(id);
  const api = useApi();
  const nav = useNavigate();
  const [wish, setWish] = useState<Wish | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  useEffect(() => { api.getOne(wishId).then(setWish).catch(() => nav('/')); }, [wishId]);
  if (!wish) return <p className={css.loading}>Завантаження…</p>;
  return (
    <div className={css.container}>
      <Link to="/" className={css.back}>← Назад</Link>
      <div className={css.layout}>
        <img src={wish.image} alt={wish.title} className={css.image} />
        <div>
          <h1 className={css.title}>{wish.title}</h1>
          <p className={css.desc}>{wish.description}</p>
          <div className={css.price}>${wish.price}</div>
        </div>
      </div>
      <div className={css.row}>
        <button className={css.btn} onClick={() => setOpenEdit(true)}>Update</button>
        <button className={`${css.btn} ${css.danger}`} onClick={() => setOpenDelete(true)}>Delete</button>
      </div>
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <WishForm initial={wish} onSubmit={async (payload) => { await api.update(wish.id, payload as Partial<NewWish>); setOpenEdit(false); setWish(await api.getOne(wish.id)); }} />
      </Modal>
      <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
        <div className={css.confirmBox}>
          <h3 className={css.confirmTitle}>Видалити?</h3>
          <div className={css.confirmActions}>
            <button className={css.btn} onClick={() => setOpenDelete(false)}>Ні</button>
            <button className={`${css.btn} ${css.danger}`} onClick={async () => { await api.remove(wish.id); setOpenDelete(false); nav('/'); }}>Так</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
