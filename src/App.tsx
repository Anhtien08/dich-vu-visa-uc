import { useState } from 'react';
import { Globe, Mail, MessageCircle, Phone } from 'lucide-react';
import { Language, PointsAssessmentSummary, ScreenId, VisaSubclass } from './types';
import { ASSETS, BUSINESS_INFO, SERVICE_DISCLOSURE, UI_COPY } from './data/visaData';
import { TopBar } from './components/TopBar';
import { OverviewScreen } from './components/OverviewScreen';
import { PathwaysScreen } from './components/PathwaysScreen';
import { CalculatorScreen } from './components/CalculatorScreen';
import { ConsultationScreen } from './components/ConsultationScreen';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('overview');
  const [lang, setLang] = useState<Language>('vi');
  const [selectedVisa, setSelectedVisa] = useState<VisaSubclass | null>(null);
  const [consultSubclass, setConsultSubclass] = useState<string | undefined>(undefined);
  const [pointsSummary, setPointsSummary] = useState<PointsAssessmentSummary | null>(null);

  const navigate = (screen: ScreenId) => {
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToDisclosure = () => {
    if (activeScreen !== 'overview') {
      setActiveScreen('overview');
      setTimeout(() => {
        document.getElementById('thong-tin-dich-vu')?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      document.getElementById('thong-tin-dich-vu')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectVisaFromOverview = (visa: VisaSubclass) => {
    setSelectedVisa(visa);
    navigate('pathways');
  };

  const handleStartConsultationForVisa = (subclass: string) => {
    setConsultSubclass(subclass);
    navigate('consultation');
  };

  const handleBookWithAssessment = (summary: PointsAssessmentSummary) => {
    setPointsSummary(summary);
    setConsultSubclass(summary.targetSubclass);
    navigate('consultation');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      <TopBar activeScreen={activeScreen} onNavigate={navigate} lang={lang} />

      <main className="flex-1">
        {activeScreen === 'overview' && (
          <OverviewScreen
            lang={lang}
            onChangeLang={setLang}
            onNavigate={navigate}
            onSelectVisa={handleSelectVisaFromOverview}
            onStartConsultationForVisa={handleStartConsultationForVisa}
          />
        )}

        {activeScreen === 'pathways' && (
          <PathwaysScreen
            lang={lang}
            selectedVisa={selectedVisa}
            onSelectVisa={(visa) => setSelectedVisa(visa)}
            onNavigate={navigate}
            onStartConsultationForVisa={handleStartConsultationForVisa}
          />
        )}

        {activeScreen === 'calculator' && (
          <CalculatorScreen
            lang={lang}
            onBookWithAssessment={handleBookWithAssessment}
          />
        )}

        {activeScreen === 'consultation' && (
          <ConsultationScreen
            lang={lang}
            initialSubclass={consultSubclass}
            pointsSummary={pointsSummary}
            onNavigate={navigate}
          />
        )}
      </main>

      {/* Footer matching Visa5S deep navy & red logo aesthetic */}
      <footer className="bg-[#101157] text-slate-200 mt-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 pt-12 pb-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
            {/* Column 1: White badge logo + concise service summary + EN/VI language selector */}
            <div className="md:col-span-5 space-y-5">
              <div className="inline-block bg-white rounded-xl px-3.5 py-2 shadow-sm">
                <img
                  src={ASSETS.logo}
                  alt="Visa5S — Hãy Đến Nơi Nào Bạn Muốn"
                  referrerPolicy="no-referrer"
                  className="h-11 w-auto object-contain"
                />
              </div>

              <p className="text-sm text-slate-200 leading-relaxed max-w-md">
                {lang === 'vi'
                  ? 'Đơn vị tư vấn dịch vụ tư nhân hỗ trợ chuẩn bị hồ sơ Visa Úc: Du lịch (Subclass 600), Thăm thân, Công tác và Du học. Tách biệt rõ phí dịch vụ và lệ phí Chính phủ Úc.'
                  : 'Independent private consultancy assisting with Australian visa documentation: Tourist (Subclass 600), Family Visit, Business, and Student streams.'}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-200">
                  <Globe className="w-4 h-4 text-[#F87171]" />
                  <span>
                    {lang === 'vi' ? 'Ngôn ngữ cổng thông tin' : 'Portal language'}
                  </span>
                </span>
                <div
                  role="group"
                  aria-label="Ngôn ngữ cổng thông tin"
                  className="inline-flex items-center p-1 rounded-lg bg-[#090A3E] border border-white/15"
                >
                  <button
                    type="button"
                    onClick={() => setLang('en')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                      lang === 'en'
                        ? 'bg-[#E11D24] text-white'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang('vi')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                      lang === 'vi'
                        ? 'bg-[#E11D24] text-white'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    VI
                  </button>
                </div>
              </div>
            </div>

            {/* Column 2: Danh mục chính */}
            <div className="md:col-span-3 space-y-3.5">
              <h2 className="text-sm font-bold text-[#F87171]">
                {lang === 'vi' ? 'Danh mục chính' : 'Main Navigation'}
              </h2>
              <ul className="space-y-2.5 text-sm text-slate-200">
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('overview')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {UI_COPY.nav.overview[lang]}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('pathways')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {UI_COPY.nav.pathways[lang]}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('calculator')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {UI_COPY.nav.calculator[lang]}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('consultation')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {UI_COPY.nav.bookCta[lang]}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={scrollToDisclosure}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {SERVICE_DISCLOSURE.title[lang]}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Văn phòng Tiếp nhận & Hotline + Thông tin pháp nhân */}
            <div className="md:col-span-4 space-y-3.5">
              <h2 className="text-sm font-bold text-[#F87171]">
                {lang === 'vi'
                  ? 'Văn phòng Tiếp nhận & Hotline'
                  : 'Advisory Offices & Hotline'}
              </h2>
              <div className="space-y-2.5 text-sm text-slate-200 leading-relaxed">
                <p>
                  <strong className="text-white">Trụ sở TP.HCM:</strong>{' '}
                  {BUSINESS_INFO.registeredAddress} ·{' '}
                  <span className="tabular-nums font-medium">{BUSINESS_INFO.phones[0]}</span>
                </p>
                <p>
                  <strong className="text-white">VP Đông Hòa:</strong>{' '}
                  {BUSINESS_INFO.branches[0].address} ·{' '}
                  <span className="tabular-nums font-medium">{BUSINESS_INFO.phones[1]}</span>
                </p>
                <p>
                  <strong className="text-white">VP Hà Nội:</strong>{' '}
                  {BUSINESS_INFO.branches[1].address} ·{' '}
                  <span className="tabular-nums font-medium">{BUSINESS_INFO.phones[2]}</span>
                </p>
                <p className="text-xs text-slate-300 pt-1 tabular-nums">
                  {BUSINESS_INFO.legalName} · MST: {BUSINESS_INFO.taxId}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/15 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-slate-300">
            <div className="space-y-1">
              <p>
                © 2026 {BUSINESS_INFO.brand}.{' '}
                {lang === 'vi'
                  ? 'Đơn vị tư vấn dịch vụ tư nhân độc lập — không đại diện Chính phủ Úc và không có thẩm quyền cấp thị thực.'
                  : 'Independent private consultancy — not affiliated with the Australian Government and holds no visa-issuing authority.'}
              </p>
              <p className="text-slate-400">
                {lang === 'vi' ? 'Nguồn thông tin chính thức: ' : 'Official source: '}
                <a
                  href={BUSINESS_INFO.officialSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline font-medium"
                >
                  {BUSINESS_INFO.officialSourceUrl} ↗
                </a>
              </p>
            </div>

            <div className="font-mono text-xs text-slate-200 tabular-nums shrink-0">
              <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white hover:underline">
                {BUSINESS_INFO.email}
              </a>
              {'  ·  '}
              <a href="tel:0911909686" className="hover:text-white hover:underline">
                {BUSINESS_INFO.phones[0]}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating quick contact action stack matching reference screenshot */}
      <div
        aria-label={lang === 'vi' ? 'Liên hệ nhanh Visa5S' : 'Quick Contact Visa5S'}
        className="fixed bottom-5 right-5 z-30 flex flex-col gap-2.5"
      >
        <a
          href="https://zalo.me/0911909686"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat Zalo Visa5S"
          className="w-11 h-11 rounded-full bg-[#0068FF] hover:bg-[#0055D4] text-white shadow-tier-2 flex items-center justify-center transition-transform hover:scale-105"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
        <a
          href={`mailto:${BUSINESS_INFO.email}`}
          aria-label="Email Visa5S"
          className="w-11 h-11 rounded-full bg-white hover:bg-slate-50 text-[#E11D24] border border-slate-200 shadow-tier-2 flex items-center justify-center transition-transform hover:scale-105"
        >
          <Mail className="w-5 h-5" />
        </a>
        <a
          href="tel:0911909686"
          aria-label="Gọi Hotline Visa5S 0911 909 686"
          className="w-11 h-11 rounded-full bg-[#E11D24] hover:bg-[#B91C1C] text-white shadow-tier-2 flex items-center justify-center transition-transform hover:scale-105"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
