# 초호쉼터 웹사이트 PRD (Product Requirements Document)

**문서 버전**: 1.0
**작성일**: 2025-12-07
**프로젝트명**: 초호쉼터 (CHOHO Shelter)
**현재 사이트**: https://chohopark.imweb.me/

---

## 1. 프로젝트 개요

### 1.1 목적

현재 아임웹(imweb.me) 기반으로 운영 중인 **초호쉼터** 웹사이트를 Next.js 기반 독립 웹사이트로 리뉴얼하여 성능, 유지보수성, 확장성을 개선합니다.

### 1.2 사업 소개

**초호쉼터**는 기업 워크샵, 야유회, 단체행사 전문 펜션입니다.

| 항목 | 내용 |
|------|------|
| **위치** | 경기도 파주시 법원읍 초리골길 134 |
| **규모** | 5,000평 천연잔디구장 |
| **수용인원** | 최소 10명 ~ 최대 200명 |
| **핵심 서비스** | 단체 숙박, 바베큐 무한리필, 조식 제공, 주류/음료 무한리필 |
| **연락처** | 010-3254-0029 |

### 1.3 관련 사업체

| 사업체명 | 사업자번호 | 대표자 |
|----------|-----------|--------|
| 초호 | 190-17-01483 | 우능제 |
| 초호가든 | 128-06-97668 | 우능제 |
| 초호쉼터 | 308-13-20744 | 우상엽 |

### 1.4 리뉴얼 목표

1. 페이지 로딩 속도 개선 (Core Web Vitals 최적화)
2. SEO 최적화로 검색 노출 향상 (기업 워크샵, 단체펜션 키워드)
3. 모바일 사용자 경험 개선
4. 견적 문의 → 예약 전환율 향상
5. 관리자의 콘텐츠 관리 용이성 확보

---

## 2. 현재 사이트 분석

### 2.1 메뉴 구조

```
/ (메인 페이지)
├── 초호쉼터 (소개)
├── 시설안내
└── 단체예약 (CTA)
```

### 2.2 메인 페이지 섹션 구성 (현재)

| 순서 | 섹션명 | 설명 |
|------|--------|------|
| 1 | Header | 로고, 네비게이션 (초호쉼터, 시설안내, 단체예약) |
| 2 | Hero | 배경 이미지 + "워크샵 야유회 전문 단체펜션" |
| 3 | Benefit Banner | 참나무장작 6시간 훈연 바베큐 폭립 무한리필 |
| 4 | Service Cards | 참나무 6시간 훈연 / 무한리필 이미지 카드 |
| 5 | Value Proposition | ALL INCLUSIVE PACKAGE (1인 99,000원) |
| 6 | Brand Statement | "기업 워크샵의 새로운 기준, 올인클루전" |
| 7 | Meal Service | 워크샵 성공의 핵심, 완벽한 식사 준비 (6시간 훈연, 타이밍) |
| 8 | Menu Cards | 6시간 훈연 등갈비, 두툼한 훈연 삼겹살, 통 오리 훈제구이 |
| 9 | Package Features | 완벽한 올인클루전 패키지 (숙박, 조식, 바베큐, 주류) |
| 10 | Target Customers | 대기업/중견기업, 스타트업/IT기업, 영업팀/부서 단위 |
| 11 | Package Types | 1박2일 워크샵, 당일 수련회/야유회, 2박3일 수련회 |
| 12 | Notice | 예약 전 필수 확인사항 (축구화 금지, 앰프 금지, 매너타임 등) |
| 13 | Facilities | 기업워크샵 부대시설 (주차장, 세미나룸, 잔디구장) |
| 14 | Rules | 이용 준수사항 (6가지 규칙 카드) |
| 15 | Calculator | 워크샵/야유회 견적 계산기 (1박2일/당일 탭) |
| 16 | Refund Policy | 예약 및 환불규정 (고객/사업자 취소 기준) |
| 17 | Footer | 사업자 정보, 입금계좌, 연락처 |

