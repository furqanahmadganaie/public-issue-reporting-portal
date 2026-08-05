import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import authService from "../../services/auth.service";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await authService.login(data);

      const { user, accessToken } = response.data.data;

      login({
        user,
        accessToken,
      });

      toast.success(response.data.message);

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">

          <h1 className="text-3xl font-bold text-center">
            Login
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 mt-5"
          >

            <div>
              <label className="label">
                <span className="label-text">
                  Email
                </span>
              </label>

              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Enter email"
                {...register("email", {
                  required: "Email is required",
                })}
              />

              {errors.email && (
                <p className="text-error text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">
                  Password
                </span>
              </label>

              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required",
                })}
              />

              {errors.password && (
                <p className="text-error text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            <button
              type="button"
              className="btn btn-link w-full"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </button>

            <div className="divider">OR</div>

            <button
              type="button"
              className="btn btn-outline w-full"
              onClick={() => navigate("/register")}
            >
              Create Account
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;