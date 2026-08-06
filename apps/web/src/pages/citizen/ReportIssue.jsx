import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import IssueForm from "../../components/issue/IssueForm";
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
    <div className="min-h-screen bg-base-200 py-10">
      <div className="max-w-4xl mx-auto">

        <div className="card bg-base-100 shadow-xl">

          <div className="card-body">

            <h2 className="text-3xl font-bold mb-6">
              Report Public Issue
            </h2>

            <IssueForm
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              onSubmit={onSubmit}
              images={images}
              setImages={setImages}
              loading={loading}
              setValue={setValue}
            />

          </div>

        </div>

      </div>
    </div>
  );
};

export default ReportIssue;