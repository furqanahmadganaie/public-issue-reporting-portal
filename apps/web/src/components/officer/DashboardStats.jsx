import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const DashboardStats = ({
  title,
  value,
  icon: Icon,
  color,
  to,
}) => {
  return (
    <Link to={to} className="group block">
      <div
        className={`
          relative min-h-[190px] overflow-hidden rounded-lg border border-slate-200
          bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.07)]
          transition duration-300 hover:-translate-y-1 hover:border-transparent
          sm:p-6
          ${color}
        `}
      >
        <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-slate-50" />

        <div className="relative flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-500">
              {title}
            </p>

            <h2 className="mt-3 text-4xl font-black text-slate-950 sm:text-5xl">
              {value ?? 0}
            </h2>
          </div>

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white shadow-lg shadow-slate-200">
            <Icon size={22} />
          </div>
        </div>

        <div className="relative mt-9 flex items-center text-sm font-bold text-indigo-600">
          View Details

          <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
        </div>
      </div>
    </Link>
  );
};

export default DashboardStats;
