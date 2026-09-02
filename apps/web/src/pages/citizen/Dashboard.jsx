import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  FaCheckCircle,
  FaClipboardList,
  FaEnvelope,
  FaExclamationCircle,
  FaPhoneAlt,
  FaSpinner,
  FaTasks,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";
import Navbar from "../../components/common/Navbar";
import StatusBadge from "../../components/issue/StatusBadge";
import issueService from "../../services/issue.service";

const Dashboard = () => {
  const { user } = useAuth();

  const { data: issues = [] } = useQuery({
    queryKey: ["myIssues"],
    queryFn: async () => {
      const response = await issueService.getMyIssues();

      return response.data.data;
    },
  });

  const statusCounts = issues.reduce(
    (counts, issue) => ({
      ...counts,
      [issue.status]: (counts[issue.status] || 0) + 1,
    }),
    {}
  );

  const stats = [
    {
      label: "Total Issues",
      value: issues.length,
      icon: FaClipboardList,
      color: "bg-indigo-600",
    },
    {
      label: "Pending",
      value: statusCounts.Pending || 0,
      icon: FaExclamationCircle,
      color: "bg-amber-500",
    },
    {
      label: "In Progress",
      value: statusCounts["In Progress"] || 0,
      icon: FaSpinner,
      color: "bg-sky-600",
    },
    {
      label: "Resolved",
      value: statusCounts.Resolved || 0,
      icon: FaCheckCircle,
      color: "bg-emerald-600",
    },
  ];

  const recentIssues = [...issues]
    .sort(
      (firstIssue, secondIssue) =>
        new Date(secondIssue.created_at) -
        new Date(firstIssue.created_at)
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-950">

      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10">

        <section className="rounded-lg border border-white/80 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:p-7">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <p className="mb-2 text-sm font-semibold text-slate-500">
                Welcome back
              </p>
              <h2 className="text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">
                Welcome, {user?.first_name ?? "citizen"}
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                See your complaint activity, recent submissions, and current resolution progress at a glance.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[390px]">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
                  <FaEnvelope />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  Email
                </p>
                <p className="mt-1 break-words text-sm font-semibold text-slate-900">
                  {user?.email ?? "not available"}
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white">
                  <FaPhoneAlt />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  Phone
                </p>
                <p className="mt-1 break-words text-sm font-semibold text-slate-900">
                  {user?.phone ?? "not available"}
                </p>
              </div>
            </div>

          </div>

        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.07)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      {stat.label}
                    </p>
                    <p className="mt-3 text-4xl font-black tracking-normal text-slate-950">
                      {stat.value}
                    </p>
                  </div>

                  <div className={`flex h-11 w-11 items-center justify-center rounded-lg text-white ${stat.color}`}>
                    <Icon size={19} />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.07)] sm:p-6">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-600">
                  Recent Activity
                </p>
                <h3 className="mt-2 text-2xl font-black tracking-normal">
                  Latest Issues
                </h3>
              </div>

              <Link
                to="/my-issues"
                className="btn min-h-10 rounded-lg border border-slate-300 bg-white px-4 text-slate-950 hover:border-indigo-500 hover:bg-indigo-50"
              >
                View All
              </Link>
            </div>

            {recentIssues.length > 0 ? (
              <div className="divide-y divide-slate-200">
                {recentIssues.map((issue) => (
                  <Link
                    key={issue.id}
                    to={`/issues/${issue.id}`}
                    className="flex flex-col gap-3 py-4 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <h4 className="truncate text-base font-black tracking-normal text-slate-950">
                        {issue.title}
                      </h4>
                      <p className="mt-1 text-sm text-slate-500">
                        {issue.village} - {new Date(issue.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <StatusBadge status={issue.status} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-sm font-semibold text-slate-500">
                No issues reported yet.
              </div>
            )}
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.07)] sm:p-6">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-950 text-white">
              <FaTasks size={20} />
            </div>

            <h3 className="text-2xl font-black tracking-normal">
              Complaint Status
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Use the navigation above to create reports, review submitted issues, or update your profile.
            </p>

            <div className="mt-6 space-y-3">
              {["Pending", "Assigned", "In Progress", "Resolved"].map(
                (status) => (
                  <div
                    key={status}
                    className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3"
                  >
                    <span className="text-sm font-bold text-slate-600">
                      {status}
                    </span>
                    <span className="text-lg font-black text-slate-950">
                      {statusCounts[status] || 0}
                    </span>
                  </div>
                )
              )}
            </div>

          </div>

        </section>

      </main>

    </div>
  );
};

export default Dashboard; 
