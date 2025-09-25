// Hook مخصص لتصدير مكونات React كصور أو ملفات PDF
// يستخدم التحميل الديناميكي لمكتبات html2canvas و jspdf لتقليل حجم الحزمة الأولية
import { useCallback } from 'react';

export const useComponentExporter = () => {
  // دالة لتنزيل العنصر كصورة
  const downloadAsImage = useCallback(async (element, imageName = 'component.png') => {
    if (!element) {
      console.error('Export failed: No element provided.');
      return;
    }
    try {
      // تحميل html2canvas عند الحاجة فقط
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: null, // خلفية شفافة
      });
      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = image;
      link.download = imageName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error capturing component as image:', error);
      alert('فشل تصدير الصورة. تحقق من وحدة التحكم للمزيد من التفاصيل.');
    }
  }, []);

  // دالة لتنزيل العنصر كملف PDF
  const downloadAsPDF = useCallback(async (element, pdfName = 'component.pdf') => {
    if (!element) {
      console.error('Export failed: No element provided.');
      return;
    }
    try {
      // تحميل المكتبات عند الحاجة
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });
      const imgData = canvas.toDataURL('image/png');
      
      // استخدام أبعاد الكانفاس لإنشاء PDF
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(pdfName);
    } catch (error) {
      console.error('Error capturing component as PDF:', error);
      alert('فشل تصدير PDF. تحقق من وحدة التحكم للمزيد من التفاصيل.');
    }
  }, []);

  return { downloadAsImage, downloadAsPDF };
};