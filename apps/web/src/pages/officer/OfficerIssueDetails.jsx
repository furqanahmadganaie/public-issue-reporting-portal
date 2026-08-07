import { useParams } from "react-router-dom";


import officerService from "../../services/officer.service";

import Loader from "../../components/common/Loader";
import StatusBadge from "../../components/issue/StatusBadge";
import ImageGallery from "../../components/issue/ImageGallery";
import Map from "../../components/common/Map";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import getCurrentLocation from "../../utils/getCurrentLocation";
import LocationLoader from "../../components/common/LocationLoader";

const OfficerIssueDetails = () => {
    const queryClient = useQueryClient();
    const { id } = useParams();

    const acceptMutation = useMutation({
        mutationFn: async () => {

            const location =
                await getCurrentLocation();

            return officerService.acceptIssue(id, {
                remark: "Issue accepted.",

                latitude: location.latitude,

                longitude: location.longitude,
            });

        },

        onSuccess: () => {

            toast.success("Issue accepted successfully.");

            queryClient.invalidateQueries({
                queryKey: ["officer-issue", id],
            });

            queryClient.invalidateQueries({
                queryKey: ["pending-issues"],
            });

            queryClient.invalidateQueries({
                queryKey: ["dashboard"],
            });

        },

        onError: (error) => {

            toast.error(
                error.message ||
                error.response?.data?.message ||
                "Unable to accept issue."
            );

        },
    });



    const {
        data: issue,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["officer-issue", id],

        queryFn: async () => {
            const response =
                await officerService.getIssueDetails(id);

            return response.data.data;
        },
    });

    if (isLoading) return <Loader />;

    if (isError) {
        return (
            <div className="alert alert-error">
                Failed to load issue.
            </div>
        );
    }

    if (acceptMutation.isPending) {
        return <LocationLoader />;
    }

    return (

        <div className="min-h-screen bg-base-200 px-10 py-8">

            <div className="card bg-base-100 shadow-xl">

                <div className="card-body">

                    <div className="flex justify-between items-center">

                        <h1 className="text-4xl font-bold">

                            {issue.title}

                        </h1>

                        <StatusBadge
                            status={issue.status}
                        />

                    </div>

                    <div className="divider"></div>

                    <ImageGallery
                        images={issue.images}
                    />

                    <div className="divider"></div>

                    <h2 className="text-xl font-bold">

                        Description

                    </h2>

                    <p>

                        {issue.description}

                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mt-8">

                        <div>

                            <strong>Village</strong>

                            <p>{issue.village}</p>

                        </div>

                        <div>

                            <strong>Address</strong>

                            <p>{issue.address}</p>

                        </div>

                        <div>

                            <strong>Priority</strong>

                            <p>{issue.priority}</p>

                        </div>

                        <div>

                            <strong>Reported On</strong>

                            <p>
                                {new Date(issue.created_at).toLocaleString()}
                            </p>

                        </div>

                    </div>

                    <div className="divider"></div>

                    <h2 className="text-xl font-bold mb-4">

                        Issue Location

                    </h2>

                    <Map

                        latitude={issue.latitude}

                        longitude={issue.longitude}

                    />

                    <div className="divider"></div>

                    {/* Officer Actions */}

                    <div className="mt-8 rounded-2xl border border-base-300 bg-base-200 p-6">

                        <h2 className="text-xl font-bold mb-2">
                            Officer Action
                        </h2>

                        <p className="text-base-content/60 mb-5">
                            Accept this issue to start working on it.
                            Your current GPS location will be captured
                            automatically.
                        </p>

                        {issue.status === "Pending" && (
                            <button
                                className="btn btn-primary rounded-2xl px-8"
                                onClick={() =>
                                    acceptMutation.mutate()
                                }
                            >
                                Accept Issue
                            </button>
                        )}

                    </div>


                </div>

            </div>

        </div>

    );

};

export default OfficerIssueDetails;