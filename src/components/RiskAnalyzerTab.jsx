import React from 'react';
import Button from './Button';

const RiskAnalyzerTab = ({ input, output, onInputChange, onProcess, onClear }) => {
  const simulateRiskResult = () => ({
    score: Math.floor(Math.random() * 60) + 40,
    findings: [
      { id: 'r1', title: 'إعدادات صلاحيات ضعيفة', severity: 'High', rec: 'مراجعة صلاحيات المستخدمين وتطبيق مبدأ الأقل صلاحية.' },
      { id: 'r2', title: 'نقاط ضعف في التحكم', severity: 'Medium', rec: 'تحسين الضوابط عند نقاط الدخول.' },
    ],
  });

  const result = output ? simulateRiskResult() : null;

  return (
    <div>
      <div className="mb-3">
        <div className="p-4 border-dashed border-2 border-khuta-neutral-200 rounded text-center">اسحب وأفلت الملف هنا أو اضغط للرفع (محاكاة)</div>
        <div className="text-sm text-gray-500 mt-2">أو أدخل وصف النظام/العملية في مربع النص أدناه</div>
        <textarea
          value={input}
          onChange={onInputChange}
          placeholder="أدخل وصفًا للعملية أو النظام لتحليل المخاطر..."
          className="w-full border p-3 rounded mt-2 mb-3 min-h-[80px] bg-white dark:bg-khuta-neutral-900 text-right"
        />
      </div>
      <div className="flex gap-2 items-center mb-3">
        <Button onClick={onProcess} className="px-4 py-2">معالجة</Button>
        <Button onClick={onClear} className="px-3 py-2" variant="secondary">مسح</Button>
      </div>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 p-3 rounded bg-khuta-neutral-50">
          {result ? (
            <div>
              <div className="text-sm text-gray-500 mb-2">النتيجة العامة</div>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center font-bold text-xl">{result.score}%</div>
                <div>
                  {result.findings.map(f => (
                    <div key={f.id} className="p-2 mb-2 rounded bg-white">
                      <div className="font-medium">{f.title} — <span className="text-xs text-gray-500">{f.severity}</span></div>
                      <div className="text-sm text-gray-600">{f.rec}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500">اضغط معالجة لعرض نتائج تحليل المخاطر (محاكاة)</div>
          )}
        </div>
        <div className="p-3 rounded bg-khuta-neutral-50">
          <div className="font-semibold mb-2">ملخّص النتائج</div>
          <div className="text-sm text-gray-600">النتائج، نقاط الخطر، وتوصيات للخطوات التالية.</div>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalyzerTab;