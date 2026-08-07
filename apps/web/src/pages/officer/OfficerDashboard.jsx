import { useQuery } from "@tanstack/react-query";
import {
  FaClipboardList,
  FaTasks,
  FaTools,
  FaCheckCircle,
} from "react-icons/fa";

import officerService from "../../services/officer.service";

import Loader from "../../components/common/Loader";
import DashboardStats from "../../components/officer/DashboardStats";

import PageLayout from "../../components/ui/PageLayout";
import PageHeader from "../../components/ui/PageHeader";

const OfficerDashboard = () => {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["officer-dashboard"],

    queryFn: async () => {
      const response =
        await officerService.getDashboard();

      return response.data.data;
    },
  });

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <PageLayout>
        <div className="alert alert-error shadow-lg">
          Failed to load dashboard.
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>

      <PageHeader
        title="Officer Dashboard"
        subtitle="Manage assigned issues, track ongoing work, and resolve public complaints efficiently."
      />

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

        <DashboardStats
          title="Pending Issues"
          value={data.pending}
          icon={FaClipboardList}
          color="hover:shadow-[0_0_35px_rgba(245,158,11,0.45)]"
          to="/officer/pending"
        />

        <DashboardStats
          title="Assigned"
          value={data.assigned}
          icon={FaTasks}
          color="hover:shadow-[0_0_35px_rgba(59,130,246,0.45)]"
          to="/officer/assigned"
        />

        <DashboardStats
          title="In Progress"
          value={data.inProgress}
          icon={FaTools}
          color="hover:shadow-[0_0_35px_rgba(249,115,22,0.45)]"
          to="/officer/in-progress"
        />

        <DashboardStats
          title="Resolved"
          value={data.resolved}
          icon={FaCheckCircle}
          color="hover:shadow-[0_0_35px_rgba(34,197,94,0.45)]"
          to="/officer/resolved"
        />

      </div>

    </PageLayout>
  );
};

export default OfficerDashboard;