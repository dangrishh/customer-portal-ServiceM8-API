"use client";

import { useEffect, useState } from "react";

interface BookingDetails {
  job_uuid: string;
  job_description?: string;
  job_state?: string;
  attachments?: Array<{ filename: string; url: string }>;
}

export default function BookingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [booking, setBooking] = useState<BookingDetails | null>(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/bookings/${params.id}`);
      const data = await res.json();
      setBooking(data);
    };
    load();
  }, [params.id]);

  if (!booking) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen p-8 bg-blue-50">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow">
        <h1 className="text-2xl font-bold text-blue-700">
          {booking.job_description}
        </h1>

        <p className="text-gray-600 mt-1">Status: {booking.job_state}</p>

        <h2 className="text-lg font-semibold mt-6 mb-2">Attachments</h2>

        {booking.attachments && booking.attachments.length > 0 ? (
          <ul className="space-y-2">
            {booking.attachments.map((a) => (
              <li key={a.filename}>
                <a href={a.url} target="_blank" className="text-blue-600 underline">
                  {a.filename}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No attachments available.</p>
        )}
      </div>
    </div>
  );
}
