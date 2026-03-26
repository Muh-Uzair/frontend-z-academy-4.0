import LoadingScreen from "@/components/ui/LoadingScreen";
import DashboardStudentPrivateChat from "@/features/DashboardStudentPrivateChat/DashboardStudentPrivateChat";
import { getAllEnrollments } from "@/services/getAllEnrollments";
import React, { Suspense } from "react";

const DashboardStudentPrivateChatPage = () => {
  const resGetAllEnrollments = getAllEnrollments();

  return (
    <Suspense fallback={<LoadingScreen />}>
      <DashboardStudentPrivateChat
        resGetAllEnrollments={resGetAllEnrollments}
      />
    </Suspense>
  );
};

export default DashboardStudentPrivateChatPage;
