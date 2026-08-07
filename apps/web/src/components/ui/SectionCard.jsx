const SectionCard = ({
  children,
}) => {
  return (
    <div
      className="
      rounded-3xl
      border
      border-base-300
      bg-base-100
      p-6
      shadow-xl
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-[0_0_25px_rgba(99,102,241,0.2)]
      "
    >
      {children}
    </div>
  );
};

export default SectionCard;