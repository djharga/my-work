// منصة خطى التعليمية - التطبيق الرئيسي (نسخة محسنة كاملة)
class KhutaEducationalPlatform {
    constructor() {
      // البيانات الأساسية
      this.currentUser = null;
      this.currentPage = 'home';
      this.isAuthenticated = false;
      this.courses = [];
      this.testimonials = [];
      this.filteredCourses = [];
      this.platform = {};
      // تهيئة التطبيق عند جاهزية الـDOM
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(() => this.init(), 100));
      } else {
        setTimeout(() => this.init(), 100);
      }
    }
  
    // تهيئة التطبيق
    init() {
      try {
        this.loadData();
        this.setupEventListeners();
        this.checkAuthentication();
        this.renderCurrentPage();
      } catch (error) {
        this.showNotification('حدث خطأ في تهيئة النظام', 'error');
        console.error('خطأ في التهيئة:', error);
      }
    }
  
    // تحميل بيانات أولية وهمية
    loadData() {
      const data = {
        platform: {
          name: "منصة خطى التعليمية",
          slogan: "نحو مستقبل أكثر إشراقاً في التعلم",
          description: "منصة تعليمية متطورة تهدف إلى تقديم أفضل الدورات التدريبية والبرامج التعليمية باللغة العربية",
          vision: "أن نكون الوجهة الأولى للتعلم الإلكتروني في المنطقة العربية",
          mission: "تقديم تعليم عالي الجودة ومتاح للجميع من خلال استخدام أحدث التقنيات التعليمية"
        },
        courses: [
          {
            id: 1, title: "أساسيات المراجعة الداخلية", description: "دورة شاملة تغطي المفاهيم الأساسية للمراجعة الداخلية ومعايير الممارسة المهنية",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400", duration: "40 ساعة", level: "مبتدئ", price: 750,
            instructor: "د. محمد أحمد السعدي", rating: 4.8, studentsCount: 1250,
            modules: [{ title: "مقدمة في المراجعة الداخلية", duration: "3 ساعات" }, { title: "معايير الممارسة المهنية", duration: "5 ساعات" }, { title: "تقييم المخاطر", duration: "4 ساعات" }, { title: "تخطيط المراجعة", duration: "6 ساعات" }]
          },
          {
            id: 2, title: "مهارات القيادة الإدارية", description: "تطوير المهارات القيادية الأساسية وفنون إدارة الفريق والتخطيط الاستراتيجي",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400", duration: "35 ساعة", level: "متوسط", price: 950,
            instructor: "أ. سارة محمد الزهراني", rating: 4.9, studentsCount: 890,
            modules: [{ title: "أسس القيادة الفعالة", duration: "4 ساعات" }, { title: "إدارة وتحفيز الفريق", duration: "5 ساعات" }, { title: "التخطيط والتنظيم", duration: "4 ساعات" }, { title: "اتخاذ القرارات", duration: "3 ساعات" }]
          },
          {
            id: 3, title: "إدارة المخاطر المؤسسية", description: "استراتيجيات تحديد وتقييم وإدارة المخاطر في البيئة المؤسسية المعاصرة",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400", duration: "50 ساعة", level: "متقدم", price: 1200,
            instructor: "د. عبدالله خالد المنصوري", rating: 4.7, studentsCount: 654,
            modules: [{ title: "مفاهيم إدارة المخاطر", duration: "6 ساعات" }, { title: "تحديد وتقييم المخاطر", duration: "8 ساعات" }, { title: "استراتيجيات التعامل مع المخاطر", duration: "7 ساعات" }, { title: "مراقبة وتقييم فعالية البرامج", duration: "5 ساعات" }]
          }
        ],
        testimonials: [
          {
            id: 1, name: "أحمد محمد العلي", role: "مراجع داخلي أول", company: "أرامكو السعودية",
            comment: "استفدت كثيراً من دورة المراجعة الداخلية. المحتوى عملي ومفيد جداً", rating: 5,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
          },
          {
            id: 2, name: "فاطمة سالم الأحمدي", role: "مديرة إدارية", company: "البنك الأهلي السعودي",
            comment: "دورة القيادة الإدارية غيرت مفهومي للإدارة. أنصح بها بشدة", rating: 5,
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
          },
          {
            id: 3, name: "خالد عبدالرحمن القحطاني", role: "مختص إدارة مخاطر", company: "مصرف الراجحي",
            comment: "محتوى متميز وشرح واضح. ساعدني كثيراً في عملي", rating: 4,
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
          }
        ]
      };
  
      this.courses = data.courses;
      this.testimonials = data.testimonials;
      this.filteredCourses = [...this.courses];
      this.platform = data.platform;
    }
  
    // مستمعات عامة للتفاعل والتنقل
    setupEventListeners() {
      setTimeout(() => {
        this.setupNavigation();
        this.setupAuthEvents();
        this.setupHomePageButtons();
        this.setupFiltersAndSearch();
        this.setupKeyboardAndMobile();
        this.setupAdminTabs();
      }, 200);
    }
  
    // التنقل بين الصفحات
    setupNavigation() {
      document.querySelectorAll('.nav-link, footer a[data-page]').forEach(link => {
        const page = link.getAttribute('data-page');
        if (page) {
          link.onclick = (e) => {
            e.preventDefault();
            this.navigateToPage(page);
          };
        }
      });
  
      const brand = document.querySelector('.nav-brand');
      if (brand) {
        brand.onclick = (e) => {
          e.preventDefault();
          this.navigateToPage('home');
        };
        brand.style.cursor = 'pointer';
      }
    }
  
    // زر الصفحة الرئيسية "ابدأ الآن" وأزرار تصفح الدورات
    setupHomePageButtons() {
      const startBtn = document.getElementById('start-now-btn');
      if (startBtn) startBtn.onclick = (e) => { e.preventDefault(); this.navigateToPage('courses'); };
  
      document.querySelectorAll('[data-page="courses"]').forEach(btn => {
        btn.onclick = (e) => { e.preventDefault(); this.navigateToPage('courses'); btn.style.cursor = 'pointer'; };
      });
  
      // زر تسجيل القيادة
      const leadershipBtn = document.getElementById('register-leadership-btn');
      if (leadershipBtn) leadershipBtn.onclick = (e) => {
        e.preventDefault();
        if (!this.isAuthenticated) this.showAuthModal();
        else this.showNotification('تم التسجيل في برنامج القيادة بنجاح!', 'success');
      };
    }
  
    // مستمعات واجهة المصادقة
    setupAuthEvents() {
      const authBtn = document.getElementById('auth-btn');
      if (authBtn) authBtn.onclick = (e) => { e.preventDefault(); this.showAuthModal(); };
  
      ['modal-close', 'modal-backdrop'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.onclick = (e) => { e.preventDefault(); this.hideAuthModal(); };
      });
  
      const authForm = document.getElementById('auth-form');
      if (authForm) authForm.onsubmit = (e) => { e.preventDefault(); this.handleAuth(); };
  
      const logoutBtn = document.getElementById('logout-btn');
      if (logoutBtn) logoutBtn.onclick = (e) => { e.preventDefault(); this.logout(); };
  
      this.setupAuthSwitchButton();
    }
    setupAuthSwitchButton() {
      const switchBtn = document.getElementById('auth-switch-btn');
      if (switchBtn) switchBtn.onclick = (e) => { e.preventDefault(); this.toggleAuthMode(); };
    }
  
    // البحث والتصفية
    setupFiltersAndSearch() {
      const searchInput = document.querySelector('.search-input');
      if (searchInput) searchInput.oninput = (e) => this.searchCourses(e.target.value);
  
      const sortSelect = document.getElementById('sort-select');
      if (sortSelect) sortSelect.onchange = (e) => this.sortCourses(e.target.value);
  
      // تصفية بالفئات/المستوى بشكل ديناميكي
      document.querySelectorAll('#categories-filter input, #level-filter input').forEach(checkbox => {
        checkbox.onchange = () => this.filterCourses();
      });
    }
  
    // دعم الهاتف ولوحة المفاتيح
    setupKeyboardAndMobile() {
      const mobileToggle = document.getElementById('mobile-menu-toggle');
      const navMenu = document.getElementById('nav-menu');
      if (mobileToggle && navMenu) mobileToggle.onclick = () => navMenu.classList.toggle('active');
  
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          ['auth-modal', 'course-detail-modal'].forEach(id => {
            const modal = document.getElementById(id);
            if (modal && !modal.classList.contains('hidden')) modal.classList.add('hidden');
          });
        }
      });
    }
  
    // علامات التبويب الجانبية
    setupAdminTabs() {
      document.querySelectorAll('.sidebar-link').forEach(link => {
        link.onclick = (e) => {
          e.preventDefault();
          const tab = link.getAttribute('data-admin-tab');
          if (tab) this.switchAdminTab(tab);
        };
      });
    }
  
    checkAuthentication() {
      this.isAuthenticated = false;
      this.updateAuthUI();
    }
    showAuthModal() {
      const modal = document.getElementById('auth-modal');
      if (modal) modal.classList.remove('hidden');
    }
    hideAuthModal() {
      const modal = document.getElementById('auth-modal');
      if (modal) modal.classList.add('hidden');
    }
    toggleAuthMode() {
      const title = document.getElementById('auth-modal-title');
      const submitBtn = document.getElementById('auth-submit');
      const switchText = document.getElementById('auth-switch-text');
      const registerFields = document.querySelectorAll('.register-only');
  
      if (!title || !submitBtn || !switchText) return;
      const isLogin = title.textContent === 'تسجيل الدخول';
      if (isLogin) {
        title.textContent = 'إنشاء حساب جديد';
        submitBtn.textContent = 'إنشاء الحساب';
        switchText.innerHTML = 'لديك حساب بالفعل؟ <button class="link-btn" id="auth-switch-btn">سجل دخولك</button>';
        registerFields.forEach(field => field.classList.remove('hidden'));
      } else {
        title.textContent = 'تسجيل الدخول';
        submitBtn.textContent = 'تسجيل الدخول';
        switchText.innerHTML = 'ليس لديك حساب؟ <button class="link-btn" id="auth-switch-btn">سجل الآن</button>';
        registerFields.forEach(field => field.classList.add('hidden'));
      }
      setTimeout(() => this.setupAuthSwitchButton(), 100);
    }
    handleAuth() {
      const emailInput = document.getElementById('email-input');
      const passwordInput = document.getElementById('password-input');
      const nameInput = document.getElementById('name-input');
      if (!emailInput || !passwordInput) return;
      this.showLoading();
      setTimeout(() => {
        this.currentUser = { name: nameInput?.value || 'مستخدم جديد', email: emailInput.value, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=center' };
        this.isAuthenticated = true;
        this.updateAuthUI();
        this.hideAuthModal();
        this.hideLoading();
        this.showNotification('تم تسجيل الدخول بنجاح!', 'success');
      }, 700);
    }
    logout() {
      this.currentUser = null;
      this.isAuthenticated = false;
      this.updateAuthUI();
      this.navigateToPage('home');
      this.showNotification('تم تسجيل الخروج بنجاح!', 'info');
    }
    updateAuthUI() {
      const authBtn = document.getElementById('auth-btn');
      const userMenu = document.getElementById('user-menu');
      [authBtn].forEach(btn => btn?.classList.toggle('hidden', this.isAuthenticated));
      userMenu?.classList.toggle('hidden', !this.isAuthenticated);
  
      document.querySelectorAll('.auth-required').forEach(el => el.classList.toggle('hidden', !this.isAuthenticated));
      document.querySelectorAll('.admin-only').forEach(el => el.classList.toggle('hidden', !this.isAuthenticated));
  
      if (userMenu && this.currentUser) {
        const userName = userMenu.querySelector('.user-name');
        const userAvatar = userMenu.querySelector('.user-avatar');
        if (userName) userName.textContent = this.currentUser.name;
        if (userAvatar) userAvatar.src = this.currentUser.avatar;
      }
    }
    navigateToPage(pageName) {
      // حماية الصفحات الخاصة
      if (['progress', 'admin'].includes(pageName) && !this.isAuthenticated) {
        this.showAuthModal();
        return;
      }
      document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
      const targetPage = document.getElementById(`${pageName}-page`);
      targetPage?.classList.add('active');
      document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[data-page="${pageName}"]`);
      activeLink?.classList.add('active');
      this.currentPage = pageName;
      setTimeout(() => this.renderCurrentPage(), 100);
      window.scrollTo(0, 0);
    }
    renderCurrentPage() {
      switch (this.currentPage) {
        case 'home': this.renderHomePage(); break;
        case 'courses': this.renderCoursesPage(); break;
        case 'progress': this.renderProgressPage(); break;
        case 'admin': this.renderAdminPage(); break;
      }
    }
    renderHomePage() {
      this.renderFeaturedCourses();
      this.renderTestimonials();
    }
    renderFeaturedCourses() {
      const container = document.getElementById('courses-preview');
      if (!container) return;
      const featuredCourses = this.courses.slice(0, 3);
      container.innerHTML = featuredCourses.map(course => this.createCourseCard(course)).join('');
      this.attachCourseCardListeners(container);
    }
    renderTestimonials() {
      const container = document.getElementById('testimonials-grid');
      if (!container) return;
      container.innerHTML = this.testimonials.map(testimonial => `
        <div class="testimonial-card">
          <div class="testimonial-comment">"${testimonial.comment}"</div>
          <div class="testimonial-author">
            <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar">
            <div class="author-info">
              <h4>${testimonial.name}</h4>
              <div class="author-role">${testimonial.role} - ${testimonial.company}</div>
            </div>
          </div>
        </div>
      `).join('');
    }
    renderCoursesPage() {
      this.renderCourseFilters();
      this.renderCourses();
    }
    renderCourseFilters() {
      const container = document.getElementById('categories-filter');
      if (!container) return;
      const categories = ['المراجعة الداخلية', 'القيادة الإدارية', 'إدارة المخاطر'];
      container.innerHTML = categories.map(category => `
        <label class="filter-option">
          <input type="checkbox" value="${category}">
          <span>${category}</span>
        </label>
      `).join('');
      container.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.onchange = () => this.filterCourses();
      });
      document.querySelectorAll('#level-filter input[type="checkbox"]').forEach(checkbox => {
        checkbox.onchange = () => this.filterCourses();
      });
    }
    renderCourses() {
      const container = document.getElementById('courses-grid');
      if (!container) return;
      container.innerHTML = this.filteredCourses.map(course => this.createCourseCard(course)).join('');
      this.attachCourseCardListeners(container);
    }
    attachCourseCardListeners(container) {
      container.querySelectorAll('.course-detail-btn').forEach(btn => {
        btn.onclick = (e) => {
          e.preventDefault();
          this.showCourseDetail(parseInt(btn.getAttribute('data-course-id')));
        };
      });
    }
    createCourseCard(course) {
      const stars = '★'.repeat(Math.floor(course.rating)) + '☆'.repeat(5 - Math.floor(course.rating));
      return `
        <div class="course-card">
          <img src="${course.image}" alt="${course.title}" class="course-thumbnail" loading="lazy">
          <div class="course-info">
            <div class="course-category">دورة تدريبية</div>
            <h3 class="course-title">${course.title}</h3>
            <p class="course-description">${course.description}</p>
            <div class="course-instructor">المدرب: ${course.instructor}</div>
            <div class="course-meta">
              <div class="course-rating">
                <span class="rating-stars">${stars}</span>
                <span class="rating-text">${course.rating} (${course.studentsCount} متدرب)</span>
              </div>
              <div class="course-level">${course.level}</div>
            </div>
            <div class="course-footer">
              <div class="course-price">${course.price} ريال</div>
              <button class="btn btn-primary course-detail-btn" data-course-id="${course.id}">اشترك</button>
            </div>
          </div>
        </div>
      `;
    }
  
    showCourseDetail(courseId) {
      const course = this.courses.find(c => c.id === courseId);
      if (!course) return;
      const modal = document.getElementById('course-detail-modal');
      const content = document.getElementById('course-detail-content');
      const title = document.getElementById('course-detail-title');
      if (!modal || !content || !title) return;
      title.textContent = course.title;
      content.innerHTML = `
        <div class="course-detail-info">
          <img src="${course.image}" alt="${course.title}" style="width:100%;height:200px;object-fit:cover;border-radius:8px;margin-bottom:16px;">
          <h3>${course.title}</h3>
          <p>${course.description}</p>
          <div class="course-meta-detail">
            <div><strong>المدرب:</strong> ${course.instructor}</div>
            <div><strong>المدة:</strong> ${course.duration}</div>
            <div><strong>المستوى:</strong> ${course.level}</div>
            <div><strong>التقييم:</strong> ${course.rating}/5 (${course.studentsCount} متدرب)</div>
            <div><strong>السعر:</strong> ${course.price} ريال</div>
          </div>
          <h4>محتوى الدورة:</h4>
          <ul>
            ${course.modules.map(module => `<li>${module.title} - ${module.duration}</li>`).join('')}
          </ul>
          <button class="btn btn-primary full-width enroll-btn" data-course-id="${course.id}">
            ${this.isAuthenticated ? 'التسجيل في الدورة' : 'سجل دخولك أولاً'}
          </button>
        </div>
      `;
      modal.classList.remove('hidden');
      document.getElementById('course-detail-close')?.addEventListener('click', () => this.hideCourseModal());
      modal.querySelector('.modal-backdrop')?.addEventListener('click', () => this.hideCourseModal());
      content.querySelector('.enroll-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        this.enrollCourse(course.id);
      });
    }
    hideCourseModal() {
      document.getElementById('course-detail-modal')?.classList.add('hidden');
    }
    enrollCourse(courseId) {
      if (!this.isAuthenticated) {
        this.hideCourseModal();
        this.showAuthModal();
        return;
      }
      this.showLoading();
      setTimeout(() => {
        this.hideLoading();
        this.hideCourseModal();
        this.showNotification('تم التسجيل في الدورة بنجاح!', 'success');
      }, 900);
    }
    renderProgressPage() {
      const container = document.getElementById('enrolled-courses');
      if (!container || !this.isAuthenticated) return;
      // دورات المستخدم الافتراضية
      const userCourses = [ { ...this.courses[0], progress: 75, completedModules: 3 }, { ...this.courses[1], progress: 40, completedModules: 1 } ];
      container.innerHTML = userCourses.map(course => `
        <div class="progress-card">
          <div class="progress-card-header">
            <img src="${course.image}" alt="${course.title}" class="progress-thumbnail">
            <div class="progress-info">
              <h3>${course.title}</h3>
              <div class="progress-modules">${course.completedModules}/${course.modules.length} وحدات مكتملة</div>
            </div>
          </div>
          <div class="progress-bar"><div class="progress-fill" style="width:${course.progress}%"></div></div>
          <div class="progress-percentage">${course.progress}% مكتمل</div>
        </div>
      `).join('');
    }
    renderAdminPage() { this.switchAdminTab('dashboard'); }
    switchAdminTab(tabName) {
      document.querySelectorAll('.admin-tab').forEach(tab => tab.classList.remove('active'));
      document.getElementById(`${tabName}-tab`)?.classList.add('active');
      document.querySelectorAll('.sidebar-link').forEach(link => link.classList.remove('active'));
      document.querySelector(`.sidebar-link[data-admin-tab="${tabName}"]`)?.classList.add('active');
    }
    searchCourses(query) {
      this.filteredCourses = !query.trim() ? [...this.courses]
        : this.courses.filter(course =>
          course.title.includes(query) || course.description.includes(query) || course.instructor.includes(query));
      if (this.currentPage === 'courses') this.renderCourses();
    }
    filterCourses() {
      const selectedCategories = Array.from(document.querySelectorAll('#categories-filter input:checked')).map(input => input.value);
      const selectedLevels = Array.from(document.querySelectorAll('#level-filter input:checked')).map(input => input.value);
      this.filteredCourses = this.courses.filter(course => {
        const categoryMatch = !selectedCategories.length || selectedCategories.some(cat => course.title.includes(cat.split(' ')[0]));
        const levelMatch = !selectedLevels.length || selectedLevels.includes(course.level);
        return categoryMatch && levelMatch;
      });
      if (this.currentPage === 'courses') this.renderCourses();
    }
    sortCourses(sortBy) {
      switch (sortBy) {
        case 'rating': this.filteredCourses.sort((a, b) => b.rating - a.rating); break;
        case 'students': this.filteredCourses.sort((a, b) => b.studentsCount - a.studentsCount); break;
        case 'price': this.filteredCourses.sort((a, b) => a.price - b.price); break;
        case 'recent': this.filteredCourses.sort((a, b) => b.id - a.id); break;
      }
      if (this.currentPage === 'courses') this.renderCourses();
    }
    showLoading() { document.getElementById('loading-overlay')?.classList.remove('hidden'); }
    hideLoading() { document.getElementById('loading-overlay')?.classList.add('hidden'); }
    showNotification(message, type = 'info') {
      const notification = document.createElement('div');
      notification.className = `notification ${type}`;
      notification.style.cssText = `
        position: fixed; top: 90px; right: 20px; background: var(--color-${type === 'success' ? 'success' : type === 'error' ? 'error' : 'primary'});
        color: white; padding: 14px 24px; border-radius: 8px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); z-index:9999; animation: slideInRight 0.3s;
        font-family: Tajawal,Arial,sans-serif; direction: rtl; text-align: right; max-width: 300px; word-wrap: break-word;
      `;
      notification.textContent = message;
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s';
        setTimeout(() => notification.remove(), 300);
      }, 2800);
    }
  }
  
  let app;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { app = new KhutaEducationalPlatform(); });
  } else { app = new KhutaEducationalPlatform(); }
  
  // أنيميشن CSS حديث - تظهر للـNotifications والكروت
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight { from { transform: translateX(100%); opacity:0; } to { transform:translateX(0); opacity:1; } }
    @keyframes slideOutRight { from{transform:translateX(0); opacity:1;} to{transform:translateX(100%); opacity:0;} }
    .course-card:hover {transform:translateY(-2px);box-shadow:0 10px 15px -3px rgba(0,0,0,0.16);}
    .btn:hover {transform:translateY(-1px);}
    .nav-brand:hover {opacity:0.86;}
    .sidebar-link:hover, .nav-link:hover {transform:translateX(-2px);}
    @media (max-width:768px){
      .nav-menu.active{display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:var(--color-surface);box-shadow:var(--shadow-lg);padding:var(--space-md);border-radius:0 0 var(--radius-lg) var(--radius-lg);}
    }
    .course-meta-detail{background:var(--bg-1);padding:var(--space-md);border-radius:var(--radius-base);}
    .course-meta-detail div{margin-bottom:var(--space-xs);}
  `;
  document.head.appendChild(style);
  