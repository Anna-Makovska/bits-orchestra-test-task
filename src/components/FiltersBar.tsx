import type { Filters } from "../types";
import css from "./FiltersBar.module.css";

interface FiltersBarProps {
  value: Filters;
  onChange: (field: "date" | "price", next: Filters) => void;
  onAdd: () => void;
}

export function FiltersBar({ value, onChange, onAdd }: FiltersBarProps) {
  return (
    <div className={css.bar}>
      <div className={css.controls}>
        <label className={css.label}>
          Дата
          <select
            className={css.select}
            value={value.dateOrder}
            onChange={(e) =>
              onChange("date", {
                ...value,
                dateOrder: e.target.value as Filters["dateOrder"],
              })
            }
          >
            <option value="newest">Найновіші</option>
            <option value="oldest">Найстаріші</option>
          </select>
        </label>

        <label className={css.label}>
          Ціна
          <select
            className={css.select}
            value={value.priceOrder}
            onChange={(e) =>
              onChange("price", {
                ...value,
                priceOrder: e.target.value as Filters["priceOrder"],
              })
            }
          >
            <option value="high">Висока → Низька</option>
            <option value="low">Низька → Висока</option>
          </select>
        </label>
      </div>

      <button className={css.addBtn} onClick={onAdd}>
        + Додати бажання
      </button>
    </div>
  );
}
