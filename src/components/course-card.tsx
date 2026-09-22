import type { Course, Enrollment, Student } from "@/lib/types";
import logo from "../assets/trash.svg"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
type CourseCardProps = {
  course: Course;
  student: Student;
  enrolledAt?: string;
  enrolled: boolean;
  deleteCourse: (todo: string) => void;
};



export function CourseCard({ course, student, enrolledAt, enrolled, deleteCourse }: CourseCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{course.courseTitle}</CardTitle>
        <CardAction>
          <div data-slot="card-action" className="col-start-2 row-span-2 row-start-1 self-start justify-self-end">
            {
              !enrolled ? <span data-slot="badge" data-variant="default" className="group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&amp;&gt;svg]:pointer-events-none [&amp;&gt;svg]:size-3! [a]:hover:bg-primary/80 bg-amber-500/15 text-purple-700  dark:text-amber-700">{enrolled ? "ลงทะเบียนแล้ว" : "เปิดรับ"}</span> :
                <span data-slot="badge" data-variant="default" className="group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&amp;&gt;svg]:pointer-events-none [&amp;&gt;svg]:size-3! [a]:hover:bg-primary/80 bg-amber-500/15 text-amber-700 dark:text-purple-700">{enrolled ? "ลงทะเบียนแล้ว" : "เปิดรับ"}</span>
            }
          </div>
        </CardAction>
        <CardDescription>
          รหัสวิชา: {course.courseId} · ผู้สอน: {course.instructors.join(", ")}
        </CardDescription>
      </CardHeader>{
        enrolled &&
        <CardContent className="flex items-end justify-between">
          <div className="text-xs text-muted-foreground">
            <p>
              ชื่อ นศ.: {student.firstName} {student.lastName}
            </p>
            <p>โปรแกรม: {student.program}</p>
            <p>ลงทะเบียนเมื่อ: {enrolledAt}</p>
          </div>
          <button type="button" onClick={() => deleteCourse(course.courseId)} ><img src={logo} /></button>
        </CardContent>

      }
    </Card >
  );
}
