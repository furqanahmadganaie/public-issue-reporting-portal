import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({
  children,
  allowedRoles = [],
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role check
  if (
    allowedRoles.length > 0 &&
    !user.roles?.some((role) =>
      allowedRoles.includes(role)
    )
  ) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;