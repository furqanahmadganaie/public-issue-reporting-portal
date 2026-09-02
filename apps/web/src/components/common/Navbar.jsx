import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  FaClipboardList,
  FaHome,
  FaPlusCircle,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

import authService from "../../services/auth.service";
import useAuth from "../../hooks/useAuth";

const navItems = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: FaHome,
  },
  {
    label: "Report",
    to: "/report-issue",
    icon: FaPlusCircle,
  },
  {
    label: "My Issues",
    to: "/my-issues",
    icon: FaClipboardList,
  },
  {
    label: "Profile",
    to: "/profile",
    icon: FaUserCircle,
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await authService.logout();

      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
    } finally {
      logout();

      navigate("/login", {
        replace: true,
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 px-3 py-2 shadow-sm backdrop-blur sm:px-4 lg:px-6">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-600">
            Citizen Portal
          </p>
          <h1 className="text-lg font-black tracking-normal text-slate-950 sm:text-xl">
            Public Issue Reporting Portal
          </h1>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <nav className="grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1 sm:flex">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`inline-flex min-h-9 items-center justify-center gap-2 rounded-lg px-3 text-sm font-bold transition ${
                    location.pathname === item.to ||
                    (item.to === "/my-issues" &&
                      location.pathname.startsWith("/issues/"))
                      ? "bg-white text-indigo-700 shadow-sm"
                      : "text-slate-600 hover:bg-white/70 hover:text-slate-950"
                  }`}
                >
                  <Icon size={15} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            className="btn min-h-9 rounded-lg border-0 bg-rose-500 px-4 text-white shadow-lg shadow-rose-100 hover:bg-rose-600"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
