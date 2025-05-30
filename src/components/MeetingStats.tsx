
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Users, CheckCircle, AlertTriangle } from "lucide-react";

export const MeetingStats = () => {
  const stats = [
    {
      title: "การประชุมวันนี้",
      value: "8",
      icon: Calendar,
      color: "text-blue-600 bg-blue-100",
      trend: "+2 จากเมื่อวาน"
    },
    {
      title: "เวลาที่ใช้ประชุม",
      value: "6.5 ชม.",
      icon: Clock,
      color: "text-purple-600 bg-purple-100",
      trend: "-30 นาที"
    },
    {
      title: "ผู้เข้าร่วมทั้งหมด",
      value: "32",
      icon: Users,
      color: "text-green-600 bg-green-100",
      trend: "+5 คน"
    },
    {
      title: "การประชุมสำเร็จ",
      value: "94%",
      icon: CheckCircle,
      color: "text-emerald-600 bg-emerald-100",
      trend: "+2%"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white/60 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.trend}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
