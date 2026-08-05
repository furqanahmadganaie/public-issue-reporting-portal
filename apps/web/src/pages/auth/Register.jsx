import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import authService from "../../services/auth.service";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await authService.register(data);

      toast.success(response.data.message);

      navigate("/verify-phone", {
        state: {
          phone: data.phone,
        },
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center">
            Register
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <div>
              <label className="label">
                <span className="label-text">
                  First Name
                </span>
              </label>

              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter first name"
                {...register("first_name", {
                  required: "First name is required",
                })}
              />

              {errors.first_name && (
                <p className="text-error text-sm mt-1">
                  {errors.first_name.message}
                </p>
              )}
            </div>

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
                  Phone Number
                </span>
              </label>

              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter phone number"
                {...register("phone", {
                  required: "Phone number is required",
                })}
              />

              {errors.phone && (
                <p className="text-error text-sm mt-1">
                  {errors.phone.message}
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
                  minLength: {
                    value: 6,
                    message:
                      "Password must be at least 6 characters",
                  },
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
              {isSubmitting
                ? "Creating Account..."
                : "Register"}
            </button>

            <div className="text-center">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="link link-primary"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;