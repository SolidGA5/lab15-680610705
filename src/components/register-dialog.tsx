import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { courses, CURRENT_STUDENT_ID, currentStudent, enrollments } from "@/lib/mock-data";
import type { Course, Enrollment } from "@/lib/types";

type cardProp = {
  onAdd: (todo: Enrollment) => void
}

export function RegisterDialog({ onAdd }: cardProp) {
  const [open, setOpen] = useState(false); // true = แสดง Dialog
  const [courseId, setCourseId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [time, setTime] = useState("");
  const [unEnrolled, setUnErolled] = useState<Course[]>(findUnEnrolled())
  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault(); // ไม่ให้หน้าเว็บ reload
    const [id] = courseId.split(" - ");
    const newEnrollment: Enrollment = {
      courseId: id,
      studentId: CURRENT_STUDENT_ID,
      enrolledAt: time
    };
    onAdd(newEnrollment)
    setCourseId(""); // เคลียร์ฟอร์ม
    setOpen(false); // ปิด Dialog
  }

  function updateOnDelete() {
    setUnErolled(findUnEnrolled())
  }


  function findUnEnrolled() {
    const student = enrollments.filter(e => e.studentId == CURRENT_STUDENT_ID)
    return courses.filter(c => student.findIndex(s => s.courseId == c.courseId) == -1)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* ปุ่มที่กดแล้วเปิด Dialog */}
      <DialogTrigger>
        <Button>ลงทะเบียน</Button>
      </DialogTrigger>

      {/* ฟอร์มที่แสดงออกมาเมื่อกดปุ่ม */}
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนรายวิชา</DialogTitle>
            <DialogDescription>กรอกข้อมูลเพื่อลงทะเบียน</DialogDescription>
          </DialogHeader>
          <div>
            <Select onValueChange={setCourseId} onOpenChange={updateOnDelete}>
              <SelectTrigger className="w-full">
                <SelectValue className="w-0" placeholder="เลือกวิชา" >
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="h-auto">
                <SelectGroup>
                  {unEnrolled.map(c => (
                    <SelectItem
                      key={c.courseId}
                      value={c.courseId + " - " + c.courseTitle}
                    >
                      <span className="whitespace-normal">{c.courseId + " - " + c.courseTitle}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentId">เวลา</Label>
            <Input id="studentId" value={Date.now.toString()} placeholder="เช่น 650610002" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">ชื่อ-นามสกุล</Label>
            <Input id="fullName" value={currentStudent.firstName + " " + currentStudent.lastName} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseId">โปรแกรม</Label>
            <Input id="courseId" value={currentStudent.program} />
          </div>

          <DialogFooter>
            <Button type="submit" onClick={() => handleSubmit}>ยืนยัน</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog >
  );
}
