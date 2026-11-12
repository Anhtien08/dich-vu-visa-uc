import { useMemo, useState } from 'react';
import { Check, AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react';
import { Language, PointsAssessmentSummary, PointsBreakdownItem } from '../types';

interface CalculatorScreenProps {
  lang: Language;
  onBookWithAssessment: (summary: PointsAssessmentSummary) => void;
}

interface OptionItem {
  id: string;
  label: { vi: string; en: string };
  points: number;
}

const VISITOR_PURPOSE_OPTIONS: OptionItem[] = [
  { id: 'tourist', label: { vi: 'Du lịch tự túc Úc (Subclass 600 — Tourist)', en: 'Tourist Stream (Subclass 600)' }, points: 10 },
  { id: 'family', label: { vi: 'Thăm thân nhân / dự lễ tốt nghiệp tại Úc', en: 'Sponsored Family / Visiting Relatives' }, points: 15 },
  { id: 'business', label: { vi: 'Công tác, hội thảo, gặp gỡ đối tác Úc', en: 'Business Visitor Stream' }, points: 15 },
];

const VISITOR_JOB_OPTIONS: OptionItem[] = [
  { id: 'stable-staff', label: { vi: 'Nhân viên có HĐLĐ ≥ 1 năm, sao kê lương qua ngân hàng', en: 'Salaried staff (1+ yr contract & payroll)' }, points: 25 },
  { id: 'business-owner', label: { vi: 'Chủ doanh nghiệp / Hộ kinh doanh đóng thuế đầy đủ', en: 'Business owner with tax compliance' }, points: 25 },
  { id: 'retiree', label: { vi: 'Cán bộ hưu trí có sổ hưu & tài sản tích lũy', en: 'Retiree with pension & savings' }, points: 20 },
  { id: 'freelance', label: { vi: 'Kinh doanh tự do / Sinh viên (cần giải trình nguồn thu)', en: 'Freelancer / Student (needs financial sponsor)' }, points: 12 },
];

const VISITOR_FINANCE_OPTIONS: OptionItem[] = [
  { id: 'high', label: { vi: 'Sổ tiết kiệm ≥ 250 triệu VNĐ + Sở hữu nhà đất / Ô tô', en: 'Savings ≥ 250M VND + Property/Vehicle' }, points: 30 },
  { id: 'medium', label: { vi: 'Sổ tiết kiệm 150 – 250 triệu VNĐ', en: 'Savings 150 – 250M VND' }, points: 22 },
  { id: 'low', label: { vi: 'Dưới 150 triệu hoặc sổ mới mở (cần tối ưu hồ sơ)', en: 'Under 150M VND or newly opened deposit' }, points: 10 },
];

const VISITOR_TRAVEL_OPTIONS: OptionItem[] = [
  { id: 'tier1', label: { vi: 'Đã từng đi Úc, Mỹ, Anh, Canada, Nhật, Hàn hoặc Châu Âu', en: 'Prior travel to US, UK, AU, Schengen, JP, KR' }, points: 25 },
  { id: 'asean', label: { vi: 'Đã đi các nước Đông Nam Á (Thái Lan, Singapore...)', en: 'Southeast Asia travel history' }, points: 15 },
  { id: 'blank', label: { vi: 'Hộ chiếu trắng (chưa từng đi nước ngoài)', en: 'First-time traveller (blank passport)' }, points: 8 },
];

const SUBCLASS_OPTIONS: { id: '189' | '190' | '491'; label: { vi: string; en: string }; points: number }[] = [
  { id: '189', label: { vi: 'Visa 189 — Tay Nghề Độc Lập (+0 điểm)', en: 'Subclass 189 — Skilled Independent (+0 pts)' }, points: 0 },
  { id: '190', label: { vi: 'Visa 190 — Bảo Lãnh Tiểu Bang (+5 điểm)', en: 'Subclass 190 — State Nominated (+5 pts)' }, points: 5 },
  { id: '491', label: { vi: 'Visa 491 — Vùng Chỉ Định (+15 điểm)', en: 'Subclass 491 — Regional Provisional (+15 pts)' }, points: 15 },
];

const AGE_OPTIONS: OptionItem[] = [
  { id: '18-24', label: { vi: '18 – 24 tuổi', en: '18 – 24 years' }, points: 25 },
  { id: '25-32', label: { vi: '25 – 32 tuổi', en: '25 – 32 years' }, points: 30 },
  { id: '33-39', label: { vi: '33 – 39 tuổi', en: '33 – 39 years' }, points: 25 },
  { id: '40-44', label: { vi: '40 – 44 tuổi', en: '40 – 44 years' }, points: 15 },
];

const ENGLISH_OPTIONS: OptionItem[] = [
  { id: 'competent', label: { vi: 'Competent (IELTS 6.0 / PTE 50+)', en: 'Competent (IELTS 6.0 / PTE 50+)' }, points: 0 },
  { id: 'proficient', label: { vi: 'Proficient (IELTS 7.0 / PTE 65+)', en: 'Proficient (IELTS 7.0 / PTE 65+)' }, points: 10 },
  { id: 'superior', label: { vi: 'Superior (IELTS 8.0 / PTE 79+)', en: 'Superior (IELTS 8.0 / PTE 79+)' }, points: 20 },
];

const OVERSEAS_EXP_OPTIONS: OptionItem[] = [
  { id: '0-2', label: { vi: 'Dưới 3 năm', en: 'Less than 3 years' }, points: 0 },
  { id: '3-4', label: { vi: '3 – 4 năm (ngoài Úc)', en: '3 – 4 years (outside AU)' }, points: 5 },
  { id: '5-7', label: { vi: '5 – 7 năm (ngoài Úc)', en: '5 – 7 years (outside AU)' }, points: 10 },
  { id: '8+', label: { vi: 'Từ 8 năm trở lên', en: '8+ years (outside AU)' }, points: 15 },
];

const AUS_EXP_OPTIONS: OptionItem[] = [
  { id: '0', label: { vi: 'Dưới 1 năm tại Úc', en: 'Less than 1 year in AU' }, points: 0 },
  { id: '1-2', label: { vi: '1 – 2 năm tại Úc', en: '1 – 2 years in AU' }, points: 5 },
  { id: '3-4', label: { vi: '3 – 4 năm tại Úc', en: '3 – 4 years in AU' }, points: 10 },
  { id: '5-7', label: { vi: '5 – 7 năm tại Úc', en: '5 – 7 years in AU' }, points: 15 },
];

const EDUCATION_OPTIONS: OptionItem[] = [
  { id: 'phd', label: { vi: 'Bằng Tiến sĩ (PhD)', en: 'Doctorate (PhD)' }, points: 20 },
  { id: 'bachelor', label: { vi: 'Bằng Cử nhân hoặc Thạc sĩ', en: 'Bachelor or Master Degree' }, points: 15 },
  { id: 'diploma', label: { vi: 'Bằng Cao đẳng / Nghề tại Úc', en: 'Australian Diploma / Trade' }, points: 10 },
];

export function CalculatorScreen({ lang, onBookWithAssessment }: CalculatorScreenProps) {
  const [mode, setMode] = useState<'visitor600' | 'gsm'>('visitor600');

  // Visitor 600 state
  const [purposeId, setPurposeId] = useState('tourist');
  const [jobId, setJobId] = useState('stable-staff');
  const [financeId, setFinanceId] = useState('high');
  const [travelId, setTravelId] = useState('asean');
  const [familyTies, setFamilyTies] = useState(true);
  const [neverRefused, setNeverRefused] = useState(true);

  // GSM 189/190/491 state
  const [subclass, setSubclass] = useState<'189' | '190' | '491'>('190');
  const [ageId, setAgeId] = useState('25-32');
  const [englishId, setEnglishId] = useState('proficient');
  const [overseasExpId, setOverseasExpId] = useState('5-7');
  const [ausExpId, setAusExpId] = useState('0');
  const [educationId, setEducationId] = useState('bachelor');
  const [naatiCcl, setNaatiCcl] = useState(true);
  const [singleOrSkilledPartner, setSingleOrSkilledPartner] = useState(true);

  const handleReset = () => {
    if (mode === 'visitor600') {
      setPurposeId('tourist');
      setJobId('stable-staff');
      setFinanceId('medium');
      setTravelId('asean');
      setFamilyTies(true);
      setNeverRefused(true);
    } else {
      setSubclass('190');
      setAgeId('25-32');
      setEnglishId('proficient');
      setOverseasExpId('3-4');
      setAusExpId('0');
      setEducationId('bachelor');
      setNaatiCcl(false);
      setSingleOrSkilledPartner(true);
    }
  };

  const assessment = useMemo<PointsAssessmentSummary>(() => {
    if (mode === 'visitor600') {
      const pOpt = VISITOR_PURPOSE_OPTIONS.find((o) => o.id === purposeId)!;
      const jOpt = VISITOR_JOB_OPTIONS.find((o) => o.id === jobId)!;
      const fOpt = VISITOR_FINANCE_OPTIONS.find((o) => o.id === financeId)!;
      const tOpt = VISITOR_TRAVEL_OPTIONS.find((o) => o.id === travelId)!;

      const breakdown: PointsBreakdownItem[] = [
        {
          key: 'purpose',
          label: { vi: 'Mục Đích Chuyến Đi', en: 'Visit Purpose' },
          selectedLabel: pOpt.label,
          points: pOpt.points,
        },
        {
          key: 'job',
          label: { vi: 'Công Việc & Thu Nhập', en: 'Employment & Income' },
          selectedLabel: jOpt.label,
          points: jOpt.points,
        },
        {
          key: 'finance',
          label: { vi: 'Tài Chính & Tài Sản', en: 'Savings & Assets' },
          selectedLabel: fOpt.label,
          points: fOpt.points,
        },
        {
          key: 'travel',
          label: { vi: 'Lịch Sử Du Lịch', en: 'Travel History' },
          selectedLabel: tOpt.label,
          points: tOpt.points,
        },
      ];

      if (familyTies) {
        breakdown.push({
          key: 'ties',
          label: { vi: 'Ràng Buộc Gia Đình Tại VN', en: 'Vietnam Family Ties' },
          selectedLabel: { vi: 'Có vợ/chồng, con cái hoặc cha mẹ tại Việt Nam', en: 'Immediate family ties in Vietnam' },
          points: 5,
        });
      }
      if (neverRefused) {
        breakdown.push({
          key: 'history',
          label: { vi: 'Lịch Sử Tuân Thủ Visa', en: 'Clean Visa History' },
          selectedLabel: { vi: 'Chưa từng bị từ chối visa Úc', en: 'No prior Australian visa refusal' },
          points: 5,
        });
      }

      const rawTotal = breakdown.reduce((s, b) => s + b.points, 0);
      const totalPoints = Math.min(100, rawTotal);

      return {
        mode: 'visitor600',
        targetSubclass:
          purposeId === 'family'
            ? 'Visa 600 — Thăm Thân'
            : purposeId === 'business'
            ? 'Visa 600 — Công Tác'
            : 'Visa 600 — Du Lịch',
        totalPoints,
        maxPoints: 100,
        summaryNote: `Đánh giá sơ bộ hồ sơ ${pOpt.label.vi}: Đạt ${totalPoints}/100 điểm độ mạnh hồ sơ.`,
        breakdown,
      };
    }

    // GSM calculation
    const subOpt = SUBCLASS_OPTIONS.find((o) => o.id === subclass)!;
    const ageOpt = AGE_OPTIONS.find((o) => o.id === ageId)!;
    const engOpt = ENGLISH_OPTIONS.find((o) => o.id === englishId)!;
    const ovOpt = OVERSEAS_EXP_OPTIONS.find((o) => o.id === overseasExpId)!;
    const auOpt = AUS_EXP_OPTIONS.find((o) => o.id === ausExpId)!;
    const eduOpt = EDUCATION_OPTIONS.find((o) => o.id === educationId)!;

    const cappedWork = Math.min(20, ovOpt.points + auOpt.points);

    const breakdown: PointsBreakdownItem[] = [
      {
        key: 'nomination',
        label: { vi: 'Điểm Bảo Lãnh Diện Visa', en: 'Visa Stream Nomination' },
        selectedLabel: subOpt.label,
        points: subOpt.points,
      },
      {
        key: 'age',
        label: { vi: 'Độ Tuổi', en: 'Age Bracket' },
        selectedLabel: ageOpt.label,
        points: ageOpt.points,
      },
      {
        key: 'english',
        label: { vi: 'Tiếng Anh (IELTS / PTE)', en: 'English Proficiency' },
        selectedLabel: engOpt.label,
        points: engOpt.points,
      },
      {
        key: 'work',
        label: { vi: 'Kinh Nghiệm Làm Việc (tối đa 20đ)', en: 'Skilled Employment (max 20)' },
        selectedLabel: { vi: `${ovOpt.label.vi} + ${auOpt.label.vi}`, en: `${ovOpt.label.en} + ${auOpt.label.en}` },
        points: cappedWork,
      },
      {
        key: 'education',
        label: { vi: 'Bằng Cấp Học Thuật', en: 'Academic Qualification' },
        selectedLabel: eduOpt.label,
        points: eduOpt.points,
      },
    ];

    if (singleOrSkilledPartner) {
      breakdown.push({
        key: 'partner',
        label: { vi: 'Tình Trạng Gia Đình / Vợ Chồng', en: 'Partner / Single Status' },
        selectedLabel: { vi: 'Độc thân hoặc vợ/chồng đạt chuẩn tay nghề & tiếng Anh', en: 'Single or skilled partner' },
        points: 10,
      });
    }
    if (naatiCcl) {
      breakdown.push({
        key: 'naati',
        label: { vi: 'Chứng Chỉ NAATI CCL Việt–Anh', en: 'NAATI CCL Community Language' },
        selectedLabel: { vi: 'Đạt NAATI CCL', en: 'NAATI CCL Accredited' },
        points: 5,
      });
    }

    const totalPoints = breakdown.reduce((s, b) => s + b.points, 0);

    return {
      mode: 'gsm',
      targetSubclass: 'Visa 820 / 189 / 190',
      totalPoints,
      summaryNote: `Điểm định cư tay nghề dự kiến cho Subclass ${subclass}: ${totalPoints} điểm EOI.`,
      breakdown,
    };
  }, [
    mode,
    purposeId,
    jobId,
    financeId,
    travelId,
    familyTies,
    neverRefused,
    subclass,
    ageId,
    englishId,
    overseasExpId,
    ausExpId,
    educationId,
    naatiCcl,
    singleOrSkilledPartner,
  ]);

  const isStrong =
    mode === 'visitor600' ? assessment.totalPoints >= 70 : assessment.totalPoints >= 65;

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-10 space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-bold tracking-[0.04em] uppercase text-[#1B1E78]">
            {lang === 'vi'
              ? 'Công Cụ Tự Đánh Giá Tham Khảo'
              : 'Reference Readiness Self-Check'}
          </p>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            {lang === 'vi'
              ? 'Kiểm Tra Mức Độ Chuẩn Bị Hồ Sơ Tham Khảo'
              : 'Evaluate Your Documentation Readiness'}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center p-1 bg-slate-100 border border-slate-200 rounded-lg">
            <button
              type="button"
              onClick={() => setMode('visitor600')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                mode === 'visitor600'
                  ? 'bg-white text-[#0F172A] shadow-xs'
                  : 'text-slate-600 hover:text-[#0F172A]'
              }`}
            >
              {lang === 'vi' ? 'Visa 600 (Du Lịch / Thăm Thân / Công Tác)' : 'Subclass 600 Visitor Check'}
            </button>
            <button
              type="button"
              onClick={() => setMode('gsm')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                mode === 'gsm'
                  ? 'bg-white text-[#0F172A] shadow-xs'
                  : 'text-slate-600 hover:text-[#0F172A]'
              }`}
            >
              {lang === 'vi' ? 'Tính Điểm Định Cư 189 / 190 / 491' : 'GSM Points (189/190/491)'}
            </button>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{lang === 'vi' ? 'Đặt Lại' : 'Reset'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Criteria Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {mode === 'visitor600' ? (
            <>
              <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-tier-1 space-y-4">
                <h2 className="text-base font-bold text-[#0F172A]">
                  {lang === 'vi' ? '1. Mục Đích Xin Visa Úc (Subclass 600)' : '1. Purpose of Visit (Subclass 600)'}
                </h2>
                <div className="grid grid-cols-1 gap-2.5">
                  {VISITOR_PURPOSE_OPTIONS.map((opt) => {
                    const selected = purposeId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPurposeId(opt.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between gap-4 cursor-pointer ${
                          selected
                            ? 'border-[#1B1E78] bg-[#EEF2FF]/70'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                              selected ? 'border-[#1B1E78] bg-[#1B1E78]' : 'border-slate-300 bg-white'
                            }`}
                          >
                            {selected && <span className="w-2 h-2 rounded-full bg-white" />}
                          </span>
                          <span className="text-sm font-semibold text-[#0F172A]">
                            {opt.label[lang]}
                          </span>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#1B1E78] tabular-nums shrink-0">
                          +{opt.points}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-tier-1 space-y-5">
                <div>
                  <h2 className="text-base font-bold text-[#0F172A] mb-3">
                    {lang === 'vi' ? '2. Tình Trạng Công Việc & Nguồn Thu Nhập' : '2. Employment & Income Stability'}
                  </h2>
                  <div className="grid grid-cols-1 gap-2.5">
                    {VISITOR_JOB_OPTIONS.map((opt) => {
                      const selected = jobId === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setJobId(opt.id)}
                          className={`px-4 py-3 rounded-xl border text-left flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                            selected
                              ? 'border-[#1B1E78] bg-[#EEF2FF]/70'
                              : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <span className="text-sm font-medium text-[#0F172A]">{opt.label[lang]}</span>
                          <span className="font-mono text-xs font-bold text-[#1B1E78] tabular-nums shrink-0">
                            +{opt.points}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h2 className="text-base font-bold text-[#0F172A] mb-3">
                    {lang === 'vi' ? '3. Khả Năng Tài Chính & Tài Sản Sở Hữu' : '3. Financial Savings & Assets'}
                  </h2>
                  <div className="grid grid-cols-1 gap-2.5">
                    {VISITOR_FINANCE_OPTIONS.map((opt) => {
                      const selected = financeId === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setFinanceId(opt.id)}
                          className={`px-4 py-3 rounded-xl border text-left flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                            selected
                              ? 'border-[#1B1E78] bg-[#EEF2FF]/70'
                              : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <span className="text-sm font-medium text-[#0F172A]">{opt.label[lang]}</span>
                          <span className="font-mono text-xs font-bold text-[#1B1E78] tabular-nums shrink-0">
                            +{opt.points}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <h2 className="text-base font-bold text-[#0F172A]">
                    {lang === 'vi' ? '4. Lịch Sử Du Lịch & Ràng Buộc Quay Về' : '4. Travel History & Home Ties'}
                  </h2>
                  <div className="grid grid-cols-1 gap-2.5">
                    {VISITOR_TRAVEL_OPTIONS.map((opt) => {
                      const selected = travelId === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setTravelId(opt.id)}
                          className={`px-4 py-3 rounded-xl border text-left flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                            selected
                              ? 'border-[#1B1E78] bg-[#EEF2FF]/70'
                              : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <span className="text-sm font-medium text-[#0F172A]">{opt.label[lang]}</span>
                          <span className="font-mono text-xs font-bold text-[#1B1E78] tabular-nums shrink-0">
                            +{opt.points}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {[
                    {
                      checked: familyTies,
                      toggle: () => setFamilyTies((v) => !v),
                      label: {
                        vi: 'Có gia đình ràng buộc tại Việt Nam (vợ/chồng, con cái, cha mẹ)',
                        en: 'Immediate family ties residing in Vietnam',
                      },
                      pts: 5,
                    },
                    {
                      checked: neverRefused,
                      toggle: () => setNeverRefused((v) => !v),
                      label: {
                        vi: 'Chưa từng bị từ chối visa Úc trước đây',
                        en: 'No previous Australian visa refusals',
                      },
                      pts: 5,
                    },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      role="checkbox"
                      aria-checked={item.checked}
                      onClick={item.toggle}
                      className={`w-full px-4 py-3 rounded-xl border text-left flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                        item.checked
                          ? 'border-[#1B1E78] bg-[#EEF2FF]/70'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                            item.checked
                              ? 'bg-[#1B1E78] border-[#1B1E78] text-white'
                              : 'bg-white border-slate-300'
                          }`}
                        >
                          {item.checked && <Check className="w-3.5 h-3.5" strokeWidth={2.5} />}
                        </span>
                        <span className="text-sm font-medium text-[#0F172A]">{item.label[lang]}</span>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#1B1E78] tabular-nums">
                        +{item.pts}
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            </>
          ) : (
            <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-tier-1 space-y-5">
              <div>
                <h2 className="text-base font-bold text-[#0F172A] mb-3">
                  {lang === 'vi' ? '1. Chọn Diện Định Cư Tay Nghề' : '1. Skilled Migration Subclass'}
                </h2>
                <div className="grid grid-cols-1 gap-2.5">
                  {SUBCLASS_OPTIONS.map((opt) => {
                    const selected = subclass === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSubclass(opt.id)}
                        className={`px-4 py-3 rounded-xl border text-left flex items-center justify-between gap-3 cursor-pointer ${
                          selected
                            ? 'border-[#1B1E78] bg-[#EEF2FF]/70'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-sm font-semibold text-[#0F172A]">{opt.label[lang]}</span>
                        <span className="font-mono text-xs font-bold text-[#1B1E78] tabular-nums">
                          +{opt.points}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <label htmlFor="gsm-age" className="block text-sm font-bold text-[#0F172A] mb-2">
                    {lang === 'vi' ? '2. Độ Tuổi' : '2. Age'}
                  </label>
                  <select
                    id="gsm-age"
                    value={ageId}
                    onChange={(e) => setAgeId(e.target.value)}
                    className="input-corporate w-full px-3 text-sm"
                  >
                    {AGE_OPTIONS.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.label[lang]} (+{o.points})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="gsm-eng" className="block text-sm font-bold text-[#0F172A] mb-2">
                    {lang === 'vi' ? '3. Tiếng Anh' : '3. English'}
                  </label>
                  <select
                    id="gsm-eng"
                    value={englishId}
                    onChange={(e) => setEnglishId(e.target.value)}
                    className="input-corporate w-full px-3 text-sm"
                  >
                    {ENGLISH_OPTIONS.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.label[lang]} (+{o.points})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="gsm-ov" className="block text-sm font-bold text-[#0F172A] mb-2">
                    {lang === 'vi' ? '4. Kinh Nghiệm Ngoài Úc' : '4. Overseas Experience'}
                  </label>
                  <select
                    id="gsm-ov"
                    value={overseasExpId}
                    onChange={(e) => setOverseasExpId(e.target.value)}
                    className="input-corporate w-full px-3 text-sm"
                  >
                    {OVERSEAS_EXP_OPTIONS.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.label[lang]} (+{o.points})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="gsm-au" className="block text-sm font-bold text-[#0F172A] mb-2">
                    {lang === 'vi' ? '5. Kinh Nghiệm Tại Úc' : '5. Australian Experience'}
                  </label>
                  <select
                    id="gsm-au"
                    value={ausExpId}
                    onChange={(e) => setAusExpId(e.target.value)}
                    className="input-corporate w-full px-3 text-sm"
                  >
                    {AUS_EXP_OPTIONS.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.label[lang]} (+{o.points})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div>
                  <label htmlFor="gsm-edu" className="block text-sm font-bold text-[#0F172A] mb-2">
                    {lang === 'vi' ? '6. Bằng Cấp Cao Nhất' : '6. Highest Qualification'}
                  </label>
                  <select
                    id="gsm-edu"
                    value={educationId}
                    onChange={(e) => setEducationId(e.target.value)}
                    className="input-corporate w-full px-3 text-sm"
                  >
                    {EDUCATION_OPTIONS.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.label[lang]} (+{o.points})
                      </option>
                    ))}
                  </select>
                </div>

                {[
                  {
                    checked: singleOrSkilledPartner,
                    toggle: () => setSingleOrSkilledPartner((v) => !v),
                    label: {
                      vi: 'Độc thân hoặc vợ/chồng có thẩm định tay nghề & tiếng Anh (+10đ)',
                      en: 'Single or skilled partner (+10 pts)',
                    },
                  },
                  {
                    checked: naatiCcl,
                    toggle: () => setNaatiCcl((v) => !v),
                    label: {
                      vi: 'Có chứng chỉ NAATI CCL Việt–Anh (+5đ)',
                      en: 'NAATI CCL Community Language (+5 pts)',
                    },
                  },
                ].map((b, i) => (
                  <button
                    key={i}
                    type="button"
                    role="checkbox"
                    aria-checked={b.checked}
                    onClick={b.toggle}
                    className={`w-full px-4 py-3 rounded-xl border text-left flex items-center gap-3 cursor-pointer ${
                      b.checked ? 'border-[#1B1E78] bg-[#EEF2FF]/70' : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                        b.checked ? 'bg-[#1B1E78] border-[#1B1E78] text-white' : 'bg-white border-slate-300'
                      }`}
                    >
                      {b.checked && <Check className="w-3.5 h-3.5" strokeWidth={2.5} />}
                    </span>
                    <span className="text-sm font-medium text-[#0F172A]">{b.label[lang]}</span>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Live Summary */}
        <aside className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-tier-2 space-y-6">
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-200">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.04em] text-slate-500">
                  {mode === 'visitor600'
                    ? lang === 'vi'
                      ? 'Độ Mạnh Hồ Sơ Visa 600'
                      : 'Subclass 600 Profile Score'
                    : lang === 'vi'
                    ? 'Tổng Điểm Định Cư EOI'
                    : 'Calculated EOI Score'}
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-[#0F172A] tracking-tight tabular-nums">
                    {assessment.totalPoints}
                  </span>
                  <span className="text-sm font-semibold text-slate-500">
                    {mode === 'visitor600' ? '/ 100' : lang === 'vi' ? 'điểm' : 'pts'}
                  </span>
                </div>
              </div>

              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                  isStrong ? 'bg-[#ECFDF5] text-[#047857]' : 'bg-[#FEF3C7] text-[#B45309]'
                }`}
              >
                {isStrong ? (
                  <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5" strokeWidth={2.5} />
                )}
                <span>
                  {mode === 'visitor600'
                    ? isStrong
                      ? lang === 'vi'
                        ? 'Giấy Tờ Tương Đối Đầy Đủ'
                        : 'Well-Documented Reference'
                      : lang === 'vi'
                      ? 'Cần Bổ Sung Giấy Tờ'
                      : 'Needs Supporting Proof'
                    : isStrong
                    ? lang === 'vi'
                      ? 'Đạt Ngưỡng Tham Khảo 65đ'
                      : 'Meets 65-Pt Reference'
                    : lang === 'vi'
                    ? 'Chưa Đủ 65 Điểm Tham Khảo'
                    : 'Below 65-Pt Reference'}
                </span>
              </div>
            </div>

            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  isStrong ? 'bg-[#1B1E78]' : 'bg-[#F59E0B]'
                }`}
                style={{
                  width: `${Math.min(
                    100,
                    mode === 'visitor600'
                      ? assessment.totalPoints
                      : (assessment.totalPoints / 120) * 100
                  )}%`,
                }}
              />
            </div>

            <div className="divide-y divide-slate-100">
              {assessment.breakdown.map((row) => (
                <div
                  key={row.key}
                  className="py-2.5 flex items-center justify-between gap-4 text-sm"
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-[#0F172A] truncate">
                      {row.label[lang]}
                    </div>
                    <div className="text-xs text-slate-500 truncate">
                      {row.selectedLabel[lang]}
                    </div>
                  </div>
                  <div className="font-mono text-sm font-bold text-[#1B1E78] tabular-nums shrink-0">
                    +{row.points}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-500 leading-relaxed bg-[#F8FAFC] border border-slate-200 rounded-lg p-3">
              {lang === 'vi'
                ? 'Lưu ý: Kết quả trên chỉ mang tính chất tham khảo mức độ chuẩn bị thông tin ban đầu, không phải cam kết hay quyết định xét duyệt từ Chính phủ Úc.'
                : 'Note: This score is for initial documentation reference only and does not represent an official assessment or visa approval guarantee.'}
            </p>

            <button
              type="button"
              onClick={() => onBookWithAssessment(assessment)}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 text-sm font-semibold text-white bg-[#E11D24] hover:bg-[#B91C1C] rounded-lg transition-colors cursor-pointer"
            >
              <span>
                {lang === 'vi'
                  ? 'Gửi Thông Tin Tham Khảo Để Được Tư Vấn'
                  : 'Send Reference Summary for Consultation'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
