import Link from "next/link";
import { BarChart3, Settings, ArrowRight } from "lucide-react";

export default function AdminDashboard() {
  const menuItems = [
    {
      href: "/admin/analytics",
      label: "방문통계",
      description: "GA4 기반 실시간 방문자 통계 확인",
      icon: BarChart3,
      color: "bg-blue-500",
    },
    {
      href: "/admin/settings",
      label: "설정",
      description: "관리자 설정 관리",
      icon: Settings,
      color: "bg-gray-500",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
        <p className="text-gray-600 mt-1">초호쉼터 관리자 페이지에 오신 것을 환영합니다</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start gap-4">
                <div className={`${item.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {item.label}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
