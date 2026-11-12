import {
  CaseOutcome,
  GrantResultItem,
  ProcessStep,
  VisaSubclass,
} from '../types';

export const ASSETS = {
  logo: '/assets/aistudio/LOGO1_869dacd6.jpg',
  heroSydney: '/src/assets/images/hero_sydney_harbour_skyline_1794385491775.jpg',
  officeConsultation: '/src/assets/images/advisory_consultation_office_1794385490779.jpg',
  melbourneCampus: '/src/assets/images/melbourne_university_campus_1794385491440.jpg',
  skilledEngineering: '/src/assets/images/skilled_engineering_team_1794385492101.jpg',
  leadAdvisor: '/assets/aistudio/image_0d7c8da4.png',
  teamVisa5s: '/assets/aistudio/image_0d7c8da4.png',
  grantResult3Years: '/assets/aistudio/_c_3_n_m_665ba789.jpg',
  grantResult10Years: '/assets/aistudio/ucs10_n_m_be916c4e.jpg',
} as const;

export const BUSINESS_INFO = {
  brand: 'Visa5S',
  legalName: 'CÔNG TY TƯ VẤN ĐẦU TƯ ASIA BLUE SKY',
  taxId: '0313867506',
  registeredAddress: '370 Đường 3/2, Phường Hòa Hưng, TP. Hồ Chí Minh',
  branches: [
    {
      label: { vi: 'Văn phòng Đông Hòa (TP.HCM)', en: 'Dong Hoa Office (HCMC)' },
      address: '16 Trần Đại Nghĩa, Phường Đông Hòa, TP. Hồ Chí Minh',
    },
    {
      label: { vi: 'Văn phòng Hà Nội', en: 'Hanoi Office' },
      address: '59 Vương Thừa Vũ, Phường Thanh Xuân, Hà Nội',
    },
  ],
  phones: ['0911 909 686', '0967 686 101', '(028) 6681 5234'],
  email: 'info@visa5s.com.vn',
  officialSourceUrl: 'https://immi.homeaffairs.gov.au/',
} as const;

export const SERVICE_DISCLOSURE = {
  title: {
    vi: 'Thông tin về dịch vụ',
    en: 'Service Information & Disclosure',
  },
  statement: {
    vi: 'Visa5S là doanh nghiệp tư vấn dịch vụ tư nhân, hoạt động độc lập. Chúng tôi không phải cơ quan chính phủ, không đại diện cho Chính phủ Úc và không có thẩm quyền cấp hoặc quyết định thị thực. Quyết định xét duyệt thuộc cơ quan có thẩm quyền của Úc.',
    en: 'Visa5S is an independent private consultancy. We are not a government agency, do not represent the Australian Government, and have no authority to grant or decide visa applications. Visa decisions rest solely with the relevant Australian authorities.',
  },
  feeNotice: {
    vi: 'Phí dịch vụ tư vấn và hỗ trợ chuẩn bị hồ sơ của Visa5S được báo giá riêng theo nhu cầu từng khách hàng, hoàn toàn tách biệt với lệ phí xin thị thực và các khoản phí bắt buộc nộp theo quy định của Chính phủ Úc hoặc đơn vị tiếp nhận hồ sơ chính thức.',
    en: 'Visa5S advisory and document preparation service fees are quoted independently and are strictly separate from Australian Government visa application charges and official third-party processing fees.',
  },
  officialSourceLabel: {
    vi: 'Nguồn thông tin chính thức từ Bộ Nội vụ Úc:',
    en: 'Official Australian Government Information Source:',
  },
  privacyNotice: {
    vi: 'Thông tin của bạn được sử dụng để liên hệ tư vấn dịch vụ theo chính sách bảo mật của Visa5S.',
    en: 'Your information is used to contact you regarding advisory services in accordance with Visa5S privacy policy.',
  },
};

