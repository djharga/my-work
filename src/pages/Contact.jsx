import React, { useState } from 'react';
import Button from '../components/Button';
import { CheckCircle } from 'lucide-react';
import contactData from '../data/contactPageData.json';

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white dark:bg-khuta-neutral-900 p-10 rounded-2xl shadow-xl border border-khuta-neutral-200 dark:border-khuta-neutral-800 space-y-8">
      <h1 className="text-4xl font-bold text-khuta-primary text-center mb-4">
        {contactData.title}
      </h1>
      
      {!sent ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg text-khuta-neutral-700 dark:text-khuta-neutral-200 font-semibold mb-2">{contactData.nameLabel}</label>
            <input
              id="name"
              required
              type="text"
              aria-label={contactData.nameLabel}
              className="w-full border border-khuta-neutral-300 dark:border-khuta-neutral-700 p-4 rounded-lg mt-1 bg-khuta-neutral-50 dark:bg-khuta-neutral-800 text-khuta-neutral-900 dark:text-khuta-neutral-50 focus:outline-none focus:ring-2 focus:ring-khuta-primary transition-all duration-300"
              placeholder={contactData.namePlaceholder}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg text-khuta-neutral-700 dark:text-khuta-neutral-200 font-semibold mb-2">{contactData.emailLabel}</label>
            <input
              id="email"
              type="email"
              required
              aria-label={contactData.emailLabel}
              className="w-full border border-khuta-neutral-300 dark:border-khuta-neutral-700 p-4 rounded-lg mt-1 bg-khuta-neutral-50 dark:bg-khuta-neutral-800 text-khuta-neutral-900 dark:text-khuta-neutral-50 focus:outline-none focus:ring-2 focus:ring-khuta-primary transition-all duration-300"
              placeholder={contactData.emailPlaceholder}
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-lg text-khuta-neutral-700 dark:text-khuta-neutral-200 font-semibold mb-2">{contactData.messageLabel}</label>
            <textarea
              id="message"
              required
              rows={6}
              aria-label={contactData.messageLabel}
              className="w-full border border-khuta-neutral-300 dark:border-khuta-neutral-700 p-4 rounded-lg mt-1 h-40 resize-none bg-khuta-neutral-50 dark:bg-khuta-neutral-800 text-khuta-neutral-900 dark:text-khuta-neutral-50 focus:outline-none focus:ring-2 focus:ring-khuta-primary transition-all duration-300"
              placeholder={contactData.messagePlaceholder}
            />
          </div>
          <div>
            <Button type="submit" variant="primary" size="lg" ariaLabel="إرسال رسالة التواصل" className="w-full py-4 font-bold text-xl">
              {contactData.submitButton}
            </Button>
          </div>
        </form>
      ) : (
        <div className="p-8 flex items-center gap-4 bg-green-100/50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg shadow-lg text-green-700 dark:text-green-300 mt-8 text-xl font-semibold justify-center">
          <CheckCircle className="w-8 h-8" />
          {contactData.successMessage}
        </div>
      )}
    </div>
  );
}