### 2.3 핵심 기능

1. **빠른 견적 문의 모달 (CTA Modal)**
   - 15초 후 자동 표시 또는 40% 스크롤 시 표시
   - 담당자 성함, 연락처, 이메일, 희망일, 예상인원 입력
   - Google Apps Script 연동 (Google Sheets 저장)

2. **견적 계산기**
   - 1박2일 워크샵 / 당일 야유회 탭 선택
   - 인원 입력 시 자동 견적 계산 (1인당 99,000원)
   - 예약금 30% 자동 계산

3. **플로팅 전화 버튼**
   - 우측 하단 고정 전화 아이콘

---

## 3. 기술 스택

### 3.1 코어 스택

| 구분 | 기술 | 버전 | 선택 이유 |
|------|------|------|-----------|
| **Framework** | Next.js | 15.x | App Router, RSC, 이미지 최적화 |
| **Language** | TypeScript | 5.x | 타입 안정성, 개발 생산성 |
| **Styling** | Tailwind CSS | 3.x | 빠른 개발, 일관된 디자인 시스템 |
| **UI Components** | shadcn/ui | latest | 커스터마이징 용이, 접근성 |

### 3.2 인프라 스택

| 구분 | 기술 | 용도 |
|------|------|------|
| **Hosting** | Vercel | Next.js 최적화 호스팅, 자동 배포 |
| **CDN** | Cloudflare | 이미지/정적 자산 캐싱 |
| **Repository** | GitHub | 소스 코드 관리, CI/CD 연동 |
| **Domain** | Cloudflare DNS | DNS 관리, SSL 인증서 |

### 3.3 외부 서비스

| 구분 | 기술 | 용도 |
|------|------|------|
| **Form Backend** | Google Apps Script | 견적 문의 데이터 수집 |
| **Analytics** | Google Analytics 4 | 방문자 분석 (G-49043QNXM0) |
| **보안** | Boraware | 웹사이트 보호 |

---

## 4. 페이지 구조 및 기능 요구사항

### 4.1 사이트맵 (제안)

```
/                           # 메인 페이지 (랜딩)
├── /about                  # 초호쉼터 소개
│   └── /about/history      # 초호 역사 (1947~)
├── /facilities             # 시설 안내
│   ├── /facilities/rooms   # 숙박 시설
│   ├── /facilities/seminar # 세미나룸
│   └── /facilities/outdoor # 야외 시설 (잔디구장, 바베큐장)
├── /packages               # 패키지 안내
│   ├── /packages/workshop  # 1박2일 워크샵
│   ├── /packages/daytrip   # 당일 야유회
│   └── /packages/retreat   # 2박3일 수련회
├── /booking                # 예약/견적
│   ├── /booking/calculator # 견적 계산기
│   └── /booking/inquiry    # 견적 문의
├── /guide                  # 이용 안내
│   ├── /guide/rules        # 이용 규칙
│   └── /guide/refund       # 환불 정책
└── /location               # 찾아오시는 길
```

### 4.2 메인 페이지 (/) 요구사항

#### 4.2.1 Hero 섹션

**현재 기능:**
- 배경 이미지 (잔디구장/자연 이미지)
- "PREMIUM GROUP PENSION" 서브타이틀
- "워크샵 야유회 전문 단체펜션" 메인 타이틀
- "5,000평 규모 천연잔디구장과 함께하는 특별한 단체행사"

**구현 요구사항:**
- [ ] 풀스크린 반응형 히어로 섹션
- [ ] 스크롤 인디케이터 (하단 화살표)
- [ ] CTA 버튼: "견적 문의하기", "시설 둘러보기"

#### 4.2.2 가치 제안 섹션 (Value Proposition)

**현재 기능:**
- ALL INCLUSIVE PACKAGE
- 1인 99,000원 (VAT 포함)
- 체크리스트: 참나무장작 훈연, 술/음료/바베큐 무한리필, 5,000평 잔디구장, 카페 음료 30% 할인
- "단체 예약 특별 혜택 제공" 버튼

