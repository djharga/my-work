import React from 'react';
import { Link } from 'react-router-dom';
import LogoImg from '../img/ac3c533b-028a-441c-8ae5-2f1bc5601c3d.png';

const footerLinks = {
  quick: [
    { to: '/courses', label: 'الدورات' },
    { to: '/fellowship', label: 'الزمالة' },
    { to: '/about', label: 'من نحن' },
    { to: '/contact', label: 'اتصل بنا' },
  ],
  legal: [
    { to: '/privacy', label: 'سياسة الخصوصية' },
    { to: '/terms', label: 'الشروط والأحكام' },
  ]
};

const SocialLink = ({ href, label, icon }) => (
  <a 
    href={href} 
    aria-label={label} 
    className="flex items-center gap-2 text-sm text-khuta-secondary hover:text-khuta-primary transition-colors duration-150"
  >
    {icon}
    <span>{label}</span>
  </a>
);

const FooterLink = ({ to, label }) => (
  <li>
    <Link
      to={to}
      className="text-sm text-khuta-secondary hover:text-khuta-primary transition-colors duration-150 rounded px-1 py-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-khuta-secondary"
    >
      {label}
    </Link>
  </li>
);

export default function Footer() {
  return (
    <footer className="relative mt-16 bg-khuta-background border-t border-khuta-neutral overflow-hidden">
      <div className="container mx-auto px-4 py-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <img src={LogoImg} alt="شعار منصة خطى" className="w-9 h-9 rounded-full" />
              <span className="text-2xl font-extrabold text-khuta-primary tracking-tight">منصة خطى</span>
            </div>
            <p className="mt-3 text-sm text-khuta-secondary max-w-xs leading-relaxed">
              منصة تعليمية متطورة باللغة العربية، تركز على التجربة العملية والاحترافية.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-khuta-primary mb-3">روابط سريعة</h3>
            <ul className="space-y-2">
              {footerLinks.quick.map(link => <FooterLink key={link.to} {...link} />)}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-khuta-primary mb-3">تواصل معنا</h3>
            <div className="space-y-3">
              <SocialLink 
                href="mailto:support@khuta.com" 
                label="support@khuta.com"
                icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
              />
              <SocialLink 
                href="https://wa.me/966000000000" // Replace with actual WhatsApp number
                label="WhatsApp"
                icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" /></svg>}
              />
            </div>
          </div>
        </div>

        {/* Bottom Row: Copyright & Legal */}
        <div className="mt-10 pt-6 border-t border-khuta-neutral text-xs text-khuta-secondary flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} منصة خطى. جميع الحقوق محفوظة.</p>
          <ul className="flex items-center gap-4">
            {footerLinks.legal.map(link => <FooterLink key={link.to} {...link} />)}
          </ul>
        </div>
      </div>
    </footer>
  );
}