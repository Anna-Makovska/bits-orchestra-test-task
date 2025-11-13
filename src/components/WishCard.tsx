
import type { Wish } from '../types';
import css from './WishCard.module.css';
export function WishCard({ wish, onDetails, onEdit, onDelete }: { wish: Wish; onDetails: () => void; onEdit: () => void; onDelete: () => void; }) {
  return (
    <div className={css.card}>
      <div className={css.imgWrap}>
        <img src={wish.image} alt={wish.title} className={css.image} />
      </div>
      <div className={css.body}>
        <h3 className={css.title}>{wish.title}</h3>
        <p className={css.desc}>{wish.description}</p>
      </div>
      <div className={css.footer}>
        <span className={css.price}>${wish.price}</span>
        <div className={css.actions}>
          <button className={`${css.btn} ${css.secondary}`} onClick={onDetails}>Details</button>
          <button className={`${css.btn} ${css.primary}`} onClick={onEdit}>Update</button>
          <button className={`${css.btn} ${css.danger}`} onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}
