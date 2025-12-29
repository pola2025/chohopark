"use client";

import { useState, useEffect } from "react";
import { Users, Clock, Check, Send, X, Presentation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency, calculateQuote, formatPhoneNumber } from "@/lib/utils";
import { generateQuotePdfBase64, type QuoteData } from "@/lib/generateQuotePdfClient";

const SEMINAR_PRICE_PER_HOUR = 110000; // 세미나실 1시간 11만원

const PACKAGE_INFO = {
  overnight: {
    name: "1박2일 워크샵",
    minPeople: 10,
    maxPeople: 80,
    checkIn: "오후 3시",
    checkOut: "오전 11시",
    includes: ["저녁식사", "조식", "주류 무한리필", "음료수 무한리필", "숙박"],
  },
  daytrip: {
    name: "당일 야유회",
    minPeople: 30,
    maxPeople: 200,
    checkIn: "오전 11시",
    checkOut: "오후 4시",
    includes: ["점심식사", "주류 무한리필", "음료수 무한리필"],
  },
};

export function Calculator() {
  const [activeTab, setActiveTab] = useState<"overnight" | "daytrip">("overnight");
  const [people, setPeople] = useState<number>(0);
  const [seminarHours, setSeminarHours] = useState<number>(0); // 세미나실 시간
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    requests: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const packageInfo = PACKAGE_INFO[activeTab];
  const isValidPeople = people >= packageInfo.minPeople && people <= packageInfo.maxPeople;
  const baseQuote = isValidPeople ? calculateQuote(people) : { total: 0, deposit: 0 };
  const seminarTotal = seminarHours * SEMINAR_PRICE_PER_HOUR;
  const quote = {
    total: baseQuote.total + seminarTotal,
    deposit: Math.round((baseQuote.total + seminarTotal) * 0.3),
    baseTotal: baseQuote.total,
    seminarTotal: seminarTotal,
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidPeople) return;

    setIsSubmitting(true);

    try {
      // 견적번호 생성
      const now = new Date();
      const quoteNumber = `CHO-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;
      const issueDate = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`;

      // 패키지별 일정 데이터
      const scheduleByPackage: Record<string, QuoteData["schedule"]> = {
        "1박2일 워크샵": [
          { day: "1일차", time: "15:00", content: "입실 (입실 전 시설 이용 불가)" },
          { day: "1일차", time: "18:30~21:30", content: "저녁식사 (바베큐 무한리필) ※ 21:30 이후 야외음주 제한" },
          { day: "2일차", time: "08:30~10:00", content: "아침식사 (해장국 + 반찬)" },
          { day: "2일차", time: "11:00", content: "퇴실" },
        ],
        "당일 야유회": [
          { day: "당일", time: "10:00", content: "시설 이용 시작" },
          { day: "당일", time: "12:30~13:30", content: "점심 BBQ" },
          { day: "당일", time: "17:00", content: "이용 종료 (시간 엄수)" },
        ],
      };

      // 패키지별 포함사항
      const includesByPackage: Record<string, string[]> = {
        "1박2일 워크샵": ["저녁식사 (무한리필)", "조식", "숙박", "주류 무한리필", "음료수 무한리필", "바베큐 시설"],
        "당일 야유회": ["점심식사", "주류 무한리필", "음료수 무한리필", "바베큐 시설", "잔디구장", "시설 이용"],
      };

      // PDF 생성용 데이터
      const pricePerPerson = packageInfo.name === "당일 야유회" ? 66000 : 99000;
      const quoteData: QuoteData = {
        quoteNumber,
        issueDate,
        customer: {
          company: formData.company || "",
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
        },
        packageName: packageInfo.name,
        people: people,
        pricePerPerson,
        seminarHours: seminarHours,
        seminarPricePerHour: 110000,
        schedule: scheduleByPackage[packageInfo.name] || scheduleByPackage["1박2일 워크샵"],
        includes: includesByPackage[packageInfo.name] || includesByPackage["1박2일 워크샵"],
      };

      // 클라이언트에서 PDF 생성
      console.log("PDF 생성 시작...");
      const pdfBase64 = await generateQuotePdfBase64(quoteData);
      console.log("PDF 생성 완료, 크기:", pdfBase64.length);

      // 세미나실 내역 텍스트
      const seminarText = seminarHours > 0
        ? `- 세미나실 대관: ${seminarHours}시간 × 110,000원 = ${formatCurrency(quote.seminarTotal)}원\n`
        : "";

      // 견적 상세 내역 생성
      const quoteDetails = `[초호가든 ${packageInfo.name} 견적서]

● 이용 시간: 입실 ${packageInfo.checkIn} ~ 퇴실 ${packageInfo.checkOut}

● 포함 항목
${packageInfo.includes.map((item) => `- ${item}`).join("\n")}

● 견적 내역
- ${packageInfo.name}: ${people}명 × ${formatCurrency(pricePerPerson)}원 = ${formatCurrency(quote.baseTotal)}원
${seminarText}
━━━━━━━━━━━━━━━━━━
총 합계: ${formatCurrency(quote.total)}원 (VAT 포함)
━━━━━━━━━━━━━━━━━━

● 결제 안내
- 예약금 (30%): ${formatCurrency(quote.deposit)}원
- 잔금 (70%): ${formatCurrency(quote.total - quote.deposit)}원

※ 예약금 입금 후 예약이 확정됩니다.
※ 잔금은 이용 당일 현장에서 결제해주세요.`;

      // API를 통해 GAS로 데이터 전송 (PDF 포함)
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName: packageInfo.name,
          people: people,
          totalAmount: `${formatCurrency(quote.total)}원`,
          depositAmount: `${formatCurrency(quote.deposit)}원`,
          balanceAmount: `${formatCurrency(quote.total - quote.deposit)}원`,
          customerName: formData.name,
          customerPhone: formData.phone,
          customerEmail: formData.email,
          customerCompany: formData.company,
          customerMemo: formData.requests,
          quoteDetails: quoteDetails,
          seminarRoom: seminarHours > 0 ? `${seminarHours}시간` : "",
          quoteNumber,
          issueDate,
          pdfBase64,
          pdfFileName: `초호쉼터_견적서_${quoteNumber}.pdf`,
        }),
      });

      const result = await response.json();

      if (result.status === "success") {
        setShowSuccessModal(true);
      } else {
        throw new Error(result.message || "견적서 발송에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("견적서 발송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setPeople(0);
    setSeminarHours(0);
    setFormData({ name: "", phone: "", email: "", company: "", requests: "" });
  };

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showSuccessModal) {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showSuccessModal]);

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
            CALCULATOR
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            워크샵/야유회 <span className="text-primary">견적 계산기</span>
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-soft overflow-hidden">
          {/* 탭 */}
          <Tabs
            value={activeTab}
            onValueChange={(v) => {
              setActiveTab(v as "overnight" | "daytrip");
              setPeople(0);
            }}
            className="w-full"
          >
            <div className="p-6 pb-0">
              <TabsList className="w-full grid grid-cols-2 h-14">
                <TabsTrigger value="overnight" className="text-base">
                  1박2일 워크샵
                </TabsTrigger>
                <TabsTrigger value="daytrip" className="text-base">
                  당일 야유회
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overnight" className="m-0">
              <CalculatorContent
                packageInfo={packageInfo}
                people={people}
                setPeople={setPeople}
                seminarHours={seminarHours}
                setSeminarHours={setSeminarHours}
                quote={quote}
                isValidPeople={isValidPeople}
                formData={formData}
                setFormData={setFormData}
                handlePhoneChange={handlePhoneChange}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </TabsContent>
            <TabsContent value="daytrip" className="m-0">
              <CalculatorContent
                packageInfo={packageInfo}
                people={people}
                setPeople={setPeople}
                seminarHours={seminarHours}
                setSeminarHours={setSeminarHours}
                quote={quote}
                isValidPeople={isValidPeople}
                formData={formData}
                setFormData={setFormData}
                handlePhoneChange={handlePhoneChange}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* 성공 모달 */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* 배경 오버레이 */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleCloseModal}
          />

          {/* 모달 컨텐츠 */}
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center animate-in fade-in zoom-in duration-300">
            {/* 닫기 버튼 */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>

            {/* 성공 아이콘 */}
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              견적서 발송 완료!
            </h3>

            <p className="text-gray-600 mb-6">
              입력하신 이메일로 견적서를 발송해 드렸습니다.
              <br />
              빠른 시일 내에 담당자가 연락드리겠습니다.
            </p>

            <Button
              onClick={handleCloseModal}
              variant="accent"
              size="lg"
              className="w-full rounded-xl"
            >
              확인
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

interface CalculatorContentProps {
  packageInfo: typeof PACKAGE_INFO.overnight;
  people: number;
  setPeople: (n: number) => void;
  seminarHours: number;
  setSeminarHours: (n: number) => void;
  quote: { total: number; deposit: number; baseTotal: number; seminarTotal: number };
  isValidPeople: boolean;
  formData: { name: string; phone: string; email: string; company: string; requests: string };
  setFormData: React.Dispatch<React.SetStateAction<{ name: string; phone: string; email: string; company: string; requests: string }>>;
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

function CalculatorContent({
  packageInfo,
  people,
  setPeople,
  seminarHours,
  setSeminarHours,
  quote,
  isValidPeople,
  formData,
  setFormData,
  handlePhoneChange,
  handleSubmit,
  isSubmitting,
}: CalculatorContentProps) {
  return (
    <div className="p-6 pt-4">
      {/* 패키지 정보 */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          {/* 인원 안내 */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-gray-700">
              최소 {packageInfo.minPeople}명 ~ 최대 {packageInfo.maxPeople}명
            </span>
          </div>

          {/* 시간 안내 */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-gray-700">
              {packageInfo.checkIn} 입실 / {packageInfo.checkOut} 퇴실
            </span>
          </div>
        </div>

        {/* 포함 항목 */}
        <div className="p-4 bg-green-50 rounded-xl">
          <h4 className="font-semibold text-green-800 mb-2">포함 항목</h4>
          <ul className="space-y-1">
            {packageInfo.includes.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-green-700">
                <Check className="w-4 h-4" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 인원 입력 안내 */}
      {!isValidPeople && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-blue-800 font-medium text-center">
            👇 아래에 <span className="text-blue-600 font-bold">예상 인원</span>을 입력하시면 상세 견적을 확인하실 수 있습니다
          </p>
        </div>
      )}

      {/* 인원 입력 */}
      <div className="mb-6">
        <Label htmlFor="people" className="text-base mb-2 block font-semibold">
          예상 인원 <span className="text-red-500">*</span>
        </Label>
        <Input
          id="people"
          type="number"
          placeholder={`인원수를 입력하세요 (${packageInfo.minPeople}~${packageInfo.maxPeople}명)`}
          value={people || ""}
          onChange={(e) => setPeople(parseInt(e.target.value) || 0)}
          min={packageInfo.minPeople}
          max={packageInfo.maxPeople}
          className="text-lg h-14"
          error={people > 0 && !isValidPeople}
        />
        {people === 0 && (
          <p className="text-gray-500 text-sm mt-2">
            {packageInfo.minPeople}명 ~ {packageInfo.maxPeople}명 사이로 입력해 주세요
          </p>
        )}
        {people > 0 && !isValidPeople && (
          <p className="text-red-500 text-sm mt-2">
            {people < packageInfo.minPeople
              ? `최소 ${packageInfo.minPeople}명 이상 입력해 주세요`
              : `최대 ${packageInfo.maxPeople}명까지 가능합니다`}
          </p>
        )}
      </div>

      {/* 세미나실 대관 옵션 */}
      <div className="mb-8 p-4 bg-amber-50 rounded-xl border border-amber-200">
        <div className="flex items-center gap-2 md:gap-3 mb-3 flex-wrap">
          <Presentation className="w-5 h-5 text-amber-600 shrink-0" />
          <span className="font-semibold text-gray-900 whitespace-nowrap text-sm md:text-base">세미나실 대관 (선택)</span>
          <span className="text-xs md:text-sm text-amber-600 font-medium whitespace-nowrap">1시간 110,000원</span>
        </div>
        <div className="flex items-center gap-3">
          <Label htmlFor="seminarHours" className="text-sm text-gray-600 whitespace-nowrap">
            이용 시간
          </Label>
          <select
            id="seminarHours"
            value={seminarHours}
            onChange={(e) => setSeminarHours(parseInt(e.target.value) || 0)}
            className="flex-1 h-10 px-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value={0}>선택 안함</option>
            <option value={1}>1시간</option>
            <option value={2}>2시간</option>
            <option value={3}>3시간</option>
            <option value={4}>4시간</option>
            <option value={5}>5시간</option>
            <option value={6}>6시간</option>
          </select>
          {seminarHours > 0 && (
            <span className="text-amber-700 font-semibold whitespace-nowrap">
              +{formatCurrency(quote.seminarTotal)}원
            </span>
          )}
        </div>
      </div>

      {/* 견적서 카드 */}
      {isValidPeople && (
        <div className="bg-gray-900 text-white rounded-2xl p-6 mb-8">
          <h4 className="text-lg font-semibold mb-4">견적서</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">패키지 ({people}명 × 99,000원)</span>
              <span>{formatCurrency(quote.baseTotal)}원</span>
            </div>
            {seminarHours > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400">세미나실 ({seminarHours}시간 × 110,000원)</span>
                <span>{formatCurrency(quote.seminarTotal)}원</span>
              </div>
            )}
            <hr className="border-gray-700" />
            <div className="flex justify-between items-center text-lg">
              <span className="font-semibold">총 합계</span>
              <span className="text-green-400 font-bold text-2xl">
                {formatCurrency(quote.total)}원
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">예약금 (30%)</span>
              <span className="text-amber-400 font-semibold">
                {formatCurrency(quote.deposit)}원
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 견적서 발송 폼 */}
      {isValidPeople && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h4 className="text-lg font-semibold mb-4">견적서 이메일 발송</h4>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">담당자 성함 *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="홍길동"
              />
            </div>
            <div>
              <Label htmlFor="phone">연락처 *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="010-0000-0000"
              />
            </div>
            <div>
              <Label htmlFor="email">이메일 *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="email@company.com"
              />
            </div>
            <div>
              <Label htmlFor="company">회사명</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                placeholder="회사명을 입력하세요"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="requests">요청사항</Label>
            <textarea
              id="requests"
              rows={3}
              value={formData.requests}
              onChange={(e) => setFormData((prev) => ({ ...prev, requests: e.target.value }))}
              placeholder="추가 요청사항이 있으시면 입력해 주세요"
              className="flex w-full rounded-lg border border-input bg-background px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <Button
            type="submit"
            variant="accent"
            size="xl"
            className="w-full rounded-xl"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "발송 중..."
            ) : (
              <>
                <Send className="w-5 h-5" />
                견적서 이메일 발송
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
