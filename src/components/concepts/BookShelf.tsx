"use client";

import { memo } from "react";
import { BOOK_LIST } from "@/concepts/books";

export const BookShelf = memo(function BookShelf() {
  return (
    <div className="flex flex-wrap justify-center gap-3 py-6">
      {BOOK_LIST.map((book) => (
        <div
          key={book.id}
          title={`${book.title} — ${book.authors}`}
          className="book-spine group cursor-default"
          style={{ "--spine-color": book.spine } as React.CSSProperties}
        >
          <span className="book-spine-label">{book.short}</span>
          <span className="book-spine-meta">{book.year}</span>
        </div>
      ))}
    </div>
  );
});
