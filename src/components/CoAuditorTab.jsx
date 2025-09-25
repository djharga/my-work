import React from 'react';
import Button from './Button';
import AIProcessingIndicator from './AIProcessingIndicator';

const CoAuditorTab = ({ input, output, isProcessing, onInputChange, onProcess, onClear }) => (
  <div>
    <textarea
      value={input}
      onChange={onInputChange}
      placeholder="ألصق النص أو حمل ملفًا لتحليل المراجعة..."
      className="w-full border p-3 rounded mb-3 min-h-[120px] bg-white dark:bg-khuta-neutral-900 text-right"
    />
    <div className="flex gap-2 items-center mb-3">
      <Button onClick={onProcess} className="px-4 py-2">معالجة</Button>
      <Button onClick={onClear} className="px-3 py-2" variant="secondary">مسح</Button>
    </div>
    {isProcessing ? (
      <AIProcessingIndicator />
    ) : (
      <div className="bg-khuta-neutral-50 p-3 rounded min-h-[80px] text-sm whitespace-pre-wrap">
        {output || 'نتيجة المعالجة ستظهر هنا...'}
      </div>
    )}
  </div>
);

export default CoAuditorTab;