export const TRANSPARENT_FAQS = [
  {
    id: 'faq-1',
    question: {
      vi: 'Visa5S có phải cơ quan cấp visa hay đại diện Chính phủ Úc không?',
      en: 'Is Visa5S a government agency or official Australian representative?',
    },
    answer: {
      vi: 'Không. Visa5S (thuộc Công ty Tư vấn Đầu tư Asia Blue Sky) là doanh nghiệp tư vấn dịch vụ tư nhân, hoạt động độc lập tại Việt Nam. Chúng tôi hỗ trợ khách hàng tìm hiểu quy trình, sắp xếp và chuẩn bị giấy tờ; thẩm quyền tiếp nhận, xét duyệt và cấp thị thực hoàn toàn thuộc Bộ Nội vụ Úc.',
      en: 'No. Visa5S is an independent private consultancy in Vietnam. We assist clients with documentation preparation and procedural guidance; all visa assessments and decisions belong solely to the Australian Department of Home Affairs.',
    },
  },
  {
    id: 'faq-2',
    question: {
      vi: 'Phí dịch vụ của Visa5S khác gì với lệ phí Chính phủ Úc?',
      en: 'How does Visa5S service fee differ from Australian Government charges?',
    },
    answer: {
      vi: 'Phí dịch vụ Visa5S là chi phí cho công tác tư vấn, rà soát thông tin, hướng dẫn chuẩn bị giấy tờ, dịch thuật công chứng và hỗ trợ quy trình hồ sơ. Khoản phí này hoàn toàn tách biệt với lệ phí nộp đơn thị thực của Chính phủ Úc và các phí sinh trắc học hoặc khám sức khỏe (nếu có).',
      en: 'Visa5S service fees cover private advisory, checklist review, certified translation coordination, and application preparation support. These are completely separate from official Australian Government visa application charges and biometrics/medical fees.',
    },
  },
  {
    id: 'faq-3',
    question: {
      vi: 'Sử dụng dịch vụ hỗ trợ có bảo đảm được cấp visa hoặc thời hạn cố định không?',
      en: 'Does using advisory support guarantee visa approval or fixed validity?',
    },
    answer: {
      vi: 'Không có đơn vị tư nhân nào được quyền bảo đảm kết quả hay thời hạn thị thực (như 1 năm, 3 năm hay 10 năm). Visa5S hỗ trợ khách hàng chuẩn bị hồ sơ trung thực, logic và đầy đủ thông tin theo hướng dẫn công khai; kết quả cuối cùng do viên chức xét duyệt Úc quyết định.',
      en: 'No private consultancy can guarantee visa outcomes, processing speed, or validity length. Visa5S helps you prepare accurate, well-organized documentation based on public guidelines, while final decisions rest with Australian authorities.',
    },
  },
  {
    id: 'faq-4',
    question: {
      vi: 'Tôi có thể tự kiểm tra quy định và lệ phí chính thức của Úc ở đâu?',
      en: 'Where can I check official Australian visa rules and fees directly?',
    },
    answer: {
      vi: 'Bạn có thể tra cứu trực tiếp toàn bộ quy định thị thực, lệ phí chính phủ và thời gian xử lý tham khảo tại cổng thông tin chính thức của Bộ Nội vụ Úc: https://immi.homeaffairs.gov.au/.',
      en: 'You can verify all official visa requirements, government charges, and indicative timelines directly at the Australian Department of Home Affairs portal: https://immi.homeaffairs.gov.au/.',
    },
  },
];

