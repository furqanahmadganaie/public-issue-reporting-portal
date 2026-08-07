const PageHeader = ({
  title,
  subtitle,
  actions,
}) => {
  return (
    <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

      <div>

        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-3 text-base-content/60 text-lg">
            {subtitle}
          </p>
        )}

      </div>

      {actions && (
        <div>
          {actions}
        </div>
      )}

    </div>
  );
};

export default PageHeader;