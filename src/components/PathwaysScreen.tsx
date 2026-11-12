import { useMemo, useState } from 'react';
import { Check, Search, X, ArrowRight, FileText, Clock } from 'lucide-react';
import { Language, ScreenId, VisaCategory, VisaSubclass } from '../types';
import { VISA_SUBCLASSES } from '../data/visaData';
import { ResilientImage } from './ResilientImage';
import { VisaGrantResultsSection } from './VisaGrantResultsSection';

interface PathwaysScreenProps {
  lang: Language;
  selectedVisa: VisaSubclass | null;
  onSelectVisa: (visa: VisaSubclass | null) => void;
  onNavigate: (screen: ScreenId) => void;
  onStartConsultationForVisa: (subclass: string) => void;
}

export function PathwaysScreen({
  lang,
  selectedVisa,
  onSelectVisa,
  onNavigate,
  onStartConsultationForVisa,
}: PathwaysScreenProps) {
  const [category, setCategory] = useState<VisaCategory>('all');
  const [query, setQuery] = useState('');

  const categories: { id: VisaCategory; label: { vi: string; en: string } }[] = [
    { id: 'all', label: { vi: 'Tất Cả Dịch Vụ', en: 'All Visas' } },
    { id: 'tourist', label: { vi: 'Du Lịch & Thăm Thân', en: 'Tourist & Family' } },
    { id: 'business', label: { vi: 'Công Tác & Dài Hạn', en: 'Business & Long-Term' } },
    { id: 'student', label: { vi: 'Du Học & Giám Hộ', en: 'Student & Guardian' } },
  ];

  const filteredVisas = useMemo(() => {
    const q = query.trim().toLowerCase();
    return VISA_SUBCLASSES.filter((visa) => {
      const matchesCat = category === 'all' || visa.category === category;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        visa.subclass.toLowerCase().includes(q) ||
        visa.title[lang].toLowerCase().includes(q) ||
        visa.summary[lang].toLowerCase().includes(q)
      );
    });
  }, [category, query, lang]);

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-10 space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-bold tracking-[0.04em] uppercase text-[#1B1E78]">
          {lang === 'vi' ? 'Danh Mục Dịch Vụ Xin Visa Úc' : 'Australian Visa Service Directory'}
        </p>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
          {lang === 'vi'
            ? 'Các Loại Visa Úc — Điều Kiện & Giấy Tờ Cần Chuẩn Bị'
            : 'Compare Australian Visa Subclasses & Required Documents'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
          {lang === 'vi'
            ? 'Chọn nhóm visa để tham khảo điều kiện công khai và danh mục giấy tờ nhân thân, công việc, tài chính cần chuẩn bị. Thời gian xử lý và quyết định cấp thị thực do Bộ Nội vụ Úc quyết định.'
            : 'Filter by travel or migration purpose to review public eligibility criteria and document checklists. Processing times and visa decisions are determined by Australian authorities.'}
        </p>
      </div>

      {/* Filter Segmented Bar + Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="Lọc theo loại visa Úc"
          className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-lg"
        >
          {categories.map((cat) => {
            const active = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setCategory(cat.id)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-white text-[#0F172A] shadow-xs'
                    : 'text-slate-600 hover:text-[#0F172A]'
                }`}
              >
                {cat.label[lang]}
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === 'vi' ? 'Tìm loại visa (VD: 600, thăm thân)...' : 'Search visa (e.g. 600, 500)...'
            }
            className="input-corporate w-full pl-10 pr-4 text-sm"
          />
        </div>
      </div>

      {/* Visa Grid */}
      {filteredVisas.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3 shadow-tier-1">
          <p className="text-base font-semibold text-[#0F172A]">
            {lang === 'vi'
              ? 'Không tìm thấy gói dịch vụ visa phù hợp'
              : 'No matching visa services found'}
          </p>
          <p className="text-sm text-slate-500">
            {lang === 'vi'
              ? 'Vui lòng xóa từ khóa tìm kiếm hoặc chọn lại mục Tất Cả Dịch Vụ.'
              : 'Clear your search query or switch back to All Visas.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setCategory('all');
              setQuery('');
            }}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#1B1E78] hover:bg-[#14165E] rounded-lg cursor-pointer"
          >
            {lang === 'vi' ? 'Đặt Lại Bộ Lọc' : 'Reset Filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVisas.map((visa) => (
            <article
              key={visa.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-tier-1 hover:shadow-tier-2 hover:-translate-y-0.5 transition-all duration-150 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/9] w-full bg-slate-100 overflow-hidden">
                  <ResilientImage
                    src={visa.imageSrc}
                    alt={visa.imageAlt[lang]}
                    className="w-full h-full object-cover"
                    fallbackTitle={visa.subclass}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold mb-2">
                    <span className="text-[#1B1E78]">{visa.subclass}</span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="text-slate-500">{visa.categoryLabel[lang]}</span>
                  </div>
                  <h2 className="text-lg font-bold text-[#0F172A] leading-snug mb-2">
                    {visa.title[lang]}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {visa.summary[lang]}
                  </p>
                  <p className="text-xs font-semibold text-[#047857] mb-3">
                    {visa.serviceHighlight[lang]}
                  </p>
                  <ul className="space-y-2">
                    {visa.benefits[lang].slice(0, 2).map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <Check className="w-4 h-4 text-[#1B1E78] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-6 pb-6 pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                  <span>
                    {lang === 'vi' ? 'Xét duyệt: ' : 'Decision: '}
                    <strong className="text-slate-800 font-semibold">
                      {visa.processingTime[lang]}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectVisa(visa)}
                    className="flex-1 py-2.5 px-3 text-xs font-semibold text-[#0F172A] border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                  >
                    {lang === 'vi' ? 'Danh Mục Hồ Sơ' : 'Full Checklist'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onStartConsultationForVisa(visa.subclass)}
                    className="flex-1 py-2.5 px-3 text-xs font-semibold text-white bg-[#E11D24] hover:bg-[#B91C1C] rounded-lg transition-colors cursor-pointer"
                  >
                    {lang === 'vi' ? 'Tư Vấn Hồ Sơ' : 'Book Consult'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* 2 Ảnh Kết Quả Cấp Visa Úc Thực Tế (3 Năm & 10 Năm) */}
      <VisaGrantResultsSection
        lang={lang}
        onStartConsultationForVisa={onStartConsultationForVisa}
        className="pt-4"
      />

      {/* Pathway Detail Modal / Drawer */}
      {selectedVisa && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="visa-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/40 backdrop-blur-[4px]"
          onClick={() => onSelectVisa(null)}
        >
          <div
            className="w-full max-w-xl h-full bg-white shadow-tier-3 overflow-y-auto flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-[#1B1E78]">
                    {selectedVisa.subclass} · {selectedVisa.categoryLabel[lang]}
                  </p>
                  <h2 id="visa-modal-title" className="text-lg font-bold text-[#0F172A]">
                    {selectedVisa.title[lang]}
                  </h2>
                </div>
                <button
                  type="button"
                  aria-label="Đóng chi tiết visa"
                  onClick={() => onSelectVisa(null)}
                  className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {selectedVisa.summary[lang]}
                </p>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-1">
                      <Clock className="w-3.5 h-3.5 text-[#1B1E78]" />
                      <span>{lang === 'vi' ? 'Thời Gian & Quyết Định' : 'Processing & Decision'}</span>
                    </div>
                    <div className="text-sm font-bold text-[#0F172A]">
                      {selectedVisa.processingTime[lang]}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 mb-1">
                      {lang === 'vi' ? 'Cơ Cấu Chi Phí' : 'Fee Structure'}
                    </div>
                    <div className="text-sm font-bold text-[#1B1E78]">
                      {lang === 'vi'
                        ? 'Tách biệt phí tư vấn & lệ phí Chính phủ'
                        : 'Service fee separate from govt charges'}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed bg-[#EEF2FF]/60 border border-[#C7D2FE] rounded-lg p-3">
                  {lang === 'vi'
                    ? 'Visa5S là đơn vị tư vấn tư nhân hỗ trợ chuẩn bị giấy tờ, không đại diện Chính phủ Úc. Nguồn thông tin chính thức: '
                    : 'Visa5S is an independent private consultancy, not affiliated with the Australian Government. Official portal: '}
                  <a
                    href="https://immi.homeaffairs.gov.au/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#1B1E78] hover:underline"
                  >
                    https://immi.homeaffairs.gov.au/
                  </a>
                </p>

                <div>
                  <h3 className="text-sm font-bold text-[#0F172A] mb-3">
                    {lang === 'vi' ? 'Điều Kiện Cần Đáp Ứng' : 'Core Eligibility Requirements'}
                  </h3>
                  <ul className="space-y-2.5">
                    {selectedVisa.eligibility[lang].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <Check className="w-4 h-4 text-[#1B1E78] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <h3 className="text-sm font-bold text-[#0F172A] mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#1B1E78]" />
                    <span>
                      {lang === 'vi'
                        ? 'Danh Mục Giấy Tờ Cần Chuẩn Bị'
                        : 'Mandatory Document Checklist'}
                    </span>
                  </h3>
                  <ul className="space-y-2">
                    {selectedVisa.requiredDocs[lang].map((doc, idx) => (
                      <li
                        key={idx}
                        className="p-3 rounded-lg bg-[#F8FAFC] border border-slate-200 text-sm text-slate-700 flex items-center gap-3"
                      >
                        <span className="font-mono text-xs font-bold text-[#1B1E78] tabular-nums">
                          0{idx + 1}
                        </span>
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onSelectVisa(null);
                  onNavigate('calculator');
                }}
                className="flex-1 py-3 px-4 text-sm font-semibold text-[#1B1E78] border border-[#1B1E78] hover:bg-[#EEF2FF] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                {lang === 'vi' ? 'Thẩm Định Hồ Sơ' : 'Assess Profile'}
              </button>
              <button
                type="button"
                onClick={() => {
                  const sub = selectedVisa.subclass;
                  onSelectVisa(null);
                  onStartConsultationForVisa(sub);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-white bg-[#E11D24] hover:bg-[#B91C1C] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>
                  {lang === 'vi' ? 'Đăng Ký Tư Vấn' : 'Book Advisory Review'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