export const UI_COPY = {
  brandName: 'Visa5S',
  nav: {
    overview: { vi: 'Tổng Quan', en: 'Overview' },
    pathways: { vi: 'Các Loại Visa Úc', en: 'Australia Visas' },
    calculator: { vi: 'Thẩm Định Hồ Sơ', en: 'Profile Check' },
    bookCta: { vi: 'Đăng Ký Tư Vấn', en: 'Book Consult' },
  },
  hero: {
    trustMarker: {
      vi: 'Đơn Vị Tư Vấn & Hỗ Trợ Chuẩn Bị Hồ Sơ Visa Úc Độc Lập · Hỗ Trợ Tại TP. Hồ Chí Minh & Hà Nội',
      en: 'Independent Private Visa Documentation Consultancy · HCMC & Hanoi',
    },
    headline: {
      vi: 'Tư Vấn & Hỗ Trợ Chuẩn Bị Hồ Sơ Visa Úc Rõ Ràng, Minh Bạch',
      en: 'Transparent Australian Visa Documentation & Advisory Support',
    },
    subheadline: {
      vi: 'Visa5S hỗ trợ khách hàng tìm hiểu quy định, chuẩn bị giấy tờ, dịch thuật công chứng và hoàn thiện hồ sơ tham khảo cho các diện Du lịch 600, Thăm thân, Công tác và Du học. Mọi thông tin đều được tư vấn trung thực, tách biệt rõ phí dịch vụ và lệ phí Chính phủ Úc.',
      en: 'Visa5S assists clients with requirement reviews, tailored checklists, certified translation coordination, and application preparation for Tourist, Family Visit, Business, and Study pathways—with clear separation between advisory fees and government charges.',
    },
    primaryCta: {
      vi: 'Đăng Ký Tư Vấn Hồ Sơ',
      en: 'Request Consultation',
    },
    secondaryCta: {
      vi: 'Xem Các Diện Visa Úc',
      en: 'Explore Visa Categories',
    },
    caption: {
      vi: 'Cảnh quan cảng Sydney, Australia · Tham khảo quy định chính thức tại immi.homeaffairs.gov.au',
      en: 'Sydney Harbour, Australia · Official rules available at immi.homeaffairs.gov.au',
    },
  },
  kpis: [
    {
      value: '1-1',
      label: {
        vi: 'Chuyên Viên Tư Vấn & Rà Soát Hồ Sơ Trực Tiếp',
        en: 'Dedicated 1-on-1 Documentation Review',
      },
    },
    {
      value: '5 Bước',
      label: {
        vi: 'Quy Trình Hỗ Trợ Chuẩn Bị Giấy Tờ Rõ Ràng',
        en: 'Clear 5-Step Preparation Workflow',
      },
    },
    {
      value: 'Minh Bạch',
      label: {
        vi: 'Tách Biệt Phí Dịch Vụ & Lệ Phí Chính Phủ Úc',
        en: 'Service Fees Separate From Govt Charges',
      },
    },
    {
      value: 'Độc Lập',
      label: {
        vi: 'Doanh Nghiệp Tư Vấn Tư Nhân · MST 0313867506',
        en: 'Independent Private Consultancy',
      },
    },
  ],
  footer: {
    notice: {
      vi: 'Visa5S (Công ty Tư vấn Đầu tư Asia Blue Sky) là doanh nghiệp tư vấn dịch vụ tư nhân, hoạt động độc lập; không phải cơ quan chính phủ và không có thẩm quyền cấp thị thực.',
      en: 'Visa5S (Asia Blue Sky Investment Consulting Co.) is an independent private consultancy, not a government body, with no visa-issuing authority.',
    },
    offices: {
      vi: 'Trụ sở chính: 370 Đường 3/2, Phường Hòa Hưng, TP. Hồ Chí Minh  |  MST: 0313867506',
      en: 'Head Office: 370 3/2 Street, Hoa Hung Ward, Ho Chi Minh City  |  Tax ID: 0313867506',
    },
  },
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: {
      vi: 'Lắng nghe nhu cầu & rà soát sơ bộ',
      en: 'Initial Needs & Background Review',
    },
    description: {
      vi: 'Chuyên viên trao đổi về mục đích chuyến đi, công việc và khả năng tài chính để tư vấn diện thị thực phù hợp với hoàn cảnh cá nhân.',
      en: 'Advisors discuss your travel goals, employment, and financial background to identify suitable visa streams.',
    },
  },
  {
    step: '02',
    title: {
      vi: 'Cung cấp danh mục giấy tờ cần chuẩn bị',
      en: 'Tailored Document Checklist',
    },
    description: {
      vi: 'Gửi checklist giấy tờ chi tiết theo từng nhóm nghề nghiệp (nhân viên, chủ doanh nghiệp, hưu trí, học sinh) để khách hàng chủ động chuẩn bị.',
      en: 'Provide structured document checklists tailored for employees, business owners, retirees, and students.',
    },
  },
  {
    step: '03',
    title: {
      vi: 'Hỗ trợ dịch thuật & kiểm tra hồ sơ',
      en: 'Translation & Consistency Check',
    },
    description: {
      vi: 'Hỗ trợ điều phối dịch thuật công chứng, rà soát tính nhất quán của thông tin nhân thân, lịch trình chuyến đi và tài chính trước khi nộp.',
      en: 'Coordinate certified translations and verify consistency across identity, itinerary, and financial records.',
    },
  },
  {
    step: '04',
    title: {
      vi: 'Hướng dẫn nộp đơn & tách bạch lệ phí',
      en: 'Submission & Fee Separation Guidance',
    },
    description: {
      vi: 'Hướng dẫn quy trình khai thông tin, nộp hồ sơ trực tuyến và đóng lệ phí chính phủ theo quy định hiện hành (tách biệt với phí dịch vụ Visa5S).',
      en: 'Guide online submission steps and separate payment of official Australian Government charges.',
    },
  },
  {
    step: '05',
    title: {
      vi: 'Hỗ trợ cập nhật thông tin sau khi nộp',
      en: 'Post-Lodgement Follow-Up Support',
    },
    description: {
      vi: 'Hỗ trợ khách hàng theo dõi thông báo từ hệ thống chính thức, chuẩn bị giấy tờ bổ sung nếu được yêu cầu trong thời gian cơ quan Úc xét duyệt.',
      en: 'Help clients monitor official notifications and organize any additional documents requested by authorities.',
    },
  },
];