**구현 요구사항:**
- [ ] 가격 강조 카드 컴포넌트
- [ ] 체크리스트 애니메이션
- [ ] CTA 버튼 → 견적 모달 연동

#### 4.2.3 서비스 소개 섹션

**현재 기능:**
- "기업 워크샵의 새로운 기준" 헤드라인
- "숙박·조식·바베큐·주류까지 무한리필로 제공되는 단체 워크샵 전용 펜션"

**구현 요구사항:**
- [ ] 이미지 + 텍스트 오버레이 레이아웃
- [ ] 스크롤 시 fade-in 애니메이션

#### 4.2.4 식사 서비스 섹션

**현재 기능:**
- "워크샵 성공의 핵심, 완벽한 식사 준비"
- 2개 카드: 전문가의 6시간 훈연 준비 / 행사 일정에 맞춘 완벽한 타이밍

**구현 요구사항:**
- [ ] 2열 카드 그리드
- [ ] 번호 배지 (1, 2)
- [ ] 하이라이트 박스 (걱정 없는 워크샵, 맞춤형 식사 스케줄)

#### 4.2.5 메뉴 카드 섹션

**현재 기능:**
- 3개 메뉴 카드: 6시간 훈연 등갈비, 두툼한 훈연 삼겹살, 통 오리 훈제구이
- 각 카드: 이미지 + 태그 (인기 1위, 필수 메뉴, 헬시 초이스) + 설명 + 특징 리스트

**구현 요구사항:**
- [ ] 3열 반응형 카드 그리드 (모바일: 1열)
- [ ] 이미지 호버 효과
- [ ] 태그 배지 컴포넌트

#### 4.2.6 패키지 특징 섹션

**현재 기능:**
- "완벽한 올인클루전 패키지"
- 4개 특징: 단체 전용 숙박 시설, 든든한 조식 제공, 3가지 훈연 바베큐 무한리필, 주류 & 음료 무한리필
- 어두운 배경 + 아이콘 카드

**구현 요구사항:**
- [ ] 다크 테마 섹션
- [ ] 4열 그리드 (모바일: 2열)
- [ ] 아이콘 + 제목 + 설명

#### 4.2.7 타겟 고객 섹션

**현재 기능:**
- "이미 많은 기업이 선택한 워크샵 명소"
- 3개 카드: 대기업/중견기업, 스타트업/IT기업, 영업팀/부서 단위

**구현 요구사항:**
- [ ] 3열 카드 그리드
- [ ] 아이콘 (건물, 로켓, 타겟)
- [ ] 인원 규모 텍스트

#### 4.2.8 패키지 타입 섹션

**현재 기능:**
- "단체 패키지 안내"
- 3개 패키지 카드: 1박2일 워크샵 (BEST), 당일 수련회/야유회, 2박3일 수련회
- 각 카드: 이미지 + 제목 + 태그 + 인원/시간 정보 + 예약 버튼

**구현 요구사항:**
- [ ] 3열 카드 그리드
- [ ] BEST 배지
- [ ] 인원/시간 정보 표시
- [ ] 예약 버튼 → 견적 모달 연동

#### 4.2.9 이용 규칙 섹션

**현재 기능:**
- "예약 전 필수 확인사항" (경고 배너)
- "이용 준수사항" 제목 + 6개 규칙 카드
- 규칙: 축구화 착용 금지, 개별앰프 사용 금지, 저녁 9시 30분 이후 매너타임, 30% 입금 후 예약확정, 시설물 무단 사용 금지, 이용일 7일 이내 예약인원 변경불가

**구현 요구사항:**
- [ ] 경고 배너 컴포넌트 (노란색/빨간색)
- [ ] 6열 규칙 카드 그리드 (모바일: 2열)
- [ ] 아이콘 + 제목 + 설명

#### 4.2.10 부대시설 섹션

**현재 기능:**
- "기업워크샵 부대시설"
- 3개 시설 카드: 넉넉한 전용주차장, 워크샵 세미나룸, 워크샵 전용 잔디구장

