import { useState } from 'react';
import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  ExternalLink,
  Globe,
  ShieldAlert,
} from 'lucide-react';
import { Language, ScreenId, VisaSubclass } from '../types';
import {
  ASSETS,
  BUSINESS_INFO,
  CLIENT_OUTCOMES,
  PROCESS_STEPS,
  SERVICE_DISCLOSURE,
  TRANSPARENT_FAQS,
  UI_COPY,
  VISA_SUBCLASSES,
} from '../data/visaData';
import { ResilientImage } from './ResilientImage';
import { VisaGrantResultsSection } from './VisaGrantResultsSection';

interface OverviewScreenProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
  onNavigate: (screen: ScreenId) => void;
  onSelectVisa: (visa: VisaSubclass) => void;
  onStartConsultationForVisa: (subclass: string) => void;
}

export function OverviewScreen({
  lang,
  onChangeLang,
  onNavigate,
  onSelectVisa,
  onStartConsultationForVisa,
}: OverviewScreenProps) {
  const [openFaqId, setOpenFaqId] = useState<string | null>(TRANSPARENT_FAQS[0].id);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Split Section */}
      <section className="pt-8 lg:pt-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16">
          {/* Language & Independent Practice Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
            <p className="text-xs sm:text-sm font-medium text-slate-600">
              {UI_COPY.hero.trustMarker[lang]}
            </p>
            <div
              role="group"
              aria-label="Chọn ngôn ngữ"
              className="inline-flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200 shrink-0"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500 ml-2 mr-1.5" />
              <button
                type="button"
                onClick={() => onChangeLang('vi')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  lang === 'vi'
                    ? 'bg-white text-[#0F172A] shadow-xs'
                    : 'text-slate-600 hover:text-[#0F172A]'
                }`}
              >
                Tiếng Việt
              </button>
              <button
                type="button"
                onClick={() => onChangeLang('en')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  lang === 'en'
                    ? 'bg-white text-[#0F172A] shadow-xs'
                    : 'text-slate-600 hover:text-[#0F172A]'
                }`}
              >
                English
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between py-2">
              <div className="space-y-5">
                <h1
                  className="text-[2.15rem] sm:text-[2.65rem] lg:text-[3.1rem] font-extrabold text-[#0F172A] leading-[1.16] tracking-[-0.02em]"
                  style={{ textWrap: 'balance' }}
                >
                  {UI_COPY.hero.headline[lang]}
                </h1>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-[62ch]">
                  {UI_COPY.hero.subheadline[lang]}
                </p>
              </div>

              <div className="pt-8 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigate('consultation')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#E11D24] hover:bg-[#B91C1C] rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D24] focus-visible:ring-offset-2"
                  >
                    <span>{UI_COPY.hero.primaryCta[lang]}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('pathways')}
                    className="inline-flex items-center justify-center px-5 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#1B1E78] hover:bg-[#14165E] rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B1E78] focus-visible:ring-offset-2"
                  >
                    {UI_COPY.hero.secondaryCta[lang]}
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
                  <button
                    type="button"
                    onClick={() => onNavigate('calculator')}
                    className="font-semibold text-[#1B1E78] hover:underline cursor-pointer"
                  >
                    {lang === 'vi'
                      ? 'Kiểm tra độ đầy đủ hồ sơ tham khảo →'
                      : 'Check Reference Profile Readiness →'}
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="h-full min-h-[280px] lg:min-h-[380px] rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-tier-1 flex flex-col">
                <div className="relative flex-1 overflow-hidden">
                  <ResilientImage
                    src={ASSETS.heroSydney}
                    alt={UI_COPY.hero.caption[lang]}
                    className="w-full h-full object-cover lg:h-full"
                    fallbackTitle="Sydney Harbour Australia"
                  />
                </div>
                <div className="px-5 py-3 bg-white border-t border-slate-200 flex items-center justify-between gap-4 text-xs text-slate-600">
                  <span className="font-medium truncate">
                    {UI_COPY.hero.caption[lang]}
                  </span>
                  <span className="font-mono font-semibold text-[#1B1E78] shrink-0">
                    AUSTRALIA
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4-Column Transparent Service Strip */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {UI_COPY.kpis.map((kpi) => (
              <div
                key={kpi.value}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-tier-1"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight tabular-nums">
                  {kpi.value}
                </div>
                <div className="mt-1.5 text-sm font-medium text-slate-600">
                  {kpi.label[lang]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dịch Vụ Tư Vấn & Hỗ Trợ Chuẩn Bị Hồ Sơ Visa Úc */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold tracking-[0.04em] uppercase text-[#1B1E78] mb-2">
              {lang === 'vi'
                ? '01. Dịch Vụ Tư Vấn & Hỗ Trợ Hồ Sơ'
                : '01. Advisory & Documentation Services'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
              {lang === 'vi'
                ? 'Hướng Dẫn Chuẩn Bị Hồ Sơ Theo Từng Diện Visa Úc'
                : 'Documentation Support Across Australian Visa Categories'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('pathways')}
            className="text-sm font-semibold text-[#1B1E78] hover:text-[#14165E] whitespace-nowrap cursor-pointer self-start sm:self-auto"
          >
            {lang === 'vi' ? 'Xem danh mục giấy tờ chi tiết →' : 'View detailed document lists →'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VISA_SUBCLASSES.map((visa) => (
            <article
              key={visa.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-tier-1 hover:shadow-tier-2 hover:-translate-y-0.5 transition-all duration-150 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1B1E78] mb-2">
                  <span>{visa.subclass}</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-slate-500">{visa.categoryLabel[lang]}</span>
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] leading-snug mb-2">
                  {visa.title[lang]}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  {visa.summary[lang]}
                </p>

                <ul className="space-y-2.5 mb-6">
                  {visa.benefits[lang].map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-[#1B1E78] shrink-0 mt-0.5" strokeWidth={2.25} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                  <span>
                    {lang === 'vi' ? 'Tiến độ xét duyệt: ' : 'Assessment: '}
                    <strong className="text-slate-800 font-semibold">
                      {visa.processingTime[lang]}
                    </strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectVisa(visa)}
                    className="flex-1 py-2.5 px-3 text-xs font-semibold text-[#0F172A] border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {lang === 'vi' ? 'Xem Giấy Tờ' : 'View Checklist'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onStartConsultationForVisa(visa.subclass)}
                    className="flex-1 py-2.5 px-3 text-xs font-semibold text-white bg-[#1B1E78] hover:bg-[#14165E] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {lang === 'vi' ? 'Tư Vấn Hồ Sơ' : 'Consult Stream'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 2 Ảnh Kết Quả Cấp Visa Úc Thực Tế (3 Năm & 10 Năm) */}
      <VisaGrantResultsSection
        lang={lang}
        onStartConsultationForVisa={onStartConsultationForVisa}
        sectionNumber="02"
      />

      {/* Quy Trình Hỗ Trợ 5 Bước */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-tier-1 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <p className="text-xs font-bold tracking-[0.04em] uppercase text-[#1B1E78] mb-2">
                {lang === 'vi'
                  ? '03. Quy Trình Hỗ Trợ Chuẩn Bị Hồ Sơ 5 Bước'
                  : '03. 5-Step Preparation Workflow'}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
                {lang === 'vi'
                  ? 'Đồng Hành Rà Soát Giấy Tờ Minh Bạch Theo Từng Giai Đoạn'
                  : 'Structured Support From Initial Review to Submission Guidance'}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('consultation')}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1B1E78] border border-[#1B1E78] hover:bg-[#EEF2FF] rounded-lg transition-colors whitespace-nowrap cursor-pointer self-start md:self-auto"
            >
              {lang === 'vi' ? 'Đăng Ký Tư Vấn Quy Trình' : 'Request Procedure Guide'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {PROCESS_STEPS.map((st) => (
              <div key={st.step} className="space-y-3">
                <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#EEF2FF] border border-[#C7D2FE] font-mono text-sm font-bold text-[#1B1E78] tabular-nums">
                  {st.step}
                </div>
                <h3 className="text-base font-bold text-[#0F172A] leading-snug">
                  {st.title[lang]}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {st.description[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Câu Chuyện Hỗ Trợ Chuẩn Bị Hồ Sơ & Điểm Đến Australia */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="space-y-2 max-w-3xl">
            <p className="text-xs font-bold tracking-[0.04em] uppercase text-[#1B1E78]">
              {lang === 'vi'
                ? '04. Hoạt Động Tư Vấn & Chuẩn Bị Hồ Sơ'
                : '04. Documentation Support Examples'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
              {lang === 'vi'
                ? 'Hỗ Trợ Khách Hàng Chuẩn Bị Hồ Sơ & Lịch Trình Du Lịch Australia'
                : 'Helping Clients Organize Documentation & Australian Travel Plans'}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === 'vi'
                ? 'Minh họa quy trình Visa5S hướng dẫn khách hàng sắp xếp giấy tờ thực tế. Thời gian xử lý và quyết định cấp thị thực phụ thuộc hoàn toàn vào cơ quan có thẩm quyền của Chính phủ Úc.'
                : 'Illustrations of how Visa5S assists with organizing client paperwork. Processing times and visa decisions rest solely with Australian authorities.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('consultation')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B1E78] hover:text-[#10124F] cursor-pointer whitespace-nowrap shrink-0"
          >
            {lang === 'vi' ? 'Đặt lịch tư vấn hồ sơ' : 'Schedule Consultation'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CLIENT_OUTCOMES.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-tier-1 flex flex-col"
            >
              <div className="aspect-[16/9] w-full bg-slate-100 overflow-hidden border-b border-slate-200">
                <ResilientImage
                  src={item.imageSrc}
                  alt={item.imageAlt[lang]}
                  className="w-full h-full object-cover"
                  fallbackTitle={item.subclass}
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-2">
                    <span className="font-bold text-[#1B1E78]">{item.subclass}</span>
                    <span className="font-semibold text-slate-600">
                      {item.timelineMetric[lang]}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {item.quote[lang]}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-bold text-[#0F172A]">{item.clientName}</div>
                    <div className="text-slate-500 mt-0.5">{item.originCity[lang]}</div>
                    <div className="text-[#1B1E78] font-medium mt-1">
                      {item.pointsOrStream[lang]}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onStartConsultationForVisa('Visa 600 — Du Lịch')}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#E11D24] hover:bg-[#B91C1C] text-white text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer shrink-0"
                  >
                    {lang === 'vi' ? 'Đăng ký tư vấn' : 'Request Support'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Section 04: Thông tin về dịch vụ + Nguồn chính thức + Thông tin doanh nghiệp + FAQ */}
      <section
        id="thong-tin-dich-vu"
        className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 space-y-8"
      >
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-tier-1 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Thông tin về dịch vụ & Nguồn chính thức */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <p className="text-xs font-bold tracking-[0.04em] uppercase text-[#1B1E78] mb-2">
                  {lang === 'vi'
                    ? '05. Minh Bạch Hoạt Động & Pháp Lý'
                    : '05. Service Transparency & Legal Notice'}
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
                  {SERVICE_DISCLOSURE.title[lang]}
                </h2>
              </div>

              <div className="p-5 rounded-xl bg-[#EEF2FF]/70 border border-[#C7D2FE] space-y-3">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-[#1B1E78] shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base font-medium text-[#0F172A] leading-relaxed">
                    {SERVICE_DISCLOSURE.statement[lang]}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#C7D2FE]/80 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                  <span className="font-semibold text-slate-700">
                    {SERVICE_DISCLOSURE.officialSourceLabel[lang]}
                  </span>
                  <a
                    href={BUSINESS_INFO.officialSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-[#1B1E78] hover:underline break-all"
                  >
                    <span>{BUSINESS_INFO.officialSourceUrl}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 text-sm text-slate-700 leading-relaxed">
                <strong className="text-[#0F172A]">
                  {lang === 'vi'
                    ? 'Phân biệt Phí dịch vụ Visa5S và Lệ phí Chính phủ: '
                    : 'Distinction Between Visa5S Service Fees and Government Fees: '}
                </strong>
                {SERVICE_DISCLOSURE.feeNotice[lang]}
              </div>
            </div>

            {/* Thông tin doanh nghiệp thực tế */}
            <div className="lg:col-span-5 bg-[#F8FAFC] border border-slate-200 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.04em] text-[#1B1E78]">
                <Building2 className="w-4 h-4" />
                <span>
                  {lang === 'vi' ? 'Thông Tin Doanh Nghiệp' : 'Corporate Information'}
                </span>
              </div>

              <div className="space-y-2.5 text-sm text-slate-700">
                <div>
                  <div className="text-xs text-slate-500">
                    {lang === 'vi' ? 'Tên pháp nhân' : 'Registered Legal Name'}
                  </div>
                  <div className="font-bold text-[#0F172A]">{BUSINESS_INFO.legalName}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">
                    {lang === 'vi' ? 'Mã số thuế (MST)' : 'Tax Identification Number'}
                  </div>
                  <div className="font-mono font-bold text-[#0F172A] tabular-nums">
                    {BUSINESS_INFO.taxId}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">
                    {lang === 'vi'
                      ? 'Địa chỉ đăng ký kinh doanh'
                      : 'Registered Business Address'}
                  </div>
                  <div className="font-medium text-[#0F172A]">
                    {BUSINESS_INFO.registeredAddress}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">
                    {lang === 'vi' ? 'Văn phòng hỗ trợ' : 'Branch Offices'}
                  </div>
                  <ul className="space-y-1 text-xs text-slate-600 mt-0.5">
                    {BUSINESS_INFO.branches.map((branch) => (
                      <li key={branch.address}>
                        <span className="font-semibold text-slate-800">
                          {branch.label[lang]}:
                        </span>{' '}
                        {branch.address}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-slate-500">
                      {lang === 'vi' ? 'Số điện thoại' : 'Phone'}
                    </div>
                    <div className="font-semibold text-[#0F172A] tabular-nums text-xs">
                      {BUSINESS_INFO.phones.join(' · ')}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Email</div>
                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="font-semibold text-[#1B1E78] hover:underline text-xs break-all"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Minh Bạch */}
          <div className="pt-6 border-t border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-[#0F172A]">
              {lang === 'vi'
                ? 'Câu Hỏi Thường Gặp Về Dịch Vụ Tư Vấn Hồ Sơ'
                : 'Frequently Asked Questions'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TRANSPARENT_FAQS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="border border-slate-200 rounded-xl bg-[#F8FAFC] overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      aria-expanded={isOpen}
                      className="w-full px-5 py-4 text-left flex items-start justify-between gap-3 cursor-pointer hover:bg-slate-100/70 transition-colors"
                    >
                      <span className="text-sm font-bold text-[#0F172A]">
                        {faq.question[lang]}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 shrink-0 mt-0.5 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-200/70 pt-3 bg-white">
                        {faq.answer[lang]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