export const VISA_SUBCLASSES: VisaSubclass[] = [
  {
    id: 'visa-600-tourist',
    subclass: 'Visa 600 — Du Lịch',
    category: 'tourist',
    categoryLabel: { vi: 'Du Lịch & Thăm Thân', en: 'Tourist & Family' },
    title: {
      vi: 'Tư Vấn Hồ Sơ Du Lịch Úc (Subclass 600 — Tourist Stream)',
      en: 'Australian Tourist Visa Preparation (Subclass 600)',
    },
    summary: {
      vi: 'Hỗ trợ chuẩn bị hồ sơ du lịch Úc theo diện Subclass 600: tư vấn sắp xếp lịch trình tham quan hợp lý, giấy tờ chứng minh công việc và khả năng tài chính.',
      en: 'Documentation guidance for Subclass 600 Tourist applications, covering itinerary planning, employment proof, and financial organization.',
    },
    processingTime: {
      vi: 'Phụ thuộc cơ quan xét duyệt Úc',
      en: 'Determined by Australian Home Affairs',
    },
    serviceHighlight: {
      vi: 'Phí dịch vụ tư vấn tách biệt hoàn toàn với lệ phí Chính phủ Úc',
      en: 'Advisory fee billed separately from Australian Government visa fees',
    },
    pointsTested: false,
    benefits: {
      vi: [
        'Hướng dẫn phân loại hồ sơ nhập cảnh 1 lần hoặc nhiều lần theo nhu cầu chuyến đi',
        'Hỗ trợ sắp xếp lịch trình tham quan Australia và kiểm tra tính logic giấy tờ',
        'Tư vấn cách trình bày ràng buộc công việc, gia đình và tài sản tại Việt Nam',
      ],
      en: [
        'Guidance on preparing single or multiple-entry travel documentation',
        'Itinerary organization and cross-checking of supporting records',
        'Advice on presenting clear employment, family, and asset ties in Vietnam',
      ],
    },
    eligibility: {
      vi: [
        'Có mục đích du lịch rõ ràng và kế hoạch rời khỏi Úc đúng thời hạn quy định',
        'Có giấy tờ chứng minh công việc hoặc nguồn thu nhập hợp pháp, ổn định',
        'Chứng minh đủ nguồn tài chính chi trả cho chuyến đi theo hướng dẫn tham khảo',
        'Đáp ứng các tiêu chuẩn về nhân thân và sức khỏe theo quy định của Bộ Nội vụ Úc',
      ],
      en: [
        'Genuine temporary visitor intent and plan to depart within permitted stay',
        'Verifiable employment, business, or lawful income documentation',
        'Sufficient financial funds to cover planned travel expenses',
        'Compliance with character and health standards set by Australian authorities',
      ],
    },
    requiredDocs: {
      vi: [
        'Hộ chiếu còn hiệu lực & CCCD (bản chụp màu các trang thông tin)',
        'Giấy khai sinh, xác nhận cư trú, giấy đăng ký kết hôn (nếu có)',
        'Hợp đồng lao động, đơn nghỉ phép hoặc giấy phép kinh doanh & sao kê ngân hàng',
        'Xác nhận số dư sổ tiết kiệm & giấy tờ chứng minh tài sản (nếu có)',
        'Lịch trình du lịch dự kiến tại Úc và bản tường trình mục đích chuyến đi',
      ],
      en: [
        'Valid passport & National ID (color scans)',
        'Birth certificate, residency confirmation, marriage certificate (if applicable)',
        'Employment contract, leave approval or business license & bank statements',
        'Savings balance confirmation & asset ownership records (if available)',
        'Planned Australian travel itinerary and trip purpose statement',
      ],
    },
    imageSrc: ASSETS.heroSydney,
    imageAlt: {
      vi: 'Phong cảnh cảng Sydney, Australia — điểm đến du lịch phổ biến',
      en: 'Sydney Harbour scenic view in Australia',
    },
  },
  {
    id: 'visa-600-family',
    subclass: 'Visa 600 — Thăm Thân',
    category: 'tourist',
    categoryLabel: { vi: 'Du Lịch & Thăm Thân', en: 'Tourist & Family' },
    title: {
      vi: 'Tư Vấn Hồ Sơ Thăm Thân Úc (Subclass 600 — Family Visit)',
      en: 'Australian Family Visit Documentation (Subclass 600)',
    },
    summary: {
      vi: 'Hỗ trợ chuẩn bị hồ sơ thăm con cái du học, thăm người thân hoặc dự lễ tốt nghiệp tại Úc, hướng dẫn rà soát thư mời và chứng từ chứng minh quan hệ.',
      en: 'Preparation support for visiting relatives or attending graduations in Australia, including invitation letter review and relationship documentation.',
    },
    processingTime: {
      vi: 'Phụ thuộc cơ quan xét duyệt Úc',
      en: 'Determined by Australian Home Affairs',
    },
    serviceHighlight: {
      vi: 'Hướng dẫn chuẩn bị hồ sơ phía người đi và người mời tại Úc',
      en: 'Guidance for both applicant and Australian host documents',
    },
    pointsTested: false,
    benefits: {
      vi: [
        'Hướng dẫn cấu trúc nội dung thư mời và giấy tờ cư trú hợp pháp của người thân tại Úc',
        'Rà soát giấy tờ chứng minh quan hệ gia đình trước khi dịch thuật công chứng',
        'Tư vấn chi tiết cho phụ huynh hoặc người lớn tuổi chuẩn bị giấy tờ hưu trí, tài chính',
      ],
      en: [
        'Guidance on invitation letter content and host status documents',
        'Pre-translation review of family relationship records',
        'Clear checklist support for parents and retired applicants',
      ],
    },
    eligibility: {
      vi: [
        'Có lời mời từ người thân đang sinh sống, học tập hoặc làm việc hợp pháp tại Úc',
        'Có giấy tờ chứng minh mối quan hệ gia đình rõ ràng, trung thực',
        'Chứng minh nguồn tài chính chi trả và lý do quay về Việt Nam sau chuyến thăm',
      ],
      en: [
        'Invitation from a relative lawfully residing or studying in Australia',
        'Authentic documentary proof of family relationship',
        'Financial capacity and genuine intention to return after the visit',
      ],
    },
    requiredDocs: {
      vi: [
        'Thư mời từ người thân tại Úc + bản sao hộ chiếu / thị thực hiện tại của người mời',
        'Giấy tờ chứng minh quan hệ nhân thân (Khai sinh, Đăng ký kết hôn, Xác nhận cư trú)',
        'Giấy tờ cá nhân, công việc hoặc sổ hưu trí của đương đơn tại Việt Nam',
        'Sổ tiết kiệm, sao kê ngân hàng & giấy tờ tài sản liên quan',
      ],
      en: [
        'Host invitation letter + copy of host passport / current visa or citizenship',
        'Family relationship proof (birth or marriage certificates)',
        'Applicant identity, employment, or pension documentation',
        'Savings confirmation, bank statements & asset documents',
      ],
    },
    imageSrc: ASSETS.melbourneCampus,
    imageAlt: {
      vi: 'Khuôn viên trường đại học tại Melbourne, Australia',
      en: 'University campus grounds in Melbourne, Australia',
    },
  },
  {
    id: 'visa-600-business',
    subclass: 'Visa 600 — Công Tác',
    category: 'business',
    categoryLabel: { vi: 'Công Tác & Dài Hạn', en: 'Business & Long-Term' },
    title: {
      vi: 'Tư Vấn Hồ Sơ Công Tác Úc (Business Visitor Stream)',
      en: 'Australian Business Visitor Documentation (Subclass 600)',
    },
    summary: {
      vi: 'Hỗ trợ doanh nghiệp và cán bộ chuẩn bị giấy tờ sang Úc dự hội nghị, triển lãm thương mại hoặc làm việc ngắn hạn cùng đối tác theo quy định diện Business Visitor.',
      en: 'Preparation assistance for corporate staff attending conferences, trade events, or partner meetings in Australia under the Business Visitor stream.',
    },
    processingTime: {
      vi: 'Phụ thuộc cơ quan xét duyệt Úc',
      en: 'Determined by Australian Home Affairs',
    },
    serviceHighlight: {
      vi: 'Rà soát quyết định cử đi công tác, thư mời đối tác & hồ sơ doanh nghiệp',
      en: 'Review of dispatch letters, partner invitations & company records',
    },
    pointsTested: false,
    benefits: {
      vi: [
        'Hướng dẫn rà soát nội dung quyết định cử đi công tác và thư mời thương mại song ngữ',
        'Kiểm tra tính đầy đủ của hồ sơ pháp lý doanh nghiệp và chứng từ thuế theo yêu cầu',
        'Hỗ trợ sắp xếp danh mục hồ sơ rõ ràng cho cá nhân hoặc nhóm nhân sự công tác',
      ],
      en: [
        'Review of bilingual employer dispatch letters and host invitations',
        'Checklist audit for corporate registration and tax records',
        'Structured document sorting for individual or group corporate trips',
      ],
    },
    eligibility: {
      vi: [
        'Có thư mời tham dự sự kiện, hội thảo hoặc làm việc từ tổ chức/đối tác tại Úc',
        'Có quyết định cử đi công tác và nêu rõ đơn vị chi trả chi phí chuyến đi',
        'Hoạt động công tác ngắn hạn tuân thủ đúng điều kiện không lao động hưởng lương tại Úc',
      ],
      en: [
        'Formal invitation from an Australian business or event organizer',
        'Employer dispatch letter specifying travel purpose and expense coverage',
        'Short-term business activities compliant with visitor visa conditions',
      ],
    },
    requiredDocs: {
      vi: [
        'Thư mời công tác từ đối tác tại Úc (nêu rõ thời gian, nội dung làm việc)',
        'Quyết định cử đi công tác do doanh nghiệp tại Việt Nam ban hành',
        'Giấy chứng nhận đăng ký doanh nghiệp & chứng từ nghĩa vụ thuế gần nhất',
        'Hộ chiếu, CCCD, hợp đồng lao động & sao kê tài khoản liên quan',
      ],
      en: [
        'Business invitation from the Australian partner detailing schedule',
        'Employer dispatch letter from the company in Vietnam',
        'Business registration certificate & recent tax payment records',
        'Passport, ID, employment contract & relevant bank statements',
      ],
    },
    imageSrc: ASSETS.officeConsultation,
    imageAlt: {
      vi: 'Không gian tư vấn và rà soát hồ sơ công tác cho khách hàng doanh nghiệp',
      en: 'Advisory consultation meeting room for corporate documentation review',
    },
  },
  {
    id: 'visa-600-frequent',
    subclass: 'Visa 600 — Dài Hạn',
    category: 'business',
    categoryLabel: { vi: 'Công Tác & Dài Hạn', en: 'Business & Long-Term' },
    title: {
      vi: 'Tư Vấn Hồ Sơ Visa Thăm Úc Nhiều Lần (Diện 3 – 10 Năm Tham Khảo)',
      en: 'Long-Term Multiple-Entry Visitor Visa Guidance (Subclass 600)',
    },
    summary: {
      vi: 'Hướng dẫn chuẩn bị hồ sơ cho khách hàng có nhu cầu đi Úc nhiều lần (du lịch, công tác, thăm thân). Thời hạn visa thực tế (1, 3 hoặc đến 10 năm) do Bộ Nội vụ Úc xem xét và quyết định.',
      en: 'Guidance for applicants seeking multiple-entry travel documentation. Actual visa validity (1, 3, or up to 10 years) is assessed and decided solely by Australian authorities.',
    },
    processingTime: {
      vi: 'Phụ thuộc cơ quan xét duyệt Úc',
      en: 'Determined by Australian Home Affairs',
    },
    serviceHighlight: {
      vi: 'Không cam kết thời hạn visa · Tư vấn dựa trên tiêu chí công khai của Úc',
      en: 'No validity guarantees · Guidance based on public eligibility rules',
    },
    pointsTested: false,
    benefits: {
      vi: [
        'Tư vấn đối chiếu điều kiện các diện nhiều lần (Tourist nhiều lần hoặc Frequent Traveller)',
        'Hướng dẫn hệ thống hóa lịch sử du lịch quốc tế và chứng từ nghề nghiệp, tài sản',
        'Giải thích minh bạch điều kiện lưu trú tối đa mỗi lần nhập cảnh theo quy định Úc',
      ],
      en: [
        'Review eligibility against public multiple-entry & Frequent Traveller rules',
        'Organize prior international travel history and financial/career proof',
        'Clear explanation of stay limits and visa conditions per Australian law',
      ],
    },
    eligibility: {
      vi: [
        'Có hộ chiếu còn thời hạn phù hợp theo quy định của từng diện thị thực',
        'Nêu rõ nhu cầu và lý do hợp lý cho việc đi lại nhiều lần đến Úc',
        'Đáp ứng đầy đủ tiêu chí công khai của diện tương ứng (do cơ quan Úc đánh giá)',
      ],
      en: [
        'Valid passport meeting validity guidelines for the requested stream',
        'Genuine, well-documented reason for recurring visits to Australia',
        'Compliance with public eligibility criteria assessed by Australian authorities',
      ],
    },
    requiredDocs: {
      vi: [
        'Hộ chiếu hiện tại & thông tin các chuyến đi quốc tế trước đây (nếu có)',
        'Hồ sơ chứng minh vị trí công tác, quản lý hoặc quyền sở hữu doanh nghiệp',
        'Chứng từ chứng minh nguồn thu nhập, tiết kiệm và tài sản hợp pháp',
        'Bản trình bày kế hoạch và nhu cầu đi lại nhiều lần tại Úc',
      ],
      en: [
        'Current passport and prior international travel records (if applicable)',
        'Employment, executive position, or business ownership verification',
        'Lawful income, bank savings, and asset ownership proof',
        'Statement explaining ongoing travel plans to Australia',
      ],
    },
    imageSrc: ASSETS.heroSydney,
    imageAlt: {
      vi: 'Khung cảnh thành phố Sydney, Australia',
      en: 'Sydney waterfront skyline in Australia',
    },
  },
  {
    id: 'visa-500-study',
    subclass: 'Visa 500 — Du Học',
    category: 'student',
    categoryLabel: { vi: 'Du Học & Giám Hộ', en: 'Student & Guardian' },
    title: {
      vi: 'Tư Vấn Hồ Sơ Du Học Úc & Giám Hộ (Subclass 500 / 590)',
      en: 'Australian Student & Guardian Visa Support (Subclass 500 / 590)',
    },
    summary: {
      vi: 'Hỗ trợ học sinh, sinh viên và phụ huynh sắp xếp hồ sơ học thuật, chứng từ tài chính, bảo hiểm OSHC và bài trình bày Genuine Student (GS) theo hướng dẫn công khai.',
      en: 'Guidance for students and guardians in organizing academic records, financial sponsor evidence, OSHC certificates, and Genuine Student (GS) statements.',
    },
    processingTime: {
      vi: 'Phụ thuộc cơ quan xét duyệt Úc',
      en: 'Determined by Australian Home Affairs',
    },
    serviceHighlight: {
      vi: 'Hướng dẫn chuẩn bị danh mục hồ sơ học tập & tài chính gia đình rõ ràng',
      en: 'Structured academic and family financial documentation guidance',
    },
    pointsTested: false,
    benefits: {
      vi: [
        'Hướng dẫn kiểm tra thông tin CoE, bảo hiểm OSHC và hồ sơ học tập trước khi nộp',
        'Hỗ trợ sắp xếp chứng từ thu nhập, tiết kiệm của người bảo trợ tài chính hợp lý',
        'Tư vấn chuẩn bị danh mục giấy tờ cho phụ huynh xin diện Giám hộ (Subclass 590)',
      ],
      en: [
        'Checklist verification for CoE, OSHC policy, and academic transcripts',
        'Guidance on organizing family financial sponsor documentation',
        'Preparation advice for parent Subclass 590 Student Guardian applications',
      ],
    },
    eligibility: {
      vi: [
        'Có Thư xác nhận nhập học chính thức (CoE) từ cơ sở giáo dục được công nhận tại Úc',
        'Trình bày trung thực mục đích học tập qua thông tin Genuine Student (GS)',
        'Đáp ứng yêu cầu chứng minh tài chính, tiếng Anh, bảo hiểm OSHC và sức khỏe',
      ],
      en: [
        'Official Confirmation of Enrolment (CoE) from an Australian CRICOS provider',
        'Genuine Student (GS) information consistent with academic background',
        'Compliance with financial, English, OSHC, and health standards',
      ],
    },
    requiredDocs: {
      vi: [
        'Thư mời nhập học & Confirmation of Enrolment (CoE)',
        'Bằng cấp, học bạ / bảng điểm học thuật & chứng chỉ tiếng Anh theo yêu cầu trường',
        'Nội dung trình bày Genuine Student (GS) & kế hoạch học tập',
        'Hồ sơ chứng minh tài chính, thu nhập của người bảo trợ',
        'Chứng nhận bảo hiểm y tế sinh viên OSHC & hộ chiếu',
      ],
      en: [
        'Letter of Offer & Confirmation of Enrolment (CoE)',
        'Academic transcripts, certificates & required English test results',
        'Genuine Student (GS) statement & study plan',
        'Sponsor income and savings proof',
        'OSHC policy certificate & valid passport',
      ],
    },
    imageSrc: ASSETS.melbourneCampus,
    imageAlt: {
      vi: 'Khuôn viên giáo dục đại học tại Melbourne, Australia',
      en: 'University campus buildings in Melbourne, Australia',
    },
  },
];

