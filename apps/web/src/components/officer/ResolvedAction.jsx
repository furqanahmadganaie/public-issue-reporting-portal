import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

const ResolvedAction = ({ issue }) => {
  return (
    <div className="rounded-3xl border border-success/20 bg-success/5 p-8 shadow-lg">

      {/* Header */}

      <div className="flex items-center gap-4">

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success text-success-content shadow-lg">

          <FaCheckCircle className="text-3xl" />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-success">
            Issue Resolved
          </h2>

          <p className="mt-1 text-base-content/70">
            This issue has been successfully completed.
            No further action is required.
          </p>

        </div>

      </div>

      <div className="divider"></div>

      {/* Summary */}

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl border border-base-300 bg-base-100 p-5">

          <div className="flex items-center gap-3">

            <FaClock className="text-primary text-xl" />

            <div>

              <h3 className="font-semibold">
                Resolution Date
              </h3>

              <p className="text-base-content/70">
                {new Date(
                  issue.updated_at
                ).toLocaleString()}
              </p>

            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-base-300 bg-base-100 p-5">

          <div className="flex items-center gap-3">

            <FaMapMarkerAlt className="text-error text-xl" />

            <div>

              <h3 className="font-semibold">
                Final Location
              </h3>

              <p className="text-base-content/70">

                {issue.village}

              </p>

            </div>

          </div>

        </div>

      </div>

      <div className="divider"></div>

      {/* Success Message */}

      <div className="rounded-2xl border border-success/30 bg-success/10 p-6">

        <h3 className="text-xl font-semibold text-success">

          Completion Summary

        </h3>

        <p className="mt-3 leading-7 text-base-content/80">

          This issue has been resolved successfully.
          All progress updates, remarks, GPS locations,
          and uploaded images are preserved in the issue
          timeline for future reference.

        </p>

      </div>

      {/* Timeline */}

      <div className="mt-8 flex justify-end">

        <Link
          to={`/officer/issues/${issue.id}/timeline`}
          className="btn btn-primary rounded-2xl px-8"
        >

          View Timeline

          <FaArrowRight />

        </Link>

      </div>

    </div>
  );
};

export default ResolvedAction;
