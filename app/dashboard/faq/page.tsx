'use client';

import DashboardSidebar from '@/app/components/DashboardSidebar';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What is FareDip?',
    answer:
      'FareDip is a service that automatically refares your flights when prices drop, helping you save money on your bookings.',
  },
  {
    question: 'How does autorefaring work?',
    answer:
      'We monitor your booked flights and automatically contact airlines to get you refunds or credits when prices drop. No action needed on your part!',
  },
  {
    question: 'Which airlines are supported?',
    answer:
      'We support major airlines including United, Delta, American, Southwest, JetBlue, and many others.',
  },
  {
    question: 'Is there a fee?',
    answer:
      'FareDip takes a percentage of the savings we get for you. You only pay if we save you money!',
  },
  {
    question: 'How do I add a flight I already booked?',
    answer:
      'Go to the My Flights section and click "Add a flight you\'ve already booked" to manually add your reservation.',
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>

        <div className="space-y-4 max-w-3xl">
          {faqs.map((faq, idx) => (
            <details key={idx} className="bg-white rounded-lg border border-gray-200 p-6">
              <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900">
                {faq.question}
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </summary>
              <p className="mt-4 text-gray-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </main>
    </div>
  );
}
