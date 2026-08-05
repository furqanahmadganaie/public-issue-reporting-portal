import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import authService from "../../services/auth.service";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();


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
    <div className="min-h-screen bg-base-200">

      <div className="navbar bg-base-100 shadow-md px-8">

        <div className="flex-1">
          <h1 className="text-2xl font-bold">
            Public Issue Reporting Portal
          </h1>
        </div>

        <div className="flex-none">

          <button
            className="btn btn-error"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

      <div className="max-w-6xl mx-auto mt-10">

        <div className="card bg-base-100 shadow-xl">

          <div className="card-body">

            <h2 className="text-3xl font-bold">
              Welcome, {user?.first_name ?? "citizen"}
            </h2>

            <p className="mt-2">
              Email : {user?.email ?? "not available"}
            </p>

            <p>
              Phone : {user?.phone ?? "not available"}
            </p>

            <div className="divider"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="card bg-primary text-primary-content">
                <div className="card-body">
                  <h2 className="card-title">
                    Report Issue
                  </h2>

                  <p>
                    Create a new public issue.
                  </p>

                  <button className="btn btn-outline">
                    Create
                  </button>
                </div>
              </div>

              <div className="card bg-secondary text-secondary-content">
                <div className="card-body">
                  <h2 className="card-title">
                    My Issues
                  </h2>

                  <p>
                    View your submitted issues.
                  </p>

                  <button className="btn btn-outline">
                    View
                  </button>
                </div>
              </div>

              <div className="card bg-accent text-accent-content">
                <div className="card-body">
                  <h2 className="card-title">
                    Profile
                  </h2>

                  <p>
                    Manage your profile.
                  </p>

                  <button className="btn btn-outline">
                    Open
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard; 