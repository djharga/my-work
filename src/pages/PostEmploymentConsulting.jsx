import { useState } from "react";
import { Tab } from "@headlessui/react";
import { motion } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
import { sectionVariants, itemVariants } from '../utils/animationVariants';
import postEmploymentConsultingData from "../data/postEmploymentConsultingData.json";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PostEmploymentConsulting = () => {
  const [inquiry, setInquiry] = useState("");
  const [message, setMessage] = useState("");

  const { intro, support, templates, inquiry: inquiryData, dailyTasks, microVideos, coaching } = postEmploymentConsultingData;

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (inquiryText.trim().length < 10) {
      setInquiryError('الرجاء إدخال استفسار أكثر تفصيلاً (10 أحرف على الأقل).');
      setInquirySubmitted(false);
      return;
    }
    setInquiryError('');
    // Simulate API call
    console.log('Inquiry submitted:', inquiryText);
    setInquirySubmitted(true);
    setInquiryText(''); // Clear textarea after submission
    setTimeout(() => setInquirySubmitted(false), 3000); // Hide success after 3 seconds
  }

  function handleTabChange(index) {
    setIsTabLoading(true);
    setTimeout(() => {
      setIsTabLoading(false);
    }, 400); // Simulate loading for 400ms
  }

  return (
    <AnimatedPage>
      {/* Section 0: Introductory & Vision Section */}
      <motion.section {...sectionVariants} className="py-16 text-center bg-gradient-to-br from-khuta-primary-50 to-blue-50 dark:from-khuta-neutral-900/50 dark:to-blue-950 rounded-xl shadow-lg mb-16">
        <h2 className="text-h2 text-khuta-primary leading-tight mb-6">
          احترف مهنة المستقبل: لماذا المراجعة الداخلية؟
        </h2>
        <div className="max-w-4xl mx-auto text-body-base text-gray-700 dark:text-gray-300 space-y-6">
          <p>
            مهنة المراجعة الداخلية لم تعد حكراً على متخصصين محددين – إنها فرصة حقيقية لأي شخص يسعى لتطوير مساره المهني، حتى لو كنت تفكر في تغيير تخصصك الحالي او تطوير تخصصك واكتساب مهارات مطلوبة لسوق العمل.
          </p>
          <p>
            المراجعة الداخلية اليوم هي عين الإدارة اليقظة، التي ترى ما وراء الأرقام والبيانات، وتكشف المخاطر قبل أن تتحول إلى أزمات، وتحوّلها إلى فرص للتحسين والابتكار. إنها الشريك الصامت الذي يحمي مسيرة المؤسسة، ويقودها نحو التميز، بما يتماشى مع مستهدفات رؤية المملكة 2030 في تعزيز الحوكمة ورفع كفاءة الأداء.
          </p>
          <p className="font-semibold text-khuta-secondary-600 dark:text-khuta-accent-400"> {/* Updated color */}
            المراجعة الداخلية والمراجع الداخلي… شراكة تصنع التفوق المؤسسي. معًا يشكلان قوة استراتيجية تدعم استقرار مؤسستك وتدفعها نحو الريادة. فالمراجعة الداخلية تمنحك الحماية والشفافية، بينما يحوّل المراجع الداخلي المحترف هذه الحماية إلى قيمة مستدامة تضمن التميز وتبقي مؤسستك دائمًا في موقع المبادرة.
          </p>
          <p>
            المراجع الداخلي هو قيمة مضافة لا تُقدّر بثمن، وشريك استراتيجي للإدارة في رسم ملامح المستقبل. ليس مجرد مدقق يركز على الأخطاء، بل رائد يساهم بفعالية في: الكشف المبكر للمخاطر، تقييم كفاءة الضوابط، تقديم توصيات مبتكرة، ودعم الإدارة في تحقيق أهدافها.
          </p>
          <p className="font-medium text-red-700 dark:text-red-300">
            الاستثمار في تطوير قدرات المراجعة الداخلية يعني أكثر من حماية الأصول… إنه تأمين مستدام لمستقبل أعمالك. المستقبل لا ينتظر أحدًا، ومن يتأخر في بناء منظومة مراجعة قوية سيواجه تكاليف مضاعفة.
          </p>
        </div>
      </motion.section>

      <motion.section {...sectionVariants} className="pt-10 pb-16 text-center">
        <h1 className="text-h1 text-khuta-primary-700 leading-tight mb-4"> {/* Updated color */}
          دعمك العملي كمدقق داخلي جديد: أول 90 يومًا بنجاح!
        </h1>
        <p className="text-body-lg text-khuta-neutral-700 max-w-2xl mx-auto"> {/* Updated color */}
          انتقل من التعليم النظري إلى التطبيق العملي بثقة. نوفر لك الأدوات، الاستشارات، والتوجيه الذي تحتاجه في بداية مسيرتك المهنية كمراجع داخلي.
        </p>
      </motion.section>

      {/* Section 1: Templates Library */}
      <motion.section {...sectionVariants} className="my-16 bg-khuta-neutral-100 dark:bg-khuta-neutral-900 rounded-xl p-8 shadow-lg">
        <h2 className="text-h3 text-khuta-secondary-700 mb-8">مكتبة قوالب جاهزة لتسريع مهامك</h2> {/* Updated color */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => {
            // Attempt to map known icon names to imported icons; fallback to null
            const iconMap = { Download, Send, CheckCircle, Loader2, PlayCircle, Calendar };
            const IconComponent = iconMap[template.icon] || null;
            return (
              <motion.div
                key={template.id}
                {...itemVariants}
                transition={{ ...itemVariants.transition, delay: index * 0.1 }}
                className="bg-white dark:bg-khuta-neutral-800 p-6 rounded-lg shadow-md flex items-center justify-between
                           focus-within:outline-none focus-within:ring-2 focus-within:ring-khuta-primary-500 focus-within:ring-offset-2" // Updated focus ring color
                tabIndex="0"
                role="button"
              >
                <div className="flex items-center space-x-4">
                  {IconComponent && <IconComponent className="w-8 h-8 text-khuta-accent-500" />} {/* Updated icon color */}
                  <span className="font-semibold text-body-lg text-khuta-neutral-800 dark:text-khuta-neutral-100">{template.title}</span> {/* Updated text color */}
                </div>
                <button
                  className="flex items-center space-x-2 bg-khuta-primary-500 text-white px-4 py-2 rounded-md hover:bg-khuta-accent-500 transition-colors
                             focus:outline-none focus:ring-2 focus:ring-khuta-accent-500 focus:ring-offset-2" // Updated button colors and focus styles
                  aria-label={`تحميل قالب ${template.title}`}
                >
                  {Download && <Download className="w-5 h-5" />}
                  <span>تحميل</span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Section 2: "What Do I Do If?" Service */}
      <motion.section {...sectionVariants} className="my-16 bg-khuta-primary-50 dark:bg-khuta-neutral-900 rounded-xl p-8 shadow-lg"> {/* Updated background color */}
        <h2 className="text-h3 text-khuta-primary-700 mb-8">هل واجهت موقفًا صعبًا؟ احصل على استشارة فورية</h2> {/* Updated color */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="text-body-base text-khuta-neutral-700 dark:text-khuta-neutral-300 leading-relaxed"> {/* Updated color */}
            <p className="mb-4">
              في عالم التدقيق الداخلية، قد تواجه مواقف فريدة أو صعبة تتطلب مشورة سريعة وموثوقة. خدمتنا "ماذا أفعل لو؟" تتيح لك طرح استفساراتك مباشرة على خبراء التدقيق، والحصول على توجيهات عملية خلال 24 ساعة لتمكينك من اتخاذ القرارات الصحيحة بثقة.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>احصل على إجابات مخصضة لمشكلاتك.</li>
              <li>استشر خبراء التدقيق في المواقف المعقدة.</li>
              <li>عزز ثقتك في اتخاذ القرارات المهنية.</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-khuta-neutral-800 p-6 rounded-lg shadow-md">
            <form onSubmit={handleInquirySubmit}>
              <textarea
                className={`w-full h-32 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-khuta-accent-500 dark:bg-khuta-neutral-700 dark:text-khuta-neutral-100 ${inquiryError ? 'border-khuta-accent-500 ring-khuta-accent-500' : 'border-khuta-neutral-300 dark:border-khuta-neutral-700'}`} // Updated border/ring colors
                placeholder="اشرح الموقف بالتفصيل هنا... (مثال: الإدارة رفضت تزويدي بمستندات)"
                value={inquiryText}
                onChange={(e) => {
                  setInquiryText(e.target.value);
                  setInquiryError('');
                }}
                aria-label="أدخل استفسارك هنا"
              ></textarea>
              {inquiryError && <p className="text-khuta-accent-500 text-sm mt-1">{inquiryError}</p>} {/* Updated error text color */}
              <button
                type="submit"
                className="mt-4 w-full bg-khuta-primary-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-khuta-accent-500 transition-colors
                           focus:outline-none focus:ring-2 focus:ring-khuta-accent-500 focus:ring-offset-2" // Updated button colors and focus styles
                aria-label="أرسل استفسارك للحصول على استشارة"
              >
                {Send && <Send className="w-5 h-5" />}
                <span>أرسل استفسارك</span>
              </button>
              {inquirySubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-center text-khuta-secondary-500 flex items-center justify-center gap-2" // Updated success text color
                >
                  {CheckCircle && <CheckCircle className="w-5 h-5" />}
                  <span>تم استلام استفسارك بنجاح!</span>
                </motion.div>
              )}
              <p className="mt-2 text-sm text-khuta-neutral-500 text-center dark:text-khuta-neutral-400"> {/* Updated text color */}
                سيتم الرد عليك من قبل خبرائنا خلال 24 ساعة.
              </p>
            </form>
          </div>
        </div>
      </motion.section>

      {/* Section 3: Daily Tasks Guide */}
      <motion.section {...sectionVariants} className="my-16 bg-khuta-neutral-50 dark:bg-khuta-neutral-800 rounded-xl p-8 shadow-lg">
        <h2 className="text-h3 text-khuta-secondary-700 mb-8">خارطة طريقك لأول 90 يومًا</h2> {/* Updated color */}
        <Tab.Group onChange={handleTabChange}>
          <Tab.List className="flex space-x-1 rounded-xl bg-khuta-primary-100 p-1 dark:bg-khuta-neutral-700"> {/* Updated background color */}
            {Object.keys(dailyTasks).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-btn-md font-medium leading-5 text-khuta-primary-700 dark:text-khuta-neutral-300
                   ring-white ring-opacity-60 ring-offset-2 ring-offset-khuta-primary-500 focus:outline-none focus:ring-2 focus:ring-khuta-accent-500
                   ${selected
                     ? 'bg-white shadow dark:bg-khuta-neutral-600 dark:text-white' // Updated dark mode selected colors
                     : 'hover:bg-khuta-primary-50/[0.12] hover:text-khuta-primary-700 dark:hover:bg-khuta-neutral-700 dark:hover:text-khuta-neutral-100' // Updated dark mode hover colors
                   }`
                }
                aria-label={`عرض مهام ${category}`}
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-4">
            {Object.values(dailyTasks).map((tasks, idx) => (
              <Tab.Panel
                key={idx}
                className="rounded-xl bg-white dark:bg-khuta-neutral-800 p-6 ring-white ring-opacity-60 ring-offset-2 ring-offset-khuta-primary-400 focus:outline-none focus:ring-2" // Updated ring-offset color
              >
                {isTabLoading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-4"
                  >
                    {Loader2 && <Loader2 className="animate-spin w-8 h-8 text-khuta-primary-500 mx-auto" />} {/* Updated color */}
                    <p className="text-body-sm mt-2 text-khuta-neutral-600 dark:text-khuta-neutral-300">جاري تحميل المهام...</p> {/* Updated color */}
                  </motion.div>
                ) : (
                  <ul className="space-y-3">
                    {tasks.map((task, taskIdx) => (
                      <motion.li
                        key={taskIdx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: taskIdx * 0.05 }}
                        className="flex items-center text-body-base text-khuta-neutral-700 dark:text-khuta-neutral-200" // Updated color
                      >
                        {CheckCircle && <CheckCircle className="w-5 h-5 text-khuta-secondary-500 ml-2 flex-shrink-0" />} {/* Updated color */}
                        <span>{task}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </motion.section>

      {/* Section 4: Micro Videos */}
      <motion.section {...sectionVariants} className="my-16 bg-khuta-primary-50 dark:bg-khuta-neutral-900 rounded-xl p-8 shadow-lg"> {/* Updated background color */}
        <h2 className="text-h3 text-khuta-primary-700 mb-8">نصائح سريعة لمهام احترافية (جلسات مصغرة)</h2> {/* Updated color */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {microVideos.map((video, index) => (
            <motion.div
              key={video.id}
              {...itemVariants}
              transition={{ ...itemVariants.transition, delay: index * 0.1 }}
              className="relative rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow
                         focus-within:outline-none focus-within:ring-2 focus-within:ring-khuta-accent-500 focus-within:ring-offset-2" // Updated focus ring color
              tabIndex="0"
              role="link"
              aria-label={`شاهد فيديو: ${video.title}`}
            >
              <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-20 transition-opacity">
                {PlayCircle && <PlayCircle className="w-16 h-16 text-white opacity-80" />}
              </div>
              <div className="p-4 bg-white dark:bg-khuta-neutral-800">
                <h3 className="font-semibold text-body-lg text-khuta-neutral-800 dark:text-khuta-neutral-100">{video.title}</h3> {/* Updated text color */}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Section 5: 1:1 Coaching */}
      <motion.section {...sectionVariants} className="my-16 text-center bg-gradient-to-br from-khuta-primary-600 to-khuta-secondary-600 rounded-xl p-10 shadow-xl"> {/* Updated gradient colors */}
        <h2 className="text-h2 text-white mb-4">هل تحتاج إلى دعم شخصي؟</h2>
        <p className="text-body-lg text-khuta-neutral-50 max-w-2xl mx-auto mb-8">
          احجز جلسة فردية عبر Zoom لمراجعة تقاريرك وعروضك التقديمية قبل تسليمها، وتلقي ملاحظات شخصية من خبراء الصناعة.
        </p>
        <button className="inline-flex items-center space-x-3 bg-white text-khuta-primary-600 px-8 py-4 rounded-full text-btn-lg font-bold shadow-lg hover:bg-khuta-neutral-100 hover:scale-105 transition-all duration-300
                           focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                aria-label="احجز جلستك الاستشارية الفردية الآن"
        >
          {Calendar && <Calendar className="w-7 h-7" />}
          <span>احجز جلستك الاستشارية الآن</span>
        </button>
      </motion.section>
    </AnimatedPage>
  );
};

export default PostEmploymentConsulting;