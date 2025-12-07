"use client";

import { useState } from "react";
import { Users, Clock, Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency, calculateQuote, formatPhoneNumber } from "@/lib/utils";

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
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    requests: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const packageInfo = PACKAGE_INFO[activeTab];
  const isValidPeople = people >= packageInfo.minPeople && people <= packageInfo.maxPeople;
  const quote = isValidPeople ? calculateQuote(people) : { total: 0, deposit: 0 };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidPeople) return;

    setIsSubmitting(true);

    try {
      // Google Apps Script로 데이터 전송 (추후 구현)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-20 lg:py-28 bg-green-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            견적서 발송 완료!
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            입력하신 이메일로 견적서를 발송해 드렸습니다.
            <br />
            빠른 시일 내에 담당자가 연락드리겠습니다.
          </p>
          <Button
            onClick={() => {
              setIsSubmitted(false);
              setPeople(0);
              setFormData({ name: "", phone: "", email: "", company: "", requests: "" });
            }}
            variant="outline"
            size="lg"
            className="rounded-full"
          >
            새 견적 계산하기
          </Button>
        </div>
      </section>
    );
  }

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
    </section>
  );
}

interface CalculatorContentProps {
  packageInfo: typeof PACKAGE_INFO.overnight;
  people: number;
  setPeople: (n: number) => void;
  quote: { total: number; deposit: number };
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

      {/* 인원 입력 */}
      <div className="mb-8">
        <Label htmlFor="people" className="text-base mb-2 block">
          예상 인원
        </Label>
        <Input
          id="people"
          type="number"
          placeholder={`${packageInfo.minPeople}명 이상 입력`}
          value={people || ""}
          onChange={(e) => setPeople(parseInt(e.target.value) || 0)}
          min={packageInfo.minPeople}
          max={packageInfo.maxPeople}
          className="text-lg h-14"
          error={people > 0 && !isValidPeople}
        />
        {people > 0 && !isValidPeople && (
          <p className="text-red-500 text-sm mt-2">
            {people < packageInfo.minPeople
              ? `최소 ${packageInfo.minPeople}명 이상 입력해 주세요`
              : `최대 ${packageInfo.maxPeople}명까지 가능합니다`}
          </p>
        )}
      </div>

      {/* 견적서 카드 */}
      {isValidPeople && (
        <div className="bg-gray-900 text-white rounded-2xl p-6 mb-8">
          <h4 className="text-lg font-semibold mb-4">견적서</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">인원</span>
              <span>{people}명</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">단가</span>
              <span>{formatCurrency(99000)}원</span>
            </div>
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
