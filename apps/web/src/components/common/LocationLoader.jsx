import { FaMapMarkerAlt } from "react-icons/fa";

const LocationLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-[420px] rounded-3xl bg-base-100 p-10 shadow-2xl">

        <div className="flex justify-center">

          <div className="relative">

            <div className="absolute inset-0 animate-ping rounded-full bg-primary opacity-40"></div>

            <div className="relative rounded-full bg-primary p-5 text-white">

              <FaMapMarkerAlt size={35} />

            </div>

          </div>

        </div>

        <h2 className="mt-8 text-center text-2xl font-bold">

          Getting Your Location

        </h2>

        <p className="mt-3 text-center text-base-content/60">

          Please wait while we verify your current GPS location.

        </p>

        <progress className="progress progress-primary mt-8 w-full"></progress>

      </div>

    </div>
  );
};

export default LocationLoader;