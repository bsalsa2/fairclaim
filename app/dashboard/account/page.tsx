import DashboardSidebar from '@/app/components/DashboardSidebar';

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

        <div className="max-w-2xl">
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                <p className="text-lg text-gray-900">John Traveler</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <p className="text-lg text-gray-900">demo@example.com</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Member Since</label>
                <p className="text-lg text-gray-900">January 1, 2024</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Preferences</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 border-gray-300 rounded text-blue-600"
                />
                <span className="text-gray-900">Enable autorefaring (recommended)</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 border-gray-300 rounded text-blue-600" />
                <span className="text-gray-900">Send me price drop notifications</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 border-gray-300 rounded text-blue-600"
                />
                <span className="text-gray-900">Email me weekly savings summary</span>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Danger Zone</h2>
            <button className="border border-red-600 text-red-600 hover:bg-red-50 font-bold py-2 px-4 rounded-lg transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
