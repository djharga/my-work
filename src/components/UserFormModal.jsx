import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import Button from './Button';

export default function UserFormModal({ isOpen, onClose, onSubmit, initialData = null }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setEmail(initialData.email || '');
      setPhone(initialData.phone || '');
    } else {
      setName('');
      setEmail('');
      setPhone('');
    }
  }, [initialData, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert('يرجى إدخال الاسم والبريد الإلكتروني'); // Consider a more elegant error display
      return;
    }
    onSubmit({ name: name.trim(), email: email.trim(), phone: phone.trim() });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 bg-white dark:bg-khuta-neutral-900 rounded-lg shadow-xl"> {/* Added padding, background, shadow */}
        <h2 className="text-h4 font-bold text-khuta-primary-700 mb-4">
          {initialData ? 'تعديل مستخدم' : 'إضافة مستخدم جديد'}
        </h2> {/* Updated font size and color */}

        <form onSubmit={handleSubmit} className="space-y-4"> {/* Increased spacing */}
          <div>
            <label htmlFor="user-name" className="block text-body-sm font-medium text-khuta-neutral-700 mb-1">الاسم</label> {/* Standardized label styles */}
            <input
              id="user-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-khuta-neutral-300 rounded-md bg-white dark:bg-khuta-neutral-800 dark:text-khuta-neutral-100 focus:outline-none focus:ring-2 focus:ring-khuta-primary-500 transition-colors" // Standardized input styles
              aria-label="اسم المستخدم"
              type="text"
              required
            />
          </div>

          <div>
            <label htmlFor="user-email" className="block text-body-sm font-medium text-khuta-neutral-700 mb-1">البريد الإلكتروني</label> {/* Standardized label styles */}
            <input
              id="user-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full px-3 py-2 border border-khuta-neutral-300 rounded-md bg-white dark:bg-khuta-neutral-800 dark:text-khuta-neutral-100 focus:outline-none focus:ring-2 focus:ring-khuta-primary-500 transition-colors" // Standardized input styles
              aria-label="البريد الإلكتروني للمستخدم"
              required
            />
          </div>

          <div>
            <label htmlFor="user-phone" className="block text-body-sm font-medium text-khuta-neutral-700 mb-1">رقم الهاتف</label> {/* Standardized label styles */}
            <input
              id="user-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-khuta-neutral-300 rounded-md bg-white dark:bg-khuta-neutral-800 dark:text-khuta-neutral-100 focus:outline-none focus:ring-2 focus:ring-khuta-primary-500 transition-colors" // Standardized input styles
              aria-label="رقم هاتف المستخدم"
              type="tel"
            />
          </div>

          <div className="mt-6 flex justify-end gap-3"> {/* Adjusted spacing and alignment */}
            <Button type="button" variant="secondary" size="md" onClick={onClose} ariaLabel="إلغاء العملية">إلغاء</Button> {/* Standardized button usage */}
            <Button type="submit" variant="primary" size="md" ariaLabel={initialData ? 'حفظ تعديلات المستخدم' : 'إضافة مستخدم جديد'}>
              {initialData ? 'حفظ التعديلات' : 'إضافة المستخدم'}
            </Button> {/* Standardized button usage */}
          </div>
        </form>
      </div>
    </Modal>
  );
} 