
import { Link } from 'react-router-dom';
import css from './Navbar.module.css';
export function Navbar() {
  return (
    <header className={css.header}>
      <div className={css.inner}>
        <Link to="/" className={css.logo}>WishList</Link>
        <nav className={css.nav}>
          <a className={css.link} href="https://github.com/typicode/json-server" target="_blank" rel="noreferrer">json-server</a>
        </nav>
      </div>
    </header>
  );
}
