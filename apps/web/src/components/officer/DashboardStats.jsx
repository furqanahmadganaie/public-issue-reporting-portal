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
    <Link to={to} className="group">
      <div
        className={`
          relative overflow-hidden
          rounded-3xl
          border border-base-300
          bg-base-100
          p-6
          shadow-xl
          transition-all
          duration-300
          hover:-translate-y-2
          hover:scale-[1.02]
          ${color}
        `}
      >
        {/* Background Icon */}
        <div className="absolute right-5 top-5 opacity-10">
          <Icon size={60} />
        </div>

        <div className="flex justify-between items-start">
          <div>
            <p className="text-base-content/70 text-sm font-medium">
              {title}
            </p>

            <h2 className="text-5xl font-extrabold mt-3">
              {value}
            </h2>
          </div>

          <div className="p-4 rounded-2xl bg-base-200">
            <Icon size={24} />
          </div>
        </div>

        <div className="mt-8 flex items-center text-primary font-semibold">
          View Details

          <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
        </div>
      </div>
    </Link>
  );
};

export default DashboardStats;