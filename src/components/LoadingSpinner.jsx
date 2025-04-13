const LoadingSpinner = () => {
  return (
    <div className="flex justify-center my-8">
      <div
        className="w-12 h-12 border-4 border-t-4 rounded-full animate-spin"
        style={{
          borderColor: "var(--secondary-color)",
          borderTopColor: "var(--primary-color)",
        }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
