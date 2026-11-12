import { useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CalendarCheck,
  Check,
  ExternalLink,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { Language, PointsAssessmentSummary, ScreenId } from '../types';
import {
  ASSETS,
  BUSINESS_INFO,
  SERVICE_DISCLOSURE,
  VISA_SUBCLASSES,
} from '../data/visaData';
import { ResilientImage } from './ResilientImage';

interface ConsultationScreenProps {
  lang: Language;
  initialSubclass?: string;
  pointsSummary: PointsAssessmentSummary | null;
  onNavigate: (screen: ScreenId) => void;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  preferredDate?: string;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function ConsultationScreen({
  lang,
  initialSubclass,
  pointsSummary,
  onNavigate,
}: ConsultationScreenProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subclass, setSubclass] = useState(
    initialSubclass || (pointsSummary ? pointsSummary.targetSubclass : 'Visa 600 — Du Lịch')
  );
  const [office, setOffice] = useState('TP.HCM — 370 Đường 3/2, P. Hòa Hưng');
  const [preferredDate, setPreferredDate] = useState('2026-11-18');
  const [notes, setNotes] = useState(pointsSummary ? pointsSummary.summaryNote : '');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const selectedVisaInfo = useMemo(() => {
    return (
      VISA_SUBCLASSES.find(
        (v) => v.subclass === subclass || subclass.includes(v.subclass.split(' ')[1] || '')
      ) || VISA_SUBCLASSES[0]
    );
  }, [subclass]);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (fullName.trim().length < 2) {
      nextErrors.fullName =
        lang === 'vi' ? 'Vui lòng nhập họ và tên đầy đủ.' : 'Please enter your full name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email =
        lang === 'vi' ? 'Địa chỉ email không hợp lệ.' : 'Enter a valid email address.';
    }
    if (!/^[+\d\s()-]{8,}$/.test(phone.trim())) {
      nextErrors.phone =
        lang === 'vi'
          ? 'Vui lòng nhập số điện thoại hợp lệ (tối thiểu 8 số).'
          : 'Enter a valid phone number.';
    }
    if (!preferredDate) {
      nextErrors.preferredDate =
        lang === 'vi' ? 'Vui lòng chọn ngày tư vấn dự kiến.' : 'Select a preferred date.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const refId = `VS-TV-${randomCode}`;

    // Preserve GTM / Google Ads conversion tracking event cleanly
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'consultation_form_submit',
        form_id: 'visa5s-consultation-form',
        consultation_ref: refId,
        service_need: subclass,
      });
    }

    setSubmittedRef(refId);
  };

  if (submittedRef) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-tier-2 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF5] text-[#047857] text-xs font-bold">
            <Check className="w-4 h-4" strokeWidth={2.5} />
            <span>
              {lang === 'vi' ? 'Đã Ghi Nhận Yêu Cầu Tư Vấn' : 'Consultation Request Received'}
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              {lang === 'vi'
                ? 'Yêu Cầu Tư Vấn Hồ Sơ Đã Được Tiếp Nhận'
                : 'Your Advisory Request Has Been Recorded'}
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              {lang === 'vi'
                ? `Chuyên viên tư vấn của Visa5S sẽ liên hệ qua số ${phone} và gửi danh mục giấy tờ tham khảo tới ${email}.`
                : `A Visa5S consultant will contact you via ${phone} and send the reference checklist to ${email}.`}
            </p>
          </div>

          <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-xs text-slate-500">
                {lang === 'vi' ? 'Mã Tiếp Nhận Tư Vấn' : 'Reference Code'}
              </div>
              <div className="font-mono font-bold text-[#1B1E78] tabular-nums mt-0.5">
                {submittedRef}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500">
                {lang === 'vi' ? 'Họ và Tên' : 'Applicant Name'}
              </div>
              <div className="font-bold text-[#0F172A] mt-0.5">{fullName}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">
                {lang === 'vi' ? 'Nhu Cầu Tư Vấn' : 'Consultation Need'}
              </div>
              <div className="font-semibold text-[#0F172A] mt-0.5">{subclass}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">
                {lang === 'vi' ? 'Ngày & Hình Thức Tư Vấn' : 'Date & Channel'}
              </div>
              <div className="font-semibold text-[#0F172A] tabular-nums mt-0.5">
                {preferredDate} · {office.split('—')[0].trim()}
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            {SERVICE_DISCLOSURE.privacyNotice[lang]}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('pathways')}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#1B1E78] hover:bg-[#14165E] rounded-lg transition-colors cursor-pointer"
            >
              <span>{lang === 'vi' ? 'Xem Các Loại Visa Úc' : 'Explore Visa Services'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setSubmittedRef(null)}
              className="px-5 py-3 text-sm font-semibold text-[#0F172A] border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            >
              {lang === 'vi' ? 'Chỉnh Sửa Thông Tin' : 'Edit Details'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-10 space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-bold tracking-[0.04em] uppercase text-[#1B1E78]">
          {lang === 'vi'
            ? 'Tư Vấn Chuẩn Bị Hồ Sơ Độc Lập'
            : 'Independent Visa Documentation Consultation'}
        </p>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
          {lang === 'vi'
            ? 'Đăng Ký Tư Vấn & Hướng Dẫn Chuẩn Bị Hồ Sơ Visa Úc'
            : 'Request 1-on-1 Visa Documentation Guidance'}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <form
          id="visa5s-consultation-form"
          name="visa5s_consultation_form"
          onSubmit={handleSubmit}
          noValidate
          className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-tier-1 space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="full-name" className="block text-sm font-semibold text-[#0F172A] mb-1.5">
                {lang === 'vi' ? 'Họ và tên *' : 'Full name *'}
              </label>
              <input
                id="full-name"
                name="fullName"
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                }}
                placeholder="VD: Nguyễn Văn An"
                className={`input-corporate w-full px-3.5 ${
                  errors.fullName ? 'input-corporate-error' : ''
                }`}
              />
              {errors.fullName && (
                <p className="mt-1.5 text-xs font-medium text-[#DD3333] flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-[#0F172A] mb-1.5">
                {lang === 'vi' ? 'Số điện thoại *' : 'Phone number *'}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                placeholder="0911 909 686"
                className={`input-corporate w-full px-3.5 ${
                  errors.phone ? 'input-corporate-error' : ''
                }`}
              />
              {errors.phone && (
                <p className="mt-1.5 text-xs font-medium text-[#DD3333] flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#0F172A] mb-1.5">
                {lang === 'vi' ? 'Email *' : 'Email *'}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="hoten@gmail.com"
                className={`input-corporate w-full px-3.5 ${
                  errors.email ? 'input-corporate-error' : ''
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs font-medium text-[#DD3333] flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            <div>
              <label htmlFor="target-subclass" className="block text-sm font-semibold text-[#0F172A] mb-1.5">
                {lang === 'vi' ? 'Nhu cầu tư vấn' : 'Consultation need'}
              </label>
              <select
                id="target-subclass"
                name="consultationNeed"
                value={subclass}
                onChange={(e) => setSubclass(e.target.value)}
                className="input-corporate w-full px-3.5"
              >
                {VISA_SUBCLASSES.map((v) => (
                  <option key={v.id} value={v.subclass}>
                    {v.subclass} — {v.categoryLabel[lang]}
                  </option>
                ))}
                <option value="Tư vấn chung hồ sơ Visa Úc">
                  {lang === 'vi' ? 'Tư vấn chung hồ sơ Visa Úc' : 'General Australian Visa Advice'}
                </option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="office" className="block text-sm font-semibold text-[#0F172A] mb-1.5">
                {lang === 'vi' ? 'Kênh / Văn phòng hỗ trợ' : 'Consultation channel'}
              </label>
              <select
                id="office"
                name="office"
                value={office}
                onChange={(e) => setOffice(e.target.value)}
                className="input-corporate w-full px-3.5"
              >
                <option value="TP.HCM — 370 Đường 3/2, P. Hòa Hưng">
                  {lang === 'vi'
                    ? 'Trụ sở TP.HCM — 370 Đường 3/2, P. Hòa Hưng'
                    : 'HCMC Head Office — 370 3/2 St, Hoa Hung Ward'}
                </option>
                <option value="TP.HCM — 16 Trần Đại Nghĩa, P. Đông Hòa">
                  {lang === 'vi'
                    ? 'VP Đông Hòa (TP.HCM) — 16 Trần Đại Nghĩa, P. Đông Hòa'
                    : 'Dong Hoa Office (HCMC) — 16 Tran Dai Nghia'}
                </option>
                <option value="Hà Nội — 59 Vương Thừa Vũ, P. Thanh Xuân">
                  {lang === 'vi'
                    ? 'VP Hà Nội — 59 Vương Thừa Vũ, P. Thanh Xuân'
                    : 'Hanoi Office — 59 Vuong Thua Vu, Thanh Xuan Ward'}
                </option>
                <option value="Tư vấn trực tuyến (Điện thoại / Zalo / Email)">
                  {lang === 'vi'
                    ? 'Tư vấn trực tuyến (Điện thoại / Zalo / Email)'
                    : 'Online Consultation (Phone / Zalo / Email)'}
                </option>
              </select>
            </div>

            <div>
              <label htmlFor="preferred-date" className="block text-sm font-semibold text-[#0F172A] mb-1.5">
                {lang === 'vi' ? 'Ngày liên hệ dự kiến *' : 'Preferred date *'}
              </label>
              <input
                id="preferred-date"
                name="preferredDate"
                type="date"
                value={preferredDate}
                onChange={(e) => {
                  setPreferredDate(e.target.value);
                  if (errors.preferredDate)
                    setErrors((prev) => ({ ...prev, preferredDate: undefined }));
                }}
                className={`input-corporate w-full px-3.5 tabular-nums ${
                  errors.preferredDate ? 'input-corporate-error' : ''
                }`}
              />
              {errors.preferredDate && (
                <p className="mt-1.5 text-xs font-medium text-[#DD3333] flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.preferredDate}</span>
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-semibold text-[#0F172A] mb-1.5">
              {lang === 'vi' ? 'Nội dung cần hỗ trợ' : 'Details you need assistance with'}
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                lang === 'vi'
                  ? 'Mô tả ngắn gọn mục đích chuyến đi, tình trạng công việc/tài chính hoặc các giấy tờ bạn cần hướng dẫn chuẩn bị...'
                  : 'Briefly describe your travel purpose, current background, or documents you need guidance on...'
              }
              className="w-full p-3.5 bg-white border-[1.5px] border-slate-300 rounded-lg text-sm text-[#0F172A] focus:outline-none focus:border-[#1B1E78] focus:ring-[3px] focus:ring-[#1B1E78]/15"
            />
          </div>

          <p className="text-xs text-slate-600 bg-[#F8FAFC] border border-slate-200 rounded-lg p-3 leading-relaxed">
            {SERVICE_DISCLOSURE.privacyNotice[lang]}
          </p>

          <button
            id="visa5s-submit-consultation"
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm sm:text-base font-semibold text-white bg-[#E11D24] hover:bg-[#B91C1C] rounded-lg transition-colors cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>
              {lang === 'vi'
                ? 'Gửi Thông Tin Đăng Ký Tư Vấn'
                : 'Submit Consultation Request'}
            </span>
          </button>
        </form>

        <aside className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-tier-1 space-y-4">
            <div className="text-xs font-bold uppercase tracking-[0.04em] text-[#1B1E78]">
              {lang === 'vi'
                ? `Giấy Tờ Tham Khảo · ${selectedVisaInfo.subclass}`
                : `Reference Checklist · ${selectedVisaInfo.subclass}`}
            </div>
            <h2 className="text-lg font-bold text-[#0F172A]">
              {selectedVisaInfo.title[lang]}
            </h2>
            <ul className="space-y-2.5">
              {selectedVisaInfo.requiredDocs[lang].map((doc, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <Check className="w-4 h-4 text-[#1B1E78] shrink-0 mt-0.5" strokeWidth={2.25} />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
            <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
              {SERVICE_DISCLOSURE.feeNotice[lang]}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-tier-1 space-y-4">
            <div className="space-y-3">
              <div className="w-full h-48 sm:h-56 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xs">
                <ResilientImage
                  src={ASSETS.teamVisa5s}
                  alt={lang === 'vi' ? 'Đội ngũ chuyên viên Visa5S' : 'Visa5S Specialist Advisory Team'}
                  className="w-full h-full object-cover object-center"
                  fallbackTitle="Đội ngũ chuyên viên Visa5S"
                />
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B1E78]">
                    <Users className="w-4 h-4 text-[#E11D24]" />
                    <span>
                      {lang === 'vi' ? 'Đội Ngũ Chuyên Viên Visa5S' : 'Visa5S Specialist Advisory Team'}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#047857] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>
                      {lang === 'vi' ? 'Đơn Vị Tư Nhân Độc Lập' : 'Independent Consultancy'}
                    </span>
                  </div>
                </div>

                <div className="text-sm font-bold text-[#0F172A]">
                  {BUSINESS_INFO.legalName}
                </div>

                <div className="text-xs text-slate-600 tabular-nums">
                  MST: {BUSINESS_INFO.taxId} · Hotline: {BUSINESS_INFO.phones[0]} ·{' '}
                  {BUSINESS_INFO.phones[1]}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1.5 leading-relaxed">
              <p>{SERVICE_DISCLOSURE.statement[lang]}</p>
              <a
                href={BUSINESS_INFO.officialSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-[#1B1E78] hover:underline"
              >
                <span>{BUSINESS_INFO.officialSourceUrl}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
