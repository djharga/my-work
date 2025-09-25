import React, { useState } from 'react';
import Button from './Button';
import CoAuditorTab from './CoAuditorTab';
import SummarizerTab from './SummarizerTab';
import RiskAnalyzerTab from './RiskAnalyzerTab';

const TOOLS = [
  { id: 'co-auditor', title: 'المراجع الآلي', component: CoAuditorTab },
  { id: 'summarizer', title: 'منشئ الملخصات', component: SummarizerTab },
  { id: 'risk', title: 'محلل المخاطر', component: RiskAnalyzerTab },
];

export default function AIPanel() {
  const [activeTab, setActiveTab] = useState(TOOLS[0].id);
  const [inputs, setInputs] = useState(TOOLS.reduce((acc, t) => ({ ...acc, [t.id]: '' }), {}));
  const [outputs, setOutputs] = useState(TOOLS.reduce((acc, t) => ({ ...acc, [t.id]: '' }), {}));
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (id, value) => {
    setInputs(prev => ({ ...prev, [id]: value }));
  };

  const handleProcess = (id) => {
    const value = inputs[id] || '';
    setIsProcessing(true);
    setOutputs(prev => ({ ...prev, [id]: '' }));

    new Promise(resolve => setTimeout(() => {
      const now = new Date().toLocaleString();
      const result = `${now} — نتيجة ${TOOLS.find(t => t.id === id).title}: تم معالجة المحتوى (محاكاة).\n\nالنص المدخل:\n${value.slice(0, 400)}${value.length > 400 ? '...' : ''}`;
      resolve(result);
    }, 2000)).then(result => {
      setOutputs(prev => ({ ...prev, [id]: result }));
      setIsProcessing(false);
    });
  };

  const handleClear = (id) => {
    setInputs(prev => ({ ...prev, [id]: '' }));
    setOutputs(prev => ({ ...prev, [id]: '' }));
  };

  const activeTool = TOOLS.find(t => t.id === activeTab);

  return (
    <div className="p-4 border rounded bg-khuta-neutral-100">
      <div className="mb-3 flex items-center gap-2">
        {TOOLS.map(tool => (
          <Button
            key={tool.id}
            onClick={() => setActiveTab(tool.id)}
            variant={activeTab === tool.id ? 'primary' : 'secondary'}
            aria-pressed={activeTab === tool.id}
          >
            {tool.title}
          </Button>
        ))}
      </div>

      <div>
        {activeTool && React.createElement(activeTool.component, {
          input: inputs[activeTool.id],
          output: outputs[activeTool.id],
          isProcessing: isProcessing,
          onInputChange: (e) => handleInputChange(activeTool.id, e.target.value),
          onProcess: () => handleProcess(activeTool.id),
          onClear: () => handleClear(activeTool.id),
        })}
      </div>
    </div>
  );
}