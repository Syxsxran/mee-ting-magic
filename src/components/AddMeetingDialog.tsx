
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, MapPin, Users, Video, X, Plus, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface AddMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMeetingCreated: () => void;
  selectedDate: Date;
}

export const AddMeetingDialog = ({ open, onOpenChange, onMeetingCreated, selectedDate }: AddMeetingDialogProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: selectedDate,
    startTime: "",
    endTime: "",
    room: "",
    type: "",
    isOnline: false,
    attendees: [] as string[],
    newAttendee: ""
  });

  const [conflicts, setConflicts] = useState<string[]>([]);
  const { toast } = useToast();

  const rooms = [
    "ห้องประชุม A",
    "ห้องประชุม B", 
    "ห้องประชุม C",
    "ห้องใหญ่",
    "ห้อง Executive",
    "ห้องสร้างสรรค์"
  ];

  const meetingTypes = [
    { value: "client", label: "ประชุมลูกค้า" },
    { value: "internal", label: "ประชุมภายใน" },
    { value: "team", label: "ประชุมทีม" },
    { value: "planning", label: "ประชุมวางแผน" }
  ];

  const checkConflicts = (startTime: string, endTime: string, room: string) => {
    // Simulate conflict checking
    const conflictList = [];
    if (startTime === "14:00" && room === "ห้องประชุม A") {
      conflictList.push("ห้องประชุม A ถูกจองไว้แล้วในช่วงเวลา 14:00-15:00");
    }
    if (startTime === "09:00" && room === "ห้องประชุม B") {
      conflictList.push("มีการประชุมอื่นในช่วงเวลาเดียวกัน");
    }
    setConflicts(conflictList);
  };

  const handleTimeChange = (field: "startTime" | "endTime", value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    
    if (newFormData.startTime && newFormData.endTime && newFormData.room) {
      checkConflicts(newFormData.startTime, newFormData.endTime, newFormData.room);
    }
  };

  const handleRoomChange = (room: string) => {
    const newFormData = { ...formData, room };
    setFormData(newFormData);
    
    if (newFormData.startTime && newFormData.endTime) {
      checkConflicts(newFormData.startTime, newFormData.endTime, room);
    }
  };

  const addAttendee = () => {
    if (formData.newAttendee.trim()) {
      setFormData({
        ...formData,
        attendees: [...formData.attendees, formData.newAttendee.trim()],
        newAttendee: ""
      });
    }
  };

  const removeAttendee = (index: number) => {
    setFormData({
      ...formData,
      attendees: formData.attendees.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.startTime || !formData.endTime) {
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน",
        variant: "destructive"
      });
      return;
    }

    if (conflicts.length > 0) {
      toast({
        title: "พบข้อขัดแย้ง",
        description: "กรุณาแก้ไขข้อขัดแย้งก่อนสร้างการประชุม",
        variant: "destructive"
      });
      return;
    }

    console.log("Creating meeting:", formData);
    onMeetingCreated();
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      date: selectedDate,
      startTime: "",
      endTime: "",
      room: "",
      type: "",
      isOnline: false,
      attendees: [],
      newAttendee: ""
    });
    setConflicts([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">สร้างการประชุมใหม่</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">หัวข้อการประชุม *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="ระบุหัวข้อการประชุม"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">รายละเอียด</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="รายละเอียดการประชุม (ไม่บังคับ)"
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label>ประเภทการประชุม</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="เลือกประเภทการประชุม" />
                </SelectTrigger>
                <SelectContent>
                  {meetingTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date & Time */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>วันที่ *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full mt-1 justify-start text-left font-normal",
                        !formData.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? (
                        formData.date.toLocaleDateString('th-TH')
                      ) : (
                        "เลือกวันที่"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => date && setFormData({ ...formData, date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="startTime">เวลาเริ่ม *</Label>
                <div className="relative mt-1">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => handleTimeChange("startTime", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="endTime">เวลาสิ้นสุด *</Label>
                <div className="relative mt-1">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleTimeChange("endTime", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <div>
              <Label>ห้องประชุม</Label>
              <Select value={formData.room} onValueChange={handleRoomChange}>
                <SelectTrigger className="mt-1">
                  <MapPin className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="เลือกห้องประชุม" />
                </SelectTrigger>
                <SelectContent>
                  {rooms.map((room) => (
                    <SelectItem key={room} value={room}>
                      {room}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isOnline"
                checked={formData.isOnline}
                onChange={(e) => setFormData({ ...formData, isOnline: e.target.checked })}
                className="rounded border-gray-300"
              />
              <Label htmlFor="isOnline" className="flex items-center">
                <Video className="mr-2 h-4 w-4" />
                ประชุมออนไลน์
              </Label>
            </div>
          </div>

          {/* Attendees */}
          <div className="space-y-4">
            <Label>ผู้เข้าร่วมประชุม</Label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  value={formData.newAttendee}
                  onChange={(e) => setFormData({ ...formData, newAttendee: e.target.value })}
                  placeholder="ชื่อผู้เข้าร่วม"
                  className="pl-10"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAttendee())}
                />
              </div>
              <Button type="button" onClick={addAttendee} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {formData.attendees.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.attendees.map((attendee, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                    <span>{attendee}</span>
                    <button
                      type="button"
                      onClick={() => removeAttendee(index)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Conflicts Warning */}
          {conflicts.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-800">พบข้อขัดแย้ง</h4>
                  <ul className="mt-1 text-sm text-red-700 list-disc list-inside">
                    {conflicts.map((conflict, index) => (
                      <li key={index}>{conflict}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              ยกเลิก
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={conflicts.length > 0}
            >
              สร้างการประชุม
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
