import type { Course, Student } from "@/lib/types";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
type CourseCardProps = {
  course: Course;
  student: Student;
  enrolledAt?: string;
  enrolled: boolean;
  deleteCourse: (todo: string) => void;
};

export function CourseCard({
  course,
  student,
  enrolledAt,
  enrolled,
  deleteCourse,
}: CourseCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{course.courseTitle}</CardTitle>
        <CardAction>
          <div
            data-slot="card-action"
            className="col-start-2 row-span-2 row-start-1 self-start justify-self-end"
          >
            {enrolled ? (
              <Badge
                className="bg-amber-500/15 text-amber-700  dark:text-purple-700"
                variant="destructive"
              >
                ลงทะเบียนแล้ว
              </Badge>
            ) : (
              <Badge
                className="bg-purple-500/15 text-purple-700 dark:bg-amber-500/15 dark:text-amber-400"
                variant="destructive"
              >
                เปิดรับ
              </Badge>
            )}
          </div>
        </CardAction>
        <CardDescription>
          รหัสวิชา: {course.courseId} · ผู้สอน: {course.instructors.join(", ")}
        </CardDescription>
      </CardHeader>
      {enrolled && (
        <CardContent className="flex items-end justify-between">
          <div className="text-xs text-muted-foreground">
            <p>
              ชื่อ นศ.: {student.firstName} {student.lastName}
            </p>
            <p>โปรแกรม: {student.program}</p>
            <p>ลงทะเบียนเมื่อ: {enrolledAt}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteCourse(course.courseId)}
          >
            <Trash2 size={24} color="#ef4444" />
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
