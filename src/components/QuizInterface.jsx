import React, { useEffect, useState } from 'react';
import Button from './Button';

const SAMPLE_QS = [
  { id: 'q1', q: 'ما هو الهدف الرئيسي من المراجعة الداخلية؟', choices: ['تحسين الضوابط', 'تحديد السعر', 'التسويق'], answer: 0 },
  { id: 'q2', q: 'أيٌ مما يلي يُعد جزءًا من إدارة المخاطر؟', choices: ['تحديد المخاطر', 'تصميم الشعار', 'التوظيف'], answer: 0 }
];

export default function QuizInterface() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  function selectChoice(qid, idx) {
    setAnswers(prev => ({ ...prev, [qid]: idx }));
  }

  function next() {
    setIndex(i => Math.min(SAMPLE_QS.length - 1, i + 1));
  }

  function submit() {
    // simulated scoring
    let score = 0;
    SAMPLE_QS.forEach(q => { if (answers[q.id] === q.answer) score++; });
    alert(`تمت المراجعة - الدرجة: ${score}/${SAMPLE_QS.length}`);
  }

  const q = SAMPLE_QS[index];

  return (
    <div className="p-7 bg-khuta-neutral-100 rounded-xl shadow max-w-xl mx-auto my-8">
      <div className="flex items-center justify-between mb-5">
        <div className="w-2/3">
          <div className="h-2 bg-white rounded-full overflow-hidden mb-2">
            <div className="h-full bg-khuta-primary-500" style={{ width: `${((index+1)/SAMPLE_QS.length)*100}%` }} />
          </div>
          <div className="text-sm text-khuta-neutral-600">سؤال {index+1} من {SAMPLE_QS.length}</div>
        </div>
        <div className="text-sm font-bold text-khuta-primary-700">
          الوقت المتبقي: {Math.floor(timeLeft/60)}:{String(timeLeft%60).padStart(2,'0')}
        </div>
      </div>

      <div className="mb-5">
        <div className="font-semibold text-khuta-primary-900 mb-3 text-lg">{q.q}</div>
        <div className="grid grid-cols-1 gap-3">
          {q.choices.map((c, i) => (
            <Button
              key={i}
              onClick={() => selectChoice(q.id, i)}
              className={`w-full text-right px-4 py-3 rounded-lg shadow ${answers[q.id] === i
                ? 'bg-khuta-accent-500 text-white font-bold'
                : 'bg-white text-khuta-primary-700 hover:bg-khuta-neutral-50'}`}
            >
              {c}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-3">
        <Button
          onClick={next}
          className="px-5 py-2 rounded-lg bg-khuta-secondary-100 text-khuta-primary-700 font-semibold hover:bg-khuta-secondary-200"
          variant="secondary"
        >
          التالي
        </Button>
        <Button
          onClick={submit}
          className="px-5 py-2 rounded-lg bg-khuta-accent-500 text-white font-bold hover:bg-khuta-accent-700"
          ariaLabel="تسليم الاختبار"
        >
          تسليم الاختبار
        </Button>
      </div>
    </div>
  );
}