export const CLIENT_OUTCOMES: CaseOutcome[] = [
  {
    id: 'case-support-tourist',
    subclass: 'Hỗ Trợ Hồ Sơ Visa 600 — Du Lịch Australia',
    clientName: 'Trường hợp gia đình chuẩn bị chuyến du lịch Sydney & Melbourne',
    clientRole: {
      vi: 'Tư vấn sắp xếp lịch trình, công việc & chứng từ tài chính',
      en: 'Itinerary, employment & financial documentation review',
    },
    originCity: {
      vi: 'Điểm đến tham quan: Sydney & Melbourne, Australia',
      en: 'Planned travel: Sydney & Melbourne, Australia',
    },
    timelineMetric: {
      vi: 'Quyết định cấp visa thuộc Bộ Nội vụ Úc',
      en: 'Assessed by Australian Authorities',
    },
    pointsOrStream: {
      vi: 'Hướng dẫn danh mục giấy tờ · Dịch thuật công chứng · Rà soát thông tin',
      en: 'Checklist guidance · Certified translation · Consistency review',
    },
    quote: {
      vi: 'Visa5S đã hướng dẫn gia đình kiểm tra từng loại giấy tờ nhân thân, hợp đồng lao động, sao kê thu nhập và sắp xếp lịch trình tham quan Sydney rõ ràng, giúp quá trình chuẩn bị hồ sơ trước khi nộp diễn ra thuận tiện và minh bạch.',
      en: 'Visa5S guided our family step-by-step on organizing identity records, employment letters, bank statements, and a coherent Sydney travel plan ahead of submission.',
    },
    imageSrc: ASSETS.heroSydney,
    imageAlt: {
      vi: 'Phong cảnh cảng Sydney và Nhà hát Con Sò tại Australia',
      en: 'Sydney Harbour and Opera House landscape in Australia',
    },
  },
  {
    id: 'case-support-advisory',
    subclass: 'Tư Vấn Chuẩn Bị Hồ Sơ Thăm Thân & Công Tác Úc',
    clientName: 'Trường hợp doanh nghiệp & phụ huynh chuẩn bị giấy tờ trực tiếp 1-1',
    clientRole: {
      vi: 'Rà soát thư mời, hồ sơ doanh nghiệp & hướng dẫn quy trình nộp đơn',
      en: 'Invitation review, corporate dossier & submission guidance',
    },
    originCity: {
      vi: 'Hỗ trợ tại TP. Hồ Chí Minh (Hòa Hưng · Đông Hòa) & Hà Nội (Thanh Xuân)',
      en: 'Supported in Ho Chi Minh City & Hanoi',
    },
    timelineMetric: {
      vi: 'Không cam kết kết quả · Minh bạch quy trình',
      en: 'Transparent Advisory Support',
    },
    pointsOrStream: {
      vi: 'Tách biệt rõ phí dịch vụ tư vấn và lệ phí nộp cho Chính phủ Úc',
      en: 'Clear separation between service fee and official charges',
    },
    quote: {
      vi: 'Khách hàng được chuyên viên giải thích rõ từng khoản phí dịch vụ với lệ phí chính phủ, hướng dẫn chuẩn hóa thư mời từ đối tác hoặc người thân tại Úc và tự tin hoàn thiện hồ sơ theo đúng thông tin công khai.',
      en: 'Specialists clearly explained the separation between advisory fees and government charges, reviewed host invitations, and helped organize the full file cleanly.',
    },
    imageSrc: ASSETS.officeConsultation,
    imageAlt: {
      vi: 'Buổi tư vấn và hướng dẫn chuẩn bị hồ sơ Visa Úc tại văn phòng Visa5S',
      en: 'Client consultation and visa documentation review at Visa5S office',
    },
  },
];

