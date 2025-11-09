export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          TimeTracker Pro
        </h1>
        <p className="text-gray-600 mb-8">
          Professional Time Tracking Application
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
          <h2 className="text-xl font-semibold mb-4"> App Ready for Deployment</h2>
          <p className="text-gray-600">Your app will be live on Vercel soon!</p>
        </div>
      </div>
    </div>
  );
}
