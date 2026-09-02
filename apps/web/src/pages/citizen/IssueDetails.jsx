import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaCarSide,
  FaFlag,
  FaImage,
  FaInfoCircle,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

import issueService from "../../services/issue.service";

import Loader from "../../components/common/Loader";
import StatusBadge from "../../components/issue/StatusBadge";
import Map from "../../components/common/Map";
import ImageGallery from "../../components/issue/ImageGallery";
import Navbar from "../../components/common/Navbar";

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: issue,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["issue", id],
    queryFn: async () => {
      const response = await issueService.getIssueById(id);
      return response.data.data;
    },
  });

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className="min-h-screen bg-[#f5f7fb] text-slate-950">
        <Navbar />
        <div className="mx-auto max-w-xl px-4 py-10">
          <div className="alert alert-error">
            <span>
              {error.response?.data?.message ||
                "Failed to load issue."}
            </span>
          </div>
        </div>
      </div>
    );
  }

  const mapUrl = `https://www.google.com/maps?q=${issue.latitude},${issue.longitude}`;

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
        <button
          className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800"
          onClick={() => navigate("/my-issues")}
        >
          <FaArrowLeft size={12} />
          Back to My Issues
        </button>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:p-7">
          <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                <FaCarSide size={25} />
              </div>

              <div>
                <h1 className="text-2xl font-black tracking-normal text-slate-950 sm:text-3xl">
                  {issue.title}
                </h1>
                <p className="mt-1 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
                  <span>{issue.village}</span>
                  <span>-</span>
                  <span>
                    {new Date(issue.created_at).toLocaleDateString()}
                  </span>
                </p>
                <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <FaFlag className="text-slate-400" />
                  Priority: {issue.priority}
                </p>
              </div>
            </div>

            <div className="sm:self-start">
              <StatusBadge status={issue.status} />
            </div>
          </div>

          <div className="border-b border-slate-200 py-6">
            <div className="mb-3 flex items-center gap-3">
              <FaInfoCircle className="text-indigo-600" />
              <h2 className="text-lg font-black tracking-normal">
                Description
              </h2>
            </div>

            <p className="max-w-3xl text-sm leading-7 text-slate-700">
              {issue.description || "No description provided."}
            </p>
          </div>

          <div className="border-b border-slate-200 py-6">
            <div className="mb-4 flex items-center gap-3">
              <FaMapMarkerAlt className="text-indigo-600" />
              <h2 className="text-lg font-black tracking-normal">
                Location
              </h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr] lg:items-center">
              <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-2">
                <Map
                  latitude={issue.latitude}
                  longitude={issue.longitude}
                  className="h-44 sm:h-52"
                />
              </div>

              <div className="rounded-lg bg-indigo-50 p-4">
                <div className="flex items-start gap-3">
                  <FaMapMarkedAlt className="mt-1 shrink-0 text-indigo-600" />
                  <div>
                    <p className="text-sm font-black text-slate-950">
                      {issue.village}
                    </p>
                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800"
                    >
                      Open in Maps
                      <FaArrowLeft className="rotate-180" size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-slate-200 py-6">
            <div className="mb-3 flex items-center gap-3">
              <FaCalendarAlt className="text-indigo-600" />
              <h2 className="text-lg font-black tracking-normal">
                Address
              </h2>
            </div>

            <p className="max-w-4xl text-sm leading-7 text-slate-700">
              {issue.address}
            </p>
          </div>

          <div className="pt-6">
            <div className="mb-4 flex items-center gap-3">
              <FaImage className="text-indigo-600" />
              <h2 className="text-lg font-black tracking-normal">
                Uploaded Images
              </h2>
            </div>

            {issue.images?.length > 0 ? (
              <ImageGallery images={issue.images} />
            ) : (
              <div className="flex h-36 items-center justify-center rounded-lg border border-dashed border-indigo-100 bg-indigo-50 text-indigo-300">
                <FaImage size={30} />
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default IssueDetails;
