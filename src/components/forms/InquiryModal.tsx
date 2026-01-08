"use client";

import { useState, useEffect } from "react";
import { X, Send, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPhoneNumber } from "@/lib/utils";

const MODAL_COOKIE_KEY = "inquiry_modal_closed";
const MODAL_SUBMITTED_KEY = "inquiry_modal_submitted";
const MODAL_HIDE_TODAY_KEY = "inquiry_modal_hide_today";
const MODAL_PERMANENTLY_CLOSED_KEY = "inquiry_modal_permanently_closed";

export function InquiryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [closeCount, setCloseCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHiddenToday, setIsHiddenToday] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    people: "",
    privacy: false,
  });

  useEffect(() => {
    // 영구적으로 닫았으면 (최초 X 버튼 클릭) 절대 안 뜸
    const permanentlyClosed = localStorage.getItem(MODAL_PERMANENTLY_CLOSED_KEY);
    if (permanentlyClosed) {
      return;
    }

    // 이미 오늘 하루 안보기 클릭했으면 실행 안함
    if (isHiddenToday) return;

    // 오늘 하루 안보기 체크
    const hideToday = localStorage.getItem(MODAL_HIDE_TODAY_KEY);
    if (hideToday) {
      const hideDate = new Date(hideToday);
      // 같은 날인지 확인 (자정 기준)
      const today = new Date();
      if (
        hideDate.getFullYear() === today.getFullYear() &&
        hideDate.getMonth() === today.getMonth() &&
        hideDate.getDate() === today.getDate()
      ) {
        setIsHiddenToday(true);
        return;
      }
      // 다른 날이면 초기화
      localStorage.removeItem(MODAL_HIDE_TODAY_KEY);
    }

    // 24시간 내 제출했으면 표시하지 않음
    const submitted = localStorage.getItem(MODAL_SUBMITTED_KEY);
    if (submitted) {
      const expiry = new Date(submitted);
      if (Date.now() - expiry.getTime() < 24 * 60 * 60 * 1000) {
        return;
      }
      // 24시간 지났으면 초기화
      localStorage.removeItem(MODAL_SUBMITTED_KEY);
    }

    // 40% 스크롤 시 표시
    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent >= 40 && !isHiddenToday) {
        setIsOpen(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHiddenToday]);

  const handleClose = () => {
    setIsOpen(false);
    // 최초 닫기 시 영구적으로 안 뜨게 설정
    localStorage.setItem(MODAL_PERMANENTLY_CLOSED_KEY, "true");
  };

  const handleHideToday = () => {
    setIsOpen(false);
    setIsHiddenToday(true);
    localStorage.setItem(MODAL_HIDE_TODAY_KEY, new Date().toISOString());
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          date: formData.date,
          people: formData.people,
          source: "모달 문의",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit inquiry");
      }

      setIsSubmitted(true);
      localStorage.setItem(MODAL_SUBMITTED_KEY, new Date().toISOString());
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              문의가 접수되었습니다!
            </h3>
            <p className="text-gray-600 mb-6">
              빠른 시일 내에 담당자가 연락드리겠습니다.
            </p>
            <Button onClick={() => setIsOpen(false)} variant="outline">
              닫기
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">빠른 견적 문의</DialogTitle>
              <DialogDescription>
                간단한 정보를 입력하시면 맞춤 견적을 보내드립니다
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-3 mt-2">
              <div>
                <Label htmlFor="modal-name">담당자 성함 *</Label>
                <Input
                  id="modal-name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="홍길동"
                />
              </div>

              <div>
                <Label htmlFor="modal-phone">연락처 *</Label>
                <Input
                  id="modal-phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="010-0000-0000"
                />
              </div>

              <div>
                <Label htmlFor="modal-email">이메일 *</Label>
                <Input
                  id="modal-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="email@company.com"
                />
              </div>

              <div>
                <Label htmlFor="modal-date">이용 희망일</Label>
                <Input
                  id="modal-date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, date: e.target.value }))
                  }
                />
              </div>

              <div>
                <Label htmlFor="modal-people">예상 인원 *</Label>
                <Input
                  id="modal-people"
                  type="number"
                  required
                  min={10}
                  value={formData.people}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, people: e.target.value }))
                  }
                  placeholder="10명 이상"
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  id="modal-privacy"
                  type="checkbox"
                  required
                  checked={formData.privacy}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, privacy: e.target.checked }))
                  }
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="modal-privacy" className="text-sm text-gray-600">
                  개인정보 수집 및 이용에 동의합니다 *
                </label>
              </div>

              <Button
                type="submit"
                variant="accent"
                size="lg"
                className="w-full rounded-xl"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "전송 중..."
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    견적 문의하기
                  </>
                )}
              </Button>

              <button
                type="button"
                onClick={handleHideToday}
                className="w-full text-center text-sm font-semibold text-red-600 hover:text-red-700 py-3 bg-red-50 hover:bg-red-100 rounded-xl border-2 border-red-200 transition-colors"
              >
                ✕ 오늘 하루 보지 않기
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
