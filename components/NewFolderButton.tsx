"use client";

import { useState } from "react";
import { createFolder } from "@/app/actions/folders";
import FolderFormModal from "./FolderFormModal";

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
      {open && (
        <FolderFormModal
          title="새 폴더"
          submitLabel="저장"
          onSubmit={createFolder}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
