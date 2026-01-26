"use client";

// components/dashboard-instructor-enrollments.tsx
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
  DollarSign,
  Eye,
  MoreHorizontal,
  RefreshCw,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Fake data generators for variety
const studentNames = [
  "Ahmed Khan",
  "Sara Ahmed",
  "Ali Raza",
  "Fatima Noor",
  "Hassan Ali",
  "Ayesha Siddiqui",
  "Bilal Malik",
  "Zainab Fatima",
  "Omar Farooq",
  "Maryam Khan",
  "Usman Tariq",
  "Sana Javed",
  "Hamza Rehman",
];
const courseTitles = [
  "React & TypeScript Masterclass 2025",
  "Next.js 15 Full-Stack Development",
  "Flutter Mobile App Development Zero to Hero",
  "UI/UX Design Fundamentals",
  "DevOps with Docker, Kubernetes & AWS",
  "Project Management Professional (PMP) Prep",
  "Advanced JavaScript & ES2025",
];
const statuses = ["active", "completed", "dropped"] as const;
const paymentStatuses = ["paid", "pending", "refunded"] as const;

// Generate exactly 13 dummy enrollments
const dummyEnrollments = Array.from({ length: 13 }, (_, i) => {
  const studentName = studentNames[i % studentNames.length];
  const courseTitle = courseTitles[i % courseTitles.length];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const randomPayment =
    paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)];
  const randomAmount =
    randomPayment === "paid" || randomPayment === "refunded"
      ? Math.floor(Math.random() * 4000) + 500 // 500-4500 PKR
      : 0;
  const randomDate = new Date();
  randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 180)); // last 6 months ke andar

  return {
    _id: `enroll${i + 1}`,
    studentName,
    courseTitle,
    instructorName: "Muhammad Instructor", // fixed for this dashboard
    enrollmentDate: randomDate,
    status: randomStatus,
    paymentStatus: randomPayment,
    amountPaid: randomAmount,
    originalPrice: randomAmount + Math.floor(Math.random() * 1000), // slight variation
  };
});

export default function DashboardInstructorEnrollments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 5 per page since only 13 items (better for demo)

  // Client-side filtering
  const filteredEnrollments = dummyEnrollments.filter((enroll) => {
    const matchesSearch =
      enroll.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enroll.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || enroll.status === statusFilter;
    const matchesPayment =
      paymentFilter === "all" || enroll.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Pagination
  const totalPages = Math.ceil(filteredEnrollments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEnrollments = filteredEnrollments.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>My Enrollments</CardTitle>
            <CardDescription>
              View and manage student enrollments in your courses
            </CardDescription>
          </div>
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
        </CardHeader>

        <CardContent>
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search by student or course..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="dropped">Dropped</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={paymentFilter}
              onValueChange={(value) => {
                setPaymentFilter(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Enrolled On</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Amount Paid</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedEnrollments.map((enroll) => (
                  <TableRow key={enroll._id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {enroll.studentName}
                      </div>
                    </TableCell>
                    <TableCell>{enroll.courseTitle}</TableCell>
                    <TableCell>
                      {enroll.enrollmentDate.toLocaleDateString("en-PK", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          enroll.status === "active"
                            ? "default"
                            : enroll.status === "completed"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {enroll.status.charAt(0).toUpperCase() +
                          enroll.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          enroll.paymentStatus === "paid"
                            ? "default"
                            : enroll.paymentStatus === "pending"
                              ? "outline"
                              : "destructive"
                        }
                      >
                        {enroll.paymentStatus.charAt(0).toUpperCase() +
                          enroll.paymentStatus.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {enroll.paymentStatus === "paid" ||
                      enroll.paymentStatus === "refunded" ? (
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {enroll.amountPaid.toLocaleString()} PKR
                        </div>
                      ) : (
                        "-"
                      )}
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
                            View Details
                          </DropdownMenuItem>
                          {enroll.paymentStatus === "paid" && (
                            <DropdownMenuItem className="text-destructive">
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Issue Refund
                            </DropdownMenuItem>
                          )}
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
                {Math.min(
                  startIndex + itemsPerPage,
                  filteredEnrollments.length,
                )}{" "}
                of {filteredEnrollments.length} enrollments
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
