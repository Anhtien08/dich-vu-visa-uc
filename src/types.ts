export type ScreenId = 'overview' | 'pathways' | 'calculator' | 'consultation';

export type Language = 'vi' | 'en';

export type VisaCategory = 'all' | 'tourist' | 'business' | 'student';

export interface LocalizedText {
  vi: string;
  en: string;
}

export interface VisaSubclass {
  id: string;
  subclass: string;
  category: Exclude<VisaCategory, 'all'>;
  categoryLabel: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  processingTime: LocalizedText;
  serviceHighlight: LocalizedText;
  pointsTested: boolean;
  minPoints?: number;
  benefits: {
    vi: string[];
    en: string[];
  };
  eligibility: {
    vi: string[];
    en: string[];
  };
  requiredDocs: {
    vi: string[];
    en: string[];
  };
  imageSrc: string;
  imageAlt: LocalizedText;
}

export interface PointsBreakdownItem {
  key: string;
  label: LocalizedText;
  selectedLabel: LocalizedText;
  points: number;
}

export interface PointsAssessmentSummary {
  mode: 'visitor600' | 'gsm';
  targetSubclass: string;
  totalPoints: number;
  maxPoints?: number;
  summaryNote: string;
  breakdown: PointsBreakdownItem[];
}

export interface CaseOutcome {
  id: string;
  subclass: string;
  clientName: string;
  clientRole: LocalizedText;
  originCity: LocalizedText;
  timelineMetric: LocalizedText;
  pointsOrStream: LocalizedText;
  quote: LocalizedText;
  imageSrc: string;
  imageAlt: LocalizedText;
}

export interface ProcessStep {
  step: string;
  title: LocalizedText;
  description: LocalizedText;
}

export interface GrantResultItem {
  id: string;
  badge: LocalizedText;
  title: LocalizedText;
  subclass: string;
  stream: LocalizedText;
  validity: LocalizedText;
  entries: LocalizedText;
  stay: LocalizedText;
  description: LocalizedText;
  imageSrc: string;
  imageAlt: LocalizedText;
  highlightTag: LocalizedText;
}
