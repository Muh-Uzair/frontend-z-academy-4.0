import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Book } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EnrollmentType } from "@/types/enrollments-types";
// import { EnrollmentType } from "@/features/DashboardStudentPrivateChat/DashboardStudentPrivateChat";

// Reusable Enrollment Card Component
export default function EnrollmentCard({
  enrollment,
  cardButtonContent,
}: {
  enrollment: EnrollmentType;

  cardButtonContent: React.ReactNode;
}) {
  const course = enrollment.course;
  const instructor = enrollment.instructor;
  const student = enrollment.student;

  return (
    <Card
      
      className="overflow-hidden group hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-primary/30 p-5"
    >
      {/* Thumbnail section with overlay badges */}
      <AspectRatio
        ratio={16 / 9}
        className="bg-stone-100 flex justify-center items-center rounded-xl"
      >
        <Book size={60} className="text-stone-400" />
      </AspectRatio>{" "}
      {/* Card content */}
      <div className="flex flex-col gap-4 mt-5">
        {/* Course title */}
        <h3 className="font-semibold text-lg leading-tight line-clamp-2 min-h-10">
          {course.title}
        </h3>

        {/* Instructor info */}
        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7 border border-border">
            <AvatarImage src={""} />{" "}
            {/* Add instructor avatar URL if available */}
            <AvatarFallback className="text-xs">
              {instructor.fullName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground font-medium">
            {instructor.fullName} ( Instructor )
          </span>
        </div>

        {/* Instructor info */}
        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7 border border-border">
            <AvatarImage src={""} />{" "}
            {/* Add instructor avatar URL if available */}
            <AvatarFallback className="text-xs">
              {student.fullName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground font-medium">
            {student.fullName} ( Student )
          </span>
        </div>

        {/* Payment and pricing info */}
        <div className="flex items-center justify-between text-sm ">
          <div className="flex items-center gap-8">
            <span className="font-medium">Paid: ${enrollment.amountPaid}</span>
            <span className="font-medium">
              Original Amount : ${enrollment.originalPrice}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-2">{cardButtonContent}</div>
      </div>
    </Card>
  );
}
