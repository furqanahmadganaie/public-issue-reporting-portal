const PageLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;