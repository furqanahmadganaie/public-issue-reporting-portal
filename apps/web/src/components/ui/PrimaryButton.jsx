const PrimaryButton = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
      className={`
        btn
        btn-primary
        rounded-2xl
        shadow-lg
        hover:scale-105
        transition-all
        duration-300
        hover:shadow-[0_0_25px_rgba(99,102,241,0.45)]
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;