export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You do not have permission to view this page.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}
