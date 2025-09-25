import React from 'react';
import Modal from './Modal';
import Button from './Button';

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'تأكيد الحذف',
  message = 'هل أنت متأكد من رغبتك في حذف هذا العنصر؟'
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="px-1 py-2">
        <h3 className="text-xl font-bold mb-2 text-khuta-primary-700">{title}</h3>
        <p className="text-base text-khuta-neutral-700 mb-6">{message}</p>
        <div className="flex gap-3 justify-end mt-2">
          <Button
            onClick={onClose}
            className="px-5 py-2 rounded-full border bg-white text-khuta-primary-700 font-semibold hover:bg-khuta-neutral-50"
            variant="secondary"
          >
            إلغاء
          </Button>
          <Button
            onClick={onConfirm}
            className="px-5 py-2 rounded-full bg-red-600 text-white font-bold hover:bg-red-700"
          >
            حذف
          </Button>
        </div>
      </div>
    </Modal>
  );
}