**구현 요구사항:**
- [ ] 3열 카드 그리드
- [ ] 이미지 + 아이콘 + 제목 + 특징 리스트

#### 4.2.11 견적 계산기 섹션

**현재 기능:**
- "워크샵/야유회 견적 계산기"
- 탭: 1박2일 워크샵 / 당일 야유회
- 인원 안내: 최소 10명 ~ 최대 80명 (1박2일), 30~200명 (당일)
- 입실/퇴실 시간 표시
- 포함 항목 표시
- 견적서 계산 (인원 × 99,000원)
- 예약금 30% 자동 계산
- 견적서 이메일 발송 폼

**구현 요구사항:**
- [ ] 탭 컴포넌트
- [ ] 인원 입력 필드 (숫자)
- [ ] 실시간 견적 계산
- [ ] 견적서 카드 (총합계, 예약금)
- [ ] 이메일 발송 폼 (담당자, 연락처, 이메일, 회사명, 요청사항)

#### 4.2.12 환불 정책 섹션

**현재 기능:**
- "예약 및 환불규정"
- 예약 안내 리스트
- 주의사항 박스 (7일 이내 변경 불가)
- 고객 취소 시 환불 테이블 (1개월~15일: 90%, 14일~8일: 50%, 7일~당일: 환불불가)
- 사업자 취소 시 배상 테이블 (2일 전: 계약금 환급, 1일 전: +20%, 당일: +30%)

**구현 요구사항:**
- [ ] 테이블 컴포넌트
- [ ] 경고 박스 컴포넌트
- [ ] 모바일 반응형 테이블

#### 4.2.13 Footer

**현재 기능:**
- 초호쉼터 로고 + 주소 + 전화번호
- 3개 사업체 정보 (초호, 초호가든, 초호쉼터)
- 입금계좌 정보 (농협은행)
- 저작권 표시

**구현 요구사항:**
- [ ] 다크 테마 푸터
- [ ] 4열 그리드 (모바일: 1열)
- [ ] 입금계좌 복사 기능

### 4.3 빠른 견적 문의 모달

**현재 기능:**
- 15초 후 자동 표시 또는 40% 스크롤 시
- 3번 닫으면 24시간 미표시 (쿠키)
- 닫은 후 15초 후 재표시 (최대 3회)
- 제출 완료 시 24시간 미표시

**폼 필드:**
- 담당자 성함 (필수)
- 연락처 (필수, 자동 하이픈)
- 이메일 (필수)
- 이용 희망일 (선택)
- 예상 인원 (필수, 10명 이상)
- 개인정보 동의 (필수)

**구현 요구사항:**
- [ ] 모달 컴포넌트 (애니메이션)
- [ ] 폼 유효성 검사
- [ ] Google Apps Script 연동
- [ ] 성공 메시지 표시
- [ ] 쿠키 기반 표시 제어

---

## 5. 디자인 요구사항

### 5.1 브랜드 컬러

```css
:root {
  /* Primary - Green (자연, 숲) */
  --primary-50: #f0fdf4;
  --primary-100: #dcfce7;
  --primary-500: #22c55e;
  --primary-600: #16a34a;
  --primary-700: #15803d;
  --primary-800: #166534;
  --primary-900: #14532d;

  /* Accent - Orange (CTA, 강조) */
  --accent-400: #fb923c;
  --accent-500: #f97316;
  --accent-600: #ea580c;

  /* Neutral */
  --neutral-50: #fafafa;
  --neutral-100: #f5f5f5;
  --neutral-200: #e5e5e5;
  --neutral-700: #404040;
  --neutral-800: #262626;
  --neutral-900: #171717;

  /* Warning/Error */
  --warning: #f59e0b;
  --error: #ef4444;
}
```

### 5.2 타이포그래피

