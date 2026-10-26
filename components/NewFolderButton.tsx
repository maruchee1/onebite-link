"use client";

import { useState } from "react";
import NewFolderModal from "./NewFolderModal";

export default function NewFolderButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-secondary rounded-md border border-[var(--border)] bg-transparent px-4 py-2 text-sm font-medium leading-none text-[var(--text)]"
      >
        + 새 폴더
      </button>
      {open && <NewFolderModal onClose={() => setOpen(false)} />}
    </>
  );
}
