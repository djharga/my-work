# Khuta React Platform - MVP

نسخة MVP للواجهة الأمامية لمنصة "خطى" باستخدام React 18 + Vite + TailwindCSS.

التشغيل المحلي

1. تثبيت الحزم

```
npm install
```

2. تشغيل وضع التطوير

```
npm run dev
```

3. بناء للإنتاج

```
npm run build
```

اختبار سريع للميزات

- افتح `http://localhost:5173` (أو العنوان الذي يقدمه Vite).
- انتقل إلى الصفحة الرئيسية: تحقق من ظهور Hero والقوائم.
- اذهب إلى `الدورات` ثم افتح دورة (اضغط "تصفح") → يجب أن تصل إلى صفحة التفاصيل.
- اضغط "احصل على نسختي" في صفحة الدورة → سينشئ مفتاح في localStorage باسم `user_copy_guest_{courseId}` ويعرض رسالة ناجحة.
- اذهب إلى `Profile` لعرض النسخ المحلية و"مساحة التخزين" المحاكاة.
- افتح ملف PDF غير محمي من شجرة الملفات → يعرض معاينة modal (محاكاة) وتمنع scroll الخلفية.
- افتح ملف محمي → يظهر تحذير "محمي - تنزيل غير متاح" (محاكاة).
- ادخل لوحة الإدارة (`Admin`) لترى `AIPanel` وأزرار محاكاة الذكاء الاصطناعي.

ملاحظات أمنية / متطلبات خادم لاحقة

- الحماية الحالية للملفات عبارة عن محاكاة client-side فقط. لتأمين الملفات تحتاج:
  - تحقق server-side (authenticated endpoints).
  - روابط مؤقتة موقعة (signed URLs) لتنزيل المحتوى.
  - DRM أو مشغل آمن للفيديوات الحساسة إذا لزم.
  - نظام تخزين مركزي مع حسابات ومساحات لكل مستخدم (لتطبيق quota حقيقي 5GB).

معايير القبول

- التطبيق يعمل محلياً دون أخطاء استيراد بعد اتباع خطوات التشغيل أعلاه.
- وجود الروتنج والصفحات المذكورة: Home / Courses / CourseDetail / Fellowship / About / Contact / Login / Profile / Admin.
- زر "احصل على نسختي" ينشئ نسخة في localStorage.
- FileTreeViewer يعرض معاينات محاكاة للـ PDF ويمنع التنزيل للملفات المحمية عبر تحذير.
- AIPanel يُنتج مخرجات محاكاة ويقبل رفع ملف (يحفظ اسم الملف محلياً في الواجهة فقط).

ملفات مهمة

- `src/context/CourseContext.jsx` — يحتوي بيانات الدورات وواجهات لإنشاء/قائمة النسخ المحلية.
- `src/components/FileTreeViewer.jsx` — معاينة ملفات وواجهة تتبع.
- `src/components/ProtectedFileView.jsx` — يعرض رسالة حماية (client-side).

إذا رغبت أستطيع الآن:
- إضافة Tailwind RTL plugin وتعديل الـ config لواجهة RTL كاملة.
- ربط AIPanel في صفحة أخرى أو توسيع وظائف الـ Admin (CRUD واقعي).

Development & Demo Controls
---------------------------------
- A demo panel (`DemoControls`) is available in development mode to simulate login/logout without changing code. It is rendered when `NODE_ENV === 'development'` and appears as a floating panel in the bottom-left corner.

Authentication
---------------------------------
- Auth is now centralized via `src/context/AuthContext.jsx` which exposes `useAuth()` for components. Authentication state is simulated for the MVP. Protected routes use `ProtectedRoute` to guard access to private paths like `/dashboard`, `/portfolio`, `/team-workspace`, and content routes.

Project Structure (short)
---------------------------------
- `src/pages/` — top-level pages (HomePage, CourseDetailPage, PortfolioPage, TeamWorkspace, etc.)
- `src/components/` — reusable components (`CourseCard`, `FileTreeViewer`, `AIPanel`, `ContentViewer`, `DemoControls`, etc.)
- `src/context/` — `CourseContext`, `AuthContext`

How to test auth flow
---------------------------------
1. Run `npm run dev`.
2. Visit a protected page (e.g. `/dashboard`) → you should be redirected to `/login` if not authenticated.
3. Use the floating Demo Controls (dev mode) or the Login page to simulate login. After login, protected routes become accessible.

Notes on Final Delivery
---------------------------------
- Debug `console.log` statements removed where present. Comments were added sparingly for complex logic only.

If you want, I can now run a quick visual pass to adjust any remaining spacing inconsistencies or generate a final style audit report. 