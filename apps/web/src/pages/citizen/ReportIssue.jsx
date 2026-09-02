import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import IssueForm from "../../components/issue/IssueForm";
import Navbar from "../../components/common/Navbar";
import issueService from "../../services/issue.service";

const ReportIssue = () => {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("village", data.village);
      formData.append("address", data.address);
      formData.append("latitude", data.latitude);
      formData.append("longitude", data.longitude);

      images.forEach((image) => {
        formData.append("images", image);
      });

      const response =
        await issueService.createIssue(formData);

      toast.success(response.data.message);

      reset();
      setImages([]);

      navigate("/my-issues");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to report issue."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[#f5f7fb] text-slate-950">
      <Navbar />

      <main className="mx-auto h-[calc(100vh-73px)] w-full max-w-[1700px] overflow-hidden px-3 py-3 sm:px-4 lg:px-5">

        <section>

          <div className="mb-3">
            <h2 className="text-2xl font-black tracking-normal text-slate-950">
              Report Public Issue
            </h2>
            <p className="mt-1 max-w-4xl text-sm leading-5 text-slate-600">
              Provide details about the issue you want to report. Our team will review it and take necessary action.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-[0_18px_60px_rgba(15,23,42,0.08)] lg:p-4">
            <IssueForm
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              onSubmit={onSubmit}
              images={images}
              setImages={setImages}
              loading={loading}
              setValue={setValue}
              onCancel={() => navigate("/dashboard")}
            />
          </div>

        </section>

      </main>
    </div>
  );
};

export default ReportIssue;
