import { FaInbox } from "react-icons/fa";

const EmptyState = ({
  title,
  description,
}) => {
  return (
    <div className="text-center">

      <div className="flex justify-center mb-6">

        <div className="rounded-full bg-base-300 p-6">

          <FaInbox
            size={40}
            className="text-base-content/40"
          />

        </div>

      </div>

      <h2 className="text-3xl font-bold">
        {title}
      </h2>

      <p className="mt-3 text-base-content/60">
        {description}
      </p>

    </div>
  );
};

export default EmptyState;