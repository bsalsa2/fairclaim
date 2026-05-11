'use client';

import DashboardSidebar from '@/app/components/DashboardSidebar';

export default function RefaringPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Faredip Automatically Refares Your Flights</h1>
        <div className="bg-white rounded-lg p-8 max-w-4xl">
          <p className="text-gray-600 mb-6">
            The default at FareDip is autorefaring. This means that we contact the airline and get you money, credit, or points credited back to your account without changing anything about your reservation. Your seat or record locator are not changed in any way. You just get the credit for the amount your flight price went down without lifting a finger!
          </p>
          <p className="text-gray-600 mb-8">
            Autorefaring is on by default but can be toggled off on the account page.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            If you prefer to reach out to the airline yourself in order to get the money or points credited to your account:
          </h2>

          <p className="text-gray-600 mb-6">
            There are three manual methods for taking advantage of a FareDip after your ticket has been purchased. Each of these requires more effort on your part than using the default autorefaring.
          </p>

          <ol className="space-y-4 text-gray-600 mb-8">
            <li>
              <strong>1. Manage/Edit your trip on the website or app, and try to "change" to the same flight.</strong> Certain airlines will send you a credit/refund directly from there
            </li>
            <li>
              <strong>2. Reach out to the airline directly.</strong> They can refund you or give you trip credit for the difference. You can chat in the app or call, and say something like:
              <blockquote className="mt-2 p-4 border-l-4 border-blue-600 bg-blue-50 italic">
                "Hello, I've noticed the price of my flight has gone down, confirmation code ABC123. If this is a refundable fare, can you refare me and refund the difference between the original booking price and the current price? Or, if this is only refundable for trip credit, can you refare me and issue me trip credit for the price difference?"
              </blockquote>
            </li>
            <li>
              <strong>3. Cancel your flight, get a trip credit or cash (depending on your ticket), and use that credit or money to refare at the lower price.</strong> Slight risk here is that you will cancel, and then the flight price goes up before you can refare or before you receive your credit.
            </li>
          </ol>

          <h3 className="text-xl font-bold text-gray-900 mb-4">Here are some per-airline guidelines:</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• <strong>American</strong> — Method 2 is best, or Method 3.</li>
            <li>• <strong>Delta</strong> — Method 2 is best, or Method 3. For Method 3, credit should show up instantly.</li>
            <li>• <strong>JetBlue</strong> — Method 1 is best, or Methods 2 or 3.</li>
            <li>• <strong>Southwest</strong> — Method 1 is best, or Methods 2 or 3.</li>
            <li>• <strong>United</strong> — Method 2 is best, or Method 3. For Method 3, credit should show up instantly.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