```css
--font-sans: 'Pretendard', -apple-system, system-ui, sans-serif;

/* 크기 스케일 */
--text-hero: clamp(2.5rem, 6vw, 4rem);
--text-h1: clamp(2rem, 4vw, 3rem);
--text-h2: clamp(1.5rem, 3vw, 2rem);
--text-h3: clamp(1.25rem, 2vw, 1.5rem);
--text-body: 1rem;
--text-sm: 0.875rem;
```

### 5.3 반응형 브레이크포인트

| 이름 | 범위 | 그리드 |
|------|------|--------|
| Mobile | 320px ~ 767px | 1열 |
| Tablet | 768px ~ 1023px | 2열 |
| Desktop | 1024px ~ 1439px | 3열 |
| Wide | 1440px+ | 3~4열 |

---

## 6. 데이터 구조

### 6.1 패키지 (Package)

```typescript
interface Package {
  id: string;
  name: string;              // "1박2일 워크샵", "당일 야유회"
  slug: string;              // URL용 슬러그
  type: 'overnight' | 'daytrip' | 'retreat';
  pricePerPerson: number;    // 99000
  capacity: {
    min: number;             // 10
    max: number;             // 80 또는 200
  };
  schedule: {
    checkIn: string;         // "오후 3시"
    checkOut: string;        // "오전 11시"
  };
  includes: string[];        // ["저녁식사", "조식", "주류", "숙박", "음료수"]
  isBest?: boolean;
  thumbnail: string;
}
```

### 6.2 견적 문의 (Inquiry)

```typescript
interface Inquiry {
  id: string;
  type: 'quick_inquiry' | 'calculator_inquiry';
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  companyName?: string;
  desiredDate?: string;
  people: number;
  packageType?: 'overnight' | 'daytrip';
  totalAmount?: number;
  depositAmount?: number;
  requests?: string;
  source: string;            // "CTA Modal", "Calculator"
  createdAt: Date;
}
```

### 6.3 시설 (Facility)

```typescript
interface Facility {
  id: string;
  name: string;              // "전용주차장", "세미나룸"
  description: string;
  features: string[];        // ["승용차 50대", "대형버스 5대"]
  thumbnail: string;
  icon: string;
}
```

### 6.4 메뉴 (Menu)

```typescript
interface MenuItem {
  id: string;
  name: string;              // "6시간 훈연 등갈비"
  description: string;
  features: string[];
  tag?: string;              // "인기 1위", "필수 메뉴"
  tagColor?: string;
  thumbnail: string;
}
```

---

## 7. 외부 연동

### 7.1 Google Apps Script (견적 문의)

**현재 연동:**
- URL: `https://script.google.com/macros/s/AKfycbz2CnVRAiaqDCAdCSa7gWO9xEcbpGfgunbc6sTabfZkAc6hgQpFIW1t0wRxpWAnei06oQ/exec`
- Method: POST (no-cors)
- 데이터: JSON 형식

**구현 요구사항:**
- [ ] 기존 Google Apps Script 연동 유지
- [ ] 견적 계산기 폼도 동일 스크립트로 전송

### 7.2 Google Analytics 4

**현재 연동:**
- ID: G-49043QNXM0

**구현 요구사항:**
- [ ] 페이지뷰 트래킹
- [ ] 견적 문의 전환 이벤트
- [ ] 전화 버튼 클릭 이벤트

### 7.3 텔레그램 알림 (신규)

**구현 요구사항:**
- [ ] 견적 문의 접수 시 텔레그램 알림
- [ ] 채팅 ID: `-1003394139746` (백필 메시지 채널)

---

## 8. 비기능 요구사항

### 8.1 성능

- **LCP (Largest Contentful Paint)**: < 2.5초
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **이미지 최적화**: WebP/AVIF 포맷, lazy loading

### 8.2 접근성 (WCAG 2.1 AA)

- 키보드 네비게이션 지원
- 스크린 리더 호환
- 색상 대비 4.5:1 이상
- 폼 레이블 연결

### 8.3 SEO

