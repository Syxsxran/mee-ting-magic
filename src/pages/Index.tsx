
import { useState } from "react";
import { Calendar, Clock, Users, MapPin, Plus, Bell, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MeetingCalendar } from "@/components/MeetingCalendar";
import { MeetingList } from "@/components/MeetingList";
import { AddMeetingDialog } from "@/components/AddMeetingDialog";
import { MeetingStats } from "@/components/MeetingStats";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [viewType, setViewType] = useState<"day" | "week" | "month">("week");
  const { toast } = useToast();

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    console.log("Selected date:", date);
  };

  const handleMeetingAdd = () => {
    setShowAddDialog(true);
  };

  const handleMeetingCreated = () => {
    toast({
      title: "สำเร็จ",
      description: "สร้างการประชุมใหม่เรียบร้อยแล้ว",
    });
    setShowAddDialog(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ระบบจัดการตารางการประชุม</h1>
                <p className="text-gray-600 text-sm">จัดการการประชุมอย่างมีประสิทธิภาพ ไม่มีการชนกัน</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex"
              >
                <Bell className="h-4 w-4 mr-2" />
                แจ้งเตือน
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex"
              >
                <Filter className="h-4 w-4 mr-2" />
                กรอง
              </Button>
              
              <Button 
                onClick={handleMeetingAdd}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                เพิ่มการประชุม
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Overview */}
        <MeetingStats />

        {/* Main Content */}
        <div className="mt-6">
          <Tabs value={viewType} onValueChange={(value) => setViewType(value as any)} className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="day">รายวัน</TabsTrigger>
                <TabsTrigger value="week">รายสัปดาห์</TabsTrigger>
                <TabsTrigger value="month">รายเดือน</TabsTrigger>
              </TabsList>
              
              <div className="text-lg font-semibold text-gray-700">
                {selectedDate.toLocaleDateString('th-TH', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Calendar View */}
              <div className="lg:col-span-3">
                <TabsContent value="day" className="mt-0">
                  <MeetingCalendar 
                    view="day" 
                    selectedDate={selectedDate}
                    onDateSelect={handleDateSelect}
                  />
                </TabsContent>
                
                <TabsContent value="week" className="mt-0">
                  <MeetingCalendar 
                    view="week" 
                    selectedDate={selectedDate}
                    onDateSelect={handleDateSelect}
                  />
                </TabsContent>
                
                <TabsContent value="month" className="mt-0">
                  <MeetingCalendar 
                    view="month" 
                    selectedDate={selectedDate}
                    onDateSelect={handleDateSelect}
                  />
                </TabsContent>
              </div>

              {/* Meeting List Sidebar */}
              <div className="lg:col-span-1">
                <MeetingList selectedDate={selectedDate} />
              </div>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Add Meeting Dialog */}
      <AddMeetingDialog 
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onMeetingCreated={handleMeetingCreated}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default Index;
