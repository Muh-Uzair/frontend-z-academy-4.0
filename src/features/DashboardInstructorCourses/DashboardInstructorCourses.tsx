// components/dashboard-instructor-courses.tsx
"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateUpdateCourseDialog from "./CreateUpdateCourseDialog";

// Dummy data based on your Course schema
const dummyCourses = [
  {
    _id: "course1",
    title: "React & TypeScript Masterclass 2025",
    description:
      "Complete guide to building modern web apps with React 19 and TypeScript",
    instructor: "someUserId",
    price: 2499,
    level: "intermediate",
    thumbnail: "https://example.com/react-ts.jpg",
    category: "Web Development",
    createdAt: new Date("2025-10-15"),
    updatedAt: new Date("2025-12-20"),
  },
  {
    _id: "course2",
    title: "Next.js 15 Full-Stack Development",
    description:
      "Learn App Router, Server Components, Authentication & Deployment",
    instructor: "someUserId",
    price: 0,
    level: "advanced",
    thumbnail: "https://example.com/nextjs.jpg",
    category: "Web Development",
    createdAt: new Date("2025-08-10"),
    updatedAt: new Date("2025-11-05"),
  },
  {
    _id: "course3",
    title: "Flutter Mobile App Development Zero to Hero",
    description: "Build beautiful cross-platform apps for iOS and Android",
    instructor: "someUserId",
    price: 1999,
    level: "beginner",
    thumbnail: "https://example.com/flutter.jpg",
    category: "Mobile Development",
    createdAt: new Date("2025-06-22"),
    updatedAt: new Date("2025-09-30"),
  },
  {
    _id: "course4",
    title: "UI/UX Design Fundamentals",
    description: "Learn Figma, user research, wireframing and prototyping",
    instructor: "someUserId",
    price: 1499,
    level: "beginner",
    thumbnail: "https://example.com/uiux.jpg",
    category: "UI/UX Design",
    createdAt: new Date("2025-11-01"),
    updatedAt: new Date("2026-01-10"),
  },
  {
    _id: "course5",
    title: "DevOps with Docker, Kubernetes & AWS",
    description: "Master containerization, orchestration and cloud deployment",
    instructor: "someUserId",
    price: 3499,
    level: "advanced",
    thumbnail: "https://example.com/devops.jpg",
    category: "DevOps",
    createdAt: new Date("2025-03-15"),
    updatedAt: new Date("2025-07-20"),
  },
  {
    _id: "course6",
    title: "Project Management Professional (PMP) Prep",
    description: "Complete preparation course for PMP certification",
    instructor: "someUserId",
    price: 0,
    level: "intermediate",
    thumbnail: "https://example.com/pmp.jpg",
    category: "Project Management",
    createdAt: new Date("2025-12-05"),
    updatedAt: new Date("2026-01-25"),
  },
  {
    _id: "course7",
    title: "Node.js & Express API Development",
    description: "Build scalable REST APIs with Node.js, Express & MongoDB",
    instructor: "someUserId",
    price: 1799,
    level: "intermediate",
    thumbnail: "https://example.com/node-express.jpg",
    category: "Backend Development",
    createdAt: new Date("2025-07-18"),
    updatedAt: new Date("2025-10-12"),
  },
  {
    _id: "course8",
    title: "MongoDB & Mongoose Deep Dive",
    description: "Master schema design, aggregation pipelines and performance",
    instructor: "someUserId",
    price: 1299,
    level: "intermediate",
    thumbnail: "https://example.com/mongodb.jpg",
    category: "Databases",
    createdAt: new Date("2025-05-10"),
    updatedAt: new Date("2025-08-01"),
  },
  {
    _id: "course9",
    title: "Python for Data Science & Machine Learning",
    description: "Learn NumPy, Pandas, Scikit-Learn and real-world ML projects",
    instructor: "someUserId",
    price: 2999,
    level: "beginner",
    thumbnail: "https://example.com/python-ml.jpg",
    category: "Data Science",
    createdAt: new Date("2025-04-05"),
    updatedAt: new Date("2025-09-15"),
  },
  {
    _id: "course10",
    title: "Cybersecurity Essentials",
    description: "Learn ethical hacking, network security and best practices",
    instructor: "someUserId",
    price: 1899,
    level: "beginner",
    thumbnail: "https://example.com/cybersecurity.jpg",
    category: "Cybersecurity",
    createdAt: new Date("2025-09-01"),
    updatedAt: new Date("2025-12-10"),
  },
  {
    _id: "course11",
    title: "AWS Cloud Practitioner Certification",
    description: "Prepare for AWS Cloud Practitioner with hands-on labs",
    instructor: "someUserId",
    price: 1599,
    level: "beginner",
    thumbnail: "https://example.com/aws-cloud.jpg",
    category: "Cloud Computing",
    createdAt: new Date("2025-10-20"),
    updatedAt: new Date("2026-01-05"),
  },
  {
    _id: "course12",
    title: "Agile & Scrum for Software Teams",
    description: "Master Agile principles, Scrum ceremonies and team workflows",
    instructor: "someUserId",
    price: 999,
    level: "beginner",
    thumbnail: "https://example.com/agile-scrum.jpg",
    category: "Project Management",
    createdAt: new Date("2025-06-01"),
    updatedAt: new Date("2025-09-10"),
  },
  {
    _id: "course13",
    title: "System Design for Backend Engineers",
    description: "Learn to design scalable, fault-tolerant distributed systems",
    instructor: "someUserId",
    price: 3999,
    level: "advanced",
    thumbnail: "https://example.com/system-design.jpg",
    category: "Software Architecture",
    createdAt: new Date("2025-11-20"),
    updatedAt: new Date("2026-01-15"),
  },
];

