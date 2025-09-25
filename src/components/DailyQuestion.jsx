import React, { useState } from 'react';

export default function DailyQuestion({ question = 'ما هي أكبر فائدة تريد الحصول عليها هذه السنة؟' }) {
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="bg-khuta-neutral-50 p-7 rounded-2xl shadow flex flex-col items-center max-w-xl mx-auto">
          <h4 className="font-bold text-2xl text-khuta-primary-700 mb-2">سؤال اليوم</h4>
          <p className="text-khuta-neutral-700 text-lg">{question}</p>
          {!submitted ? (
            <form
              className="w-full"
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            >
              <input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="اكتب إجابتك هنا..."
                className="w-full mt-5 p-4 rounded-xl border border-khuta-neutral-200 bg-white text-khuta-primary-900 text-base focus:ring-2 focus:ring-khuta-accent focus:outline-none transition"
              />
              <div className="mt-4 flex justify-end">
                <button
                  className="px-6 py-2 rounded-full bg-khuta-accent-500 text-white font-bold shadow hover:bg-khuta-accent-700 transition"
                  type="submit"
                >
                  أرسل
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-5 p-3 rounded-xl bg-khuta-neutral-100 text-khuta-primary-700 font-bold text-center w-full">
              شكراً لمشاركتك! شارك إجابتك مع أصدقائك.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
