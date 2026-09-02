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

      <div className="grid gap-4 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4">

        <DashboardStats
          title="Pending Issues"
          value={data?.pending ?? 0}
          icon={FaClipboardList}
          color="hover:shadow-[0_20px_55px_rgba(245,158,11,0.18)]"
          to="/officer/pending"
        />

        <DashboardStats
          title="Assigned"
          value={data?.assigned ?? 0}
          icon={FaTasks}
          color="hover:shadow-[0_20px_55px_rgba(37,99,235,0.18)]"
          to="/officer/assigned"
        />

        <DashboardStats
          title="In Progress"
          value={data?.inProgress ?? 0}
          icon={FaTools}
          color="hover:shadow-[0_20px_55px_rgba(14,165,233,0.18)]"
          to="/officer/in-progress"
        />

        <DashboardStats
          title="Resolved"
          value={data?.resolved ?? 0}
          icon={FaCheckCircle}
          color="hover:shadow-[0_20px_55px_rgba(16,185,129,0.18)]"
          to="/officer/resolved"
        />

      </div>

    </PageLayout>
  );
};

export default OfficerDashboard;
