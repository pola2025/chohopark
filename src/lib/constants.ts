export const SITE_CONFIG = {
  name: "초호쉼터",
  description: "기업 워크샵, 야유회, 단체행사 전문 펜션. 5,000평 천연잔디구장과 함께하는 특별한 단체행사",
  url: "https://chohopark.com",
  phone: "010-3254-0029",
  address: "경기도 파주시 법원읍 초리골길 134",
  email: "chohopark@naver.com",
  bankAccount: {
    bank: "농협은행",
    number: "215099-52-225181",
    holder: "우능제",
  },
};

export const BUSINESS_INFO = [
  {
    name: "초호",
    registrationNumber: "190-17-01483",
    representative: "우능제",
  },
  {
    name: "초호가든",
    registrationNumber: "128-06-97668",
    representative: "우능제",
  },
  {
    name: "초호쉼터",
    registrationNumber: "308-13-20744",
    representative: "우상엽",
  },
];

export const PACKAGES = [
  {
    id: "workshop",
    name: "1박 2일 워크샵",
    slug: "workshop",
    type: "overnight" as const,
    pricePerPerson: 99000,
    capacity: { min: 10, max: 80 },
    schedule: { checkIn: "오후 3시", checkOut: "오전 11시" },
    includes: ["저녁식사", "조식", "주류 무한리필", "음료수 무한리필", "숙박"],
    isBest: true,
    thumbnail: "/images/packages/workshop.webp",
  },
  {
    id: "daytrip",
    name: "당일 수련회/야유회",
    slug: "daytrip",
    type: "daytrip" as const,
    pricePerPerson: 66000,
    capacity: { min: 30, max: 200 },
    schedule: { checkIn: "오전 10시", checkOut: "오후 5시" },
    includes: ["점심식사", "주류 무한리필", "음료수 무한리필"],
    isBest: false,
    thumbnail: "/images/packages/daytrip.webp",
  },
  {
    id: "retreat",
    name: "2박 3일 수련회",
    slug: "retreat",
    type: "retreat" as const,
    pricePerPerson: 165000,
    capacity: { min: 30, max: 200 },
    schedule: { checkIn: "오후 3시", checkOut: "오전 11시" },
    includes: ["저녁식사 2회", "조식 2회", "점심식사 1회", "주류 무한리필", "음료수 무한리필", "숙박 2박"],
    isBest: false,
    thumbnail: "/images/packages/retreat.webp",
  },
];

export const MENUS = [
  {
    id: "ribs",
    name: "6시간 훈연 등갈비",
    description: "참나무장작훈연 특제 소스의 조화. 직원들이 가장 만족하는 시그니처 메뉴",
    features: ["전 직원이 만족하는 프리미엄 퀄리티", "특제 소스로 남녀 모두 선호", "무한리필로 부담 없는 제공"],
    tag: "프리미엄",
    tagColor: "orange",
    thumbnail: "/images/menu/ribs.webp",
  },
  {
    id: "pork",
    name: "두툼한 훈연 삼겹살",
    description: "한국인이 가장 사랑하는 삼겹살을 6시간 훈연으로 특별하게. 팀 회식의 완성입니다.",
    features: ["두툼한 두께로 부드러운 식감", "훈연향이 더해진 극강의 맛", "특별한 참나무바베큐향"],
    tag: "필수 메뉴",
    tagColor: "green",
    thumbnail: "/images/menu/pork.webp",
  },
  {
    id: "duck",
    name: "통 오리 훈제구이",
    description: "건강을 생각하는 직원들을 위한 프리미엄 선택. 담백하고 고소한 맛이 일품입니다.",
    features: ["콜라겐 풍부한 건강 메뉴", "여성 직원들에게 특히 인기", "와인과도 잘 어울리는 맛"],
    tag: "헬시 초이스",
    tagColor: "blue",
    thumbnail: "/images/menu/duck.webp",
  },
];

export const FACILITIES = [
  {
    id: "parking",
    name: "넉넉한 전용주차장",
    description: "대형버스 및 승용차 충분한 주차 공간",
    features: ["승용차 50대", "대형버스 5대", "무료 주차"],
    thumbnail: "/images/facilities/parking.webp",
    icon: "car",
  },
  {
    id: "seminar",
    name: "워크샵 세미나룸",
    description: "프로젝터, 마이크 완비된 세미나 공간",
    features: ["빔프로젝터", "무선 마이크", "화이트보드", "에어컨 완비"],
    thumbnail: "/images/facilities/seminar.webp",
    icon: "presentation",
  },
  {
    id: "field",
    name: "5,000평 천연잔디구장",
    description: "축구, 족구 등 다양한 단체 활동 가능",
    features: ["천연잔디", "5,000평 규모", "조명 시설"],
    thumbnail: "/images/facilities/field.webp",
    icon: "trees",
  },
];

export const RULES = [
  {
    id: "shoes",
    title: "축구화 착용 금지",
    description: "잔디 보호를 위해 축구화(스터드) 착용이 금지됩니다",
    icon: "footprints",
  },
  {
    id: "amp",
    title: "개별앰프 사용 금지",
    description: "주변 환경을 위해 개인 앰프 사용이 제한됩니다",
    icon: "speaker",
  },
  {
    id: "quiet",
    title: "매너타임 준수",
    description: "저녁 9시 30분 이후 매너타임을 지켜주세요",
    icon: "moon",
  },
  {
    id: "deposit",
    title: "30% 입금 후 예약확정",
    description: "예약금 30% 입금 완료 시 예약이 확정됩니다",
    icon: "wallet",
  },
  {
    id: "facility",
    title: "시설물 무단 사용 금지",
    description: "허가되지 않은 시설 사용은 금지됩니다",
    icon: "ban",
  },
  {
    id: "change",
    title: "7일 이내 변경 불가",
    description: "이용일 7일 이내 예약인원 변경이 불가합니다",
    icon: "calendar-x",
  },
];

export const REFUND_POLICY = {
  customer: [
    { period: "1개월 전 ~ 15일 전", refund: "90%" },
    { period: "14일 전 ~ 8일 전", refund: "50%" },
    { period: "7일 전 ~ 당일", refund: "환불 불가" },
  ],
  business: [
    { period: "2일 전 취소", refund: "계약금 환급" },
    { period: "1일 전 취소", refund: "계약금 + 20%" },
    { period: "당일 취소", refund: "계약금 + 30%" },
  ],
};

export const TARGET_CUSTOMERS = [
  {
    id: "enterprise",
    title: "대기업/중견기업",
    description: "50명 이상 대규모 워크샵",
    icon: "building-2",
  },
  {
    id: "startup",
    title: "스타트업/IT기업",
    description: "20~50명 팀 빌딩",
    icon: "rocket",
  },
  {
    id: "team",
    title: "영업팀/부서 단위",
    description: "10~30명 소규모 행사",
    icon: "target",
  },
];

export const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz2CnVRAiaqDCAdCSa7gWO9xEcbpGfgunbc6sTabfZkAc6hgQpFIW1t0wRxpWAnei06oQ/exec";

export const GA_MEASUREMENT_ID = "G-49043QNXM0";

export const TELEGRAM_CHAT_ID = "-1003394139746";

export const NAV_ITEMS = [
  { name: "초호쉼터", href: "/about" },
  { name: "시설안내", href: "/facilities" },
  { name: "단체예약", href: "/booking" },
];
