const LoadingSpinner = () => {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-200 bg-opacity-50 z-50">
        <div className="border-8 border-[#0B7EF5] rounded-full w-24 h-24 animate-spin"></div>
      </div>
    );
  };
  
  export default LoadingSpinner;