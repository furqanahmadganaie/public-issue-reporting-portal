const PageHeader = ({
  title,
  subtitle,
  actions,
}) => {
  return (
    <div className="mb-8 flex flex-col gap-5 rounded-lg border border-white/80 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:p-7 md:flex-row md:items-center md:justify-between">

      <div>

        <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-indigo-600">
          Portal Overview
        </p>

        <h1 className="text-3xl font-black tracking-normal text-slate-950 sm:text-4xl lg:text-5xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
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
