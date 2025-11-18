import React from "react";

export default function CategoryFilter({ categories, active, onSelect }) {
  return (
    <div className="category-bar">
      <button
        className={active === 0 ? "cat active" : "cat"}
        onClick={() => onSelect(0)}
      >
        Todas
      </button>

      {categories.map((c) => (
        <button
          key={c.id}
          className={active === c.id ? "cat active" : "cat"}
          onClick={() => onSelect(c.id)}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}