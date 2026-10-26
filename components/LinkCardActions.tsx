"use client";

import { useState } from "react";
import { removeLink } from "@/lib/linkStore";
import type { LinkItem } from "@/lib/types";
import ConfirmModal from "./ConfirmModal";
import EditLinkModal from "./EditLinkModal";
import PencilIcon from "./PencilIcon";
import TrashIcon from "./TrashIcon";

type LinkCardActionsProps = {
  link: LinkItem;
};

type ModalKind = "edit" | "delete" | null;

const actionClass =
  "link-action flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text-sub)]";

/** 링크 카드 우측 상단에 마우스를 올리면 나타나는 수정/삭제 버튼 */
export default function LinkCardActions({ link }: LinkCardActionsProps) {
  const [modal, setModal] = useState<ModalKind>(null);
  const closeModal = () => setModal(null);

  const handleDelete = () => {
    removeLink(link.id);
    closeModal();
  };

  return (
    <>
      <div className="link-actions absolute right-2 top-2 flex items-center gap-1">
        <button
          type="button"
          onClick={() => setModal("edit")}
          aria-label={`${link.title} 링크 수정`}
          title="링크 수정"
          className={actionClass}
        >
          <PencilIcon />
        </button>
        <button
          type="button"
          onClick={() => setModal("delete")}
          aria-label={`${link.title} 링크 삭제`}
          title="링크 삭제"
          className={`${actionClass} link-action-danger`}
        >
          <TrashIcon />
        </button>
      </div>

      {modal === "edit" && <EditLinkModal link={link} onClose={closeModal} />}
      {modal === "delete" && (
        <ConfirmModal
          title="링크 삭제"
          message={
            <>
              <strong className="font-semibold">{link.title}</strong> 링크를 삭제할까요?
            </>
          }
          onConfirm={handleDelete}
          onClose={closeModal}
        />
      )}
    </>
  );
}
