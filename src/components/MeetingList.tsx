
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Users, MoreVertical, Video, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface MeetingListProps {
  selectedDate: Date;
}

export const MeetingList = ({ selectedDate }: MeetingListProps) => {
  const todayMeetings = [
    {
      id: "1",
      title: "ประชุมกับลูกค้า ABC Corp",
      time: "09:00 - 10:30",
      attendees: ["จอห์น ดู", "แมรี่ สมิธ", "ปีเตอร์ จอนส์"],
      room: "ห้องประชุม A",
      type: "client",
      status: "confirmed",
      isOnline: false,
      description: "พูดคุยเกี่ยวกับโปรเจคใหม่และความต้องการของลูกค้า"
    },
    {
      id: "2",
      title: "ประชุมทีม Development",
      time: "14:00 - 15:00", 
      attendees: ["อลิซ บราวน์", "บ็อบ วิลสัน", "ชาร์ลี เดวิส"],
      room: "ห้องประชุม B",
      type: "team",
      status: "confirmed",
      isOnline: true,
      description: "รีวิวความคืบหน้าการพัฒนาและวางแผนสปรินต์ถัดไป"
    },
    {
      id: "3",
      title: "วางแผนโปรเจค Q2",
      time: "16:00 - 17:30",
      attendees: ["ดาน มิลเลอร์", "อีวา มาร์ติน", "แฟรงค์ การ์เซีย"],
      room: "ห้องประชุม C", 
      type: "planning",
      status: "pending",
      isOnline: false,
      description: "วางแผนกลยุทธ์และเป้าหมายสำหรับไตรมาสที่ 2"
    }
  ];

  const upcomingMeetings = [
    {
      id: "4",
      title: "ประชุมทบทวนประจำสัปดาห์",
      time: "พรุ่งนี้ 10:00",
      attendees: ["ทีมทั้งหมด"],
      room: "ห้องใหญ่",
      type: "internal",
      status: "confirmed"
    },
    {
      id: "5", 
      title: "นำเสนอโปรเจคให้ลูกค้า XYZ",
      time: "วันศุกร์ 14:00",
      attendees: ["ทีม Sales", "ทีม Dev"],
      room: "ห้องประชุม A",
      type: "client", 
      status: "confirmed"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "client":
        return "bg-red-100 text-red-800 border-red-200";
      case "internal":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "team":
        return "bg-green-100 text-green-800 border-green-200";
      case "planning":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Today's Meetings */}
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            การประชุมวันนี้
          </CardTitle>
          <p className="text-sm text-gray-600">
            {selectedDate.toLocaleDateString('th-TH', { 
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {todayMeetings.map((meeting) => (
            <div 
              key={meeting.id}
              className="bg-white rounded-lg border p-4 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={cn("w-2 h-2 rounded-full", getStatusIndicator(meeting.status))}></div>
                    <h4 className="font-medium text-gray-900 text-sm">{meeting.title}</h4>
                    {meeting.isOnline && (
                      <Video className="h-3 w-3 text-blue-600" />
                    )}
                  </div>
                  
                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {meeting.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {meeting.room}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {meeting.attendees.length} คน
                    </div>
                  </div>

                  {meeting.description && (
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                      {meeting.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-3">
                    <Badge variant="outline" className={cn("text-xs", getTypeColor(meeting.type))}>
                      {meeting.type === "client" ? "ลูกค้า" : 
                       meeting.type === "internal" ? "ภายใน" :
                       meeting.type === "team" ? "ทีม" : "วางแผน"}
                    </Badge>
                  </div>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          {todayMeetings.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>ไม่มีการประชุมวันนี้</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Meetings */}
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
            การประชุมที่จะมาถึง
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingMeetings.map((meeting) => (
            <div 
              key={meeting.id}
              className="bg-white rounded-lg border p-3 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className={cn("w-2 h-2 rounded-full", getStatusIndicator(meeting.status))}></div>
                    <h4 className="font-medium text-gray-900 text-sm">{meeting.title}</h4>
                  </div>
                  
                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {meeting.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {meeting.room}
                    </div>
                  </div>

                  <Badge variant="outline" className={cn("text-xs mt-2", getTypeColor(meeting.type))}>
                    {meeting.type === "client" ? "ลูกค้า" : 
                     meeting.type === "internal" ? "ภายใน" :
                     meeting.type === "team" ? "ทีม" : "วางแผน"}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">การดำเนินการด่วน</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start text-sm">
            <Video className="h-4 w-4 mr-2" />
            เข้าร่วมการประชุมออนไลน์
          </Button>
          <Button variant="outline" className="w-full justify-start text-sm">
            <Phone className="h-4 w-4 mr-2" />
            โทรหาผู้เข้าร่วม
          </Button>
          <Button variant="outline" className="w-full justify-start text-sm">
            <Clock className="h-4 w-4 mr-2" />
            ขอเลื่อนการประชุม
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
