
import { useEffect } from 'react';
import css from './Snackbar.module.css';
export function Snackbar({ type, message, onClose }: { type: 'success'|'error'|null; message: string; onClose: () => void }) {
  useEffect(() => { if (type) { const t = setTimeout(onClose, 2500); return () => clearTimeout(t); } }, [type]);
  if (!type) return null;
  return <div className={`${css.snackbar} ${type === 'success' ? css.success : css.error}`}>{message}</div>;
}
