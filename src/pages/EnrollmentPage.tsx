import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import {
  courses,
  CURRENT_STUDENT_ID,
  currentStudent,
  enrollments,
} from "@/lib/mock-data";
import type { Enrollment } from "@/lib/types";
import { useState } from "react";
//import type { Course } from "@/lib/types";
//import { useState } from "react";

export default function Enrollent() {
  const temp = enrollments.filter((e) => e.studentId == CURRENT_STUDENT_ID);
  const [list, setCourse] = useState<Enrollment[]>(temp);
  function handleAdd(course: Enrollment) {
    enrollments.push(course);
    setCourse(enrollments.filter((e) => e.studentId == CURRENT_STUDENT_ID));
  }
  function handleDelete(courseId: string) {
    setCourse(list.filter((c) => c.courseId != courseId));
    const index = enrollments.findIndex(
      (e) => e.courseId == courseId && e.studentId == CURRENT_STUDENT_ID,
    );
    enrollments.splice(index, 1);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">รายวิชาทั้งหมด</h1>
          <div className="text-sm text-muted-foreground">
            {currentStudent.firstName + " " + currentStudent.lastName} (
            {CURRENT_STUDENT_ID})
          </div>
        </div>
        <RegisterDialog onAdd={handleAdd} />
      </div>

      <div className="flex flex-col gap-4">
        {courses.map((course) => (
          <CourseCard
            key={course.courseId}
            course={course}
            student={currentStudent}
            enrolled={
              list.findIndex((e) => course.courseId == e.courseId) != -1
            }
            enrolledAt={
              list.find((e) => course.courseId == e.courseId)?.enrolledAt
            }
            deleteCourse={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
