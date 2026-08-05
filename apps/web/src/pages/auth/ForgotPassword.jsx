import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import authService from "../../services/auth.service";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await authService.forgotPassword(data);

      toast.success(response.data.message);

      navigate("/reset-password", {
        state: {
          phone: data.phone,
        },
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to send OTP"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">

          <h1 className="text-3xl font-bold text-center">
            Forgot Password
          </h1>

          <p className="text-center text-gray-500">
            Enter your registered phone number.
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
                placeholder="Enter phone number"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "Enter a valid phone number",
                  },
                })}
              />

              {errors.phone && (
                <p className="text-error text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Sending OTP..."
                : "Send OTP"}
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

export default ForgotPassword;