- 메타 태그 최적화 (기업워크샵, 단체펜션, 야유회 장소 키워드)
- 구조화된 데이터 (LocalBusiness, LodgingBusiness)
- sitemap.xml / robots.txt
- Open Graph / Twitter Card

### 8.4 보안

- HTTPS 강제
- XSS/CSRF 방어
- 개인정보 암호화

---

## 9. 마일스톤

### Phase 1: 프로젝트 설정 (Day 1-2)

- [ ] Next.js 15 프로젝트 생성
- [ ] TypeScript, Tailwind CSS 설정
- [ ] shadcn/ui 설치
- [ ] ESLint, Prettier 설정
- [ ] GitHub 저장소 연결
- [ ] Vercel 배포 설정

### Phase 2: 레이아웃 및 공통 컴포넌트 (Day 3-5)

- [ ] Header 컴포넌트 (스크롤 시 스타일 변경)
- [ ] Footer 컴포넌트
- [ ] 모바일 메뉴
- [ ] 기본 UI 컴포넌트 (Button, Card, Badge, Modal)
- [ ] 견적 문의 모달 컴포넌트

### Phase 3: 메인 페이지 (Day 6-12)

- [ ] Hero 섹션
- [ ] Value Proposition 섹션
- [ ] 서비스 소개 섹션
- [ ] 식사 서비스 섹션
- [ ] 메뉴 카드 섹션
- [ ] 패키지 특징 섹션
- [ ] 타겟 고객 섹션
- [ ] 패키지 타입 섹션
- [ ] 이용 규칙 섹션
- [ ] 부대시설 섹션
- [ ] 견적 계산기 섹션
- [ ] 환불 정책 섹션

### Phase 4: 서브 페이지 (Day 13-18)

- [ ] 소개 페이지
- [ ] 시설 안내 페이지
- [ ] 패키지 상세 페이지
- [ ] 이용 안내 페이지
- [ ] 찾아오시는 길 페이지

### Phase 5: 기능 연동 (Day 19-22)

- [ ] Google Apps Script 연동
- [ ] Google Analytics 연동
- [ ] 텔레그램 알림 연동

### Phase 6: 최적화 및 테스트 (Day 23-25)

- [ ] SEO 최적화
- [ ] 성능 테스트 (Lighthouse)
- [ ] 접근성 테스트
- [ ] 크로스 브라우저 테스트
- [ ] 모바일 테스트

### Phase 7: 배포 (Day 26-28)

- [ ] Vercel 프로덕션 배포
- [ ] 도메인 연결
- [ ] SSL 인증서 확인
- [ ] 최종 QA

---

## 10. 폴더 구조 (제안)

```
chohopark/
├── docs/
│   ├── PRD.md                  # 제품 요구사항 (현재 문서)
│   └── PLANNING.md             # 기획서
├── public/
│   ├── images/                 # 정적 이미지
│   ├── fonts/                  # 웹폰트
│   └── favicon.ico
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx            # 메인 페이지
│   │   ├── about/
│   │   ├── facilities/
│   │   ├── packages/
│   │   ├── booking/
│   │   ├── guide/
│   │   └── location/
│   ├── components/
│   │   ├── layout/             # Header, Footer, MobileMenu
│   │   ├── ui/                 # Button, Card, Modal, Badge
│   │   ├── sections/           # 메인 페이지 섹션들
│   │   └── forms/              # InquiryModal, Calculator
│   ├── lib/
│   │   ├── utils.ts
│   │   └── constants.ts
│   ├── types/
│   │   └── index.ts
│   └── styles/
│       └── globals.css
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 11. 참고 자료

### 11.1 현재 사이트

- 메인: https://chohopark.imweb.me/
- Google Analytics: G-49043QNXM0

### 11.2 기존 프로젝트 참고

- F:\choho_2025 (초호펜션 개인 고객용 사이트)

### 11.3 경쟁사 참고

- 기업 워크샵/야유회 전문 펜션 사이트
- 단체 숙박 예약 플랫폼

---

**문서 끝**

---

**작성자**: Claude
**최종 수정**: 2025-12-07
