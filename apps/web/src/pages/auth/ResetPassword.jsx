import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import authService from "../../services/auth.service";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const phone = location.state?.phone || "";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      phone,
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    try {
      const payload = {
        phone: data.phone,
        otp: data.otp,
        newPassword: data.newPassword,
      };

      const response = await authService.resetPassword(payload);

      toast.success(response.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Password reset failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">

          <h1 className="text-3xl font-bold text-center">
            Reset Password
          </h1>

          <p className="text-center text-gray-500">
            Enter OTP and your new password.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 mt-5"
          >

            <div>
              <label className="label">
                <span className="label-text">
                  Phone Number
                </span>
              </label>

              <input
                className="input input-bordered w-full"
                readOnly
                {...register("phone")}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">
                  OTP
                </span>
              </label>

              <input
                className="input input-bordered w-full"
                placeholder="Enter OTP"
                {...register("otp", {
                  required: "OTP is required",
                  minLength: {
                    value: 6,
                    message: "OTP must be 6 digits",
                  },
                  maxLength: {
                    value: 6,
                    message: "OTP must be 6 digits",
                  },
                })}
              />

              {errors.otp && (
                <p className="text-error text-sm mt-1">
                  {errors.otp.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">
                  New Password
                </span>
              </label>

              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="Enter new password"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message:
                      "Password must be at least 6 characters",
                  },
                })}
              />

              {errors.newPassword && (
                <p className="text-error text-sm mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">
                  Confirm Password
                </span>
              </label>

              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === newPassword ||
                    "Passwords do not match",
                })}
              />

              {errors.confirmPassword && (
                <p className="text-error text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Resetting..."
                : "Reset Password"}
            </button>

            <button
              type="button"
              className="btn btn-outline w-full"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default ResetPassword;