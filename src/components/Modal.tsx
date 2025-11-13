
import { useEffect } from 'react';
import css from './Modal.module.css';
export function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className={css.backdrop} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={css.modal}>{children}</div>
    </div>
  );
}