export default function DashboardInstructorCourses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [open, setOpen] = useState(false);

  // Simple client-side filtering
  const filteredCourses = dummyCourses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === "all" || course.level === levelFilter;
    const matchesCategory =
      categoryFilter === "all" || course.category === categoryFilter;

    return matchesSearch && matchesLevel && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>My Courses</CardTitle>
            <CardDescription>
              Manage and view all your created courses
            </CardDescription>
          </div>

          {/* Dialog Trigger Button */}
          <CreateUpdateCourseDialog open={open} setOpen={setOpen} />
        </CardHeader>

        <CardContent>
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search by course title..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <Select
              value={levelFilter}
              onValueChange={(value) => {
                setLevelFilter(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={categoryFilter}
              onValueChange={(value) => {
                setCategoryFilter(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Web Development">Web Development</SelectItem>
                <SelectItem value="Mobile Development">
                  Mobile Development
                </SelectItem>
                <SelectItem value="Project Management">
                  Project Management
                </SelectItem>
                <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                <SelectItem value="DevOps">DevOps</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-primary rounded-tl-md text-white">
                    Title
                  </TableHead>
                  <TableHead className="bg-primary  text-white">
                    Category
                  </TableHead>
                  <TableHead className="bg-primary  text-white">
                    Level
                  </TableHead>
                  <TableHead className="bg-primary  text-white">
                    Price
                  </TableHead>
                  <TableHead className="bg-primary  text-white">
                    Created
                  </TableHead>
                  <TableHead className="text-right bg-primary  text-white rounded-tr-md">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCourses.map((course) => (
                  <TableRow key={course._id}>
                    <TableCell className="font-medium">
                      {course.title}
                    </TableCell>
                    <TableCell>{course.category}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{course.level}</Badge>
                    </TableCell>
                    <TableCell>
                      {course.price === 0 ? (
                        <Badge variant="secondary">Free</Badge>
                      ) : (
                        `Rs. ${course.price.toLocaleString()}`
                      )}
                    </TableCell>
                    <TableCell>
                      {course.createdAt.toLocaleDateString("en-PK", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, filteredCourses.length)} of{" "}
                {filteredCourses.length} courses
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
