import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";

import authService from "../../services/auth.service";

const VerifyPhone = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sendingOTP, setSendingOTP] = useState(false);

  const phone = location.state?.phone || "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      phone,
      otp: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await authService.verifyPhone(data);

      toast.success(response.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Phone verification failed"
      );
    }
  };

  const handleResendOTP = async () => {
    try {
      setSendingOTP(true);

      const response = await authService.resendOTP({
        phone,
      });

      toast.success(response.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to resend OTP"
      );
    } finally {
      setSendingOTP(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">

          <h1 className="text-3xl font-bold text-center">
            Verify Phone
          </h1>

          <p className="text-center text-gray-500">
            Enter the OTP sent to your phone.
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

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Verifying..."
                : "Verify Phone"}
            </button>

            <button
              type="button"
              className="btn btn-outline w-full"
              disabled={sendingOTP}
              onClick={handleResendOTP}
            >
              {sendingOTP
                ? "Sending..."
                : "Resend OTP"}
            </button>

            <div className="text-center">
              <button
                type="button"
                className="link link-primary"
                onClick={() => navigate("/login")}
              >
                Back to Login
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default VerifyPhone;