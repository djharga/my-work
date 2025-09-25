import React, { useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpenCheck, 
  Wand2, 
  Users, 
  Eye, 
  Target, 
  Award, 
  Phone, 
  Mail,
  AlertCircle 
} from 'lucide-react';
import { sectionVariants, itemVariants } from '../utils/animationVariants';
import AnimatedPage from '../components/AnimatedPage';

// مكونات الأيقونات المحسّنة
const iconComponents = {
  BookOpenCheck,
  Wand2,
  Users,
  Eye,
  Target,
  Award,
  Phone,
  Mail,
  AlertCircle
};



// مكوّن الأيقونة مع معالجة الأخطاء
const SafeIcon = ({ iconName, className, fallback = null }) => {
  const IconComponent = iconComponents[iconName];
  
  if (!IconComponent) {
    return fallback || (
      <div className={`${className} bg-gray-200 dark:bg-gray-600 rounded-md flex items-center justify-center`}>
        <AlertCircle className="w-8 h-8 text-gray-400" />
      </div>
    );
  }
  
  return <IconComponent className={className} />;
};

// تحسين الأداء للبيانات
const useStaticData = () => {
  const keyPillars = useMemo(() => [
    { 
      icon: 'BookOpenCheck', 
      title: 'محتوى واقعي',
      description: 'محتوى تدريبي مستمد من الواقع العملي'
    },
    { 
      icon: 'Wand2', 
      title: 'أدوات ذكية',
      description: 'تقنيات وأدوات حديثة تعتمد على الذكاء الاصطناعي'
    },
    { 
      icon: 'Users', 
      title: 'دعم شخصي',
      description: 'مرافقة شخصية ودعم مستمر طوال رحلة التعلم'
    },
  ], []);

  const visionMissionGoals = useMemo(() => [
    {
      id: 'vision',
      icon: 'Eye',
      color: 'text-khuta-primary-600',
      bgColor: 'bg-khuta-primary-50 dark:bg-khuta-primary-900/20',
      title: 'الرؤية',
      text: 'أن نصبح المنصة العربية الرائدة في تعليم وتطوير مهارات الشباب لمواكبة سوق العمل، وأن نكون الشريك الاستراتيجي الأول للشركات والمؤسسات في بناء جيل قادة يلبي احتياجات السوق السعودي.',
    },
    {
      id: 'mission',
      icon: 'Target',
      color: 'text-khuta-secondary-600',
      bgColor: 'bg-khuta-secondary-50 dark:bg-khuta-secondary-900/20',
      title: 'الرسالة',
      text: 'نسعى لتمكين الخريجين ورواد الأعمال من امتلاك المهارات والأدوات اللازمة لرفع جودة أعمال الشركات عبر برامج تدريبية متكاملة، ودروس تطبيقية، وحالات عملية مستمدة من الواقع.',
    },
    {
      id: 'goals',
      icon: 'Award',
      color: 'text-khuta-accent-600',
      bgColor: 'bg-khuta-accent-50 dark:bg-khuta-accent-900/20',
      title: 'الأهداف',
      text: 'توفير محتوى تدريبي احترافي يدمج بين الجانب النظري والتطبيق العملي. تسهيل الوصول إلى المعرفة عبر منصة مرنة ومتطورة. تقديم حالات عملية واقعية من بيئات العمل السعودية والعربية.',
    },
  ], []);

  return { keyPillars, visionMissionGoals };
};

// معالج النقر على روابط التواصل
const handleContactClick = (type, value) => {
  // تتبع التحليلات (يمكن إضافة Google Analytics هنا)
  console.log(`Contact clicked: ${type} - ${value}`);
  
  if (type === 'phone') {
    window.open(`tel:${value}`, '_self');
  } else if (type === 'email') {
    window.open(`mailto:${value}`, '_self');
  }
};

// تنسيق رقم الهاتف
const formatPhoneNumber = (phone) => {
  return phone.replace(/(\d{3})(\d{2})(\d{3})(\d{4})/, '+$1 $2 $3 $4');
};

