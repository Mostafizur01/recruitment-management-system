export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full py-20">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
        <div className="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
      </div>
      <p className="mt-4 text-slate-500 font-medium animate-pulse">Loading data...</p>
    </div>
  );
}