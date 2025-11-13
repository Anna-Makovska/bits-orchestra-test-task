
import type { Wish } from '../types';
import css from './WishesGrid.module.css';
export function WishesGrid({ wishes, renderCard }: { wishes: Wish[]; renderCard: (wish: Wish) => React.ReactNode; }) {
  if (!wishes.length) return <p className={css.empty}>Немає побажань</p>;
  return <div className={css.grid}>{wishes.map(renderCard)}</div>;
}
