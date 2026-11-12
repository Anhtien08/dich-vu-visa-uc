import { useState } from 'react';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Layers,
  RotateCcw,
  ShieldCheck,
  X,
  ZoomIn,
} from 'lucide-react';
import { GrantResultItem, Language } from '../types';
import { BUSINESS_INFO, GRANT_RESULTS } from '../data/visaData';
import { ResilientImage } from './ResilientImage';

interface VisaGrantResultsSectionProps {
  lang: Language;
  onStartConsultationForVisa: (subclass: string) => void;
  sectionNumber?: string;
  className?: string;
}

export function VisaGrantResultsSection({
  lang,
  onStartConsultationForVisa,
  sectionNumber,
  className,
}: VisaGrantResultsSectionProps) {
  const [activeModalItem, setActiveModalItem] = useState<GrantResultItem | null>(null);

  return (
    <section className={className ?? 'max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16'}>
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-tier-2 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF2FF] border border-[#C7D2FE] text-xs font-bold text-[#1B1E78] uppercase tracking-[0.04em]">
              <ShieldCheck className="w-4 h-4 text-[#E11D24]" />
              <span>
                {sectionNumber ? `${sectionNumber}. ` : ''}
                {lang === 'vi'
                  ? 'Minh Chứng Thực Tế · Kết Quả Đã Cấp Thị Thực'
                  : 'Verified Outcomes · Official Grant Letters'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              {lang === 'vi'
                ? 'Kết Quả Cấp Visa Úc Thực Tế (Visa 3 Năm & 10 Năm Thành Công Từ Visa5S)'
                : 'Actual Australian Visa Grant Results (3-Year & 10-Year Multiple Entry Visas)'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {lang === 'vi'
                ? 'Hình ảnh thư cấp thị thực chính thức (Visa Grant Notification) từ Bộ Nội vụ Úc (Department of Home Affairs) do khách hàng của Visa5S nhận được. Thông tin định danh cá nhân đã được che theo chính sách bảo mật.'
                : 'Official Department of Home Affairs grant letters received by Visa5S clients. Personal identifiers have been masked in compliance with privacy regulations.'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl self-start lg:self-auto shrink-0">
            <CheckCircle2 className="w-4 h-4 text-[#047857]" />
            <span>
              {lang === 'vi' ? 'Hồ sơ đã được cấp thị thực (Granted)' : 'Official status: Granted'}
            </span>
          </div>
        </div>

        {/* 2 Result Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {GRANT_RESULTS.map((result) => (
            <article
              key={result.id}
              className="bg-[#F8FAFC] border border-slate-200 rounded-2xl overflow-hidden hover:border-[#1B1E78]/40 hover:shadow-tier-2 transition-all duration-200 flex flex-col"
            >
              {/* Image Container with Click-to-Zoom */}
              <div className="relative group bg-slate-900 overflow-hidden cursor-pointer">
                <button
                  type="button"
                  onClick={() => setActiveModalItem(result)}
                  aria-label={`${lang === 'vi' ? 'Xem ảnh lớn' : 'View full image'}: ${result.title[lang]}`}
                  className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B1E78] focus-visible:ring-inset block"
                >
                  <div className="aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden bg-slate-100 flex items-center justify-center">
                    <ResilientImage
                      src={result.imageSrc}
                      alt={result.imageAlt[lang]}
                      className="w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-[1.02]"
                      fallbackTitle={result.title[lang]}
                    />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#0F172A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#0F172A] text-xs font-bold shadow-lg">
                      <ZoomIn className="w-4 h-4 text-[#1B1E78]" />
                      <span>{lang === 'vi' ? 'Nhấp để phóng to thư cấp visa' : 'Click to inspect grant letter'}</span>
                    </span>
                  </div>

                  {/* Corner Badge */}
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#E11D24] text-white text-xs font-bold shadow-md">
                      <Layers className="w-3.5 h-3.5" />
                      <span>{result.highlightTag[lang]}</span>
                    </span>
                  </div>
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5 bg-white border-t border-slate-200">
                <div className="space-y-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1B1E78]">
                      {result.badge[lang]}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#047857] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>GRANTED · ĐÃ CẤP</span>
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] leading-snug">
                    {result.title[lang]}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {result.description[lang]}
                  </p>

                  {/* Key Grant Attributes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-slate-700">
                      <Calendar className="w-4 h-4 text-[#1B1E78] shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase font-semibold">
                          {lang === 'vi' ? 'Thời hạn thị thực' : 'Visa Validity'}
                        </div>
                        <div className="font-bold text-[#0F172A]">{result.validity[lang]}</div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-slate-700">
                      <RotateCcw className="w-4 h-4 text-[#1B1E78] shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase font-semibold">
                          {lang === 'vi' ? 'Quy cách xuất nhập cảnh' : 'Travel Conditions'}
                        </div>
                        <div className="font-bold text-[#0F172A]">{result.entries[lang]}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveModalItem(result)}
                    className="flex-1 py-2.5 px-3 text-xs font-semibold text-[#0F172A] border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-1.5"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-slate-500" />
                    <span>{lang === 'vi' ? 'Xem Ảnh Thư Cấp' : 'View Full Document'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onStartConsultationForVisa(result.subclass)}
                    className="flex-1 py-2.5 px-3 text-xs font-semibold text-white bg-[#1B1E78] hover:bg-[#14165E] rounded-lg transition-colors whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-1.5"
                  >
                    <span>{lang === 'vi' ? 'Tư Vấn Diện Này' : 'Consult This Stream'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Official Source Note */}
        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-start gap-2">
            <span className="font-bold text-[#1B1E78] shrink-0">Lưu ý minh bạch:</span>
            <span>
              {lang === 'vi'
                ? 'Kết quả và thời hạn cấp thị thực (nhập cảnh 1 lần hay nhiều lần, thời hạn 1 năm, 3 năm hoặc 10 năm) phụ thuộc hoàn toàn vào quá trình xét duyệt của Bộ Nội vụ Úc.'
                : 'Visa decisions and granted validity lengths (single vs. multiple entries, 1-year, 3-year, or 10-year validity) rest solely with the Australian Department of Home Affairs.'}
            </span>
          </div>
          <a
            href={BUSINESS_INFO.officialSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[#1B1E78] hover:underline whitespace-nowrap shrink-0"
          >
            <span>{BUSINESS_INFO.officialSourceUrl}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeModalItem.title[lang]}
          className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-tier-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-4 bg-[#101157] text-white flex items-center justify-between gap-4 border-b border-white/10 shrink-0">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-[#F87171]">
                  {activeModalItem.badge[lang]}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white truncate max-w-xl">
                  {activeModalItem.title[lang]}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Body with Scroll */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100 flex items-center justify-center">
              <img
                src={activeModalItem.imageSrc}
                alt={activeModalItem.imageAlt[lang]}
                className="max-h-[70vh] w-auto max-w-full rounded-lg shadow-md object-contain border border-slate-200"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs">
              <div className="text-slate-600">
                <span className="font-semibold text-[#0F172A]">{activeModalItem.validity[lang]}</span> · {activeModalItem.entries[lang]}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className="px-4 py-2 font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  {lang === 'vi' ? 'Đóng' : 'Close'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const subclass = activeModalItem.subclass;
                    setActiveModalItem(null);
                    onStartConsultationForVisa(subclass);
                  }}
                  className="px-4 py-2 font-semibold text-white bg-[#E11D24] hover:bg-[#B91C1C] rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>{lang === 'vi' ? 'Tư Vấn Hồ Sơ Diện Này' : 'Request Consultation'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
