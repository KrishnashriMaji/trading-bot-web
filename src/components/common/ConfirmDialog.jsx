import React from "react";
import Modal from "./Modal";
import Button from "./Button";

function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="mb-6">
        <p className="text-gray-700">{message}</p>
      </div>

      <div className="flex gap-3">
        <Button onClick={onConfirm} variant={variant} className="flex-1">
          {confirmText}
        </Button>
        <Button onClick={onClose} variant="secondary" className="flex-1">
          {cancelText}
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
