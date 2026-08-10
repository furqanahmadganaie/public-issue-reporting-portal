import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClipboardCheck,
} from "react-icons/fa";

import StatusBadge from "../issue/StatusBadge";
import TimelineImageGallery from "./TimelineImageGallery";
import TimelineMap from "./TimelineMap";

const TimelineItem = ({ item }) => {
  return (
    <div className="relative pl-20">

      {/* Timeline Dot */}

      <div className="absolute left-4 top-10 z-10 flex h-9 w-9 items-center justify-center rounded-full border-4 border-base-200 bg-primary shadow-lg">

        <FaClipboardCheck className="text-sm text-primary-content" />

      </div>

      {/* Card */}

      <div className="group rounded-3xl border border-base-300 bg-base-100 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_35px_rgba(59,130,246,0.25)]">

        <div className="p-8">

          {/* Header */}

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>

              <h2 className="text-2xl font-bold">

                {item.status}

              </h2>

              <p className="mt-2 flex items-center gap-2 text-base-content/60">

                <FaCalendarAlt />

                {new Date(
                  item.created_at
                ).toLocaleString()}

              </p>

            </div>

            <StatusBadge status={item.status} />

          </div>

          <div className="divider"></div>

          {/* Remark */}

          <div>

            <h3 className="mb-2 text-lg font-semibold">
              Officer Remark
            </h3>

            <div className="rounded-2xl bg-base-200 p-5 leading-7">

              {item.remark || "No remark provided."}

            </div>

          </div>

          {/* GPS */}

          {(item.latitude && item.longitude) && (

            <div className="mt-8">

              <div className="mb-4 flex items-center gap-2">

                <FaMapMarkerAlt className="text-error" />

                <h3 className="text-lg font-semibold">

                  Officer Location

                </h3>

              </div>

              <TimelineMap
                latitude={item.latitude}
                longitude={item.longitude}
              />

            </div>

          )}

          {/* Images */}

          {item.images &&
            item.images.length > 0 && (

              <div className="mt-8">

                <h3 className="mb-4 text-lg font-semibold">

                  Progress Images

                </h3>

                <TimelineImageGallery
                  images={item.images}
                />

              </div>

            )}

        </div>

      </div>

    </div>
  );
};

export default TimelineItem;