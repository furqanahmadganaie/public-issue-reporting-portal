import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClipboardList,
  FaClock,
  FaExclamationCircle,
  FaSearch,
  FaTasks,
  FaTimesCircle,
} from "react-icons/fa";

import issueService from "../../services/issue.service";

import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import IssueCard from "../../components/issue/IssueCard";
import Navbar from "../../components/common/Navbar";

const ITEMS_PER_PAGE = 3;

const filters = [
  {
    label: "All Issues",
    value: "All",
    icon: FaClipboardList,
  },
  {
    label: "Pending",
    value: "Pending",
    icon: FaClock,
  },
  {
    label: "Assigned",
    value: "Assigned",
    icon: FaTasks,
  },
  {
    label: "In Progress",
    value: "In Progress",
    icon: FaExclamationCircle,
  },
  {
    label: "Resolved",
    value: "Resolved",
    icon: FaCheckCircle,
  },
  {
    label: "Rejected",
    value: "Rejected",
    icon: FaTimesCircle,
  },
];

const MyIssues = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myIssues"],
    queryFn: async () => {
      const response =
        await issueService.getMyIssues();

      return response.data.data;
    },
  });

  const issues = useMemo(() => data || [], [data]);

  const visibleIssues = useMemo(() => {
    const filteredIssues =
      activeFilter === "All"
        ? issues
        : issues.filter(
            (issue) => issue.status === activeFilter
          );

    return [...filteredIssues].sort(
      (firstIssue, secondIssue) => {
        const firstDate = new Date(firstIssue.created_at);
        const secondDate = new Date(secondIssue.created_at);

        return sortOrder === "latest"
          ? secondDate - firstDate
          : firstDate - secondDate;
      }
    );
  }, [activeFilter, issues, sortOrder]);

  const totalPages = Math.max(
    1,
    Math.ceil(visibleIssues.length / ITEMS_PER_PAGE)
  );

  const safePage = Math.min(currentPage, totalPages);
  const firstItemIndex =
    visibleIssues.length === 0
      ? 0
      : (safePage - 1) * ITEMS_PER_PAGE + 1;
  const lastItemIndex = Math.min(
    safePage * ITEMS_PER_PAGE,
    visibleIssues.length
  );

  const currentIssues = visibleIssues.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const changeFilter = (value) => {
    setActiveFilter(value);
    setCurrentPage(1);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#f5f7fb] text-slate-950">
        <Navbar />
        <div className="mx-auto max-w-xl px-4 py-10">
          <div className="alert alert-error">
            <span>
              {error.response?.data?.message ||
                "Something went wrong."}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (issues.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5f7fb] text-slate-950">
        <Navbar />
        <div className="mx-auto max-w-6xl px-4 py-10">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-950">

      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10">

        <div className="mb-6 overflow-hidden rounded-lg border border-indigo-100 bg-gradient-to-r from-white via-indigo-50 to-white p-5 shadow-[0_18px_60px_rgba(79,70,229,0.08)] sm:p-7">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px_160px] lg:items-center">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-indigo-600">
              Issue History
            </p>
            <h1 className="text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">
              My Issues
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Track every complaint you submitted and open any issue to view full details.
            </p>
          </div>

            <div className="hidden items-center justify-center lg:flex">
              <div className="relative h-32 w-56">
                <div className="absolute bottom-0 left-8 h-24 w-24 rounded-lg bg-indigo-100" />
                <div className="absolute left-20 top-0 h-28 w-20 rounded-lg border-4 border-indigo-300 bg-white shadow-lg" />
                <div className="absolute left-24 top-7 h-2 w-12 rounded bg-indigo-200" />
                <div className="absolute left-24 top-12 h-2 w-10 rounded bg-indigo-200" />
                <div className="absolute left-24 top-[68px] h-2 w-12 rounded bg-indigo-200" />
                <div className="absolute right-8 top-12 flex h-16 w-16 items-center justify-center rounded-full border-4 border-indigo-500 bg-white shadow-lg">
                  <FaSearch className="text-indigo-600" size={26} />
                </div>
              </div>
            </div>

            <div className="w-fit rounded-lg border border-indigo-100 bg-white/80 p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <FaClipboardList />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500">
                    Total Issues
                  </p>
                  <p className="text-2xl font-black tracking-normal text-indigo-700">
                    {issues.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => {
              const Icon = filter.icon;
              const isActive = activeFilter === filter.value;

              return (
                <button
                  key={filter.value}
                  type="button"
                  className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm font-bold transition ${
                    isActive
                      ? "border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                      : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-700"
                  }`}
                  onClick={() => changeFilter(filter.value)}
                >
                  <Icon size={14} />
                  {filter.label}
                </button>
              );
            })}
          </div>

          <div className="flex gap-3">
            <select
              className="select min-h-10 rounded-lg border-slate-200 bg-white text-sm font-bold text-slate-700 focus:border-indigo-500 focus:outline-none"
              value={sortOrder}
              onChange={(event) => {
                setSortOrder(event.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
            </select>

            <button
              type="button"
              className="btn min-h-10 rounded-lg border border-slate-200 bg-white px-4 text-slate-500 hover:border-indigo-300 hover:bg-indigo-50"
            >
              <FaCalendarAlt />
            </button>
          </div>
        </div>

        {currentIssues.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

          {currentIssues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
            />
          ))}

          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm font-semibold text-slate-500">
            No issues found for this filter.
          </div>
        )}

        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="btn btn-sm min-h-9 rounded-lg border border-slate-200 bg-white text-slate-500"
              disabled={safePage === 1}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(1, page - 1)
                )
              }
            >
              Prev
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                type="button"
                className={`btn btn-sm min-h-9 rounded-lg border px-4 ${
                  safePage === page
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-slate-200 bg-white text-slate-600"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              className="btn btn-sm min-h-9 rounded-lg border border-slate-200 bg-white text-slate-500"
              disabled={safePage === totalPages}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1)
                )
              }
            >
              Next
            </button>
          </div>

          <p className="text-xs font-semibold text-slate-500">
            Showing {firstItemIndex} to {lastItemIndex} of{" "}
            {visibleIssues.length} issues
          </p>
        </div>

      </main>

    </div>
  );
};

export default MyIssues;
