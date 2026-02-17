import LoadingScreen from "@/components/ui/LoadingScreen";
import DashboardStudentEnrollments from "@/features/DashboardStudentEnrollments/DashboardStudentEnrollments";
import React, { Suspense } from "react";

const DashboardStudentEnrollmentsPage = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      {" "}
      <DashboardStudentEnrollments />{" "}
    </Suspense>
  );
};

export default DashboardStudentEnrollmentsPage;
