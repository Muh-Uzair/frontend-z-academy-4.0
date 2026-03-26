import LoadingScreen from "@/components/ui/LoadingScreen";
import DashboardStudentPublicChat from "@/features/DashboardStudentPublicChat/DashboardStudentPublicChat";
import { getAllEnrollments } from "@/services/getAllEnrollments";
import { Suspense } from "react";

const DashboardStudentPublicChatPage = () => {
  const resGetAllEnrollments = getAllEnrollments();

  return (
    <Suspense fallback={<LoadingScreen />}>
      <DashboardStudentPublicChat resGetAllEnrollments={resGetAllEnrollments} />
    </Suspense>
  );
};

export default DashboardStudentPublicChatPage;
