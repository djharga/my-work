import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Logo3D from '../components/Logo3D';
import { Users, PlayCircle, Award, ArrowRight, Mail } from 'lucide-react';
import Button from '../components/Button';

export default function LandingPage() {
  // fixed theme for visual harmony; do not switch by time
  const theme = 'day';
  const [cityGreeting, setCityGreeting] = useState('');
  const [cityLoading, setCityLoading] = useState(true);
  const hoverAudioRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Keep theme fixed; other setup below
    // lightweight hover sound using WebAudio API
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = 'sine';
      o.frequency.value = 800;
      g.gain.value = 0;
      o.connect(g);
      g.connect(audioCtx.destination);
      o.start();
      hoverAudioRef.current = { audioCtx, oscillator: o, gain: g };
    } catch (e) {
      hoverAudioRef.current = null;
    }

    // get city via freegeoip.app (no key) - fallback silent
    setCityLoading(true);
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => {
        if (data && data.city) setCityGreeting(`مرحبا من ${data.city}`);
      })
      .catch(() => {})
      .finally(() => setCityLoading(false));

    // setup speech recognition (optional)
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.lang = 'ar-SA';
      rec.continuous = false;
      rec.interimResults = false;
      recognitionRef.current = rec;
    }
  }, []);

  function playHoverSound() {
    const s = hoverAudioRef.current;
    if (!s) return;
    try {
      const { audioCtx, oscillator, gain } = s;
      gain.gain.cancelScheduledValues(audioCtx.currentTime);
      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.06, audioCtx.currentTime + 0.04);
      setTimeout(() => {
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.14);
      }, 120);
    } catch (e) {}
  }

  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    const ut = new SpeechSynthesisUtterance(text);
    ut.lang = 'ar-SA';
    ut.rate = 0.95;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(ut);
  }

  function startRecognition() {
    const rec = recognitionRef.current;
    if (!rec) return;
    rec.start();
    rec.onresult = (ev) => {
      const text = ev.results[0][0].transcript;
      speak(`قلت: ${text}`);
    };
  }

  // Fixed harmonious gradient matching site design
  const themeBg = 'bg-gradient-to-b from-khuta-primary-50 via-khuta-primary-200 to-khuta-primary-400';

  return (
    <div className={`${themeBg} min-h-[calc(100vh-72px)] text-right text-khuta-primary-900`} dir="rtl">
      <header className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo3D size={84} />
            <div>
              <h1 className="text-2xl font-bold">منصة خطى</h1>
              <div className="text-sm text-khuta-neutral-700">
                {cityLoading ? (<div className="w-32 h-5 bg-gray-200 rounded animate-pulse" />) : (cityGreeting || 'أهلًا بك!')}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button leftIcon={<PlayCircle className="w-4 h-4" />} onMouseEnter={playHoverSound} onClick={() => { speak('ابدأ الآن'); }} className="px-4 py-2 rounded-lg">جرّب الآن</Button>
            <Button leftIcon={<Mail className="w-4 h-4" />} onClick={startRecognition} className="px-4 py-2 rounded-lg">تكلم لي</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-12">
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-3xl p-8 bg-white/30 backdrop-blur-md shadow-lg">
          <h2 className="text-h2 font-extrabold mb-2">تعلم بذكاء، تقدّم بسرعة!</h2>
          <p className="text-body-base text-khuta-neutral-700 mb-4">منصة تعليمية تدمج أفضل أدوات التعلم والتدريب والمراجعة لإخراج أفضل نسخة منك.</p>
          <div className="flex gap-4">
            <Button leftIcon={<ArrowRight className="w-4 h-4" />} onMouseEnter={playHoverSound} onClick={() => speak('ابدأ رحلتك الآن')} className="px-6 py-3 rounded-xl">ابدأ رحلتك الآن</Button>
            <Button leftIcon={<Users className="w-4 h-4" />} onMouseEnter={playHoverSound} className="px-6 py-3 rounded-xl" to="/features">اطّلع على المميزات</Button>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="rounded-3xl p-8 bg-white/20 backdrop-blur-md shadow-lg">
          <h3 className="text-xl font-bold mb-4">السمات المبتكرة</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white/60 rounded-xl shadow-md" onMouseEnter={playHoverSound}>
              {Users && <Users className="w-8 h-8 text-khuta-primary-700 mb-3" />}
              <h4 className="font-semibold mb-1">تعاون فرق العمل</h4>
              <p className="text-sm text-khuta-neutral-700">أدوات تعاون متكاملة تسهّل إدارة المشروعات التعليمية.</p>
            </div>
            <div className="p-6 bg-white/60 rounded-xl shadow-md" onMouseEnter={playHoverSound}>
              {PlayCircle && <PlayCircle className="w-8 h-8 text-khuta-primary-700 mb-3" />}
              <h4 className="font-semibold mb-1">محتوى فيديو متكامل</h4>
              <p className="text-sm text-khuta-neutral-700">شروحات عالية الجودة ومكتبة فيديو مهيّأة للتعلم السريع.</p>
            </div>
            <div className="p-6 bg-white/60 rounded-xl shadow-md" onMouseEnter={playHoverSound}>
              {Award && <Award className="w-8 h-8 text-khuta-primary-700 mb-3" />}
              <h4 className="font-semibold mb-1">شهادات معتمدة</h4>
              <p className="text-sm text-khuta-neutral-700">إصدار شهادات احترافية بعد إتمام البرامج.</p>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="rounded-3xl p-8 bg-white/10 backdrop-blur-md shadow-lg">
          <h3 className="text-xl font-bold mb-4">تواصل فوري</h3>
          <p className="text-sm text-khuta-neutral-700 mb-4">يمكنك التفاعل صوتياً أو كتابياً داخل الصفحة لتجربة ذكية وفورية.</p>
          <div className="flex gap-4">
            <input type="text" placeholder="اكتب سؤالك هنا..." className="flex-1 rounded-lg p-3 bg-white/60" onFocus={() => playHoverSound()} />
            <Button leftIcon={<PlayCircle className="w-4 h-4" />} onClick={startRecognition} className="px-4 py-2 rounded-lg" ariaLabel="تكلم الآن">تكلم الآن</Button>
          </div>
        </motion.section>

      </main>

    </div>
  );
} 