const AboutUsPage = () => {
  const { keyPillars, visionMissionGoals } = useStaticData();

  // تحسين SEO والميتا تاجز
  useEffect(() => {
    document.title = 'من نحن - منصة خطى للتعليم والتدريب والاستشارات';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'اكتشف منصة خطى العربية الرائدة في تعليم مهارات الأعمال والتدريب العملي. تعلم من خلال المحتوى الواقعي والأدوات الذكية مع الدعم الشخصي المتخصص.');
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'منصة خطى، تعليم، تدريب، استشارات، مهارات الأعمال، التعليم العربي، التدريب المهني');
    }

    // إضافة structured data لتحسين SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "منصة خطى للتعليم والتدريب والاستشارات",
      "description": "منصة عربية رائدة في تعليم وتطوير مهارات الأعمال",
      "url": window.location.href,
      "telephone": "+966500000000",
      "email": "info@khuta.com"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <AnimatedPage>
      <main id="main-content">
        {/* القسم الأول: القسم الرئيسي */}
        <motion.section 
          {...sectionVariants} 
          className="pt-24 pb-28 text-center bg-gradient-to-br from-khuta-primary/10 via-blue-50/50 to-khuta-accent/10 dark:from-khuta-neutral-900 dark:via-blue-950/30 dark:to-khuta-accent/10 rounded-b-3xl mb-24 shadow-lg relative overflow-hidden"
        >
          {/* خلفية ديكورية */}
          <div className="absolute inset-0 bg-[url('/path-to-pattern.svg')] opacity-10 dark:opacity-20"></div>
          
          <div className="relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl text-khuta-primary leading-tight mb-6 font-extrabold tracking-tight"
              id="main-heading"
            >
              منصة خطى للتعليم والتدريب والاستشارات
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-800 dark:text-gray-200 max-w-4xl mx-auto font-semibold leading-relaxed"
            >
              تعليم وتدريب بلا حدود • رحلتك نحو الاحتراف تبدأ هنا
            </motion.p>
          </div>

        </motion.section>

        {/* القسم الثاني: الركائز الأساسية */}
        <motion.section {...sectionVariants} className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyPillars.map((pillar, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="p-8 bg-white dark:bg-khuta-neutral-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-center mb-5">
                  <div className="p-4 bg-khuta-primary/10 dark:bg-khuta-primary/20 rounded-full">
                    <SafeIcon iconName={pillar.icon} className="w-10 h-10 text-khuta-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center text-khuta-primary mb-3">{pillar.title}</h3>
                <p className="text-center text-gray-600 dark:text-gray-300">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* القسم الثالث: الرؤية، الرسالة، الأهداف */}
        <motion.section {...sectionVariants} className="space-y-12 mb-24">
          {visionMissionGoals.map((item) => (
            <motion.div 
              key={item.id}
              variants={itemVariants}
              className={`p-8 rounded-2xl shadow-lg ${item.bgColor} border-r-4 ${item.color.replace('text-', 'border-')}`}
            >
              <div className="flex items-center mb-4">
                <SafeIcon iconName={item.icon} className={`w-10 h-10 ${item.color} ml-4`} />
                <h2 className={`text-3xl font-bold ${item.color}`}>{item.title}</h2>
              </div>
              <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* القسم الرابع: تواصل معنا */}
        <motion.section 
          {...sectionVariants} 
          className="p-10 bg-gradient-to-tr from-khuta-secondary/10 to-khuta-accent/10 dark:from-khuta-secondary/20 dark:to-khuta-accent/20 rounded-2xl shadow-inner text-center"
        >
          <h2 className="text-4xl font-bold text-khuta-primary mb-4">هل لديك استفسار؟</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            فريقنا جاهز للإجابة على جميع أسئلتك ومساعدتك في اختيار المسار الأنسب لك.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleContactClick('phone', '+966500000000')}
              className="flex items-center gap-3 px-8 py-4 bg-khuta-primary text-white font-semibold rounded-full shadow-lg hover:bg-khuta-primary/90 transition-all"
            >
              <Phone className="w-6 h-6" />
              <span>{formatPhoneNumber('+966500000000')}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleContactClick('email', 'info@khuta.com')}
              className="flex items-center gap-3 px-8 py-4 bg-khuta-secondary text-white font-semibold rounded-full shadow-lg hover:bg-khuta-secondary/90 transition-all"
            >
              <Mail className="w-6 h-6" />
              <span>info@khuta.com</span>
            </motion.button>
          </div>
        </motion.section>
      </main>
    </AnimatedPage>
  );
};

export default AboutUsPage;
