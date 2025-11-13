import { useState, useMemo } from "react";
import { useWishes } from "../context/WishesContext";
import { FiltersBar } from "../components/FiltersBar";
import { WishCard } from "../components/WishCard";
import { Modal } from "../components/Modal";
import { WishForm } from "../components/WishForm";
import type { Wish, NewWish } from "../types";
import { useNavigate } from "react-router-dom";
import css from "./Dashboard.module.css";

export default function Dashboard() {
  const {
    wishes,
    isLoading,
    filters,
    setFilters,
    createWish,
    updateWish,
    deleteWish,
  } = useWishes();

  const nav = useNavigate();
  const [openAdd, setOpenAdd] = useState(false);
  const [editing, setEditing] = useState<Wish | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [primarySort, setPrimarySort] = useState<"date" | "price">("date");

  const sortedWishes = useMemo(() => {
    const list = [...(wishes ?? [])];

    list.sort((a, b) => {
      const priceA = Number(a.price) || 0;
      const priceB = Number(b.price) || 0;

      const priceCompare =
        filters.priceOrder === "low" ? priceA - priceB : priceB - priceA;

      const dateCompare =
        filters.dateOrder === "oldest"
          ? a.date.localeCompare(b.date)
          : b.date.localeCompare(a.date);

      if (primarySort === "price") {
        if (priceCompare !== 0) return priceCompare;
        return dateCompare;
      } else {
        if (dateCompare !== 0) return dateCompare;
        return priceCompare;
      }
    });

    return list;
  }, [wishes, filters, primarySort]);

  return (
    <div className={css.container}>
      <FiltersBar
        value={filters}
        onChange={(field, nextFilters) => {
          setFilters(nextFilters);
          setPrimarySort(field);
        }}
        onAdd={() => setOpenAdd(true)}
      />

      {isLoading ? (
        <p className={css.loading}>Завантаження…</p>
      ) : (
        <div className={css.cards}>
          {sortedWishes.map((w) => (
            <div key={w.id} className={css.cardWrap}>
              <WishCard
                wish={w}
                onDetails={() => nav(`/wish/${w.id}`)}
                onEdit={() => setEditing(w)}
                onDelete={() => setConfirmId(w.id)}
              />
            </div>
          ))}
        </div>
      )}

      <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
        <WishForm
          onSubmit={(payload) => {
            createWish(payload as NewWish);
            setOpenAdd(false);
          }}
        />
      </Modal>

      <Modal open={!!editing} onClose={() => setEditing(null)}>
        {editing && (
          <WishForm
            initial={editing}
            onSubmit={(payload) => {
              updateWish(editing.id, payload as Partial<NewWish>);
              setEditing(null);
            }}
          />
        )}
      </Modal>

      <Modal open={confirmId !== null} onClose={() => setConfirmId(null)}>
        <div className={css.confirmBox}>
          <h3 className={css.confirmTitle}>Видалити?</h3>
          <div className={css.confirmActions}>
            <button className={css.btn} onClick={() => setConfirmId(null)}>
              Ні
            </button>
            <button
              className={`${css.btn} ${css.danger}`}
              onClick={() => {
                if (confirmId !== null) {
                  deleteWish(confirmId);
                }
                setConfirmId(null);
              }}
            >
              Так
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
