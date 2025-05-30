
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Clock, MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface MeetingCalendarProps {
  view: "day" | "week" | "month";
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

interface Meeting {
  id: string;
  title: string;
  time: string;
  endTime: string;
  attendees: string[];
  room: string;
  type: "client" | "internal" | "team" | "planning";
  status: "confirmed" | "pending" | "cancelled";
}

export const MeetingCalendar = ({ view, selectedDate, onDateSelect }: MeetingCalendarProps) => {
  // Sample meeting data
  const meetings: Meeting[] = [
    {
      id: "1",
      title: "ประชุมกับลูกค้า ABC Corp",
      time: "09:00",
      endTime: "10:30",
      attendees: ["จอห์น", "แมรี่", "ปีเตอร์"],
      room: "ห้องประชุม A",
      type: "client",
      status: "confirmed"
    },
    {
      id: "2", 
      title: "ประชุมทีม Development",
      time: "14:00",
      endTime: "15:00",
      attendees: ["อลิซ", "บ็อบ", "ชาร์ลี"],
      room: "ห้องประชุม B",
      type: "team",
      status: "confirmed"
    },
    {
      id: "3",
      title: "วางแผนโปรเจค Q2",
      time: "16:00", 
      endTime: "17:30",
      attendees: ["ดาน", "อีวา", "แฟรงค์"],
      room: "ห้องประชุม C",
      type: "planning",
      status: "pending"
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "border-l-green-500";
      case "pending":
        return "border-l-yellow-500";
      case "cancelled":
        return "border-l-red-500";
      default:
        return "border-l-gray-500";
    }
  };

  const renderTimeSlots = () => {
    const timeSlots = [];
    for (let hour = 8; hour <= 18; hour++) {
      timeSlots.push(
        <div key={hour} className="flex border-b border-gray-100">
          <div className="w-16 p-2 text-sm text-gray-500 font-medium">
            {hour.toString().padStart(2, '0')}:00
          </div>
          <div className="flex-1 p-2 min-h-[60px] relative">
            {meetings
              .filter(meeting => parseInt(meeting.time.split(':')[0]) === hour)
              .map(meeting => (
                <div 
                  key={meeting.id}
                  className={cn(
                    "bg-white rounded-lg border-l-4 p-3 mb-2 shadow-sm hover:shadow-md transition-all cursor-pointer",
                    getStatusColor(meeting.status)
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{meeting.title}</h4>
                      <div className="flex items-center mt-1 text-xs text-gray-600">
                        <Clock className="h-3 w-3 mr-1" />
                        {meeting.time} - {meeting.endTime}
                      </div>
                      <div className="flex items-center mt-1 text-xs text-gray-600">
                        <MapPin className="h-3 w-3 mr-1" />
                        {meeting.room}
                      </div>
                      <div className="flex items-center mt-1 text-xs text-gray-600">
                        <Users className="h-3 w-3 mr-1" />
                        {meeting.attendees.length} คน
                      </div>
                    </div>
                    <Badge variant="outline" className={cn("text-xs", getTypeColor(meeting.type))}>
                      {meeting.type === "client" ? "ลูกค้า" : 
                       meeting.type === "internal" ? "ภายใน" :
                       meeting.type === "team" ? "ทีม" : "วางแผน"}
                    </Badge>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      );
    }
    return timeSlots;
  };

  if (view === "day") {
    return (
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {selectedDate.toLocaleDateString('th-TH', { 
                weekday: 'long',
                day: 'numeric', 
                month: 'long',
                year: 'numeric'
              })}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {renderTimeSlots()}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Week view
  if (view === "week") {
    const weekDays = [];
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }

    return (
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">สัปดาห์ที่ {Math.ceil(selectedDate.getDate() / 7)}</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => (
              <div key={index} className="space-y-2">
                <div className="text-center p-2">
                  <div className="text-xs text-gray-500">
                    {day.toLocaleDateString('th-TH', { weekday: 'short' })}
                  </div>
                  <div className={cn(
                    "text-sm font-medium mt-1 w-8 h-8 rounded-full flex items-center justify-center mx-auto",
                    day.toDateString() === selectedDate.toDateString() 
                      ? "bg-blue-600 text-white" 
                      : "text-gray-900 hover:bg-gray-100 cursor-pointer"
                  )}>
                    {day.getDate()}
                  </div>
                </div>
                
                <div className="space-y-1 min-h-[200px]">
                  {index === 1 && meetings.slice(0, 2).map(meeting => (
                    <div 
                      key={meeting.id}
                      className={cn(
                        "bg-white rounded p-2 text-xs border-l-2 shadow-sm hover:shadow-md transition-all cursor-pointer",
                        getStatusColor(meeting.status)
                      )}
                    >
                      <div className="font-medium truncate">{meeting.title}</div>
                      <div className="text-gray-600 mt-1">{meeting.time}</div>
                    </div>
                  ))}
                  {index === 3 && meetings.slice(2, 3).map(meeting => (
                    <div 
                      key={meeting.id}
                      className={cn(
                        "bg-white rounded p-2 text-xs border-l-2 shadow-sm hover:shadow-md transition-all cursor-pointer",
                        getStatusColor(meeting.status)
                      )}
                    >
                      <div className="font-medium truncate">{meeting.title}</div>
                      <div className="text-gray-600 mt-1">{meeting.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Month view
  const monthDays = [];
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(firstDay.getDate() - firstDay.getDay());

  for (let i = 0; i < 42; i++) {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    monthDays.push(day);
  }

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            {selectedDate.toLocaleDateString('th-TH', { month: 'long', year: 'numeric' })}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
          
          {monthDays.map((day, index) => (
            <div 
              key={index}
              className={cn(
                "p-2 min-h-[80px] border border-gray-100 cursor-pointer hover:bg-gray-50",
                day.getMonth() !== month ? "text-gray-300 bg-gray-50/50" : "",
                day.toDateString() === selectedDate.toDateString() ? "bg-blue-50 border-blue-200" : ""
              )}
              onClick={() => onDateSelect(day)}
            >
              <div className="text-sm font-medium">{day.getDate()}</div>
              {day.getDate() === 15 && day.getMonth() === month && (
                <div className="mt-1 space-y-1">
                  <div className="w-full h-1 bg-red-400 rounded text-xs"></div>
                  <div className="w-full h-1 bg-green-400 rounded text-xs"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