export const GRANT_RESULTS: GrantResultItem[] = [
  {
    id: 'grant-result-3-years',
    badge: {
      vi: 'Visa 600 · 3 Năm Nhiều Lần',
      en: 'Subclass 600 · 3-Year Multiple Entries',
    },
    title: {
      vi: 'Kết Quả Cấp Visa Úc 3 Năm — Tourist Stream (Subclass 600)',
      en: 'Official Australian 3-Year Visitor Visa (Subclass 600)',
    },
    subclass: 'Visitor (Subclass 600)',
    stream: {
      vi: 'Tourist Stream · Du Lịch Úc',
      en: 'Tourist Stream · Multiple Entries',
    },
    validity: {
      vi: 'Hiệu lực: 3 Năm (11/06/2026 – 11/06/2029)',
      en: 'Validity: 3 Years (11 June 2026 – 11 June 2029)',
    },
    entries: {
      vi: 'Nhập cảnh: Nhiều lần (Multiple entries)',
      en: 'Travel: Multiple entries',
    },
    stay: {
      vi: 'Thời gian lưu trú: Tối đa 3 tháng mỗi lần',
      en: 'Length of stay: 3 months from date of each arrival',
    },
    description: {
      vi: 'Thư cấp thị thực chính thức từ Bộ Nội vụ Úc (Department of Home Affairs). Khách hàng được Visa5S hỗ trợ rà soát lịch trình du lịch, hướng dẫn chuẩn bị giấy tờ công việc, tài chính và ràng buộc chặt chẽ tại Việt Nam.',
      en: 'Official Department of Home Affairs grant letter. Visa5S assisted client with itinerary planning, proof of employment, funds evidence, and clear Vietnamese home ties.',
    },
    imageSrc: ASSETS.grantResult3Years,
    imageAlt: {
      vi: 'Thư cấp thị thực Visa Úc 3 năm Subclass 600 chính thức từ Bộ Nội vụ Úc thành công qua Visa5S',
      en: 'Official Australian 3-Year Subclass 600 Visa grant letter via Visa5S',
    },
    highlightTag: {
      vi: 'Thành Công 3 Năm',
      en: '3-Year Granted',
    },
  },
  {
    id: 'grant-result-10-years',
    badge: {
      vi: 'Visa 600 · 10 Năm Nhiều Lần',
      en: 'Subclass 600 · 10-Year Frequent Traveller',
    },
    title: {
      vi: 'Kết Quả Cấp Visa Úc 10 Năm — Frequent Traveller (Subclass 600)',
      en: 'Official Australian 10-Year Frequent Traveller Visa',
    },
    subclass: 'Visitor (Subclass 600)',
    stream: {
      vi: 'Frequent Traveller Stream · Du Lịch Thường Xuyên',
      en: 'Frequent Traveller Stream · 10-Year Multiple',
    },
    validity: {
      vi: 'Hiệu lực: 10 Năm (13/08/2026 – 13/08/2036)',
      en: 'Validity: 10 Years (13 August 2026 – 13 August 2036)',
    },
    entries: {
      vi: 'Nhập cảnh: Nhiều lần (Multiple entries)',
      en: 'Travel: Multiple entries',
    },
    stay: {
      vi: 'Thời gian lưu trú: Tối đa 3 tháng mỗi lần',
      en: 'Length of stay: 3 months from date of each arrival',
    },
    description: {
      vi: 'Hồ sơ Visa Úc 10 năm được Bộ Nội vụ Úc cấp thành công. Visa5S hỗ trợ rà soát kỹ lưỡng lịch sử xuất nhập cảnh quốc tế, chứng minh năng lực tài chính mạnh và chuẩn hóa danh mục hồ sơ chuẩn chỉ.',
      en: '10-Year Frequent Traveller visa granted by Australian Home Affairs. Visa5S provided meticulous review of global travel history, financial verification, and compliant file compilation.',
    },
    imageSrc: ASSETS.grantResult10Years,
    imageAlt: {
      vi: 'Kết quả cấp Visa Úc 10 năm nhiều lần Frequent Traveller Subclass 600 thành công từ Visa5S',
      en: 'Official Australian 10-Year Frequent Traveller Subclass 600 grant letter via Visa5S',
    },
    highlightTag: {
      vi: 'Thành Công 10 Năm',
      en: '10-Year Granted',
    },
  },
];
